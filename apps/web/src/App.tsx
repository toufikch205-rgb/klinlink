import { useState } from 'react';
import type { Doctor } from './features/doctors/types';
import { doctors } from './features/doctors/demoDoctors';
import { useDoctorDirectory } from './features/doctors/hooks/useDoctorDirectory';
import HomePage from './features/home/pages/HomePage';
import AppointmentsPage from './features/appointments/pages/AppointmentsPage';
import MessagesPage from './features/messages/pages/MessagesPage';
import PatientSettingsPage from './features/patients/pages/PatientSettingsPage';
import AppHeader from './shared/components/AppHeader';
import AppNavigation, { type AppTab } from './shared/components/AppNavigation';
import DoctorProfileModal from './features/doctors/components/DoctorProfileModal';
import { useI18n } from './shared/i18n/I18nProvider';

export default function App() {
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [activeTab, setActiveTab] = useState<AppTab>('Home');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const visibleDoctors = useDoctorDirectory(doctors, query, category);

  const toggleFavorite = (id: number) => setFavorites((current) =>
    current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
  );

  const handleBookAppointment = (_doctor: Doctor) => {
    window.alert(t('bookingNotice'));
  };

  return (
    <main className="app-shell">
      <AppNavigation activeTab={activeTab} onChange={setActiveTab} />
      <section className="content">
        <AppHeader notificationsOpen={showNotifications} onToggleNotifications={() => setShowNotifications((open) => !open)} />
        <div className="page-wrap">
          {activeTab === 'Home' && (
            <HomePage
              query={query}
              onQueryChange={setQuery}
              category={category}
              onCategoryChange={setCategory}
              doctors={visibleDoctors}
              favorites={favorites}
              onSelectDoctor={setSelectedDoctor}
              onToggleFavorite={toggleFavorite}
            />
          )}
          {activeTab === 'Appointment' && <AppointmentsPage />}
          {activeTab === 'Message' && <MessagesPage />}
          {activeTab === 'Setting' && <PatientSettingsPage />}
        </div>
      </section>
      <DoctorProfileModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        onBook={handleBookAppointment}
      />
    </main>
  );
}
