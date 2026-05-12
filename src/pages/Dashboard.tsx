/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import {
  Calendar,
  Activity,
  Flame,
  Trophy,
  ChevronRight,
  PlayCircle,
  PlusCircle,
  Users,
  Stethoscope,
  Apple,
  Brain,
  History,
  Clock,
  Wind,
  Leaf,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User, MOCK_SESSIONS, MOCK_AI_DATA, PLANS, GROUP_SESSIONS } from '../constants';
import { cn } from '../lib/utils';

export default function Dashboard({ user }: { user: User }) {
  const navigate = useNavigate();
  const plan = PLANS.find(p => p.id === user.planId);

  return (
    <div className="pb-24">
      {/* Header section */}
      <div className="bg-white p-8 pt-12 rounded-b-[2rem] border-b border-brand-border relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="small-caps mb-1">Morning, {user.name.split(' ')[0]}</p>
              <h1 className="serif text-3xl leading-none">Ready for your practice?</h1>
            </div>
            <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center border border-forest/10 p-2 shadow-sm">
              <img src="/irai_logo.png" className="w-full h-full object-contain" alt="Logo" />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 bg-white p-4 rounded-2xl border border-brand-border">
              <div className="flex items-center gap-2 mb-1">
                <Flame size={14} className="text-terracotta" />
                <span className="small-caps text-[8px] text-gray-400">Streak</span>
              </div>
              <p className="text-xl font-bold text-forest">{MOCK_AI_DATA.streak} Days</p>
            </div>
            <div className="flex-1 bg-white p-4 rounded-2xl border border-brand-border">
              <div className="flex items-center gap-2 mb-1">
                <Trophy size={14} className="text-terracotta" />
                <span className="small-caps text-[8px] text-gray-400">Score</span>
              </div>
              <p className="text-xl font-bold text-forest">{MOCK_AI_DATA.wellnessScore}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-10 mt-2">
        {/* AI Insight banner */}
        <div className="bg-terracotta text-white p-4 rounded-2xl text-[12px] leading-snug flex gap-3 shadow-lg shadow-terracotta/20 animate-in fade-in slide-in-from-top-4">
           <Brain size={20} className="shrink-0" />
           <p><strong>AI Insight:</strong> Your consistency is improving. A 20-min session today helps maintain your streak.</p>
        </div>

        {/* Action Grid */}
        <section className="grid grid-cols-4 gap-4 px-2">
          {[
            { icon: Users, label: 'Yoga', path: '/booking?type=yoga', color: 'bg-[#f5f7f2] text-forest' },
            { icon: Stethoscope, label: 'Doctor', path: '/booking?type=doctor', color: 'bg-[#f5f7f2] text-forest' },
            { icon: Apple, label: 'Nutrition', path: '/booking?type=nutrition', color: 'bg-[#f5f7f2] text-forest' },
            { icon: Brain, label: 'Psych', path: '/booking?type=psych', color: 'bg-[#f5f7f2] text-forest' },
          ].map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-105 border border-brand-border", item.color)}>
                <item.icon size={20} />
              </div>
              <span className="small-caps text-[8px] transition-colors group-hover:text-forest">{item.label}</span>
            </button>
          ))}
        </section>

        {/* Group Sessions Strip */}
        <section>
          <div className="flex justify-between items-end mb-4 px-2">
            <h2 className="serif text-xl">Group Sessions</h2>
            <button onClick={() => navigate('/group-sessions')} className="small-caps text-forest hover:underline">See All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar -mx-6 px-6">
            {GROUP_SESSIONS.slice(0, 4).map((gs) => {
              const Icon = gs.category === 'breathwork' ? Wind : gs.category === 'meditation' ? Leaf : gs.category === 'mobility' ? Activity : Users;
              return (
                <button
                  key={gs.id}
                  onClick={() => navigate('/group-sessions')}
                  className="min-w-[160px] bg-white p-4 rounded-2xl border border-brand-border shadow-sm flex flex-col gap-3 active:scale-[0.97] transition-all text-left"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="w-8 h-8 bg-[#f5f7f2] border border-brand-border rounded-lg flex items-center justify-center text-forest">
                      <Icon size={15} />
                    </div>
                    <span className="text-[7px] font-bold uppercase tracking-widest text-gray-400 bg-[#f5f7f2] px-2 py-0.5 rounded-full border border-brand-border">
                      {gs.level}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate text-[11px] uppercase tracking-tight leading-snug mb-0.5">{gs.title}</h4>
                    <p className="small-caps text-[7px] text-gray-400">{gs.days.slice(0, 3).join(' · ')}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-auto">
                    <Clock size={10} className="text-gray-300" />
                    <span className="small-caps text-[7px] text-forest">{gs.time}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Sessions Section */}
        <section>
          <div className="flex justify-between items-end mb-6 px-2">
            <h2 className="serif text-xl">Upcoming</h2>
            <button onClick={() => navigate('/sessions')} className="small-caps text-forest hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {MOCK_SESSIONS.filter(s => s.status === 'upcoming').map((session) => (
              <div key={session.id} className="bg-white p-4 rounded-2xl border border-brand-border flex items-center gap-4 transition-all hover:border-forest/30">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                  "bg-[#f9fbf8] border border-brand-border text-forest"
                )}>
                  {session.type.includes('yoga') ? <Users size={18} /> : 
                   session.type === 'doctor' ? <Stethoscope size={18} /> : <Apple size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate text-sm truncate uppercase tracking-tight">{session.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5 font-medium">{session.provider || 'Group Session'}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-forest">{session.time}</p>
                  <p className="small-caps text-[8px] mt-0.5">Today</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Recommendation Card */}
        <section>
          <div className="bg-slate rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-slate/20">
             <div className="relative z-10">
               <div className="flex items-center gap-2 mb-4">
                 <div className="bg-forest/20 p-2 rounded-lg">
                   <Sparkles size={16} className="text-forest" />
                 </div>
                 <span className="small-caps text-[9px] text-white/60">AI Recommendation</span>
               </div>
               <h3 className="serif text-2xl mb-2">{MOCK_AI_DATA.recommendations[0].title}</h3>
               <p className="text-cream/70 text-xs leading-relaxed font-light mb-6">
                 {MOCK_AI_DATA.recommendations[0].description}
               </p>
               <button className="bg-forest w-full py-4 rounded-xl font-bold text-sm shadow-lg shadow-forest/20 active:scale-95 transition-transform">
                 Learn More
               </button>
             </div>
             <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-forest/10 rounded-full blur-[40px]" />
          </div>
        </section>

        {/* Quick Insights List */}
        <section>
           <h2 className="serif text-xl mb-4 px-2">Daily Observances</h2>
           <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
             {MOCK_AI_DATA.insights.map((insight, idx) => (
                <div key={idx} className="min-w-[280px] bg-white p-5 rounded-2xl border border-brand-border shadow-sm flex gap-4 items-start">
                  <div className="bg-[#f5f7f2] p-3 rounded-xl text-forest shrink-0">
                    <History size={18} />
                  </div>
                  <p className="text-[12px] text-gray-500 leading-relaxed italic font-medium">"{insight}"</p>
                </div>
             ))}
           </div>
        </section>
      </div>
    </div>
  );
}

function Sparkles({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/>
      <path d="M19 17v4"/>
      <path d="M3 5h4"/>
      <path d="M17 19h4"/>
    </svg>
  );
}
