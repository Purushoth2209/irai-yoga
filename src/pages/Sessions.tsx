/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Users,
  Stethoscope,
  Apple,
  Brain,
  Activity,
  Clock,
  Calendar as CalIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_SESSIONS, Session } from '../constants';
import { cn } from '../lib/utils';

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const SESSION_DOT: Record<string, string> = {
  'yoga-group': 'bg-forest',
  'yoga-1on1': 'bg-forest',
  doctor: 'bg-[#4B7399]',
  nutrition: 'bg-terracotta',
  psych: 'bg-[#7B5EA7]',
  physio: 'bg-[#E07B5A]',
};

const SESSION_ICON: Record<string, React.FC<{ size?: number; className?: string }>> = {
  'yoga-group': Users,
  'yoga-1on1': Users,
  doctor: Stethoscope,
  nutrition: Apple,
  psych: Brain,
  physio: Activity,
};

const STATUS_STYLE: Record<string, string> = {
  upcoming: 'text-forest border-forest/20 bg-[#f0f4ee]',
  completed: 'text-gray-400 border-gray-200 bg-gray-50',
  missed: 'text-terracotta border-terracotta/20 bg-[#fdf3ec]',
  cancelled: 'text-terracotta border-terracotta/20 bg-[#fdf3ec]',
};

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

type CalCell = { day: number; currentMonth: boolean; dateStr: string };

