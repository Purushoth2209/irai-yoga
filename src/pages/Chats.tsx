import React from 'react';
import { Search, Edit2 } from 'lucide-react';
import { MOCK_PATIENTS } from '../mockData';
import { motion } from 'motion/react';

export default function Chats() {
  const recentChats = MOCK_PATIENTS.map(p => ({
    ...p,
    lastMsg: 'Hello Doctor, I have a question about my diet plan...',
    time: '12:45 PM',
    unread: Math.random() > 0.5 ? 2 : 0
  }));

  return (
    <div className="px-5 pt-12 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-bold text-slate-800">Messages</h1>
        <button className="bg-brand-primary text-white p-2.5 rounded-xl">
          <Edit2 size={18} />
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search messages..."
          className="w-full bg-white border-none card-shadow rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none"
        />
      </div>

      {/* Chat List */}
      <div className="space-y-1">
        {recentChats.map((chat, idx) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group py-4 flex items-center gap-4 active:bg-slate-100/50 rounded-2xl px-2 transition-colors cursor-pointer"
          >
            <div className="relative">
              <img src={chat.avatar} alt={chat.name} className="w-14 h-14 rounded-2xl object-cover" />
              {chat.unread > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  {chat.unread}
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-800 truncate">{chat.name}</h4>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{chat.time}</span>
              </div>
              <p className="text-xs text-slate-500 truncate font-medium">{chat.lastMsg}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
