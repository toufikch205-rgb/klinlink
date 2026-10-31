import { useMemo } from 'react';
import type { Doctor } from '../types';

export function useDoctorDirectory(doctors: Doctor[], query: string, category: string) {
  return useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return doctors.filter((doctor) => {
      const matchesCategory = category === 'All' || doctor.category === category;
      const searchableText = [doctor.name, doctor.specialty, doctor.clinic, doctor.city]
        .join(' ')
        .toLocaleLowerCase();
      return matchesCategory && searchableText.includes(normalizedQuery);
    });
  }, [doctors, query, category]);
}