export default function Sessions() {
  const navigate = useNavigate();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  // Build the 42-cell calendar grid
  const cells: CalCell[] = useMemo(() => {
    const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();
    const result: CalCell[] = [];

    // Trailing days from previous month
    for (let i = firstWeekday - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const pm = viewMonth === 0 ? 11 : viewMonth - 1;
      const py = viewMonth === 0 ? viewYear - 1 : viewYear;
      result.push({ day: d, currentMonth: false, dateStr: toDateStr(py, pm, d) });
    }
    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      result.push({ day: d, currentMonth: true, dateStr: toDateStr(viewYear, viewMonth, d) });
    }
    // Leading days of next month
    let nd = 1;
    while (result.length < 42) {
      const nm = viewMonth === 11 ? 0 : viewMonth + 1;
      const ny = viewMonth === 11 ? viewYear + 1 : viewYear;
      result.push({ day: nd, currentMonth: false, dateStr: toDateStr(ny, nm, nd) });
      nd++;
    }
    return result;
  }, [viewYear, viewMonth]);

  // Index sessions by date
  const byDate = useMemo(() => {
    const map: Record<string, Session[]> = {};
    for (const s of MOCK_SESSIONS) {
      if (!map[s.date]) map[s.date] = [];
      map[s.date].push(s);
    }
    return map;
  }, []);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelectedDate(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelectedDate(null);
  };

  const upcomingSessions = MOCK_SESSIONS.filter(s => s.status === 'upcoming');
  const pastSessions = MOCK_SESSIONS.filter(s => s.status !== 'upcoming');

  const listedSessions = selectedDate ? (byDate[selectedDate] ?? []) : upcomingSessions;

  const listLabel = selectedDate
    ? new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric',
      })
    : 'Upcoming Practice';

  return (
    <div className="min-h-full bg-brand-50 pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-10 pb-6 border-b border-brand-border">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-forest"
        >
          <ArrowLeft size={16} />
        </button>
        <p className="small-caps text-gray-400 mb-1">Calendar</p>
        <h2 className="serif text-3xl leading-none">Your Sessions</h2>
      </div>

      {/* Calendar card */}
      <div className="bg-white border-b border-brand-border px-5 pb-5">
        {/* Month navigation */}
        <div className="flex items-center justify-between py-5 px-1">
          <button
            onClick={prevMonth}
            className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-forest transition-colors hover:bg-[#f5f7f2]"
          >
            <ChevronLeft size={16} />
          </button>
          <h3 className="serif text-lg">{MONTH_NAMES[viewMonth]} {viewYear}</h3>
          <button
            onClick={nextMonth}
            className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-forest transition-colors hover:bg-[#f5f7f2]"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Weekday labels */}
        <div className="grid grid-cols-7 mb-1">
          {DAY_LABELS.map((d, i) => (
            <div key={i} className="text-center small-caps text-[8px] text-gray-300 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-y-0.5">
          {cells.map((cell, i) => {
            const sessions = cell.currentMonth ? (byDate[cell.dateStr] ?? []) : [];
            const isToday = cell.dateStr === todayStr;
            const isSelected = cell.dateStr === selectedDate;

            return (
              <button
                key={i}
                disabled={!cell.currentMonth}
                onClick={() => setSelectedDate(isSelected ? null : cell.dateStr)}
                className={cn(
                  'flex flex-col items-center py-1.5 rounded-xl transition-all',
                  !cell.currentMonth && 'opacity-0 pointer-events-none',
                  isSelected && 'bg-slate',
                  !isSelected && isToday && 'bg-[#f0f4ee]',
                )}
              >
                <span
                  className={cn(
                    'text-[12px] font-bold leading-none mb-1',
                    isSelected ? 'text-white' : isToday ? 'text-forest' : 'text-slate',
                  )}
                >
                  {cell.day}
                </span>
                {/* Session dots */}
                <div className="flex gap-[2px] h-[6px] items-center">
                  {sessions.slice(0, 3).map((s, si) => (
                    <div
                      key={si}
                      className={cn(
                        'w-[5px] h-[5px] rounded-full',
                        isSelected ? 'bg-white/70' : (SESSION_DOT[s.type] ?? 'bg-gray-300'),
                      )}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dot legend */}
        <div className="flex gap-4 flex-wrap mt-4 pt-4 border-t border-brand-border px-1">
          {[
            { color: 'bg-forest', label: 'Yoga' },
            { color: 'bg-[#4B7399]', label: 'Doctor' },
            { color: 'bg-terracotta', label: 'Nutrition' },
            { color: 'bg-[#7B5EA7]', label: 'Psych' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={cn('w-2 h-2 rounded-full', color)} />
              <span className="small-caps text-[7px] text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Session list */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between px-1 mb-2">
          <h3 className="small-caps">{listLabel}</h3>
          {selectedDate && (
            <button
              onClick={() => setSelectedDate(null)}
              className="small-caps text-[8px] text-forest"
            >
              Clear
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {listedSessions.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <CalIcon size={28} className="mx-auto mb-3 text-gray-200" />
              <p className="small-caps text-[9px] text-gray-300">No sessions on this day</p>
            </motion.div>
          ) : (
            <motion.div
              key={selectedDate ?? 'upcoming'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {listedSessions.map(session => (
                <SessionCard key={session.id} session={session} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* History — only when no date is selected */}
        {!selectedDate && pastSessions.length > 0 && (
          <section className="pt-4">
            <h3 className="small-caps text-gray-300 px-1 mb-4">History</h3>
            <div className="space-y-3 opacity-60">
              {pastSessions.map(s => (
                <SessionCard key={s.id} session={s} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function SessionCard({ session }: { session: Session; key?: string }) {
  const Icon = SESSION_ICON[session.type] ?? Users;
  const dot = SESSION_DOT[session.type] ?? 'bg-gray-300';

  return (
    <div className="bg-white p-4 rounded-2xl border border-brand-border shadow-sm">
      <div className="flex gap-3 items-center mb-3">
        <div className="w-10 h-10 rounded-xl bg-[#f5f7f2] border border-brand-border flex items-center justify-center shrink-0 text-forest">
          <Icon size={17} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-slate text-[12px] uppercase tracking-tight leading-none mb-1 truncate">
            {session.title}
          </h4>
          <p className="small-caps text-[8px] text-gray-400 truncate">
            {session.provider ?? 'Group Session'}
          </p>
        </div>
        <div className={cn('w-2 h-2 rounded-full shrink-0', dot)} />
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-brand-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <CalIcon size={10} className="text-gray-300" />
            <span className="small-caps text-[7px]">{session.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={10} className="text-gray-300" />
            <span className="small-caps text-[7px] text-forest">{session.time}</span>
          </div>
        </div>
        <span
          className={cn(
            'small-caps text-[7px] px-2 py-0.5 rounded-full border',
            STATUS_STYLE[session.status] ?? STATUS_STYLE.upcoming,
          )}
        >
          {session.status}
        </span>
      </div>
    </div>
  );
}
