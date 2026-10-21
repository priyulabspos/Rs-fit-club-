# RS Fit Club – Gym Management System + Website
## Build Blueprint (give this file to the AI coding agent)

Keep this file in the project root as `BLUEPRINT.md`. The AI agent must read it fully before writing any code, and re-read the relevant phase before starting each phase.

---

## 0. How the AI agent must work (rules)

1. Work **one phase at a time**. Finish, run, test, then stop and summarise. Do not start the next phase unless asked.
2. Before each phase, write a short plan (files to create, DB changes, how you will test). Wait for approval if the plan changes the database or deletes anything.
3. Use **TypeScript (strict)**. No `any` unless justified in a comment.
4. Never put secrets (API keys, DB passwords) in code. Use `.env.local` and provide `.env.example`.
5. Every database change goes through a **migration**. Never edit the DB by hand.
6. Write tests for business rules (membership dates, access decision, payments). UI tests are optional.
7. Never invent data, awards, member numbers or testimonials on the public website.
8. Commit to git after each working step with a clear message.
9. If something is unknown (e.g. scanner model, payment provider), **stop and ask**. Do not guess.
10. Keep the design identity from the prototype: white / warm off-white, red `#d7262e`, black headings, condensed italic uppercase headings (Barlow Condensed), restrained rounded corners.

---

## 1. What we are building

A single product with three parts:

| Part | Users | Purpose |
|---|---|---|
| **Public website** | Visitors | Represents the gym: about, facilities, programs, plans, trainers, contact, enquiry form |
| **Management system (admin)** | Owner, staff | Members, plans, fee collection, dues, attendance, entry access, reports |
| **Member portal** | Members | See plan, due date, payment history, attendance, digital pass |

Plus a fourth, separate piece: the **gate integration** (links membership status to the physical door).

### The real-world flow we are replacing / improving
Today: member pays at the office → staff updates third-party software → plan end date extends → fingerprint scanner allows entry until that date → when the plan ends, scanner refuses and the magnetic lock stays locked (red light). Inside, an exit button releases the lock for 10 seconds, then it locks again.

Our system must reproduce this exactly, and become the single source of truth for membership dates.

---

## 2. Decisions to confirm before coding (Phase 0)

The agent must ask the owner/developer for these and record answers in `docs/decisions.md`:

1. **Scanner brand and model** (printed on the device or box). This decides the integration method (see section 7).
2. Keep the existing scanner, or allowed to replace it?
3. Who uses the admin system: owner only, or also front-desk staff? Do staff need limited permissions?
4. How do members pay today: cash, UPI, card? Any online payment wanted in v1?
5. Plan types: monthly only, or also quarterly / half-yearly / yearly? Joining fee? Discounts? Freeze / pause rules? Grace days after expiry?
6. Does the gym want WhatsApp / SMS reminders? (Needs a provider and approval; plan for it, build later.)
7. Hosting: cloud only, or also a small PC / Raspberry Pi at the gym for the gate?
8. Languages: English only, or also Hindi / Odia on member-facing screens?

---

## 3. Recommended technology (can be changed if the owner prefers)

