import { CalendarDays, ClipboardList, Clock3, MapPin, Users } from 'lucide-react';
import { useI18n } from '../../../shared/i18n/I18nProvider';
import type { Appointment } from '../types';
import { getDemoQueueEstimate } from '../queueEstimate';

export default function AppointmentsPage({ appointments }: { appointments: Appointment[] }) {
  const { t } = useI18n();
  const newestFirst = [...appointments].reverse();

  return <section className="section-block destination-page">
    <div className="section-heading"><div><p className="eyebrow">{t('patientArea')}</p><h2>{t('myAppointments')}</h2><p className="section-caption">{t('appointmentsDescription')}</p></div></div>
    {newestFirst.length === 0 ? <div className="destination-card"><span className="destination-icon"><ClipboardList size={25} /></span><h3>{t('noAppointments')}</h3><p>{t('appointmentsEmpty')}</p></div> :
      <div className="appointments-list">{newestFirst.map((appointment, index) => {
        const queue = getDemoQueueEstimate(index);
        return <article className="appointment-card" key={appointment.id}>
          <div className="appointment-card-heading"><div><span className="eyebrow">{t('appointmentRequest')}</span><h3>{appointment.doctorName}</h3><p>{appointment.specialty}</p></div><span className="appointment-status">{t('pendingConfirmation')}</span></div>
          <div className="appointment-meta"><span><MapPin size={16}/>{appointment.clinic}</span><span><CalendarDays size={16}/>{appointment.date}</span><span><Clock3 size={16}/>{appointment.time}</span></div>
          <div className="queue-estimate" aria-label={t('queueEstimate')}>
            <div className="queue-estimate-title"><Users size={16}/><span>{t('queueEstimate')}</span></div>
            <strong>{queue.patientsAhead}</strong>
            <b>{t('patientsAhead')}</b>
            <p>{t('estimatedWait').replace('{minutes}', String(queue.waitMinutes))}</p>
          </div>
        </article>;
      })}</div>}
  </section>;
}
