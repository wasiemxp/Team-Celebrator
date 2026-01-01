
import React, { useRef } from 'react';

interface LogoUploadProps {
  onLogoUpload: (logoUrl: string) => void;
  currentLogo: string | null;
}

export const LogoUpload: React.FC<LogoUploadProps> = ({ onLogoUpload, currentLogo }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onLogoUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg">
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <i className="fas fa-star text-blue-400"></i>
        Our Logo
      </h3>
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="group relative h-40 w-full border-4 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-all bg-slate-50 overflow-hidden"
      >
        {currentLogo ? (
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img src={currentLogo} alt="Logo" className="max-h-full max-w-full object-contain" />
            <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
              <span className="bg-white text-blue-600 px-4 py-2 rounded-full font-bold shadow-sm">Change Logo</span>
            </div>
          </div>
        ) : (
          <>
            <i className="fas fa-plus text-3xl text-slate-300 group-hover:text-blue-400 mb-2 transition-transform group-hover:scale-110"></i>
            <p className="text-slate-400 text-sm font-bold">Add Company Logo</p>
          </>
        )}
      </div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
    </div>
  );
};
