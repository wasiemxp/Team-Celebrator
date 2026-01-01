
import React from 'react';
import { TemplateType } from '../types';

interface TemplateSelectorProps {
  selected: TemplateType;
  onSelect: (type: TemplateType) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selected, onSelect }) => {
  const templates: { id: TemplateType; label: string; icon: string; color: string }[] = [
    { id: 'royal-gold', label: 'Warm Glow', icon: 'fa-sun', color: 'bg-amber-400' },
    { id: 'midnight-aurora', label: 'Sweet Dreams', icon: 'fa-cloud-moon', color: 'bg-purple-400' },
    { id: 'classic-festive', label: 'Happy Party', icon: 'fa-gift', color: 'bg-rose-400' },
    { id: 'minty-fresh', label: 'New Growth', icon: 'fa-leaf', color: 'bg-emerald-400' },
    { id: 'sky-high', label: 'Bright Future', icon: 'fa-rocket', color: 'bg-sky-400' },
    { id: 'solar-spark', label: 'Sunshine', icon: 'fa-bolt', color: 'bg-yellow-400' }
  ];

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg">
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <i className="fas fa-magic text-amber-500"></i>
        Choose a Style
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
              selected === t.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-slate-100 hover:border-slate-300 bg-white'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${t.color} shadow-sm transition-transform ${selected === t.id ? 'scale-110' : ''}`}>
              <i className={`fas ${t.icon}`}></i>
            </div>
            <span className="text-[9px] font-extrabold text-slate-600 uppercase tracking-wider text-center leading-tight">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
