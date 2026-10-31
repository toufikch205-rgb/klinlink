import { CalendarDays, Home, MessageCircle, Settings, ShieldCheck, Stethoscope } from 'lucide-react';

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

export default function AppNavigation({ activeTab, onChange }: AppNavigationProps) {
  return (
    <>
      <aside className="desktop-rail" aria-label="Main navigation">
        <div className="brand-mark"><Stethoscope size={22} /></div>
        {navigationItems.map(({ label, icon: Icon }) => (
          <button key={label} aria-label={label} title={label} className={activeTab === label ? 'rail-active' : ''} aria-current={activeTab === label ? 'page' : undefined} onClick={() => onChange(label)}>
            <Icon size={20} />
          </button>
        ))}
        <div className="rail-bottom"><ShieldCheck size={20} /></div>
      </aside>
      <nav className="mobile-nav" aria-label="Main navigation">
        {navigationItems.map(({ label, icon: Icon }) => (
          <button key={label} className={activeTab === label ? 'active' : ''} aria-current={activeTab === label ? 'page' : undefined} onClick={() => onChange(label)}>
            <Icon size={20} /><span>{label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
