import React from 'react';
import { ClawToesState, ToeKey } from '../types';
import { TOE_CLAW_DATA } from '../data/clawToeMeanings';
import { Check, Info } from 'lucide-react';

interface ClawToeSelectorProps {
  value: ClawToesState;
  onChange: (updated: ClawToesState) => void;
}

const TOES: { key: ToeKey; label: string; sub: string }[] = [
  { key: 'dedao', label: 'Dedão', sub: '1º Dedo' },
  { key: 'segundo', label: 'Segundo', sub: '2º Dedo' },
  { key: 'terceiro', label: 'Terceiro', sub: '3º Dedo' },
  { key: 'quarto', label: 'Quarto', sub: '4º Dedo' },
  { key: 'dedinho', label: 'Dedinho', sub: '5º Dedo' },
];

export const ClawToeSelector: React.FC<ClawToeSelectorProps> = ({ value, onChange }) => {
  const toggleToe = (foot: 'rightFoot' | 'leftFoot', toeKey: ToeKey) => {
    onChange({
      ...value,
      [foot]: {
        ...value[foot],
        [toeKey]: !value[foot][toeKey],
      },
    });
  };

  const rightCount = Object.values(value.rightFoot).filter(Boolean).length;
  const leftCount = Object.values(value.leftFoot).filter(Boolean).length;
  const totalCount = rightCount + leftCount;

  return (
    <div className="mt-4 pt-4 border-t border-purple-200/80 transition-all duration-300">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-purple-900 uppercase tracking-wide">
            Selecione os Dedos em Garra (Virados para Baixo):
          </span>
          <span className="text-xs text-purple-600 bg-purple-100 px-2.5 py-0.5 rounded-full font-medium">
            {totalCount === 0 ? 'Nenhum dedo marcado' : `${totalCount} ${totalCount === 1 ? 'dedo selecionado' : 'dedos selecionados'}`}
          </span>
        </div>
        <p className="text-xs text-slate-500 italic">
          Toque no dedo para marcar ou desmarcar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Coluna 1: Pé Direito */}
        <div className="bg-white rounded-xl p-4 border-2 border-slate-200 hover:border-purple-300 transition-colors shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <div>
              <h4 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
                PÉ DIREITO
              </h4>
              <p className="text-xs text-slate-500">Mundo externo, ação, profissão e futuro</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
              {rightCount} {rightCount === 1 ? 'marcado' : 'marcados'}
            </span>
          </div>

          <div className="space-y-2">
            {TOES.map((toe) => {
              const isChecked = value.rightFoot[toe.key];
              const theme = TOE_CLAW_DATA[toe.key].rightFoot.theme;
              return (
                <button
                  type="button"
                  key={`claw-right-${toe.key}`}
                  onClick={() => toggleToe('rightFoot', toe.key)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between group cursor-pointer ${
                    isChecked
                      ? 'bg-blue-50/90 border-blue-500 text-blue-950 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                        isChecked
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-slate-300 bg-white group-hover:border-slate-400'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="font-semibold text-sm leading-tight">
                        {toe.label}
                        <span className="ml-1.5 text-xs text-slate-500 font-normal">({toe.sub})</span>
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">
                        {theme}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Coluna 2: Pé Esquerdo */}
        <div className="bg-white rounded-xl p-4 border-2 border-slate-200 hover:border-purple-300 transition-colors shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <div>
              <h4 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block"></span>
                PÉ ESQUERDO
              </h4>
              <p className="text-xs text-slate-500">Mundo íntimo, afeto, sentimentos e família</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700">
              {leftCount} {leftCount === 1 ? 'marcado' : 'marcados'}
            </span>
          </div>

          <div className="space-y-2">
            {TOES.map((toe) => {
              const isChecked = value.leftFoot[toe.key];
              const theme = TOE_CLAW_DATA[toe.key].leftFoot.theme;
              return (
                <button
                  type="button"
                  key={`claw-left-${toe.key}`}
                  onClick={() => toggleToe('leftFoot', toe.key)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between group cursor-pointer ${
                    isChecked
                      ? 'bg-purple-50/90 border-purple-500 text-purple-950 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                        isChecked
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'border-slate-300 bg-white group-hover:border-slate-400'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="font-semibold text-sm leading-tight">
                        {toe.label}
                        <span className="ml-1.5 text-xs text-slate-500 font-normal">({toe.sub})</span>
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">
                        {theme}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2 text-xs text-purple-700 bg-purple-50 p-2.5 rounded-lg border border-purple-200/60">
        <Info className="w-4 h-4 shrink-0 mt-0.5 text-purple-600" />
        <p>
          Dedos em garra (curvados para baixo) somatizam a necessidade de "se agarrar ao chão", revelando apego, insegurança ou hipervigilância na esfera correspondente a cada dedo.
        </p>
      </div>
    </div>
  );
};
