import { useMemo } from 'react';
import type { Doctor } from '../types';
import { filterDoctors } from '../filterDoctors';

export function useDoctorDirectory(doctors: Doctor[], query: string, category: string) {
  return useMemo(
    () => filterDoctors(doctors, query, category),
    [doctors, query, category],
  );
}
