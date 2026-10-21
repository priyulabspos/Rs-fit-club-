# RS Fit Club – Gym Management System + Website

Modern, integrated Gym Management System, Member Portal, Public Website, and Biometric Gate Access Control built with Next.js (App Router), TypeScript, Tailwind CSS, and Prisma ORM.

---

> [!WARNING]
> **CRITICAL SECURITY NOTICE FOR PRODUCTION:**
> The seeded Owner account password is set to a temporary default: `Password@123`.
> **You MUST change this password immediately before deploying to production!**
> Also make sure to update `JWT_SECRET` in `.env.local` to a strong, random 64-character secret.

---

## 🚀 Quick Start (Local Run)

### 1. Prerequisites
- **Node.js**: v18.0.0 or v20+ LTS (Tested on v22)
- **npm**: 10.x+

### 2. Environment Setup
The project comes pre-configured with local zero-setup SQLite for development.
```bash
# Verify environment files (.env and .env.local)
cp .env.example .env.local
```

### 3. Database Migration & Seed
```bash
# Push schema changes to database
npx prisma db push

# Seed initial Owner, Staff, 3 Plans, and 10 Sample Members
npm run prisma:seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. It will redirect to `/login`.

---

## 🔑 Seeded Demo Credentials

| Role | Email / Username | Default Password | Access URL |
|---|---|---|---|
| **Owner** | `owner@rsfitclub.com` | `Password@123` | `/admin` |
| **Staff** | `staff@rsfitclub.com` | `Password@123` | `/admin` |

*(Note: In Phase 1, the Owner and Staff can log in and see the initial empty admin dashboard).*

---

## 🧪 Automated Testing
Run Vitest test suite for business logic, password encryption, and RBAC authentication guards:
```bash
npm run test
```

---

## 🗄️ Database Architecture (Prisma)
All 11 required tables from Blueprint Section 5 are configured:
1. `User` (Owner, Staff, Member authentication)
2. `Member` (Gym members, contact details, scanner IDs)
3. `Plan` (Subscription durations, pricing in paise)
4. `Membership` (Active/Expired memberships and validity dates)
5. `Payment` (Receipts, modes, ledger, sequential numbers)
6. `AccessEvent` (Real-time biometric scanner entry decisions)
7. `Device` (Physical gates, API keys, status)
8. `Enquiry` (Website prospective member inquiries)
9. `Reminder` (Automated expiry/due reminders)
10. `AuditLog` (Immutable security log for financial/access changes)
11. `Setting` (Gym-wide configuration, grace days, etc.)

---

## 🔄 Switching to Cloud PostgreSQL (Neon / Supabase)
When ready for production or cloud staging:
1. Open `prisma/schema.prisma` and change `provider = "sqlite"` to `provider = "postgresql"`.
2. Update `DATABASE_URL` in `.env.local` to your PostgreSQL connection string.
3. Run `npx prisma db push` or `npx prisma migrate deploy`.
