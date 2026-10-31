import { Bell, Stethoscope } from 'lucide-react';

type AppHeaderProps = {
  notificationsOpen: boolean;
  onToggleNotifications: () => void;
};

export default function AppHeader({ notificationsOpen, onToggleNotifications }: AppHeaderProps) {
  return (
    <header className="topbar">
      <div className="brand"><span className="brand-mark"><Stethoscope size={19} /></span><strong>KLINLINK</strong></div>
      <div className="top-actions">
        <button className="icon-button notification-button" aria-label="Notifications" aria-expanded={notificationsOpen} onClick={onToggleNotifications}><Bell size={19} /><i /></button>
        <div className="user-chip">
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces" alt="Patient profile" />
          <span><b>Alex Morgan</b><small>Patient account</small></span>
        </div>
      </div>
      {notificationsOpen && <div className="notification-popover" role="status"><b>Notifications</b><p>You’re all caught up.</p></div>}
    </header>
  );
}