- **Framework:** Next.js (App Router) + React + TypeScript
- **Styling:** Tailwind CSS (reuse the prototype's colours, fonts, spacing)
- **Database:** PostgreSQL (Supabase or Neon) with **Prisma** ORM and migrations
- **Auth:** Auth.js (NextAuth) or Supabase Auth, email/phone + password, role-based
- **Validation:** Zod
- **PDF receipts:** `@react-pdf/renderer` or server-side HTML to PDF
- **Hosting:** Vercel (web) + managed PostgreSQL. Gate agent runs separately at the gym (section 7).
- **Payments (later):** Razorpay or another India-supported gateway. Confirm current onboarding rules before building.
- **Testing:** Vitest for logic, Playwright for a few key flows

Reason: one codebase for website, admin and portal; easy to deploy; large community support.

---

## 4. Folder structure

```
/app
  /(public)        home, about, facilities, programs, plans, trainers, contact
  /(auth)          login, forgot-password
  /admin           dashboard, members, plans, payments, access, reports, enquiries, settings
  /portal          member dashboard, payments, attendance, pass
  /api             REST routes (see section 6)
/components        shared UI (Button, Modal, Table, Pill, Stat, Chart)
/lib               db.ts, auth.ts, membership.ts, access.ts, receipts.ts, audit.ts
/prisma            schema.prisma, migrations, seed.ts
/gate-agent        separate small service for the door (see section 7)
/docs              decisions.md, api.md, gate-integration.md
/public            optimised images, logo
```

---

## 5. Database design

All tables have `id`, `createdAt`, `updatedAt`. Money in **paise (integer)**, never floats. Dates stored in UTC, displayed in Asia/Kolkata.

- **User**: email/phone, passwordHash, role (`OWNER`, `STAFF`, `MEMBER`), isActive, memberId (nullable)
- **Member**: memberCode (e.g. RS0001), fullName, phone, email (optional), dateOfBirth (optional), gender (optional), emergencyContact, photoUrl (optional), joinedOn, notes, isBlocked, blockedReason, deviceUserId (the ID used on the scanner)
- **Plan**: name, durationDays, priceInPaise, joiningFeeInPaise, isActive, description
- **Membership**: memberId, planId, startDate, endDate, status (`ACTIVE`, `EXPIRED`, `FROZEN`, `CANCELLED`)
- **Payment**: memberId, membershipId, amountInPaise, mode (`CASH`, `UPI`, `CARD`, `ONLINE`), receiptNumber (unique, sequential), paidOn, periodStart, periodEnd, collectedBy (userId), note
- **AccessEvent**: memberId (nullable), deviceId, occurredAt, direction, decision (`ALLOWED`, `DENIED`), reason (`OK`, `EXPIRED`, `BLOCKED`, `UNKNOWN_USER`, `FROZEN`), source (`DEVICE`, `MANUAL`)
- **Device**: name, brand, model, location, apiKeyHash, lastSeenAt, status
- **Enquiry**: name, phone, interestedPlan, message, status (`NEW`, `CALLED`, `CONVERTED`, `CLOSED`), source
- **Reminder**: memberId, type, channel, sentAt, status
- **AuditLog**: userId, action, entity, entityId, before, after, at (every payment edit, block/unblock, date change, delete)
- **Setting**: key, value (grace days, gym name, receipt footer, opening hours)

Rules:
- A member can have many memberships over time; at most **one current** `ACTIVE` membership.
- Payments are **never deleted**. A mistake is fixed by a reversal entry plus audit log.
- Receipt numbers never repeat and never skip silently.

---

## 6. Core business rules (put these in `/lib` with unit tests)

### 6.1 Membership end date on payment
- If paid **before** the current endDate: new endDate = current endDate + plan duration (member does not lose days).
- If paid **after** expiry: new startDate = payment date; endDate = payment date + plan duration.
- Make this behaviour configurable in Settings (some gyms always restart from payment date). Ask the owner.
- Grace days (default 0) allow entry for N days after endDate. Configurable.

### 6.2 Fee status (shown in lists)
- `PAID`: endDate more than 7 days away
- `DUE_SOON`: 0–7 days left
- `OVERDUE`: endDate passed (beyond grace)

### 6.3 Access decision (single function, used by website, portal and gate)
```
allowed = member exists
       && !member.isBlocked
       && membership.status == ACTIVE (or FROZEN -> denied)
       && today <= membership.endDate + graceDays
```
Return `{ allowed, reason, validUntil }`. Log every decision as an `AccessEvent`.

### 6.4 Freeze / pause (if the owner wants it)
Freezing stores the days left; unfreezing sets endDate = today + daysLeft.

---

## 7. Gate integration (the most important and riskiest part)

### 7.1 Principles
1. **The door must never depend on the internet.** The device (or a local gate agent) keeps a local copy of who is allowed and until when.
2. **Safety first:** a magnetic lock must release on power failure and on a fire alarm; an exit button and emergency release must always work. Follow local fire and safety rules; get the installer's advice.
3. **Do not store raw fingerprint templates in our database.** The scanner keeps templates. We store only `deviceUserId` and the member's validity. This reduces privacy risk (India's DPDP Act 2023 applies to personal data; take proper legal advice and get member consent).
4. Everything about the gate goes through an **adapter**, so the brand can be changed later.

### 7.2 Integration options (choose after Phase 0 answer)

**Option A: scanner has a usable SDK / push protocol / API (most likely for common commercial biometric terminals)**
- Gate agent (small Node.js or Python service on a PC / Raspberry Pi at the gym, same network as the scanner) talks to the scanner.
- When a payment is recorded, the web app marks the member "needs sync".
- The agent pulls changes from `GET /api/gate/sync` and updates each user's allowed/valid-until on the device, or enables/disables the user.
- The agent uploads attendance punches from the device to `POST /api/gate/events`.

