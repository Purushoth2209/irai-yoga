/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';
import { Sparkles, TrendingUp, Target, Brain } from 'lucide-react';
import { MOCK_AI_DATA } from '../constants';
import { cn } from '../lib/utils';

export default function AIInsights() {
  return (
    <div className="p-6 pb-24 bg-brand-50 min-h-full">
      <div className="mt-8 mb-8 px-2">
        <p className="small-caps mb-1 text-forest">Dynamic Biometrics</p>
        <h2 className="serif text-3xl leading-none">Your Progression</h2>
      </div>

      <div className="space-y-6">
        {/* Progress Ring Section - Updated for Geometric Balance */}
        <section className="bg-white p-8 rounded-[2rem] border border-brand-border shadow-sm flex flex-col items-center">
          <div className="relative w-48 h-48 flex items-center justify-center mb-6">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="80"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="10"
              />
              <motion.circle
                cx="96"
                cy="96"
                r="80"
                fill="none"
                stroke="#4A6741"
                strokeWidth="10"
                strokeDasharray="502.4"
                initial={{ strokeDashoffset: 502.4 }}
                animate={{ strokeDashoffset: 502.4 * (1 - MOCK_AI_DATA.wellnessScore / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-5xl font-bold text-forest tracking-tighter leading-none">{MOCK_AI_DATA.wellnessScore}</span>
               <span className="small-caps text-[8px] mt-1">Health Index</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 w-full gap-4 pt-6 border-t border-brand-border">
             <div className="text-center border-r border-brand-border pr-2">
                <p className="small-caps text-[7px] mb-1">Rank</p>
                <div className="flex items-center justify-center gap-1">
                   <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                   <span className="font-bold text-slate text-[10px] uppercase tracking-tight">Gold</span>
                </div>
             </div>
             <div className="text-center pl-2">
                <p className="small-caps text-[7px] mb-1">Status</p>
                <span className="font-bold text-slate text-[10px] uppercase tracking-tight">Steady Flame</span>
             </div>
          </div>
        </section>

        {/* Radar Chart Section - Updated for Geometric Balance */}
        <section className="bg-white p-6 rounded-[2rem] border border-brand-border shadow-sm overflow-hidden text-slate italic lowercase">
          <p className="small-caps text-center mb-6 normal-case not-italic">Equilibrium Radar</p>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={MOCK_AI_DATA.radarData}>
                <PolarGrid stroke="#eef2eb" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#999', fontSize: 8, fontWeight: 700 }} 
                />
                <Radar
                  name="Wellness"
                  dataKey="A"
                  stroke="#4A6741"
                  strokeWidth={2}
                  fill="#4A6741"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Milestone Cards */}
        <section className="space-y-4 px-2">
          <h3 className="small-caps mb-4">Achievements</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: TrendingUp, label: 'Steady Flame', count: 7 },
              { icon: Target, label: 'Iron Roots', count: 30 },
            ].map((achievement, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm flex flex-col items-center gap-2 text-center transition-all hover:border-forest/30">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#f5f7f2] text-forest border border-brand-border">
                  <achievement.icon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate text-xs uppercase tracking-tight">{achievement.label}</h4>
                  <p className="small-caps text-[8px] mt-0.5">{achievement.count} Days</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly Coaching Notes */}
        <section className="bg-slate rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-slate/20">
           <div className="relative z-10">
             <div className="flex items-center gap-2 mb-4 text-forest">
               <Brain size={16} />
               <span className="small-caps text-[9px] text-white">AI Coaching Insight</span>
             </div>
             <p className="serif text-xl italic leading-relaxed text-cream/90 mb-6">
               "Your breathing consistency during high-intensity poses suggests your parasympathetic nervous system is adapting well. Increase your 'hold' time by 5 seconds."
             </p>
             <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-forest rounded-full" />
                <div className="w-1 h-1 bg-forest/50 rounded-full" />
                <div className="w-1 h-1 bg-forest/20 rounded-full" />
             </div>
           </div>
           <div className="absolute top-0 right-0 w-32 h-32 bg-forest/10 rounded-full blur-[30px]" />
        </section>
      </div>
    </div>
  );
}
