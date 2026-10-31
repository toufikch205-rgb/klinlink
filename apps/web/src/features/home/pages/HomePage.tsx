import { ChevronRight, MapPin, Search, ShieldCheck } from 'lucide-react';
import type { Doctor } from '../../doctors/types';
import { doctorCategories } from '../../doctors/categories';
import DoctorCard from '../../doctors/components/DoctorCard';

type HomePageProps = {
  query: string;
  onQueryChange: (query: string) => void;
  category: string;
  onCategoryChange: (category: string) => void;
  doctors: Doctor[];
  favorites: number[];
  onSelectDoctor: (doctor: Doctor) => void;
  onToggleFavorite: (id: number) => void;
};

export default function HomePage(props: HomePageProps) {
  const { query, onQueryChange, category, onCategoryChange, doctors, favorites, onSelectDoctor, onToggleFavorite } = props;
  return (
    <>
      <section className="welcome-row">
        <div><p className="eyebrow">MONDAY, OCTOBER 26</p><h1>Good morning, Alex <span>✦</span></h1><p className="subheading">Find the right care. Feel better, sooner.</p></div>
        <div className="welcome-badge"><ShieldCheck size={18} /><span>Care you can trust</span></div>
      </section>
      <section className="search-panel">
        <div className="search-field"><Search size={20} /><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search doctors, specialties, clinics..." aria-label="Search doctors" /><kbd>⌘ K</kbd></div>
        <button className="location-filter" type="button"><MapPin size={17} /> All locations <ChevronRight size={16} /></button>
      </section>
      <section className="section-block">
        <div className="section-heading"><div><p className="eyebrow">EXPLORE CARE</p><h2>Find by specialty</h2></div><button className="text-link" onClick={() => onCategoryChange('All')}>View all <ChevronRight size={16} /></button></div>
        <div className="category-grid">
          {doctorCategories.map(({ name, description, icon: Icon }) => (
            <button key={name} className={`category-card ${category === name ? 'selected' : ''}`} aria-pressed={category === name} onClick={() => onCategoryChange(category === name ? 'All' : name)}>
              <span className="category-icon"><Icon size={21} /></span><b>{name}</b><small>{description}</small>
            </button>
          ))}
        </div>
      </section>
      <section className="section-block doctors-section">
        <div className="section-heading"><div><p className="eyebrow">PERSONALIZED FOR YOU</p><h2>Recommended doctors</h2><p className="section-caption">Connect with trusted specialists near you.</p></div><button className="text-link" onClick={() => onCategoryChange('All')}>See all doctors <ChevronRight size={16} /></button></div>
        <div className="doctor-grid">
          {doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} favorite={favorites.includes(doctor.id)} onSelect={onSelectDoctor} onToggleFavorite={onToggleFavorite} />)}
          {doctors.length === 0 && <div className="empty-state"><Search size={25} /><b>No doctors found</b><span>Try another name or specialty.</span></div>}
        </div>
      </section>
    </>
  );
}
