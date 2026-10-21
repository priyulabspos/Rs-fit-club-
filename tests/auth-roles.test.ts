import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword } from '../lib/passwords';
import { signToken, verifyToken, hasRole } from '../lib/auth';
import { SessionUser } from '../types';

describe('Password Utilities', () => {
  it('hashes and correctly verifies passwords', async () => {
    const raw = 'Password@123';
    const hash = await hashPassword(raw);
    expect(hash).not.toBe(raw);

    const isMatch = await verifyPassword(raw, hash);
    expect(isMatch).toBe(true);

    const wrongMatch = await verifyPassword('WrongPassword', hash);
    expect(wrongMatch).toBe(false);
  });
});

describe('Session & JWT Tokens', () => {
  const mockUser: SessionUser = {
    id: 'usr_test_123',
    email: 'owner@rsfitclub.com',
    phone: '9876543210',
    role: 'OWNER',
  };

  it('signs and verifies a valid session token', () => {
    const token = signToken(mockUser);
    expect(typeof token).toBe('string');

    const decoded = verifyToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.id).toBe(mockUser.id);
    expect(decoded?.email).toBe(mockUser.email);
    expect(decoded?.role).toBe('OWNER');
  });

  it('rejects tampered tokens', () => {
    const token = signToken(mockUser);
    const tampered = token.slice(0, -4) + 'abcd';
    const decoded = verifyToken(tampered);
    expect(decoded).toBeNull();
  });
});

describe('Role-Based Access Control (RBAC)', () => {
  const owner: SessionUser = { id: '1', email: 'o@test.com', phone: null, role: 'OWNER' };
  const staff: SessionUser = { id: '2', email: 's@test.com', phone: null, role: 'STAFF' };
  const member: SessionUser = { id: '3', email: 'm@test.com', phone: null, role: 'MEMBER' };

  it('verifies owner access to admin functions', () => {
    expect(hasRole(owner, ['OWNER'])).toBe(true);
    expect(hasRole(owner, ['OWNER', 'STAFF'])).toBe(true);
  });

  it('verifies staff access and restrictions', () => {
    expect(hasRole(staff, ['OWNER', 'STAFF'])).toBe(true);
    expect(hasRole(staff, ['OWNER'])).toBe(false);
  });

  it('blocks members from staff/owner routes', () => {
    expect(hasRole(member, ['OWNER', 'STAFF'])).toBe(false);
    expect(hasRole(member, ['MEMBER'])).toBe(true);
  });

  it('blocks unauthenticated visitors', () => {
    expect(hasRole(null, ['OWNER', 'STAFF', 'MEMBER'])).toBe(false);
  });
});
