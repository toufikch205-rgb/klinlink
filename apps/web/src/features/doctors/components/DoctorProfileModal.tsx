import { useState } from 'react';
import { Clock3, MapPin, Star, X, ChevronRight, CalendarDays } from 'lucide-react';
import type { Doctor } from '../types';
import { useI18n } from '../../../shared/i18n/I18nProvider';
import { formatCity, formatWorkingHours } from '../../../shared/i18n/formatters';

type BookingDetails = { patientName: string; patientPhone: string; date: string; time: string };
type DoctorProfileModalProps = {
  doctor: Doctor | null;
  onClose: () => void;
  onBook: (details: BookingDetails) => void;
};

const specialtyKeys: Record<string, 'cardiologist' | 'dentist' | 'neurologist' | 'generalPractitioner'> = {
  Cardiologist: 'cardiologist', Dentist: 'dentist', Neurologist: 'neurologist',
  'General Practitioner': 'generalPractitioner',
};
const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

export default function DoctorProfileModal({ doctor, onClose, onBook }: DoctorProfileModalProps) {
  const { t, language } = useI18n();
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState(timeSlots[0]);
  const [error, setError] = useState('');
  if (!doctor) return null;

  const today = new Date().toISOString().slice(0, 10);
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!patientName.trim() || !patientPhone.trim() || !date || date < today) {
      setError(t('bookingValidation'));
      return;
    }
    setError('');
    onBook({ patientName, patientPhone, date, time });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section className="doctor-modal" role="dialog" aria-modal="true" aria-labelledby="doctor-modal-title" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" aria-label={t('close')} onClick={onClose}><X size={20} /></button>
        <img src={doctor.image} alt={doctor.name} />
        <span className={`status ${doctor.online ? 'online' : ''}`}>{t('doctorProfile')}</span>
        <h2 id="doctor-modal-title">{doctor.name}</h2>
        <p>{t(specialtyKeys[doctor.specialty] ?? 'generalPractitioner')} · {formatCity(doctor.city, language)}</p>
        <div className="modal-rating"><Star size={16} fill="currentColor" /> {doctor.rating} {t('patientRating')}</div>
        <div className="modal-detail"><MapPin size={17} />{doctor.clinic}</div>
        <div className="modal-detail"><Clock3 size={17} />{formatWorkingHours(doctor.hours, language)}</div>
        <form className="booking-form" onSubmit={submit}>
          <h3><CalendarDays size={17} /> {t('requestAppointment')}</h3>
          <label>{t('patientName')}<input value={patientName} onChange={(e) => setPatientName(e.target.value)} autoComplete="name" required /></label>
          <label>{t('patientPhone')}<input value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)} type="tel" autoComplete="tel" required /></label>
          <div className="booking-fields">
            <label>{t('appointmentDate')}<input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} required /></label>
            <label>{t('appointmentTime')}<select value={time} onChange={(e) => setTime(e.target.value)}>{timeSlots.map((slot) => <option key={slot}>{slot}</option>)}</select></label>
          </div>
          {error && <p className="booking-error" role="alert">{error}</p>}
          <button className="primary-button" type="submit">{t('confirmBooking')} <ChevronRight size={17} /></button>
          <p className="booking-disclaimer">{t('demoBookingNotice')}</p>
        </form>
      </section>
    </div>
  );
}
