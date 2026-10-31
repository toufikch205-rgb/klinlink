import { useEffect, useState } from 'react';
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
import type { Appointment } from './features/appointments/types';
import { createAppointmentId, readAppointments, saveAppointment } from './features/appointments/services/appointmentStorage';
import { readFavorites, writeFavorites } from './features/patients/services/favoriteStorage';

export default function App() {
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [activeTab, setActiveTab] = useState<AppTab>('Home');
  const [favorites, setFavorites] = useState<number[]>(() => readFavorites());
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(() => readAppointments());

  useEffect(() => {
    const sync = () => setAppointments(readAppointments());
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const visibleDoctors = useDoctorDirectory(doctors, query, category);
  const toggleFavorite = (id: number) => setFavorites((current) => {
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    try { return writeFavorites(next); } catch { return next; }
  });

  const handleBookAppointment = (details: { patientName: string; patientPhone: string; date: string; time: string }) => {
    if (!selectedDoctor) return;
    const appointment: Appointment = {
      id: createAppointmentId(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      clinic: selectedDoctor.clinic,
      patientName: details.patientName.trim(),
      patientPhone: details.patientPhone.trim(),
      date: details.date,
      time: details.time,
      status: 'requested',
      createdAt: new Date().toISOString(),
    };
    try {
      setAppointments(saveAppointment(appointment));
      setSelectedDoctor(null);
      setActiveTab('Appointment');
    } catch {
      window.alert(t('bookingSaveError'));
    }
  };

  return (
    <main className="app-shell">
      <AppNavigation activeTab={activeTab} onChange={setActiveTab} />
      <section className="content">
        <AppHeader notificationsOpen={showNotifications} onToggleNotifications={() => setShowNotifications((open) => !open)} />
        <div className="page-wrap">
          {activeTab === 'Home' && <HomePage query={query} onQueryChange={setQuery} category={category} onCategoryChange={setCategory} doctors={visibleDoctors} favorites={favorites} onSelectDoctor={setSelectedDoctor} onToggleFavorite={toggleFavorite} />}
          {activeTab === 'Appointment' && <AppointmentsPage appointments={appointments} />}
          {activeTab === 'Message' && <MessagesPage />}
          {activeTab === 'Setting' && <PatientSettingsPage />}
        </div>
      </section>
      <DoctorProfileModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} onBook={handleBookAppointment} />
    </main>
  );
}
