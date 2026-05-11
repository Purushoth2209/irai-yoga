/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ClipboardList, Upload, ChevronRight, SkipForward, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [healthData, setHealthData] = useState({
    condition: '',
    painLevel: 5,
    goals: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  const handleComplete = () => {
    onComplete();
    navigate('/dashboard');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  return (
    <div className="min-h-full p-8 bg-brand-50 flex flex-col">
      <div className="mt-8 mb-8">
        <div className="flex gap-1 mb-6">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={cn(
                "h-1 flex-1 rounded-full bg-brand-border overflow-hidden",
              )}
            >
              <div 
                className={cn(
                  "h-full bg-forest transition-all duration-700",
                  step >= s ? "w-full" : "w-0"
                )} 
              />
            </div>
          ))}
        </div>
        <p className="small-caps mb-2">Step 0{step} / Onboarding</p>
        <h2 className="serif text-3xl leading-none">
          {step === 1 && "Health Profile"}
          {step === 2 && "Documents"}
          {step === 3 && "All set!"}
        </h2>
      </div>

      <div className="flex-1">
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <label className="small-caps">Physical Conditions</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'back-pain', label: 'Back Pain' },
                  { id: 'anxiety', label: 'Anxiety' },
                  { id: 'diabetes', label: 'Diabetes' },
                  { id: 'general', label: 'General' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setHealthData({ ...healthData, condition: opt.id })}
                    className={cn(
                      "py-2 px-4 rounded-lg text-[10px] font-bold uppercase transition-all border",
                      healthData.condition === opt.id 
                        ? "bg-forest border-forest text-white" 
                        : "bg-white border-brand-border text-gray-400"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="small-caps">Pain Level</label>
                <span className="text-[10px] font-bold text-forest">{healthData.painLevel} / 10</span>
              </div>
              <input 
                type="range" min="0" max="10" 
                value={healthData.painLevel}
                onChange={(e) => setHealthData({ ...healthData, painLevel: parseInt(e.target.value) })}
                className="w-full accent-forest h-1.5 bg-brand-border rounded-full appearance-none cursor-pointer" 
              />
            </div>

            <div className="space-y-3">
              <label className="small-caps">Describe your goal</label>
              <textarea 
                placeholder="Improving flexibility..."
                value={healthData.goals}
                onChange={(e) => setHealthData({ ...healthData, goals: e.target.value })}
                className="w-full bg-white border border-brand-border p-4 rounded-xl focus:outline-none focus:border-forest text-sm min-h-[100px] placeholder:text-gray-300"
              />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
             <div className="space-y-3">
              <label className="small-caps">Medical Documents</label>
              <div className="relative group">
                <input 
                  type="file" 
                  multiple
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className="border-2 border-dashed border-brand-border bg-white rounded-2xl p-10 flex flex-col items-center justify-center gap-3 text-center transition-colors group-hover:border-forest/40">
                  <div className="w-12 h-12 bg-[#f5f7f2] rounded-full flex items-center justify-center text-forest">
                    <Upload size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-slate text-xs uppercase tracking-tight">Tap to upload reports</p>
                    <p className="small-caps text-[8px] mt-1 text-gray-300">(PDF, JPG)</p>
                  </div>
                </div>
              </div>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <p className="small-caps text-[8px] px-2">Uploaded ({files.length})</p>
                {files.map((f, i) => (
                  <div key={i} className="bg-white border border-brand-border p-3 rounded-lg flex items-center justify-between text-[11px]">
                    <span className="truncate flex-1 pr-4 font-medium">{f.name}</span>
                    <span className="small-caps text-[8px] text-gray-300">{(f.size / 1024).toFixed(0)} KB</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-20 h-20 bg-[#f5f7f2] text-forest rounded-full flex items-center justify-center mb-6 border border-forest/10 shadow-sm">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="serif text-2xl mb-2">Welcome to IRAI</h3>
            <p className="text-gray-500 text-xs max-w-xs mx-auto leading-relaxed">
              Your personalized wellness dashboard is ready. Let's start.
            </p>
          </motion.div>
        )}
      </div>

      <div className="mt-8 flex gap-3 pb-8">
        {step < 3 ? (
          <>
            <button 
              onClick={() => setStep(step + 1)}
              className="flex-3 bg-forest text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg shadow-forest/20 text-sm"
            >
              Continue
              <ChevronRight size={18} />
            </button>
            <button 
              onClick={handleComplete}
              className="flex-1 bg-white border border-forest text-forest py-4 rounded-xl font-bold flex justify-center items-center text-sm"
            >
              Skip
            </button>
          </>
        ) : (
          <button 
            onClick={handleComplete}
            className="w-full bg-forest text-white py-4 rounded-xl font-bold flex justify-center items-center shadow-lg shadow-forest/20 text-sm"
          >
            Start Practice
          </button>
        )}
      </div>
    </div>
  );
}
