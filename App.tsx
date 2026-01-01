
import React, { useState } from 'react';
import { LogoUpload } from './components/LogoUpload';
import { ReferencePhotoUpload } from './components/ReferencePhotoUpload';
import { NameListUpload } from './components/NameListUpload';
import { TemplateSelector } from './components/TemplateSelector';
import { NewYearCard } from './components/NewYearCard';
import { generateQuotesForEmployees } from './services/geminiService';
import { AppState, Employee, CardData, TemplateType } from './types';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    logo: null,
    referencePhoto: null,
    employees: [],
    cards: [],
    isGenerating: false,
    companyName: 'Happy Team',
    selectedTemplate: 'royal-gold'
  });
  const [isExporting, setIsExporting] = useState<'pdf' | 'jpg' | null>(null);
  const [exportProgress, setExportProgress] = useState(0);

  const handleLogoUpload = (logo: string) => setState(prev => ({ ...prev, logo }));
  const handleReferencePhotoUpload = (referencePhoto: string) => setState(prev => ({ ...prev, referencePhoto }));
  const handleNamesUpdate = (employees: Employee[]) => setState(prev => ({ ...prev, employees }));
  const handleTemplateChange = (selectedTemplate: TemplateType) => setState(prev => ({ ...prev, selectedTemplate }));

  const generateCards = async () => {
    if (state.employees.length === 0) {
      alert("Please add some employee names first!");
      return;
    }

    setState(prev => ({ ...prev, isGenerating: true }));
    try {
      const cardData = await generateQuotesForEmployees(
        state.employees, 
        state.companyName, 
        state.referencePhoto
      );
      setState(prev => ({ ...prev, cards: cardData, isGenerating: false }));
    } catch (err) {
      console.error(err);
      setState(prev => ({ ...prev, isGenerating: false }));
    }
  };

  const downloadAllCardsAsPdf = async () => {
    if (state.cards.length === 0) return;
    setIsExporting('pdf');
    setExportProgress(0);
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'cm', format: [10, 15] });

    try {
      for (let i = 0; i < state.cards.length; i++) {
        const card = state.cards[i];
        const elementId = `export-card-${card.employeeId}`;
        const element = document.getElementById(elementId);
        if (element) {
          setExportProgress(Math.round(((i + 1) / state.cards.length) * 100));
          const canvas = await html2canvas(element, { scale: 3, useCORS: true, backgroundColor: '#ffffff', logging: false });
          const imgData = canvas.toDataURL('image/png');
          if (i > 0) pdf.addPage([10, 15], 'portrait');
          pdf.addImage(imgData, 'PNG', 0, 0, 10, 15);
        }
      }
      pdf.save(`Happy_New_Year_2026_${state.companyName}.pdf`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsExporting(null);
      setExportProgress(0);
    }
  };

  const downloadAllCardsAsJpg = async () => {
    if (state.cards.length === 0) return;
    setIsExporting('jpg');
    setExportProgress(0);
    const zip = new JSZip();

    try {
      for (let i = 0; i < state.cards.length; i++) {
        const card = state.cards[i];
        const elementId = `export-card-${card.employeeId}`;
        const element = document.getElementById(elementId);
        if (element) {
          setExportProgress(Math.round(((i + 1) / state.cards.length) * 100));
          const canvas = await html2canvas(element, { scale: 3, useCORS: true, logging: false });
          const blob = await new Promise<Blob | null>(res => canvas.toBlob(res, 'image/jpeg', 0.95));
          if (blob) zip.file(`${card.name.replace(/\s+/g, '_')}_2026.jpg`, blob);
        }
      }
      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `2026_Cards_${state.companyName}.zip`;
      link.click();
    } catch (error) {
      console.error(error);
    } finally {
      setIsExporting(null);
      setExportProgress(0);
    }
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-rose-200">
      {/* Friendly Nav */}
      <nav className="no-print sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200 rotate-3">
              <i className="fas fa-heart text-white text-lg"></i>
            </div>
            <h1 className="text-xl font-extrabold text-slate-800 tracking-tight font-quicksand">TeamJoy <span className="text-rose-500">2026</span></h1>
          </div>
          <div className="flex gap-3">
             {state.cards.length > 0 && (
               <>
                 <button onClick={downloadAllCardsAsJpg} disabled={isExporting !== null} className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-300 text-white px-5 py-2.5 rounded-2xl text-sm font-extrabold transition-all flex items-center gap-2 shadow-lg shadow-indigo-100">
                   {isExporting === 'jpg' ? <><i className="fas fa-spinner fa-spin"></i> {exportProgress}%</> : <><i className="fas fa-images"></i> JPG Collection</>}
                 </button>
                 <button onClick={downloadAllCardsAsPdf} disabled={isExporting !== null} className="bg-rose-500 hover:bg-rose-600 disabled:bg-slate-300 text-white px-5 py-2.5 rounded-2xl text-sm font-extrabold transition-all flex items-center gap-2 shadow-lg shadow-rose-100">
                   {isExporting === 'pdf' ? <><i className="fas fa-spinner fa-spin"></i> {exportProgress}%</> : <><i className="fas fa-file-pdf"></i> PDF Booklet</>}
                 </button>
               </>
             )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 pt-12">
        <header className="no-print text-center mb-16">
          <div className="inline-block bg-rose-100 text-rose-600 px-4 py-1 rounded-full text-xs font-black uppercase mb-4 tracking-widest">Year of Kindness</div>
          <h2 className="text-5xl font-quicksand font-black text-slate-800 mb-4">
            Spread the <span className="text-rose-500 underline decoration-rose-200 decoration-8">Holiday Love</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            Make 2026 special for your team! Create warm, hand-crafted cards with personalized AI messages that say "thank you" from the heart.
          </p>
        </header>

        <div className="no-print grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg">
               <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><i className="fas fa-smile text-rose-400"></i>Our Team Name</h3>
               <input type="text" value={state.companyName} onChange={(e) => setState(prev => ({ ...prev, companyName: e.target.value }))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-slate-800 focus:ring-4 focus:ring-rose-100 outline-none transition-all font-bold" placeholder="e.g. Dream Team" />
            </div>
            <TemplateSelector selected={state.selectedTemplate} onSelect={handleTemplateChange} />
            <LogoUpload onLogoUpload={handleLogoUpload} currentLogo={state.logo} />
            <ReferencePhotoUpload onPhotoUpload={handleReferencePhotoUpload} currentPhoto={state.referencePhoto} />
          </div>

          <div className="lg:col-span-8 flex flex-col">
            <NameListUpload onNamesUpdate={handleNamesUpdate} />
            <div className="mt-6">
              <button onClick={generateCards} disabled={state.isGenerating || state.employees.length === 0} className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-slate-200 text-white font-black py-6 rounded-3xl shadow-xl shadow-rose-100 transition-all flex items-center justify-center gap-3 text-2xl group">
                {state.isGenerating ? <><i className="fas fa-magic fa-spin"></i> Sprinkling Joy...</> : <><i className="fas fa-heart group-hover:scale-125 transition-transform"></i> Generate 2026 Collection</>}
              </button>
            </div>
          </div>
        </div>

        {state.cards.length > 0 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <h3 className="text-3xl font-quicksand font-black text-slate-800 flex items-center gap-3 border-b-4 border-rose-100 pb-4">
              <i className="fas fa-sparkles text-amber-400"></i> Your Beautiful 2026 Cards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {state.cards.map((card) => (
                <NewYearCard key={card.employeeId} name={card.name} quote={card.quote} logo={state.logo} referencePhoto={state.referencePhoto} companyName={state.companyName} template={state.selectedTemplate} />
              ))}
            </div>
          </div>
        )}

        {/* Hidden Export Rendering */}
        <div className="fixed left-[-9999px] top-0 pointer-events-none bg-white p-20" aria-hidden="true">
          {state.cards.map((card) => (
            <div key={`export-wrap-${card.employeeId}`} className="mb-20">
              <NewYearCard id={`export-card-${card.employeeId}`} name={card.name} quote={card.quote} logo={state.logo} referencePhoto={state.referencePhoto} companyName={state.companyName} template={state.selectedTemplate} isExport={true} />
            </div>
          ))}
        </div>
      </main>

      <footer className="no-print mt-20 text-center py-10 text-slate-400 font-bold">
        <p>Created for Happy Teams Everywhere • New Year 2026</p>
      </footer>
    </div>
  );
};

export default App;
