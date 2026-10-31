import { Languages, Settings2 } from 'lucide-react';
import { useI18n } from '../../../shared/i18n/I18nProvider';

export default function PatientSettingsPage() {
  const { language, setLanguage, t } = useI18n();

  return (
    <section className="section-block destination-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t('patientArea')}</p>
          <h2>{t('settings')}</h2>
          <p className="section-caption">{t('settingsDescription')}</p>
        </div>
      </div>

      <div className="settings-list">
        <section className="settings-card" aria-labelledby="language-setting-title">
          <span className="settings-icon"><Languages size={22} /></span>
          <div className="settings-copy">
            <h3 id="language-setting-title">{t('languageTitle')}</h3>
            <p>{t('languageDescription')}</p>
          </div>
          <label className="settings-language-control">
            <span className="sr-only">{t('language')}</span>
            <select
              aria-label={t('language')}
              value={language}
              onChange={(event) => setLanguage(event.target.value as 'en' | 'ar' | 'fr')}
            >
              <option value="en">{t('english')}</option>
              <option value="ar">{t('arabic')}</option>
              <option value="fr">{t('french')}</option>
            </select>
          </label>
        </section>

        <section className="settings-card" aria-labelledby="account-setting-title">
          <span className="settings-icon"><Settings2 size={22} /></span>
          <div className="settings-copy">
            <h3 id="account-setting-title">{t('accountSettings')}</h3>
            <p>{t('settingsEmpty')}</p>
          </div>
        </section>
      </div>
    </section>
  );
}
