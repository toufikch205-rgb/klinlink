import type { Doctor } from '../doctors/types';

export type Appointment = {
  id: string;
  doctorId: number;
  doctorName: string;
  specialty: string;
  clinic: string;
  patientName: string;
  patientPhone: string;
  date: string;
  time: string;
  status: 'requested';
  createdAt: string;
};