**Option B: scanner software is closed, no API**
- Options: (1) ask the vendor for an SDK / protocol document; (2) replace with a device that has documented access; (3) add our own access layer: QR / RFID / fingerprint reader + small controller + relay driving the existing magnetic lock, with the old scanner left alone or removed.
- A controller (e.g. Raspberry Pi or ESP32 with a relay) keeps an offline allow-list synced from our API, and drives the lock for 5–10 seconds.

### 7.3 Gate API (used by the agent)
All calls authenticated by a per-device API key (hashed in DB), HTTPS only.
- `GET  /api/gate/sync?since=<timestamp>` returns members whose access changed: `[{ deviceUserId, allowed, validUntil }]`
- `POST /api/gate/events` body: `[{ deviceUserId, occurredAt, direction, decision }]`
- `POST /api/gate/heartbeat` updates `Device.lastSeenAt`; the admin shows a warning if the gate has been silent for more than a few minutes.
- `POST /api/gate/check` (optional online check) body: `{ deviceUserId }` returns `{ allow, reason, validUntil }`

### 7.4 Manual override
Staff can **allow a single visit** (guest pass / forgot-to-pay) and can mark a member blocked. All overrides go to the AuditLog.

### 7.5 Gate simulator
Keep the demo's "Gate simulator" in the admin. It is useful for testing and for demos without hardware.

---

## 8. Features by module

### 8.1 Admin
- Login with roles. Owner can do everything; Staff cannot delete, edit prices, or see full revenue reports (configurable).
- **Dashboard:** total members, active, due soon, overdue, collected this month, today's entries, gate status.
- **Members:** list with search and filters (status, plan, due date range), add/edit, profile page (payments, attendance, notes), block/unblock, import from CSV (for moving from the old software).
- **Fees & payments:** collect payment (member, plan, period, mode, amount auto-filled, editable with reason), receipt PDF, pending/overdue list, reminder button, payment history, daily cash book, end-of-day closing.
- **Plans:** create/edit/disable; changing price must not alter past payments.
- **Entry access:** live log, denied-reasons, manual override, device list and health.
- **Enquiries:** from the website form; convert to member.
- **Reports:** monthly revenue, new vs expired members, attendance by hour/day, due list export (CSV/PDF).
- **Settings:** gym details, grace days, receipt footer, user management.
- **Audit log** viewer (owner only).

### 8.2 Member portal
- Login (phone + OTP if an SMS provider is added; otherwise password).
- Plan, validity, days left, payment history, receipts download, attendance calendar, digital pass (QR) if the gate supports it, renewal request.

### 8.3 Public website
- Convert the prototype's sections into pages/sections: Home, About, Facilities, Programs, Memberships (read live from the `Plan` table), Trainers, Gallery, Contact.
- Enquiry form saves to `Enquiry` (rate-limited, spam protected) and shows in admin.
- Real photos, real trainers, real contact details, Google Maps embed, opening hours, WhatsApp click-to-chat link.
- SEO basics: titles, descriptions, Open Graph image, sitemap, local business structured data.
- Performance: optimised images (WebP/AVIF), lazy loading.

---

## 9. Security and compliance checklist

- Passwords hashed (argon2 or bcrypt); rate-limit login; lockout after repeated failures.
- Role checks on **every** server route and action, not just in the UI.
- Input validation (Zod) on all endpoints; parameterised queries via Prisma.
- HTTPS everywhere; secure, httpOnly cookies; CSRF protection.
- Device API keys stored hashed; rotate if a device is lost.
- Daily automated database backups + a tested restore procedure.
- Minimal personal data collection; privacy policy and member consent text on the website and joining form (get legal advice).
- No raw biometric templates stored by us.
- Audit log for money and access changes.

---

## 10. Phases and ready-to-paste prompts

Use each prompt as the starting message for one phase. Replace `<...>` as needed.

### Phase 0 – Prepare (no coding)
**Prompt:** "Read BLUEPRINT.md fully. Do not write code. Summarise the project in 10 lines, then list every open question from section 2 and what is blocking each. Create `docs/decisions.md` with those questions and blank answers."

**Owner tasks:** photograph the scanner (model label), the controller box and the lock; list plans and prices; collect real photos, trainer names, address, phone, timings, social links; decide hosting and a domain name.

