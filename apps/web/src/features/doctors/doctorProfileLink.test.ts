import { describe, expect, it } from 'vitest';
import { findSharedDoctor } from './doctorProfileLink';
import type { Doctor } from './types';

const sample: Doctor[] = [{ id: 7, name: 'Dr. Test', specialty: 'Dentist', rating: '5.0', clinic: 'Clinic', hours: '09:00–17:00', city: 'Oran', image: '', category: 'Dental', online: true }];

describe('findSharedDoctor', () => {
  it('resolves a valid shared doctor id', () => expect(findSharedDoctor('?doctor=7', sample)?.name).toBe('Dr. Test'));
  it('ignores missing, malformed, and unknown ids', () => {
    expect(findSharedDoctor('', sample)).toBeNull();
    expect(findSharedDoctor('?doctor=abc', sample)).toBeNull();
    expect(findSharedDoctor('?doctor=99', sample)).toBeNull();
  });
});
