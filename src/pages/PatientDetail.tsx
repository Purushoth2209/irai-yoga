import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MessageSquare, Phone, MoreVertical, Calendar, FileText, Activity } from 'lucide-react';
import { MOCK_PATIENTS } from '../mockData';
import { motion } from 'motion/react';

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = MOCK_PATIENTS.find(p => p.id === id) || MOCK_PATIENTS[0];

  return (
    <div className="pb-10 relative bg-white min-h-screen">
      {/* Header */}
      <div className="bg-brand-primary h-64 pt-12 px-5 relative">
        <div className="flex items-center justify-between text-white mb-6">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            <button className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
              <Phone size={20} />
            </button>
            <button className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center text-center space-y-2 translate-y-4">
           <img src={patient.avatar} alt={patient.name} className="w-24 h-24 rounded-[32px] border-4 border-white shadow-xl object-cover" />
           <div className="text-white">
              <h1 className="text-xl font-bold">{patient.name}</h1>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">{patient.condition}</p>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 px-5 space-y-8">
        {/* Contact Quick Actions */}
        <div className="flex gap-4">
          <button className="flex-1 bg-brand-primary text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20">
            <MessageSquare size={18} />
            <span>Message</span>
          </button>
          <button className="flex-1 bg-brand-secondary text-brand-primary py-3 rounded-2xl font-bold border border-brand-accent/20">
            View Plans
          </button>
        </div>

        {/* Vital Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-brand-secondary flex items-center gap-3 card-shadow">
             <div className="p-2 bg-brand-accent/10 text-brand-accent rounded-lg">
                <Calendar size={18} />
             </div>
             <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Next Appt.</p>
                <p className="text-xs font-bold text-slate-800">{patient.nextAppointment}</p>
             </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-brand-secondary flex items-center gap-3 card-shadow">
             <div className="p-2 bg-accent-coral/10 text-accent-coral rounded-lg">
                <Activity size={18} />
             </div>
             <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Status</p>
                <p className="text-xs font-bold text-slate-800">In Progress</p>
             </div>
          </div>
        </div>

        {/* Medical History Section */}
        <div className="space-y-4">
           <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Consultation Notes</h3>
              <button className="text-brand-primary text-xs font-bold">+ Add Note</button>
           </div>
           <div className="space-y-3">
              {[1, 2].map((_, i) => (
                <div key={i} className="p-4 bg-white rounded-2xl border border-brand-secondary card-shadow space-y-2">
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-brand-primary bg-natural px-2 py-0.5 rounded">Session #{10-i}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Oct 12, 2023</span>
                   </div>
                   <p className="text-xs text-slate-600 leading-relaxed font-medium">
                     Patient showing positive response to the new diet plan. Reduced sugar intake significantly. Vitals look stable.
                   </p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