### Phase 1 – Foundation
**Prompt:** "Implement Phase 1 from BLUEPRINT.md: create a Next.js + TypeScript + Tailwind project, set up PostgreSQL with Prisma, write the schema for all tables in section 5, seed 3 plans and 10 fake members, add authentication with roles OWNER/STAFF/MEMBER, protect `/admin` and `/portal`, and set up Vitest. Provide `.env.example` and a README with run instructions. Stop when I can log in as owner and see an empty dashboard."

### Phase 2 – Members and plans
**Prompt:** "Implement Phase 2: admin Members (list, search, filters, add, edit, profile page, block/unblock, CSV import with preview and error report) and Plans (CRUD, activate/deactivate). Validate with Zod, log changes to AuditLog, add tests. Use the visual style described in section 0 rule 10."

### Phase 3 – Fees and payments
**Prompt:** "Implement Phase 3: payments, receipts and dues. Build `lib/membership.ts` with the date rules in 6.1 and 6.2 and thorough unit tests (pay early, pay late, grace days, yearly plans, month ends). Build the Collect Payment flow, sequential receipt numbers, receipt PDF, pending/overdue list, payment history, daily cash summary. Payments must never be deleted; add a reversal feature with a mandatory reason."

### Phase 4 – Access decision and logs (software only)
**Prompt:** "Implement Phase 4: `lib/access.ts` with the access decision in 6.3 and tests, the AccessEvent log, the admin Entry Access page with a gate simulator, manual one-time override, and block/unblock effects. No hardware yet."

### Phase 5 – Gate integration
**Prompt:** "We confirmed the scanner is `<brand and model>`. Read `docs/gate-integration.md` (create it if missing) and propose the integration for Option `<A or B>` in section 7 with a diagram, the exact protocol or SDK we would use, risks, and a test plan. Do not write the agent until I approve. After approval, implement the `/gate-agent` service and the `/api/gate/*` routes with per-device API keys, offline-safe behaviour, retry queue, heartbeat and an admin Devices page."

### Phase 6 – Member portal
**Prompt:** "Implement Phase 6: the member portal described in 8.2. Members can only see their own data (add tests that prove this). Mobile-first."

### Phase 7 – Public website
**Prompt:** "Implement Phase 7: convert the existing prototype file `<prototype filename>` into the public website using the Next.js app. Reuse the design, copy structure and images. Membership cards must read from the Plan table. Enquiry form saves to the Enquiry table with spam protection and appears in admin. Add SEO basics and a privacy policy page. Do not add fake statistics, awards or testimonials; use clearly marked placeholders until I provide real content."

### Phase 8 – Reports, reminders, hardening
**Prompt:** "Implement Phase 8: reports and CSV/PDF exports (section 8.1), the reminder system (start with in-app/manual; design the provider interface for WhatsApp/SMS but do not integrate yet), a full security review against section 9, automated backups documentation, and error monitoring."

### Phase 9 – Deploy and pilot
**Prompt:** "Prepare deployment: production environment variables, migrations, seed for the first owner account, deployment steps for the web app and database, gate-agent installation steps for the gym PC / Raspberry Pi, and a written rollback plan. Create a pilot checklist: run the old and new systems in parallel for 2 weeks."

### Phase 10 – Launch and handover
User guide for the owner and staff (screenshots), training session, support process, backup restore drill.

---

## 11. Running in parallel with the old software (strongly recommended)

1. Import all current members and their end dates into the new system.
2. For 2–4 weeks, staff enter payments in **both** systems. The old system still controls the door.
3. Compare the two systems daily. Fix differences.
4. Only then switch the door control to the new system, with the old one kept as a fallback for a few weeks.

---

## 12. Definition of done (v1)

- Owner can add a member, collect a fee, print a receipt, and see the correct end date.
- A member whose fee expires is denied at the gate; after payment is recorded, access works again within 1 minute.
- The gate still works if the internet is down.
- Staff cannot see or do what only the owner is allowed to.
- Daily backups run and a restore has been tested.
- The public website shows real gym content, live plans, and enquiries arrive in admin.
- Everything above is covered by tests for the business rules.

---

## 13. Risks and how to handle them

| Risk | Handling |
|---|---|
| Scanner has no API | Section 7.2 Option B; ask the vendor early |
| Internet down at gym | Local allow-list on device/agent |
| Wrong fee logic hurts the business | Unit tests + parallel run (section 11) |
| Data loss | Automated backups + restore drill |
| Privacy complaint about biometrics | Store no templates; consent; legal advice |
| AI agent makes risky changes | Phase-by-phase, plan first, git commits, review diffs |
