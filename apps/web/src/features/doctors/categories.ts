import { Activity, Brain, Heart, Smile } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type DoctorCategory = {
  name: string;
  description: string;
  icon: LucideIcon;
};

export const doctorCategories: DoctorCategory[] = [
  { name: 'Check-up', description: 'General health', icon: Activity },
  { name: 'Dental', description: 'Teeth & gums', icon: Smile },
  { name: 'Cardiology', description: 'Heart health', icon: Heart },
  { name: 'Neurology', description: 'Brain & nerves', icon: Brain },
];
