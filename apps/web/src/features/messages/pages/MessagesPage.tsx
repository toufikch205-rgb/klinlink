import { Inbox } from 'lucide-react';
import { useI18n } from '../../../shared/i18n/I18nProvider';

export default function MessagesPage() {
  const { t } = useI18n();
  return <section className="section-block destination-page">
    <div className="section-heading"><div><p className="eyebrow">{t('patientArea')}</p><h2>{t('messages')}</h2><p className="section-caption">{t('messagesDescription')}</p></div></div>
    <div className="destination-card"><span className="destination-icon"><Inbox size={25} /></span><h3>{t('noMessages')}</h3><p>{t('messagesEmpty')}</p></div>
  </section>;
}
