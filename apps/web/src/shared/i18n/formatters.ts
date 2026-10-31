import type { Language } from './translations';

const cityNames: Record<string, string> = {
  Algiers: 'الجزائر',
  Oran: 'وهران',
  Constantine: 'قسنطينة',
};

export function formatCity(city: string, language: Language) {
  return language === 'ar' ? (cityNames[city] ?? city) : city;
}

export function formatWorkingHours(hours: string, language: Language) {
  if (language !== 'ar') return hours;
  return hours.replace(/AM/g, 'ص').replace(/PM/g, 'م');
}
