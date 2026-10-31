import { describe, expect, it } from 'vitest';
import { filterDoctors } from './filterDoctors';
import type { Doctor } from './types';

const sampleDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Amine Bensalem',
    specialty: 'Cardiologist',
    rating: '4.9',
    clinic: 'El Amal Medical Center',
    hours: '09:00 AM – 05:00 PM',
    city: 'Oran',
    image: '',
    category: 'Cardiology',
    online: true,
  },
  {
    id: 2,
    name: 'Dr. Sarah Haddad',
    specialty: 'Dentist',
    rating: '4.8',
    clinic: 'Bright Smile Clinic',
    hours: '10:00 AM – 06:00 PM',
    city: 'Algiers',
    image: '',
    category: 'Dental',
    online: false,
  },
];

describe('filterDoctors', () => {
  it('returns all doctors for an empty query and All category', () => {
    expect(filterDoctors(sampleDoctors, '', 'All')).toHaveLength(2);
  });

  it('matches query text without case sensitivity or surrounding spaces', () => {
    expect(filterDoctors(sampleDoctors, '  ORAN  ', 'All').map((doctor) => doctor.id))
      .toEqual([1]);
  });

  it('filters by category and query together', () => {
    expect(filterDoctors(sampleDoctors, 'dentist', 'Dental').map((doctor) => doctor.id))
      .toEqual([2]);
    expect(filterDoctors(sampleDoctors, 'dentist', 'Cardiology')).toEqual([]);
  });

  it('returns an empty array when no doctor matches', () => {
    expect(filterDoctors(sampleDoctors, 'not-a-doctor', 'All')).toEqual([]);
  });
});
