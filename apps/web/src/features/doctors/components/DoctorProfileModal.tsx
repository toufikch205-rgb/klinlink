import { Clock3, MapPin, Star, X, ChevronRight } from 'lucide-react';
import type { Doctor } from '../types';
import { useI18n } from '../../../shared/i18n/I18nProvider';

type DoctorProfileModalProps = {
  doctor: Doctor | null;
  onClose: () => void;
  onBook: (doctor: Doctor) => void;
};

const specialtyKeys: Record<string, 'cardiologist' | 'dentist' | 'neurologist' | 'generalPractitioner'> = {
  Cardiologist: 'cardiologist',
  Dentist: 'dentist',
  Neurologist: 'neurologist',
  'General Practitioner': 'generalPractitioner',
};

export default function DoctorProfileModal({ doctor, onClose, onBook }: DoctorProfileModalProps) {
  const { t } = useI18n();
  if (!doctor) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section className="doctor-modal" role="dialog" aria-modal="true" aria-labelledby="doctor-modal-title" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" aria-label={t('close')} onClick={onClose}><X size={20} /></button>
        <img src={doctor.image} alt={doctor.name} />
        <span className={`status ${doctor.online ? 'online' : ''}`}>{t('doctorProfile')}</span>
        <h2 id="doctor-modal-title">{doctor.name}</h2>
        <p>{t(specialtyKeys[doctor.specialty] ?? 'generalPractitioner')} · {doctor.city}</p>
        <div className="modal-rating"><Star size={16} fill="currentColor" /> {doctor.rating} {t('patientRating')}</div>
        <div className="modal-detail"><MapPin size={17} />{doctor.clinic}</div>
        <div className="modal-detail"><Clock3 size={17} />{doctor.hours}</div>
        <button className="primary-button" onClick={() => onBook(doctor)}>{t('bookAppointment')} <ChevronRight size={17} /></button>
      </section>
    </div>
  );
}
