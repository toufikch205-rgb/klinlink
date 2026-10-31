import { useState, type FormEvent } from 'react';
import '../../../styles/patient-profile.css';
import { Languages, Settings2, UserRound, Save } from 'lucide-react';
import { useI18n } from '../../../shared/i18n/I18nProvider';
import { readPatientProfile, savePatientProfile, type PatientProfile } from '../services/patientProfileStorage';

export default function PatientSettingsPage() {
  const { language, setLanguage, t } = useI18n();
  const [profile, setProfile] = useState<PatientProfile>(() => readPatientProfile());
  const [saved, setSaved] = useState(false);
  const update = (key: keyof PatientProfile, value: string) => { setProfile((p) => ({ ...p, [key]: value })); setSaved(false); };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try { setProfile(savePatientProfile(profile)); setSaved(true); } catch { setSaved(false); }
  };
  return <section className="section-block destination-page">
    <div className="section-heading"><div><p className="eyebrow">{t('patientArea')}</p><h2>{t('settings')}</h2><p className="section-caption">{t('settingsDescription')}</p></div></div>
    <div className="settings-list">
      <section className="settings-card" aria-labelledby="language-setting-title">
        <span className="settings-icon"><Languages size={22}/></span>
        <div className="settings-copy"><h3 id="language-setting-title">{t('languageTitle')}</h3><p>{t('languageDescription')}</p></div>
        <label className="settings-language-control"><span className="sr-only">{t('language')}</span>
          <select aria-label={t('language')} value={language} onChange={(e) => setLanguage(e.target.value as 'en'|'ar'|'fr')}>
            <option value="en">{t('english')}</option><option value="ar">{t('arabic')}</option><option value="fr">{t('french')}</option>
          </select>
        </label>
      </section>
      <section className="settings-card patient-profile-card">
        <span className="settings-icon"><UserRound size={22}/></span>
        <div className="settings-copy"><h3>{t('patientProfile')}</h3><p>{t('patientProfileDescription')}</p></div>
        <form className="patient-profile-form" onSubmit={submit}>
          <label>{t('patientName')}<input value={profile.name} onChange={(e) => update('name',e.target.value)} autoComplete="name"/></label>
          <label>{t('patientPhone')}<input type="tel" value={profile.phone} onChange={(e) => update('phone',e.target.value)} autoComplete="tel"/></label>
          <label>{t('patientCity')}<input value={profile.city} onChange={(e) => update('city',e.target.value)} autoComplete="address-level2"/></label>
          <button className="primary-button" type="submit"><Save size={16}/>{t('saveProfile')}</button>
          {saved && <p className="profile-saved" role="status">{t('profileSaved')}</p>}
        </form>
      </section>
      <section className="settings-card"><span className="settings-icon"><Settings2 size={22}/></span><div className="settings-copy"><h3>{t('accountSettings')}</h3><p>{t('settingsEmpty')}</p></div></section>
    </div>
  </section>;
}
