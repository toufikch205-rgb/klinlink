import { CalendarDays, Home, MessageCircle, Settings, ShieldCheck, Stethoscope } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';

export type AppTab = 'Home' | 'Appointment' | 'Message' | 'Setting';

type AppNavigationProps = {
  activeTab: AppTab;
  onChange: (tab: AppTab) => void;
};

const navigationItems = [
  { label: 'Home', icon: Home },
  { label: 'Appointment', icon: CalendarDays },
  { label: 'Message', icon: MessageCircle },
  { label: 'Setting', icon: Settings },
] as const;

const translationKeys = {
  Home: 'home',
  Appointment: 'appointments',
  Message: 'messages',
  Setting: 'settings',
} as const;

export default function AppNavigation({ activeTab, onChange }: AppNavigationProps) {
  const { t } = useI18n();
  return (
    <>
      <aside className="desktop-rail" aria-label={t('mainNavigation')}>
        <div className="brand-mark"><Stethoscope size={22} /></div>
        {navigationItems.map(({ label, icon: Icon }) => (
          <button key={label} aria-label={t(translationKeys[label])} title={t(translationKeys[label])} className={activeTab === label ? 'rail-active' : ''} aria-current={activeTab === label ? 'page' : undefined} onClick={() => onChange(label)}>
            <Icon size={20} />
          </button>
        ))}
        <div className="rail-bottom"><ShieldCheck size={20} /></div>
      </aside>
      <nav className="mobile-nav" aria-label={t('mainNavigation')}>
        {navigationItems.map(({ label, icon: Icon }) => (
          <button key={label} className={activeTab === label ? 'active' : ''} aria-current={activeTab === label ? 'page' : undefined} onClick={() => onChange(label)}>
            <Icon size={20} /><span>{t(translationKeys[label])}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
