import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Clock, User } from 'lucide-react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { cn } from '../lib/utils';

const SLOTS = [
  { time: '09:00 AM', status: 'booked',    name: 'Emma Watson'      },
  { time: '10:00 AM', status: 'available'                            },
  { time: '11:00 AM', status: 'booked',    name: 'James Rodriguez'  },
  { time: '12:00 PM', status: 'break'                                },
  { time: '01:00 PM', status: 'available'                            },
  { time: '02:00 PM', status: 'available'                            },
  { time: '03:00 PM', status: 'booked',    name: 'Sophia Chen'      },
  { time: '04:00 PM', status: 'available'                            },
];

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const today    = startOfToday();
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(today, i));

  const booked    = SLOTS.filter(s => s.status === 'booked').length;
  const available = SLOTS.filter(s => s.status === 'available').length;

  return (
    <div className="min-h-full bg-brand-50 pb-24">

      {/* ── Header ── */}
      <div className="bg-white px-6 pt-10 pb-6 border-b border-brand-border">
        <p className="small-caps text-gray-400 mb-1">Practitioner</p>
        <div className="flex items-center justify-between">
          <h2 className="serif text-3xl leading-none">Schedule</h2>
          <button className="w-9 h-9 bg-slate rounded-xl flex items-center justify-center text-white active:scale-95 transition-all shadow-sm">
            <Plus size={18} />
          </button>
        </div>
        <p className="small-caps text-[7px] text-gray-400 mt-2">
          {booked} booked · {available} available
        </p>
      </div>

      <div className="p-6 space-y-5">

        {/* ── Week strip ── */}
        <div className="bg-white rounded-2xl border border-brand-border shadow-sm p-3 flex justify-between gap-1">
          {weekDays.map((date) => {
            const isSelected = isSameDay(date, selectedDate);
            const isToday    = isSameDay(date, today);
            return (
              <button
                key={date.toString()}
                onClick={() => setSelectedDate(date)}
                className={cn(
                  'flex flex-col items-center gap-1.5 py-2 px-1.5 rounded-xl transition-all flex-1',
                  isSelected ? 'bg-slate text-white' : 'text-gray-400',
                )}
              >
                <span className={cn('text-[8px] font-bold uppercase', isSelected ? 'text-white/60' : 'text-gray-300')}>
                  {format(date, 'eee')}
                </span>
                <span className={cn('text-[13px] font-bold leading-none', isSelected ? 'text-white' : isToday ? 'text-forest' : 'text-slate')}>
                  {format(date, 'd')}
                </span>
                {isToday && !isSelected && (
                  <span className="w-1 h-1 rounded-full bg-forest" />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Date label ── */}
        <div className="flex items-center justify-between px-1">
          <p className="small-caps text-gray-400">Time Slots</p>
          <p className="small-caps text-[8px] text-gray-400">{format(selectedDate, 'MMMM d, yyyy')}</p>
        </div>

        {/* ── Slots ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDate.toString()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2.5"
          >
            {SLOTS.map((slot, idx) => (
              <motion.div
                key={slot.time}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className={cn(
                  'bg-white rounded-2xl border p-4 flex items-center gap-4 shadow-sm',
                  slot.status === 'booked'
                    ? 'border-forest/20'
                    : slot.status === 'break'
                    ? 'border-brand-border opacity-50'
                    : 'border-dashed border-brand-border',
                )}
              >
                {/* Time */}
                <div className="flex items-center gap-1.5 w-20 shrink-0">
                  <Clock size={10} className="text-gray-300" />
                  <span className="text-[10px] font-bold text-gray-400">{slot.time}</span>
                </div>

                {/* Status indicator */}
                {slot.status === 'booked' && (
                  <div className="w-1.5 h-8 bg-forest rounded-full shrink-0" />
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {slot.status === 'booked' ? (
                    <div className="flex items-center gap-2">
                      <User size={11} className="text-forest shrink-0" />
                      <span className="text-[12px] font-bold text-slate truncate">{slot.name}</span>
                    </div>
                  ) : slot.status === 'break' ? (
                    <span className="text-[11px] italic text-gray-400">Coffee Break</span>
                  ) : (
                    <span className="small-caps text-[8px] text-forest/50">Available</span>
                  )}
                </div>

                {/* Action */}
                {slot.status === 'available' && (
                  <button className="small-caps text-[8px] text-forest bg-[#f0f4ee] border border-forest/20 px-3 py-1.5 rounded-full shrink-0 active:scale-95 transition-all">
                    Book
                  </button>
                )}
                {slot.status === 'booked' && (
                  <span className="small-caps text-[7px] text-forest border border-forest/20 bg-[#f0f4ee] px-2.5 py-1 rounded-full shrink-0">
                    Confirmed
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
