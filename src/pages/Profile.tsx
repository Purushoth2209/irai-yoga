import React from 'react';
import { Settings, LogOut, Shield, CreditCard, HelpCircle, Bell, ChevronRight, Edit3 } from 'lucide-react';
import { MOCK_PRACTITIONER } from '../mockData';

export default function Profile() {
  const settingsOptions = [
    { icon: Bell, label: 'Notifications', color: 'bg-brand-accent/10 text-brand-accent' },
    { icon: Shield, label: 'Security & Privacy', color: 'bg-brand-primary/10 text-brand-primary' },
    { icon: CreditCard, label: 'Payout Settings', color: 'bg-green-50 text-green-600' },
    { icon: HelpCircle, label: 'Help Center', color: 'bg-accent-coral/10 text-accent-coral' },
  ];

  return (
    <div className="pt-12 pb-10 space-y-8">
      {/* Profile Header */}
      <div className="px-5 text-center space-y-4">
        <div className="relative inline-block">
          <div className="w-28 h-28 rounded-[40px] bg-brand-accent overflow-hidden mx-auto shadow-2xl shadow-brand-primary/10">
            <img 
              src="https://images.unsplash.com/photo-1559839734-2b71f1536783?w=300&h=300&fit=crop" 
              alt={MOCK_PRACTITIONER.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-1 right-1 bg-brand-primary text-white p-2 rounded-xl border-4 border-natural">
            <Edit3 size={16} />
          </button>
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-serif font-bold text-slate-800">{MOCK_PRACTITIONER.name}</h2>
          <p className="text-brand-primary font-bold text-sm uppercase tracking-widest">{MOCK_PRACTITIONER.specialty}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5">
        <div className="bg-white flex justify-around p-6 rounded-3xl card-shadow border border-brand-secondary">
          <div className="text-center">
            <p className="text-lg font-bold text-slate-800">12</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Years Exp.</p>
          </div>
          <div className="border-r border-slate-100"></div>
          <div className="text-center">
            <p className="text-lg font-bold text-slate-800">1.2k</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Completed</p>
          </div>
          <div className="border-r border-slate-100"></div>
          <div className="text-center">
            <p className="text-lg font-bold text-slate-800">4.9</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Rating</p>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="px-5 space-y-4">
        <h3 className="font-bold text-slate-700 px-1">Settings</h3>
        <div className="bg-white rounded-3xl card-shadow border border-slate-50 divide-y divide-slate-50 overflow-hidden">
          {settingsOptions.map((item) => (
            <button key={item.label} className="w-full p-4 flex items-center justify-between group active:bg-slate-50">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${item.color}`}>
                  <item.icon size={20} />
                </div>
                <span className="font-semibold text-slate-700">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
            </button>
          ))}
        </div>

        <button className="w-full p-4 flex items-center gap-4 text-red-500 font-bold bg-red-50 rounded-2xl active:scale-95 transition-transform">
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>

      <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
        IrAi Wellness v1.0.4
      </p>
    </div>
  );
}
