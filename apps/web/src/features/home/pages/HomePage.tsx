import { ChevronRight, MapPin, Search, ShieldCheck } from 'lucide-react';
import type { Doctor } from '../../doctors/types';
import { doctorCategories } from '../../doctors/categories';
import DoctorCard from '../../doctors/components/DoctorCard';
import { useI18n } from '../../../shared/i18n/I18nProvider';

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

const categoryTranslationKeys = {
  'Check-up': ['checkup', 'generalHealth'],
  Dental: ['dental', 'teethGums'],
  Cardiology: ['cardiology', 'heartHealth'],
  Neurology: ['neurology', 'brainNerves'],
} as const;

export default function HomePage(props: HomePageProps) {
  const { query, onQueryChange, category, onCategoryChange, doctors, favorites, onSelectDoctor, onToggleFavorite } = props;
  const { t } = useI18n();
  return (
    <>
      <section className="welcome-row">
        <div><p className="eyebrow">KLINLINK</p><h1>{t('greeting')} <span>✦</span></h1><p className="subheading">{t('greetingSub')}</p></div>
        <div className="welcome-badge"><ShieldCheck size={18} /><span>{t('trustedCare')}</span></div>
      </section>
      <section className="search-panel">
        <div className="search-field"><Search size={20} /><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={t('searchPlaceholder')} aria-label={t('searchDoctors')} /></div>
        <button className="location-filter" type="button"><MapPin size={17} /> {t('allLocations')} <ChevronRight size={16} /></button>
      </section>
      <section className="section-block">
        <div className="section-heading"><div><p className="eyebrow">{t('exploreCare')}</p><h2>{t('findSpecialty')}</h2></div><button className="text-link" onClick={() => onCategoryChange('All')}>{t('viewAll')} <ChevronRight size={16} /></button></div>
        <div className="category-grid">
          {doctorCategories.map(({ name, icon: Icon }) => {
            const [nameKey, descriptionKey] = categoryTranslationKeys[name as keyof typeof categoryTranslationKeys];
            return (
              <button key={name} className={`category-card ${category === name ? 'selected' : ''}`} aria-pressed={category === name} onClick={() => onCategoryChange(category === name ? 'All' : name)}>
                <span className="category-icon"><Icon size={21} /></span><b>{t(nameKey)}</b><small>{t(descriptionKey)}</small>
              </button>
            );
          })}
        </div>
      </section>
      {favorites.length > 0 && <section className="section-block">
        <div className="section-heading"><div><p className="eyebrow">{t('patientArea')}</p><h2>{t('favoriteDoctors')}</h2></div></div>
        <div className="doctor-grid">
          {doctors.filter((doctor) => favorites.includes(doctor.id)).map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} favorite onSelect={onSelectDoctor} onToggleFavorite={onToggleFavorite} />)}
        </div>
      </section>}
      <section className="section-block doctors-section">
        <div className="section-heading"><div><p className="eyebrow">{t('personalized')}</p><h2>{t('recommendedDoctors')}</h2><p className="section-caption">{t('connectSpecialists')}</p></div><button className="text-link" onClick={() => onCategoryChange('All')}>{t('seeAllDoctors')} <ChevronRight size={16} /></button></div>
        <div className="doctor-grid">
          {doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} favorite={favorites.includes(doctor.id)} onSelect={onSelectDoctor} onToggleFavorite={onToggleFavorite} />)}
          {doctors.length === 0 && <div className="empty-state"><Search size={25} /><b>{t('noDoctors')}</b><span>{t('tryAnother')}</span></div>}
        </div>
      </section>
    </>
  );
}
