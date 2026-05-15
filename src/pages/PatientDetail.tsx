import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft, MessageSquare, Phone, Calendar, Activity,
  FileText, Plus,
} from 'lucide-react';
import { MOCK_PATIENTS } from '../mockData';
import { cn } from '../lib/utils';

export default function PatientDetail() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const patient   = MOCK_PATIENTS.find(p => p.id === id) ?? MOCK_PATIENTS[0];

  const notes = [
    { session: 10, date: 'Oct 12, 2024', text: 'Patient showing positive response to the new diet plan. Reduced sugar intake significantly. Vitals look stable.' },
    { session:  9, date: 'Sep 28, 2024', text: 'Discussed new meal prep strategy. Patient is more motivated this week. Blood pressure reading normal.' },
  ];

  return (
    <div className="min-h-full bg-brand-50 pb-24">

      {/* ── Dark hero header ── */}
      <div className="bg-gradient-to-br from-[#263d23] to-[#192b16] relative overflow-hidden" style={{ minHeight: 240 }}>
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/[0.03] rounded-full" />
        <div className="absolute bottom-0 -left-12 w-40 h-40 bg-white/[0.03] rounded-full blur-2xl" />

        {/* Top nav */}
        <div className="relative z-10 flex items-center justify-between px-5 pt-12 pb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 bg-white/10 border border-white/15 rounded-full flex items-center justify-center active:scale-95 transition-all"
          >
            <ArrowLeft size={16} className="text-white" />
          </button>
          <button className="w-9 h-9 bg-white/10 border border-white/15 rounded-full flex items-center justify-center active:scale-95 transition-all">
            <Phone size={16} className="text-white" />
          </button>
        </div>

        {/* Patient info */}
        <div className="relative z-10 flex flex-col items-center pb-8 px-5">
          <img
            src={patient.avatar}
            alt={patient.name}
            className="w-20 h-20 rounded-[24px] border-4 border-white/20 shadow-xl object-cover mb-3"
          />
          <h1 className="serif text-[24px] text-white leading-none mb-1">{patient.name}</h1>
          <p className="small-caps text-[8px] text-white/40">{patient.condition}</p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-5 -mt-4 space-y-5">

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3"
        >
          <button className="flex-1 bg-forest text-white py-3 rounded-2xl font-bold text-[12px] flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all">
            <MessageSquare size={15} /> Message
          </button>
          <button className="flex-1 bg-white border border-brand-border text-slate py-3 rounded-2xl font-bold text-[12px] flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all">
            <FileText size={15} /> View Plans
          </button>
        </motion.div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl border border-brand-border shadow-sm p-4 flex items-center gap-3"
          >
            <div className="w-9 h-9 bg-[#f0f4ee] rounded-xl flex items-center justify-center shrink-0">
              <Calendar size={16} className="text-forest" />
            </div>
            <div>
              <p className="small-caps text-[7px] text-gray-400">Next Appt.</p>
              <p className="text-[11px] font-bold text-slate">
                {new Date(patient.nextAppointment + 'T12:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-brand-border shadow-sm p-4 flex items-center gap-3"
          >
            <div className="w-9 h-9 bg-[#f0f4ee] rounded-xl flex items-center justify-center shrink-0">
              <Activity size={16} className="text-forest" />
            </div>
            <div>
              <p className="small-caps text-[7px] text-gray-400">Status</p>
              <p className="text-[11px] font-bold text-forest">Active</p>
            </div>
          </motion.div>
        </div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl border border-brand-border shadow-sm p-4 space-y-3"
        >
          <p className="small-caps text-gray-400">Contact Info</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="small-caps text-[7px] text-gray-400">Email</span>
              <span className="text-[11px] font-medium text-slate">{patient.email}</span>
            </div>
            <div className="h-px bg-brand-border opacity-50" />
            <div className="flex justify-between">
              <span className="small-caps text-[7px] text-gray-400">Phone</span>
              <span className="text-[11px] font-medium text-slate">{patient.phone}</span>
            </div>
          </div>
        </motion.div>

        {/* Consultation notes */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <p className="small-caps text-gray-400">Consultation Notes</p>
            <button className="flex items-center gap-1 small-caps text-[8px] text-forest">
              <Plus size={11} /> Add Note
            </button>
          </div>

          {notes.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="bg-white rounded-2xl border border-brand-border shadow-sm p-4 space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="small-caps text-[7px] text-forest bg-[#f0f4ee] px-2 py-0.5 rounded-full border border-forest/20">
                  Session #{note.session}
                </span>
                <span className="small-caps text-[7px] text-gray-400">{note.date}</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">{note.text}</p>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  );
}
