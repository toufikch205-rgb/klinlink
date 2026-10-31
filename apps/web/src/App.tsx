import { useMemo, useState } from 'react';
import type { Doctor } from './features/doctors/types';
import { doctors } from './features/doctors/demoDoctors';
import {
  Activity, Bell, CalendarDays, ChevronRight, Clock3, Heart, Home,
  MapPin, MessageCircle, Search, Settings, ShieldCheck, Star, Stethoscope,
  UserRound, Brain, Smile, Menu, X, ClipboardList, Inbox, Settings2
} from 'lucide-react';


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
        <button aria-label="Home" title="Home" className={activeTab === 'Home' ? 'rail-active' : ''} onClick={() => setActiveTab('Home')}><Home size={20} /></button>
        <button aria-label="Appointments" title="Appointments" className={activeTab === 'Appointment' ? 'rail-active' : ''} onClick={() => setActiveTab('Appointment')}><CalendarDays size={20} /></button>
        <button aria-label="Messages" title="Messages" className={activeTab === 'Message' ? 'rail-active' : ''} onClick={() => setActiveTab('Message')}><MessageCircle size={20} /></button>
        <button aria-label="Settings" title="Settings" className={activeTab === 'Setting' ? 'rail-active' : ''} onClick={() => setActiveTab('Setting')}><Settings size={20} /></button>
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
          {activeTab === 'Home' ? <>
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
          </> : <section className="section-block destination-page">
            <div className="section-heading"><div><p className="eyebrow">KLINLINK PATIENT</p><h2>{activeTab === 'Appointment' ? 'My appointments' : activeTab === 'Message' ? 'Messages' : 'Settings'}</h2><p className="section-caption">{activeTab === 'Appointment' ? 'Your upcoming and previous visits will appear here.' : activeTab === 'Message' ? 'Conversations with your healthcare providers will appear here.' : 'Manage your patient account and preferences.'}</p></div></div>
            <div className="destination-card">
              <span className="destination-icon">{activeTab === 'Appointment' ? <ClipboardList size={25} /> : activeTab === 'Message' ? <Inbox size={25} /> : <Settings2 size={25} />}</span>
              <h3>{activeTab === 'Appointment' ? 'No appointments yet' : activeTab === 'Message' ? 'No messages yet' : 'Account settings'}</h3>
              <p>{activeTab === 'Appointment' ? 'Find a doctor and book your first appointment. Your bookings will be listed here.' : activeTab === 'Message' ? 'Once messaging is enabled, you can contact clinics and follow up on your care.' : 'Profile, language, notifications and privacy controls will be available here.'}</p>
              {activeTab !== 'Setting' && <button className="primary-button destination-action" onClick={() => setActiveTab('Home')}>Find a doctor <ChevronRight size={17} /></button>}
            </div>
          </section>}
        </div>

        <nav className="mobile-nav" aria-label="Main navigation">
          {([['Home', Home], ['Appointment', CalendarDays], ['Message', MessageCircle], ['Setting', Settings]] as const).map(([label, NavIcon]) =>
            <button key={label} className={activeTab === label ? 'active' : ''} aria-current={activeTab === label ? 'page' : undefined} onClick={() => setActiveTab(label)}><NavIcon size={20} /><span>{label}</span></button>
          )}
        </nav>
      </section>

      {selectedDoctor && <div className="modal-backdrop" onClick={() => setSelectedDoctor(null)}><section className="doctor-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Close" onClick={() => setSelectedDoctor(null)}><X size={20} /></button><img src={selectedDoctor.image} alt={selectedDoctor.name} /><span className="status online">Doctor profile</span><h2>{selectedDoctor.name}</h2><p>{selectedDoctor.specialty} · {selectedDoctor.city}</p><div className="modal-rating"><Star size={16} fill="currentColor" /> {selectedDoctor.rating} patient rating</div><div className="modal-detail"><MapPin size={17} />{selectedDoctor.clinic}</div><div className="modal-detail"><Clock3 size={17} />{selectedDoctor.hours}</div><button className="primary-button" onClick={() => alert('Appointment booking will be connected in the next development phase.')}>Book an appointment <ChevronRight size={17} /></button></section></div>}
    </main>
  );
}