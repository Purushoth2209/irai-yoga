import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { motion } from 'motion/react';

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const today = startOfToday();
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(today, i));

  const slots = [
    { time: '09:00 AM', status: 'booked', name: 'Emma Watson' },
    { time: '10:00 AM', status: 'available' },
    { time: '11:00 AM', status: 'booked', name: 'James Rodriguez' },
    { time: '12:00 PM', status: 'break' },
    { time: '01:00 PM', status: 'available' },
    { time: '02:00 PM', status: 'available' },
  ];

  return (
    <div className="px-5 pt-12 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-bold text-slate-800">Schedule</h1>
        <button className="bg-brand-primary text-white p-2.5 rounded-xl shadow-lg shadow-brand-primary/20">
          <Plus size={20} />
        </button>
      </div>

      {/* Date Picker */}
      <div className="flex justify-between items-center bg-white p-4 rounded-3xl card-shadow border border-slate-50">
        {weekDays.map((date) => {
          const isSelected = isSameDay(date, selectedDate);
          return (
            <button
              key={date.toString()}
              onClick={() => setSelectedDate(date)}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
                isSelected ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-500'
              }`}
            >
              <span className="text-[10px] font-bold uppercase">{format(date, 'eee')}</span>
              <span className="text-sm font-bold">{format(date, 'd')}</span>
            </button>
          );
        })}
      </div>

      {/* Slots List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-bold text-slate-700">Time Slots</h3>
          <p className="text-xs text-slate-400 font-medium">{format(selectedDate, 'MMMM d, yyyy')}</p>
        </div>

        <div className="grid gap-4">
          {slots.map((slot, idx) => (
            <motion.div
              key={slot.time}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-4 rounded-2xl flex items-center border transition-all ${
                slot.status === 'booked' 
                  ? 'bg-white border-brand-accent/30 shadow-sm' 
                  : slot.status === 'break'
                  ? 'bg-slate-50 border-transparent opacity-50'
                  : 'bg-white border-dashed border-slate-200'
              }`}
            >
              <div className="w-20 text-sm font-bold text-slate-500">{slot.time}</div>
              <div className="flex-1">
                {slot.status === 'booked' ? (
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-slate-800">{slot.name}</span>
                  </div>
                ) : slot.status === 'break' ? (
                  <span className="text-sm italic text-slate-400">Coffee Break</span>
                ) : (
                  <span className="text-xs font-bold text-brand-primary/60 uppercase tracking-widest">Available</span>
                )}
              </div>
              {slot.status === 'available' && (
                <button className="text-[10px] font-bold text-brand-primary bg-brand-secondary px-3 py-1 rounded-lg">
                  Book
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
