import { Inbox } from 'lucide-react';

export default function MessagesPage() {
  return <section className="section-block destination-page">
    <div className="section-heading"><div><p className="eyebrow">KLINLINK PATIENT</p><h2>Messages</h2><p className="section-caption">Conversations with your healthcare providers will appear here.</p></div></div>
    <div className="destination-card"><span className="destination-icon"><Inbox size={25} /></span><h3>No messages yet</h3><p>Once messaging is enabled, you can contact clinics and follow up on your care.</p></div>
  </section>;
}
