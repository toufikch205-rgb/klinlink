import { ClipboardList } from 'lucide-react';
import { useI18n } from '../../../shared/i18n/I18nProvider';

export default function AppointmentsPage() {
  const { t } = useI18n();
  return <section className="section-block destination-page">
    <div className="section-heading"><div><p className="eyebrow">{t('patientArea')}</p><h2>{t('myAppointments')}</h2><p className="section-caption">{t('appointmentsDescription')}</p></div></div>
    <div className="destination-card"><span className="destination-icon"><ClipboardList size={25} /></span><h3>{t('noAppointments')}</h3><p>{t('appointmentsEmpty')}</p></div>
  </section>;
}
