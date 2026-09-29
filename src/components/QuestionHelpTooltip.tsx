import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, X } from 'lucide-react';

interface QuestionHelpTooltipProps {
  title: string;
  explanation: string;
}

export const QuestionHelpTooltip: React.FC<QuestionHelpTooltipProps> = ({ title, explanation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        onMouseEnter={() => setIsOpen(true)}
        className="p-1 text-purple-400 hover:text-purple-700 hover:bg-purple-100 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400"
        aria-label={`Ajuda sobre: ${title}`}
        title="Clique para entender a importância somática desta pergunta"
      >
        <HelpCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 top-full mt-2 z-50 w-72 sm:w-80 p-3.5 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-700 text-xs leading-relaxed animate-fade-in pointer-events-auto">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <span className="font-bold text-purple-300 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400 inline-block"></span>
              Importância Somática (Método Zuccato)
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="font-semibold text-slate-200 mb-1 text-xs">{title}</p>
          <p className="text-slate-300 text-[11.5px] leading-relaxed">{explanation}</p>
          <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-purple-300 italic">
            Calibra a precisão do diagnóstico psicossomático do laudo final.
          </div>
        </div>
      )}
    </div>
  );
};
