import { useMemo, useState } from 'react';
import {
  Activity, Bell, CalendarDays, ChevronRight, Clock3, Heart, Home,
  MapPin, MessageCircle, Search, Settings, ShieldCheck, Star, Stethoscope,
  UserRound, Brain, Smile, Menu, X
} from 'lucide-react';

type Doctor = {
  id: number; name: string; specialty: string; rating: string;
  clinic: string; hours: string; city: string; image: string;
  category: string; online: boolean;
};

const doctors: Doctor[] = [
  { id: 1, name: 'Dr. Amine Bensalem', specialty: 'Cardiologist', rating: '4.9', clinic: 'El Amal Medical Center', hours: '09:00 AM – 05:00 PM', city: 'Oran', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=240&h=240&fit=crop&crop=faces', category: 'Cardiology', online: true },
  { id: 2, name: 'Dr. Sarah Haddad', specialty: 'Dentist', rating: '4.8', clinic: 'Bright Smile Clinic', hours: '10:00 AM – 06:00 PM', city: 'Algiers', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=240&h=240&fit=crop&crop=faces', category: 'Dental', online: true },
  { id: 3, name: 'Dr. Yacine Merabet', specialty: 'Neurologist', rating: '4.9', clinic: 'Wellness Health Clinic', hours: '08:30 AM – 04:30 PM', city: 'Oran', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=240&h=240&fit=crop&crop=faces', category: 'Neurology', online: false },
  { id: 4, name: 'Dr. Lina Cherif', specialty: 'General Practitioner', rating: '4.7', clinic: 'Family Care Center', hours: '09:00 AM – 03:00 PM', city: 'Constantine', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=240&h=240&fit=crop&crop=faces', category: 'Check-up', online: true },
];

const categories = [
  { name: 'Check-up', icon: Activity },
  { name: 'Dental', icon: Smile },
  { name: 'Cardiology', icon: Heart },
  { name: 'Neurology', icon: Brain },
];

export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('Home');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const visibleDoctors = useMemo(() => doctors.filter((doctor) => {
    const matchesCategory = category === 'All' || doctor.category === category;
    const text = `${doctor.name} ${doctor.specialty} ${doctor.clinic} ${doctor.city}`.toLowerCase();
    return matchesCategory && text.includes(query.toLowerCase());
  }), [query, category]);

  const toggleFavorite = (id: number) => setFavorites((current) =>
    current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
  );

  return (
    <main className="app-shell">
      <aside className="desktop-rail">
        <div className="brand-mark"><Stethoscope size={22} /></div>
        <span className="rail-active"><Home size={20} /></span>
        <span><CalendarDays size={20} /></span>
        <span><MessageCircle size={20} /></span>
        <span><Settings size={20} /></span>
        <div className="rail-bottom"><ShieldCheck size={20} /></div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div className="brand"><span className="brand-mark"><Stethoscope size={19} /></span><strong>KLINLINK</strong></div>
          <div className="top-actions">
            <button className="icon-button notification-button" aria-label="Notifications" onClick={() => setShowNotifications(!showNotifications)}><Bell size={19} /><i /></button>
            <div className="user-chip"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces" alt="Patient profile" /><span><b>Alex Morgan</b><small>Patient account</small></span></div>
          </div>
          {showNotifications && <div className="notification-popover"><b>Notifications</b><p>You’re all caught up.</p></div>}
        </header>

        <div className="page-wrap">
          <section className="welcome-row">
            <div><p className="eyebrow">MONDAY, OCTOBER 26</p><h1>Good morning, Alex <span>✦</span></h1><p className="subheading">Find the right care. Feel better, sooner.</p></div>
            <div className="welcome-badge"><ShieldCheck size={18} /><span>Care you can trust</span></div>
          </section>

          <section className="search-panel">
            <div className="search-field"><Search size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search doctors, specialties, clinics..." /><kbd>⌘ K</kbd></div>
            <button className="location-filter"><MapPin size={17} /> All locations <ChevronRight size={16} /></button>
          </section>

          <section className="section-block">
            <div className="section-heading"><div><p className="eyebrow">EXPLORE CARE</p><h2>Find by specialty</h2></div><button className="text-link" onClick={() => setCategory('All')}>View all <ChevronRight size={16} /></button></div>
            <div className="category-grid">
              {categories.map(({ name, icon: Icon }) => <button key={name} className={`category-card ${category === name ? 'selected' : ''}`} onClick={() => setCategory(category === name ? 'All' : name)}><span className="category-icon"><Icon size={21} /></span><b>{name}</b><small>{name === 'Check-up' ? 'General health' : name === 'Dental' ? 'Teeth & gums' : name === 'Cardiology' ? 'Heart health' : 'Brain & nerves'}</small></button>)}
            </div>
          </section>

          <section className="section-block doctors-section">
            <div className="section-heading"><div><p className="eyebrow">PERSONALIZED FOR YOU</p><h2>Recommended doctors</h2><p className="section-caption">Connect with trusted specialists near you.</p></div><button className="text-link" onClick={() => setCategory('All')}>See all doctors <ChevronRight size={16} /></button></div>
            <div className="doctor-grid">
              {visibleDoctors.map((doctor) => <article className="doctor-card" key={doctor.id} onClick={() => setSelectedDoctor(doctor)}>
                <div className="doctor-photo-wrap"><img className="doctor-photo" src={doctor.image} alt={doctor.name} /><span className={`status ${doctor.online ? 'online' : ''}`}>{doctor.online ? 'Available' : 'Offline'}</span><button className={`favorite ${favorites.includes(doctor.id) ? 'is-favorite' : ''}`} aria-label="Toggle favorite" onClick={(event) => { event.stopPropagation(); toggleFavorite(doctor.id); }}><Heart size={17} fill={favorites.includes(doctor.id) ? 'currentColor' : 'none'} /></button></div>
                <div className="doctor-info"><div className="doctor-title"><div><h3>{doctor.name}</h3><p>{doctor.specialty}</p></div><span className="rating"><Star size={14} fill="currentColor" /> {doctor.rating}</span></div><div className="doctor-meta"><span><MapPin size={14} />{doctor.clinic}, {doctor.city}</span><span><Clock3 size={14} />{doctor.hours}</span></div><button className="profile-button" onClick={(event) => { event.stopPropagation(); setSelectedDoctor(doctor); }}>View profile <ChevronRight size={16} /></button></div>
              </article>)}
              {visibleDoctors.length === 0 && <div className="empty-state"><Search size={25} /><b>No doctors found</b><span>Try another name or specialty.</span></div>}
            </div>
          </section>
        </div>

        <nav className="mobile-nav" aria-label="Main navigation">
          {[['Home', Home], ['Appointment', CalendarDays], ['Message', MessageCircle], ['Setting', Settings]].map(([label, Icon]) => {
            const NavIcon = Icon as typeof Home;
            return <button key={label as string} className={activeTab === label ? 'active' : ''} onClick={() => setActiveTab(label as string)}><NavIcon size={20} /><span>{label as string}</span></button>;
          })}
        </nav>
      </section>

      {selectedDoctor && <div className="modal-backdrop" onClick={() => setSelectedDoctor(null)}><section className="doctor-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Close" onClick={() => setSelectedDoctor(null)}><X size={20} /></button><img src={selectedDoctor.image} alt={selectedDoctor.name} /><span className="status online">Doctor profile</span><h2>{selectedDoctor.name}</h2><p>{selectedDoctor.specialty} · {selectedDoctor.city}</p><div className="modal-rating"><Star size={16} fill="currentColor" /> {selectedDoctor.rating} patient rating</div><div className="modal-detail"><MapPin size={17} />{selectedDoctor.clinic}</div><div className="modal-detail"><Clock3 size={17} />{selectedDoctor.hours}</div><button className="primary-button" onClick={() => alert('Appointment booking will be connected in the next development phase.')}>Book an appointment <ChevronRight size={17} /></button></section></div>}
    </main>
  );
}