import { Bell, Stethoscope, Languages } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';

type AppHeaderProps = {
  notificationsOpen: boolean;
  onToggleNotifications: () => void;
};

export default function AppHeader({ notificationsOpen, onToggleNotifications }: AppHeaderProps) {
  const { language, setLanguage, t } = useI18n();
  return (
    <header className="topbar">
      <div className="brand"><span className="brand-mark"><Stethoscope size={19} /></span><strong>KLINLINK</strong></div>
      <div className="top-actions">
        <label className="language-control">
          <Languages size={17} />
          <span className="sr-only">{t('language')}</span>
          <select aria-label={t('language')} value={language} onChange={(event) => setLanguage(event.target.value as 'en' | 'ar' | 'fr')}>
            <option value="en">{t('english')}</option>
            <option value="ar">{t('arabic')}</option>\n            <option value="fr">{t('french')}</option>
          </select>
        </label>
        <button className="icon-button notification-button" aria-label={t('notifications')} aria-expanded={notificationsOpen} onClick={onToggleNotifications}><Bell size={19} /><i /></button>
        <div className="user-chip">
          <span className="user-avatar" aria-hidden="true">K</span>
          <span><b>KLINLINK</b><small>{t('patientAccount')}</small></span>
        </div>
      </div>
      {notificationsOpen && <div className="notification-popover" role="status"><b>{t('notifications')}</b><p>{t('caughtUp')}</p></div>}
    </header>
  );
}
