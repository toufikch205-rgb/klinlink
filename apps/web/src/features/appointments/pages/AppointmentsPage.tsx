import { ClipboardList } from 'lucide-react';

export default function AppointmentsPage() {
  return <section className="section-block destination-page">
    <div className="section-heading"><div><p className="eyebrow">KLINLINK PATIENT</p><h2>My appointments</h2><p className="section-caption">Your upcoming and previous visits will appear here.</p></div></div>
    <div className="destination-card"><span className="destination-icon"><ClipboardList size={25} /></span><h3>No appointments yet</h3><p>Find a doctor and book your first appointment. Your bookings will be listed here.</p></div>
  </section>;
}
