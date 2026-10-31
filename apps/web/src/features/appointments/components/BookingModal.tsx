import { useState } from 'react';
import { CalendarDays, Clock3, X } from 'lucide-react';
import type { Doctor } from '../../doctors/types';
import type { Appointment } from '../types';
import { createAppointmentId } from '../services/appointmentStorage';
import { useI18n } from '../../../shared/i18n/I18nProvider';

type Props = {
  doctor: Doctor | null;
  onClose: () => void;
  onConfirm: (appointment: Appointment) => void;
};

const timeSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '11:00 AM', '01:00 PM', '01:30 PM'];

function todayLocal() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

export default function BookingModal({ doctor, onClose, onConfirm }: Props) {
  const { t } = useI18n();
  const [date, setDate] = useState(todayLocal());
  const [time, setTime] = useState(timeSlots[0]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (!doctor) return null;

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || phone.trim().replace(/[\s-]/g, '').length < 8 || !date || date < todayLocal()) {
      setError(t('bookingValidation'));
      return;
    }
    onConfirm({
      id: createAppointmentId(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      clinic: doctor.clinic,
      patientName: name.trim(),
      patientPhone: phone.trim(),
      date,
      time,
      status: 'requested',
      createdAt: new Date().toISOString(),
    });
    setError('');
    onClose();
  }

  return (
    <div className="modal-backdrop booking-backdrop" onClick={onClose}>
      <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" onClick={(event) => event.stopPropagation()}>
        <div className="booking-heading">
          <div><p className="eyebrow">{t('appointmentRequest')}</p><h2 id="booking-title">{t('bookAppointment')}</h2><p className="booking-doctor">{doctor.name} · {doctor.clinic}</p></div>
          <button className="modal-close" type="button" aria-label={t('close')} onClick={onClose}><X size={19} /></button>
        </div>
        <form onSubmit={submit}>
          <label className="booking-label"><CalendarDays size={16} />{t('chooseDate')}</label>
          <input className="booking-input" type="date" min={todayLocal()} value={date} onChange={(event) => setDate(event.target.value)} required />
          <label className="booking-label"><Clock3 size={16} />{t('availableTime')}</label>
          <div className="booking-slots">{timeSlots.map((slot) => <button key={slot} type="button" className={time === slot ? 'booking-slot selected' : 'booking-slot'} onClick={() => setTime(slot)}>{slot}</button>)}</div>
          <label className="booking-label" htmlFor="booking-patient-name">{t('patientFullName')}</label>
          <input id="booking-patient-name" className="booking-input" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required />
          <label className="booking-label" htmlFor="booking-patient-phone">{t('phoneNumber')}</label>
          <input id="booking-patient-phone" className="booking-input" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+213" autoComplete="tel" required />
          {error && <p className="booking-error" role="alert">{error}</p>}
          <p className="booking-disclaimer">{t('demoBookingDisclaimer')}</p>
          <button className="primary-button booking-submit" type="submit">{t('confirmAppointment')}</button>
        </form>
      </section>
    </div>
  );
}
