import React from 'react';
import { Bell, Search, Plus, Calendar as CalendarIcon, ArrowRight, Star } from 'lucide-react';
import { MOCK_PRACTITIONER, MOCK_APPOINTMENTS } from '../mockData';
import { motion } from 'motion/react';

export default function Home() {
  const upcoming = MOCK_APPOINTMENTS.filter(a => a.status === 'confirmed').slice(0, 2);

  return (
    <div className="px-5 pt-12 pb-6 space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <p className="text-slate-500 text-sm font-medium">Welcome back,</p>
          <h1 className="text-2xl font-serif font-semibold text-brand-primary">
            {MOCK_PRACTITIONER.name}
          </h1>
        </div>
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-brand-secondary card-shadow">
            <Bell size={20} className="text-slate-600" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-accent-coral border-2 border-white rounded-full"></span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-brand-primary p-4 rounded-2xl text-white space-y-3 card-shadow overflow-hidden relative">
          <div className="bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center">
             <Star size={18} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider opacity-80">Avg Rating</p>
            <p className="text-lg font-bold">{MOCK_PRACTITIONER.rating}/5.0</p>
          </div>
          <div className="absolute -bottom-2 -right-4 w-16 h-16 bg-white/5 rounded-full blur-xl"></div>
        </div>
        <div className="bg-brand-accent p-4 rounded-2xl text-white space-y-3 card-shadow">
          <div className="bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center">
             <Plus size={18} />
          </div>
           <div>
            <p className="text-[10px] uppercase tracking-wider opacity-80">Total Clients</p>
            <p className="text-lg font-bold">{MOCK_PRACTITIONER.totalClients}</p>
          </div>
        </div>
      </div>

      {/* Appointment Banner */}
      <div className="bg-white rounded-3xl p-5 border border-brand-secondary space-y-4 card-shadow">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-lg text-brand-primary italic">Next Session</h3>
          <CalendarIcon size={18} className="text-brand-accent" />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-accent rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
             09<span className="text-[10px] font-normal mt-1">AM</span>
          </div>
          <div className="flex-1">
             <h4 className="font-bold text-slate-800">Emma Watson</h4>
             <p className="text-xs text-slate-500 font-medium">PCOS Management • Follow-up</p>
          </div>
          <button className="bg-brand-primary text-white p-2 rounded-lg">
             <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-xl text-slate-800">Today's Schedule</h3>
          <button className="text-brand-primary text-sm font-semibold">View All</button>
        </div>
        <div className="space-y-4">
          {MOCK_APPOINTMENTS.map((appointment, idx) => (
            <motion.div 
              key={appointment.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-4 rounded-2xl border border-slate-50 flex items-center gap-4 card-shadow"
            >
              <div className="w-2 h-12 bg-brand-accent rounded-full"></div>
              <div className="flex-1">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">{appointment.time}</p>
                <h4 className="font-bold text-slate-800">{appointment.patientName}</h4>
              </div>
              <div className="px-3 py-1 bg-brand-secondary rounded-full">
                <span className="text-[10px] font-bold text-brand-primary capitalize">{appointment.type}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Spacer for Mobile App floating feel */}
       <div className="h-4"></div>
    </div>
  );
}
