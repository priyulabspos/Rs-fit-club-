import { describe, it, expect } from 'vitest';
import { z } from 'zod';

const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  phone: z.string().trim().min(10, 'Phone must be at least 10 digits'),
  interestedPlan: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
});

describe('Enquiry Form Validation', () => {
  it('validates a complete, valid enquiry submission', () => {
    const payload = {
      name: 'Pooja Verma',
      phone: '9876543210',
      interestedPlan: 'Quarterly Pro (3 Months)',
      message: 'Looking for morning workout slots',
    };

    const result = enquirySchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Pooja Verma');
      expect(result.data.phone).toBe('9876543210');
      expect(result.data.interestedPlan).toBe('Quarterly Pro (3 Months)');
    }
  });

  it('rejects submissions with missing or short names', () => {
    const payload = {
      name: 'A',
      phone: '9876543210',
    };

    const result = enquirySchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toBeDefined();
    }
  });

  it('rejects submissions with invalid or short phone numbers', () => {
    const payload = {
      name: 'Rahul Sharma',
      phone: '12345',
    };

    const result = enquirySchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.phone).toBeDefined();
    }
  });

  it('allows optional fields to be omitted', () => {
    const payload = {
      name: 'Sunil Kumar',
      phone: '9811223344',
    };

    const result = enquirySchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.interestedPlan).toBeUndefined();
      expect(result.data.message).toBeUndefined();
    }
  });
});
