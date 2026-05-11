/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  color: string;
}

export const PLANS: Plan[] = [
  {
    id: 'foundation',
    name: 'Foundation',
    price: 1999,
    color: '#8B9A46', // Olive green
    features: [
      'Group Yoga Sessions: Daily (Mon–Fri)',
      'AI Personalization: Limited',
      'Condition Programs: Basic',
      'No access to 1-on-1 or specialist services'
    ]
  },
  {
    id: 'balanced',
    name: 'Balanced',
    price: 4999,
    color: '#4B7399', // Professional blue
    features: [
      '1-on-1 Yoga Therapy: 4 sessions/month',
      'AI Personalization: Personalized recommendations + tracking',
      'Condition Programs: Advanced structured programs',
      'Group Yoga: Available',
      'Doctor Consultation: 2 sessions',
      'Nutrition Support: 2 sessions'
    ]
  },
  {
    id: 'transform',
    name: 'Transform',
    price: 11999,
    color: '#2A2A2A', // Premium dark
    features: [
      '1-on-1 Yoga Therapy: 12 sessions/month',
      'AI Personalization: Advanced predictive system',
      'Condition Programs: Clinical recovery programs',
      'Doctor Consultation: 2 sessions/month',
      'Nutrition Support: 4 sessions/month',
      'Physiotherapy: 4 sessions/month',
      'Psychologist Support: 2 sessions/month'
    ]
  }
];

export interface User {
  id: string;
  email: string;
  name: string;
  planId?: string;
  onboarded: boolean;
}

export interface Session {
  id: string;
  type: 'yoga-group' | 'yoga-1on1' | 'doctor' | 'nutrition' | 'physio' | 'psych';
  title: string;
  provider?: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'missed' | 'cancelled';
}

export const MOCK_SESSIONS: Session[] = [
  {
    id: '1',
    type: 'yoga-1on1',
    title: 'Therapeutic Yoga',
    provider: 'Dr. Sarah Smith',
    date: '2024-05-12',
    time: '08:00 AM',
    status: 'upcoming'
  },
  {
    id: '2',
    type: 'nutrition',
    title: 'Dietary Review',
    provider: ' nutritionist Emma Brown',
    date: '2024-05-13',
    time: '02:00 PM',
    status: 'upcoming'
  },
  {
    id: '3',
    type: 'yoga-group',
    title: 'Community Flow',
    date: '2024-05-10',
    time: '07:30 AM',
    status: 'completed'
  }
];

export const MOCK_AI_DATA = {
  wellnessScore: 78,
  streak: 5,
  radarData: [
    { subject: 'Pain Reduction', A: 85, fullMark: 100 },
    { subject: 'Consistency', A: 90, fullMark: 100 },
    { subject: 'Flexibility', A: 65, fullMark: 100 },
    { subject: 'Strength', A: 70, fullMark: 100 },
    { subject: 'Breathing', A: 80, fullMark: 100 },
    { subject: 'Mental Focus', A: 75, fullMark: 100 },
  ],
  insights: [
    "Your flexibility in Forward Folds has improved by 15% this month.",
    "Morning sessions (7-9 AM) correlate with your highest energy levels.",
    "Increased breathing consistency noted during balance poses."
  ],
  recommendations: [
    { title: "Magnesium-Rich Diet", description: "Incorporate more spinach and pumpkin seeds to aid muscle recovery.", type: "nutrition" },
    { title: "Deep Breathing Ex", description: "Try 5 mins of Nadi Shodhana before bed to improve sleep quality.", type: "lifestyle" }
  ]
};
