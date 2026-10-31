import type { Doctor } from './types';

export const doctors: Doctor[] = [
  { id: 1, name: 'Dr. Amine Bensalem', specialty: 'Cardiologist', rating: '4.9', clinic: 'El Amal Medical Center', hours: '09:00 AM – 05:00 PM', city: 'Oran', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=240&h=240&fit=crop&crop=faces', category: 'Cardiology', online: true },
  { id: 2, name: 'Dr. Sarah Haddad', specialty: 'Dentist', rating: '4.8', clinic: 'Bright Smile Clinic', hours: '10:00 AM – 06:00 PM', city: 'Algiers', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=240&h=240&fit=crop&crop=faces', category: 'Dental', online: true },
  { id: 3, name: 'Dr. Yacine Merabet', specialty: 'Neurologist', rating: '4.9', clinic: 'Wellness Health Clinic', hours: '08:30 AM – 04:30 PM', city: 'Oran', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=240&h=240&fit=crop&crop=faces', category: 'Neurology', online: false },
  { id: 4, name: 'Dr. Lina Cherif', specialty: 'General Practitioner', rating: '4.7', clinic: 'Family Care Center', hours: '09:00 AM – 03:00 PM', city: 'Constantine', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=240&h=240&fit=crop&crop=faces', category: 'Check-up', online: true },
];
