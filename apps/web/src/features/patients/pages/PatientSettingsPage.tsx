import { Settings2 } from 'lucide-react';
import { useI18n } from '../../../shared/i18n/I18nProvider';

export default function PatientSettingsPage() {
  const { t } = useI18n();
  return <section className="section-block destination-page">
    <div className="section-heading"><div><p className="eyebrow">{t('patientArea')}</p><h2>{t('settings')}</h2><p className="section-caption">{t('settingsDescription')}</p></div></div>
    <div className="destination-card"><span className="destination-icon"><Settings2 size={25} /></span><h3>{t('accountSettings')}</h3><p>{t('settingsEmpty')}</p></div>
  </section>;
}
