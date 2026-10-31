import type { Doctor } from './types';

/**
 * Filters the doctor directory by category and a case-insensitive text query.
 * An empty query matches every doctor in the selected category.
 */
export function filterDoctors(
  doctors: Doctor[],
  query: string,
  category: string,
): Doctor[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  return doctors.filter((doctor) => {
    const matchesCategory = category === 'All' || doctor.category === category;
    const searchableText = [doctor.name, doctor.specialty, doctor.clinic, doctor.city]
      .join(' ')
      .toLocaleLowerCase();

    return matchesCategory && searchableText.includes(normalizedQuery);
  });
}
