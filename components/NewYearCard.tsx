
import React from 'react';
import { TemplateType } from '../types';

interface NewYearCardProps {
  id?: string;
  name: string;
  quote: string;
  logo: string | null;
  referencePhoto: string | null;
  companyName: string;
  template: TemplateType;
  isExport?: boolean;
}

export const NewYearCard: React.FC<NewYearCardProps> = ({ id, name, quote, logo, referencePhoto, companyName, template, isExport = false }) => {
  const sizeClasses = isExport 
    ? "w-[10cm] h-[15cm]" 
    : "aspect-[2/3] w-full max-w-sm mx-auto";

  const renderWarmGlow = () => (
    <div id={id} className={`relative ${sizeClasses} bg-amber-50 rounded-[3rem] p-8 flex flex-col items-center justify-between overflow-hidden group shadow-xl border-8 border-white`}>
      <div className="absolute inset-0 z-0">
        {referencePhoto ? (
          <img src={referencePhoto} alt="" className="w-full h-full object-cover opacity-20 blur-[2px]" />
        ) : <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100"></div>}
      </div>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-200/50 rounded-full blur-3xl"></div>
      <div className="relative z-10 w-full flex flex-col items-center h-full text-slate-800">
        <div className="mt-4 flex flex-col items-center">
          {logo && <img src={logo} className="h-12 mb-4 object-contain" />}
          <div className="text-center">
            <h4 className="font-quicksand text-orange-600 text-sm font-bold tracking-widest uppercase">Hello 2026!</h4>
            <h2 className="font-dancing text-amber-800 text-5xl mt-1">Happy New Year</h2>
          </div>
        </div>
        <div className="flex-grow flex flex-col justify-center w-full px-2">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-[2.5rem] shadow-sm border-2 border-orange-100 text-center relative">
            <h3 className="font-quicksand text-slate-800 text-2xl font-extrabold mb-3">Hi, {name}!</h3>
            <p className="text-slate-600 font-medium text-[14px] leading-relaxed italic">"{quote}"</p>
          </div>
        </div>
        <div className="mb-4 text-center">
          <p className="font-quicksand text-orange-600 font-extrabold text-sm">{companyName}</p>
        </div>
      </div>
    </div>
  );

  const renderSweetDreams = () => (
    <div id={id} className={`relative ${sizeClasses} bg-indigo-50 rounded-[3rem] p-8 flex flex-col items-center justify-between overflow-hidden group shadow-xl border-8 border-white`}>
      <div className="absolute inset-0 z-0">
        {referencePhoto ? (
          <img src={referencePhoto} alt="" className="w-full h-full object-cover opacity-20 mix-blend-multiply" />
        ) : <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100"></div>}
      </div>
      <div className="relative z-10 w-full flex flex-col items-center h-full text-indigo-900">
        <div className="mt-4 text-center">
          <h2 className="font-space text-indigo-600 text-6xl font-black italic tracking-tighter">2026</h2>
          <p className="font-quicksand text-purple-500 text-sm font-bold uppercase tracking-tighter">Sweet New Beginnings</p>
        </div>
        <div className="flex-grow flex flex-col justify-center w-full">
          <div className="space-y-4 p-6 bg-white/40 rounded-[2.5rem] border-2 border-indigo-100 backdrop-blur-md text-center">
            <h3 className="font-space text-indigo-800 text-3xl font-extrabold tracking-tight">{name}</h3>
            <p className="text-slate-700 font-medium text-[14px] leading-relaxed">"{quote}"</p>
          </div>
        </div>
        <div className="w-full flex justify-between items-center mb-2 px-2">
          {logo ? <img src={logo} className="h-8 object-contain" /> : <span className="text-indigo-800 text-xs font-bold">{companyName}</span>}
          <div className="flex gap-1">
            {[1,2,3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-indigo-300"></div>)}
          </div>
        </div>
      </div>
    </div>
  );

  const renderHappyParty = () => (
    <div id={id} className={`relative ${sizeClasses} bg-rose-50 rounded-[3rem] p-8 flex flex-col items-center justify-between overflow-hidden group shadow-xl border-8 border-white`}>
      <div className="absolute inset-0 z-0 pointer-events-none">
        {referencePhoto && <img src={referencePhoto} alt="" className="w-full h-full object-cover opacity-30 grayscale" />}
        <div className="absolute inset-0 bg-white/20"></div>
      </div>
      <div className="relative z-10 w-full flex flex-col items-center h-full">
        <div className="mt-4 flex flex-col items-center">
          <div className="bg-rose-500 text-white px-6 py-2 rounded-full shadow-lg transform -rotate-2">
            <h2 className="font-quicksand text-3xl font-black uppercase">Party 2026</h2>
          </div>
        </div>
        <div className="flex-grow flex flex-col justify-center w-full text-center">
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border-b-8 border-rose-100">
            {logo && <img src={logo} className="h-10 mx-auto mb-4 object-contain" />}
            <h3 className="font-dancing text-rose-500 text-4xl mb-3">{name}</h3>
            <p className="text-slate-600 font-bold text-[14px] leading-relaxed">"{quote}"</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="font-quicksand text-rose-800 text-xs font-black uppercase tracking-widest">Team {companyName}</p>
        </div>
      </div>
    </div>
  );

  const renderMintyFresh = () => (
    <div id={id} className={`relative ${sizeClasses} bg-emerald-50 rounded-[3rem] p-8 flex flex-col items-center justify-between overflow-hidden group shadow-xl border-8 border-white`}>
      <div className="absolute inset-0 z-0">
        {referencePhoto ? (
          <img src={referencePhoto} alt="" className="w-full h-full object-cover opacity-20" />
        ) : <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100"></div>}
      </div>
      <div className="absolute top-0 right-0 p-8 text-emerald-200/40 text-8xl"><i className="fas fa-leaf"></i></div>
      <div className="relative z-10 w-full flex flex-col items-center h-full text-emerald-900">
        <div className="mt-6 flex flex-col items-center">
          <h4 className="font-quicksand text-emerald-600 text-xs font-black uppercase tracking-[0.3em]">Fresh Starts</h4>
          <h2 className="font-quicksand text-4xl font-black text-emerald-800 mt-1">2026 Bloom</h2>
        </div>
        <div className="flex-grow flex flex-col justify-center w-full">
          <div className="bg-emerald-800 text-white p-8 rounded-[3rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
            <h3 className="font-quicksand text-2xl font-black mb-4 flex items-center gap-2">
               {name} <i className="fas fa-seedling text-emerald-400"></i>
            </h3>
            <p className="text-emerald-50 font-medium leading-relaxed italic">"{quote}"</p>
          </div>
        </div>
        <div className="mb-4 flex flex-col items-center gap-2">
          {logo && <img src={logo} className="h-8 object-contain opacity-80" />}
          <p className="font-quicksand text-emerald-700 text-[10px] font-black uppercase tracking-widest">Our Future: {companyName}</p>
        </div>
      </div>
    </div>
  );

  const renderSkyHigh = () => (
    <div id={id} className={`relative ${sizeClasses} bg-sky-50 rounded-[3rem] p-8 flex flex-col items-center justify-between overflow-hidden group shadow-xl border-8 border-white`}>
      <div className="absolute inset-0 z-0">
        {referencePhoto ? (
          <img src={referencePhoto} alt="" className="w-full h-full object-cover opacity-30" />
        ) : <div className="w-full h-full bg-gradient-to-b from-sky-200 to-white"></div>}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-sky-100/80 to-transparent"></div>
      <div className="relative z-10 w-full flex flex-col items-center h-full text-sky-900">
        <div className="mt-4 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 transform group-hover:scale-110 transition-transform">
            <i className="fas fa-paper-plane text-sky-500 text-2xl"></i>
          </div>
          <h2 className="font-space text-3xl font-black uppercase text-sky-600 leading-tight tracking-tighter">Sky High <br/> 2026</h2>
        </div>
        <div className="flex-grow flex flex-col justify-center w-full">
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-[2.5rem] shadow-xl border-t-4 border-sky-400 text-center">
            <h3 className="font-space text-slate-800 text-2xl font-bold mb-3">{name}</h3>
            <p className="text-slate-600 font-medium text-sm leading-relaxed italic">"{quote}"</p>
          </div>
        </div>
        <div className="mb-4 flex flex-col items-center gap-1">
          <p className="font-space text-sky-400 text-[8px] font-black uppercase tracking-[0.5em]">Limitless</p>
          <p className="font-space text-sky-800 text-xs font-bold uppercase">{companyName}</p>
          {logo && <img src={logo} className="h-6 object-contain mt-2" />}
        </div>
      </div>
    </div>
  );

  const renderSolarSpark = () => (
    <div id={id} className={`relative ${sizeClasses} bg-yellow-400 rounded-[3rem] p-8 flex flex-col items-center justify-between overflow-hidden group shadow-xl border-8 border-white`}>
      <div className="absolute inset-0 z-0">
        {referencePhoto ? (
          <img src={referencePhoto} alt="" className="w-full h-full object-cover opacity-20 contrast-125" />
        ) : <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-amber-500"></div>}
      </div>
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/20 rounded-full blur-3xl"></div>
      <div className="relative z-10 w-full flex flex-col items-center h-full text-amber-950">
        <div className="mt-4 flex flex-col items-center text-center">
          <h2 className="font-quicksand text-5xl font-black tracking-tighter text-white drop-shadow-md">2026</h2>
          <div className="bg-black text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mt-2">Radiant Year</div>
        </div>
        <div className="flex-grow flex flex-col justify-center w-full">
          <div className="bg-white/20 backdrop-blur-lg p-6 rounded-[2.5rem] border-2 border-white/30 text-center transform -rotate-1">
            <h3 className="font-quicksand text-3xl font-black mb-2 flex items-center justify-center gap-2">
               {name} <i className="fas fa-sun text-yellow-500 animate-pulse"></i>
            </h3>
            <p className="text-amber-950 font-extrabold text-[14px] leading-relaxed italic">"{quote}"</p>
          </div>
        </div>
        <div className="mb-4 w-full flex items-center justify-center gap-4">
           {logo && <div className="bg-white/40 p-2 rounded-xl backdrop-blur-sm"><img src={logo} className="h-8 object-contain" /></div>}
           <div className="h-8 w-[2px] bg-amber-950/20"></div>
           <p className="font-quicksand text-amber-950 text-xs font-black uppercase tracking-widest leading-none">{companyName}</p>
        </div>
      </div>
    </div>
  );

  switch(template) {
    case 'midnight-aurora': return renderSweetDreams();
    case 'classic-festive': return renderHappyParty();
    case 'minty-fresh': return renderMintyFresh();
    case 'sky-high': return renderSkyHigh();
    case 'solar-spark': return renderSolarSpark();
    case 'royal-gold': 
    default: return renderWarmGlow();
  }
};
