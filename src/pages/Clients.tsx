import React, { useState } from 'react';
import { Search, Filter, Phone, Mail, ChevronRight } from 'lucide-react';
import { MOCK_PATIENTS } from '../mockData';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Clients() {
  const [search, setSearch] = useState('');

  const filteredPatients = MOCK_PATIENTS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.condition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-5 pt-12 space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-serif font-bold text-slate-800">My Clients</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or condition..."
            className="w-full bg-white border-none card-shadow rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-brand-accent transition-all outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs / Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
        {['All', 'Active', 'New', 'Completed'].map((tab, idx) => (
          <button 
            key={tab}
            className={`px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              idx === 0 ? 'bg-brand-primary text-white' : 'bg-white text-slate-500 border border-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Client List */}
      <div className="space-y-4">
        {filteredPatients.map((patient, idx) => (
          <motion.div 
            key={patient.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="group active:scale-95 transition-transform"
          >
             <Link to={`/clients/${patient.id}`} className="bg-white p-4 rounded-2xl border border-slate-50 flex items-center gap-4 card-shadow block">
                <img src={patient.avatar} alt={patient.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800 truncate">{patient.name}</h3>
                  <p className="text-xs text-brand-primary font-medium">{patient.condition}</p>
                </div>
                <div className="bg-brand-secondary p-2 rounded-xl text-brand-primary">
                  <ChevronRight size={18} />
                </div>
             </Link>
          </motion.div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-10 space-y-2">
          <p className="text-slate-500 italic font-serif">No clients found matching your search.</p>
        </div>
      )}
    </div>
  );
}
