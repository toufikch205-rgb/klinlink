import { Clock3, ChevronRight, Heart, MapPin, Star } from 'lucide-react';
import type { Doctor } from '../types';

type DoctorCardProps = {
  doctor: Doctor;
  favorite: boolean;
  onSelect: (doctor: Doctor) => void;
  onToggleFavorite: (id: number) => void;
};

export default function DoctorCard({ doctor, favorite, onSelect, onToggleFavorite }: DoctorCardProps) {
  return (
    <article className="doctor-card" onClick={() => onSelect(doctor)}>
      <div className="doctor-photo-wrap">
        <img className="doctor-photo" src={doctor.image} alt={doctor.name} loading="lazy" />
        <span className={`status ${doctor.online ? 'online' : ''}`}>{doctor.online ? 'Available' : 'Offline'}</span>
        <button className={`favorite ${favorite ? 'is-favorite' : ''}`} aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'} aria-pressed={favorite} onClick={(event) => { event.stopPropagation(); onToggleFavorite(doctor.id); }}>
          <Heart size={17} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="doctor-info">
        <div className="doctor-title"><div><h3>{doctor.name}</h3><p>{doctor.specialty}</p></div><span className="rating"><Star size={14} fill="currentColor" /> {doctor.rating}</span></div>
        <div className="doctor-meta"><span><MapPin size={14} />{doctor.clinic}, {doctor.city}</span><span><Clock3 size={14} />{doctor.hours}</span></div>
        <button className="profile-button" onClick={(event) => { event.stopPropagation(); onSelect(doctor); }}>View profile <ChevronRight size={16} /></button>
      </div>
    </article>
  );
}
