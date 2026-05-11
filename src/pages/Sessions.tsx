/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  Users, 
  Stethoscope, 
  Apple, 
  ChevronLeft, 
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_SESSIONS } from '../constants';
import { cn } from '../lib/utils';

export default function Sessions() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-brand-50 pb-24">
      <div className="bg-white px-6 py-10 border-b border-brand-border">
        <button onClick={() => navigate('/dashboard')} className="mb-4 w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-forest">
           <ArrowLeft size={16} />
        </button>
        <p className="small-caps text-gray-400 mb-1">Calendar</p>
        <h2 className="serif text-3xl leading-none">Your Sessions</h2>
      </div>

      <div className="p-6 space-y-10">
        {/* Upcoming Section */}
        <section>
          <div className="mb-4 px-2">
            <h3 className="small-caps">Upcoming Practice</h3>
          </div>
          <div className="space-y-4">
            {MOCK_SESSIONS.filter(s => s.status === 'upcoming').map((session) => (
              <SessionItem key={session.id} session={session} />
            ))}
          </div>
        </section>

        {/* History Section */}
        <section>
          <div className="mb-4 px-2">
            <h3 className="small-caps text-gray-300">History</h3>
          </div>
          <div className="space-y-4 opacity-60">
             {MOCK_SESSIONS.filter(s => s.status !== 'upcoming').map((session) => (
              <SessionItem key={session.id} session={session} isPast />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function SessionItem({ session, isPast }: any) {
  return (
    <motion.div 
      className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm flex flex-col gap-4 transition-all hover:border-forest/20"
    >
      <div className="flex gap-4 items-center">
        <div className="w-10 h-10 rounded-xl bg-[#f5f7f2] border border-brand-border flex items-center justify-center shrink-0 text-forest">
          {session.type.includes('yoga') ? <Users size={18} /> : 
           session.type === 'doctor' ? <Stethoscope size={18} /> : <Apple size={18} />}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-slate text-sm uppercase tracking-tight leading-none mb-1">{session.title}</h4>
          <p className="small-caps text-[8px] text-gray-400">{session.provider || 'Group Session'}</p>
        </div>
        {!isPast && (
          <button className="text-forest border border-forest/20 w-8 h-8 rounded-lg flex items-center justify-center">
             <ExternalLink size={14} />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-brand-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Calendar size={12} className="text-gray-300" />
            <span className="small-caps text-[7px]">{session.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} className="text-gray-300" />
            <span className="small-caps text-[7px] text-forest">{session.time}</span>
          </div>
        </div>
        <div className="small-caps text-[7px]">
          {session.status}
        </div>
      </div>
    </motion.div>
  );
}
