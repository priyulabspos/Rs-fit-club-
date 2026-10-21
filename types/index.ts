export type Role = 'OWNER' | 'STAFF' | 'MEMBER';

export type MembershipStatus = 'ACTIVE' | 'EXPIRED' | 'FROZEN' | 'CANCELLED';

export type PaymentMode = 'CASH' | 'UPI' | 'CARD' | 'ONLINE';

export type AccessDirection = 'IN' | 'OUT';

export type AccessDecision = 'ALLOWED' | 'DENIED';

export type AccessReason =
  | 'OK'
  | 'EXPIRED'
  | 'BLOCKED'
  | 'UNKNOWN_USER'
  | 'FROZEN';

export type AccessSource = 'DEVICE' | 'MANUAL';

export type EnquiryStatus = 'NEW' | 'CALLED' | 'CONVERTED' | 'CLOSED';

export interface SessionUser {
  id: string;
  email: string | null;
  phone: string | null;
  role: Role;
  name?: string;
  memberId?: string | null;
}
