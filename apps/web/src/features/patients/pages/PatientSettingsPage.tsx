import { Settings2 } from 'lucide-react';

export default function PatientSettingsPage() {
  return <section className="section-block destination-page">
    <div className="section-heading"><div><p className="eyebrow">KLINLINK PATIENT</p><h2>Settings</h2><p className="section-caption">Manage your patient account and preferences.</p></div></div>
    <div className="destination-card"><span className="destination-icon"><Settings2 size={25} /></span><h3>Account settings</h3><p>Profile, language, notifications and privacy controls will be available here.</p></div>
  </section>;
}
