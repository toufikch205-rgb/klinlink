import { CalendarDays, ClipboardList, Clock3, MapPin } from 'lucide-react';
import { useI18n } from '../../../shared/i18n/I18nProvider';
import type { Appointment } from '../types';

type Props = { appointments: Appointment[] };

export default function AppointmentsPage({ appointments }: Props) {
  const { t } = useI18n();
  const sorted = [...appointments].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  return <section className="section-block destination-page">
    <div className="section-heading"><div><p className="eyebrow">{t('patientArea')}</p><h2>{t('myAppointments')}</h2><p className="section-caption">{t('appointmentsDescription')}</p></div></div>
    {sorted.length === 0 ? <div className="destination-card"><span className="destination-icon"><ClipboardList size={25} /></span><h3>{t('noAppointments')}</h3><p>{t('appointmentsEmpty')}</p></div> :
      <div className="appointment-list">{sorted.map((appointment) => <article className="appointment-card" key={appointment.id}>
        <div className="appointment-card-top"><div><span className="appointment-status">{t('bookingRequested')}</span><h3>{appointment.doctorName}</h3><p>{appointment.specialty}</p></div><span className="appointment-calendar"><CalendarDays size={21} /></span></div>
        <div className="appointment-meta"><span><CalendarDays size={15} />{appointment.date}</span><span><Clock3 size={15} />{appointment.time}</span><span><MapPin size={15} />{appointment.clinic}</span></div>
        <p className="appointment-patient">{t('bookedFor')}: {appointment.patientName}</p>
      </article>)}</div>}
  </section>;
}
