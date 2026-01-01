
import React, { useState } from 'react';
import { Employee } from '../types';

interface NameListUploadProps {
  onNamesUpdate: (employees: Employee[]) => void;
}

export const NameListUpload: React.FC<NameListUploadProps> = ({ onNamesUpdate }) => {
  const [inputText, setInputText] = useState('');

  const handleProcess = () => {
    const lines = inputText.split('\n').filter(line => line.trim() !== '');
    const employees: Employee[] = lines.map((name, index) => ({
      id: `emp-${index}-${Date.now()}`,
      name: name.trim()
    }));
    onNamesUpdate(employees);
  };

  return (
    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-lg">
      <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
        <i className="fas fa-users text-indigo-400"></i>
        Who's in the Team?
      </h3>
      <p className="text-slate-500 text-sm mb-4 font-medium">
        Type names (one per line). Each person gets their own special card!
      </p>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="w-full h-48 bg-slate-50 border-2 border-slate-50 rounded-3xl p-6 text-slate-800 font-bold focus:ring-4 focus:ring-indigo-100 focus:border-indigo-200 outline-none resize-none transition-all placeholder:text-slate-300 text-lg"
        placeholder="e.g.&#10;Alice Wonderland&#10;Bob Builder&#10;Charlie Chocolate"
      />
      <button
        onClick={handleProcess}
        className="w-full mt-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-black py-4 px-4 rounded-3xl transition-all flex items-center justify-center gap-2 border-2 border-indigo-200"
      >
        <i className="fas fa-check-circle"></i>
        Review Roster
      </button>
    </div>
  );
};
