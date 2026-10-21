import crypto from 'crypto';
import { cookies } from 'next/headers';
import prisma from './db';
import { SessionUser, Role } from '@/types';

const SECRET = process.env.JWT_SECRET || 'rs-fit-club-fallback-secret-key-32chars';
export const SESSION_COOKIE_NAME = 'rs_fit_session';

/**
 * Creates a signed JWT-like token (HMAC-SHA256)
 */
export function signToken(payload: SessionUser, expiresInHours = 24 * 7): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const exp = Math.floor(Date.now() / 1000) + expiresInHours * 3600;
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');

  return `${header}.${body}.${signature}`;
}

/**
 * Verifies the signed token and returns the session payload or null
 */
export function verifyToken(token: string): SessionUser | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [header, body, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', SECRET)
      .update(`${header}.${body}`)
      .digest('base64url');

    // Constant-time comparison to prevent timing attacks
    if (
      signature.length !== expectedSignature.length ||
      !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
    ) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    return {
      id: payload.id,
      email: payload.email,
      phone: payload.phone,
      role: payload.role as Role,
      name: payload.name,
      memberId: payload.memberId,
    };
  } catch {
    return null;
  }
}

/**
 * Get current authenticated user from request cookies (Server Component / Server Action)
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const session = verifyToken(token);
  if (!session) return null;

  // Verify active user in DB
  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: { id: true, email: true, phone: true, role: true, isActive: true, memberId: true },
  });

  if (!user || !user.isActive) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    phone: user.phone,
    role: user.role as Role,
    memberId: user.memberId,
  };
}

/**
 * Check if the user has an allowed role
 */
export function hasRole(user: SessionUser | null, allowedRoles: Role[]): boolean {
  if (!user) return false;
  return allowedRoles.includes(user.role);
}
