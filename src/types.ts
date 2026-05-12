export interface Patient {
  id: string;
  name: string;
  avatar: string;
  condition: string;
  lastConsultation: string;
  nextAppointment: string;
  email: string;
  phone: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  time: string;
  date: string;
  type: 'initial' | 'follow-up' | 'consultation';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface Practitioner {
  id: string;
  name: string;
  specialty: 'Nutritionist' | 'Psychologist' | 'Doctor' | 'Physiotherapist';
  rating: number;
  totalClients: number;
  experience: string;
  about: string;
}
