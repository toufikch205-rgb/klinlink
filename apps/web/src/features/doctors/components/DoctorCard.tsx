import { Clock3, ChevronRight, Heart, MapPin, Star } from 'lucide-react';
import type { Doctor } from '../types';
import { useI18n } from '../../../shared/i18n/I18nProvider';
import { formatCity, formatWorkingHours } from '../../../shared/i18n/formatters';

type DoctorCardProps = {
  doctor: Doctor;
  favorite: boolean;
  onSelect: (doctor: Doctor) => void;
  onToggleFavorite: (id: number) => void;
};

const specialtyKeys: Record<string, 'cardiologist' | 'dentist' | 'neurologist' | 'generalPractitioner'> = {
  Cardiologist: 'cardiologist',
  Dentist: 'dentist',
  Neurologist: 'neurologist',
  'General Practitioner': 'generalPractitioner',
};

export default function DoctorCard({ doctor, favorite, onSelect, onToggleFavorite }: DoctorCardProps) {
  const { t, language } = useI18n();
  return (
    <article className="doctor-card" onClick={() => onSelect(doctor)}>
      <div className="doctor-photo-wrap">
        <img className="doctor-photo" src={doctor.image} alt={doctor.name} loading="lazy" />
        <span className={`status ${doctor.online ? 'online' : ''}`}>{doctor.online ? t('available') : t('offline')}</span>
        <button className={`favorite ${favorite ? 'is-favorite' : ''}`} aria-label={favorite ? t('removeFavorite') : t('addFavorite')} aria-pressed={favorite} onClick={(event) => { event.stopPropagation(); onToggleFavorite(doctor.id); }}>
          <Heart size={17} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="doctor-info">
        <div className="doctor-title"><div><h3>{doctor.name}</h3><p>{t(specialtyKeys[doctor.specialty] ?? 'generalPractitioner')}</p></div><span className="rating"><Star size={14} fill="currentColor" /> {doctor.rating}</span></div>
        <div className="doctor-meta"><span><MapPin size={14} />{doctor.clinic}, {formatCity(doctor.city, language)}</span><span><Clock3 size={14} />{formatWorkingHours(doctor.hours, language)}</span></div>
        <button className="profile-button" onClick={(event) => { event.stopPropagation(); onSelect(doctor); }}>{t('viewProfile')} <ChevronRight size={16} /></button>
      </div>
    </article>
  );
}
