import { Patient, Appointment, Practitioner } from './types';

export const MOCK_PRACTITIONER: Practitioner = {
  id: 'p1',
  name: 'Dr. Sarah Mitchell',
  specialty: 'Nutritionist',
  rating: 4.9,
  totalClients: 124,
  experience: '8 Years',
  about: 'Specializing in holistic nutrition and metabolic health. Helping practitioners lead a balanced life through mindful eating.',
};

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'pt1',
    name: 'Emma Watson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    condition: 'PCOS Management',
    lastConsultation: '2024-05-10',
    nextAppointment: '2024-05-15',
    email: 'emma.w@example.com',
    phone: '+1 234 567 8901',
  },
  {
    id: 'pt2',
    name: 'James Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    condition: 'Weight Loss',
    lastConsultation: '2024-05-08',
    nextAppointment: '2024-05-20',
    email: 'james.r@example.com',
    phone: '+1 234 567 8902',
  },
  {
    id: 'pt3',
    name: 'Sophia Chen',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    condition: 'Ketogenic Diet',
    lastConsultation: '2024-05-01',
    nextAppointment: '2024-05-18',
    email: 'sophia.c@example.com',
    phone: '+1 234 567 8903',
  },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    patientId: 'pt1',
    patientName: 'Emma Watson',
    time: '09:00 AM',
    date: '2024-05-15',
    type: 'follow-up',
    status: 'confirmed',
  },
  {
    id: 'a2',
    patientId: 'pt2',
    patientName: 'James Rodriguez',
    time: '11:30 AM',
    date: '2024-05-15',
    type: 'initial',
    status: 'confirmed',
  },
  {
    id: 'a3',
    patientId: 'pt1',
    patientName: 'Emma Watson',
    time: '02:00 PM',
    date: '2024-05-14',
    type: 'consultation',
    status: 'completed',
  },
];
