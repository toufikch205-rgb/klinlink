import { describe, expect, it } from 'vitest';
import { translations } from './translations';
import { formatCity, formatWorkingHours } from './formatters';

describe('KLINLINK localization', () => {
  it('provides the same translation keys in English and Arabic', () => {
    expect(Object.keys(translations.ar).sort()).toEqual(Object.keys(translations.en).sort());
  });

  it('sets Arabic and French page metadata and navigation labels', () => {
    expect(translations.ar.metaTitle).toContain('KLINLINK');
    expect(translations.ar.home).toBe('الرئيسية');
    expect(translations.ar.appointments).toBe('المواعيد');\n    expect(translations.fr.metaTitle).toContain('KLINLINK');\n    expect(translations.fr.home).toBe('Accueil');\n    expect(translations.fr.appointments).toBe('Rendez-vous');
  });

  it('formats supported cities and working hours in Arabic', () => {
    expect(formatCity('Oran', 'ar')).toBe('وهران');
    expect(formatCity('Oran', 'en')).toBe('Oran');
    expect(formatWorkingHours('09:00 AM – 05:00 PM', 'ar')).toBe('09:00 ص – 05:00 م');
  });
});
