import React from 'react';
import { JoanetesState } from '../data/joanetesMeanings';
import { Check, Info } from 'lucide-react';

interface JoanetesSelectorProps {
  value: JoanetesState;
  onChange: (updated: JoanetesState) => void;
}

export const JoanetesSelector: React.FC<JoanetesSelectorProps> = ({ value, onChange }) => {
  const toggleFoot = (foot: 'rightFoot' | 'leftFoot') => {
    onChange({
      ...value,
      [foot]: !value[foot],
    });
  };

  const rightChecked = value.rightFoot;
  const leftChecked = value.leftFoot;
  const totalCount = (rightChecked ? 1 : 0) + (leftChecked ? 1 : 0);

  return (
    <div className="mt-4 pt-4 border-t border-purple-200/80 transition-all duration-300">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-purple-900 uppercase tracking-wide">
            Selecione em Qual Pé Está o Joanete:
          </span>
          <span className="text-xs text-purple-600 bg-purple-100 px-2.5 py-0.5 rounded-full font-medium">
            {totalCount === 0
              ? 'Nenhum pé marcado'
              : totalCount === 2
              ? 'Em Ambos os Pés'
              : rightChecked
              ? 'Apenas Pé Direito'
              : 'Apenas Pé Esquerdo'}
          </span>
        </div>
        <p className="text-xs text-slate-500 italic">
          Toque para selecionar um ou ambos os pés
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Coluna 1: Pé Direito */}
        <div
          onClick={() => toggleFoot('rightFoot')}
          className={`cursor-pointer rounded-xl p-4 border-2 transition-all shadow-xs flex flex-col justify-between ${
            rightChecked
              ? 'bg-blue-50/90 border-blue-600 shadow-sm'
              : 'bg-white border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <div>
              <h4 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
                PÉ DIREITO
              </h4>
              <p className="text-xs text-slate-500">Mundo externo, profissão e relações sociais</p>
            </div>
            <div
              className={`w-6 h-6 rounded-md flex items-center justify-center border transition-colors ${
                rightChecked
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'border-slate-300 bg-white'
              }`}
            >
              {rightChecked && <Check className="w-4 h-4 stroke-[3]" />}
            </div>
          </div>

          <div className="text-xs text-slate-600 space-y-1">
            <p className="font-semibold text-blue-900">
              Esforço de adaptação & sobrecarga por reconhecimento
            </p>
            <p className="text-[11px] text-slate-500">
              Desvio para atender expectativas do trabalho ou figuras de autoridade.
            </p>
          </div>
        </div>

        {/* Coluna 2: Pé Esquerdo */}
        <div
          onClick={() => toggleFoot('leftFoot')}
          className={`cursor-pointer rounded-xl p-4 border-2 transition-all shadow-xs flex flex-col justify-between ${
            leftChecked
              ? 'bg-purple-50/90 border-purple-600 shadow-sm'
              : 'bg-white border-slate-200 hover:border-purple-300'
          }`}
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <div>
              <h4 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block"></span>
                PÉ ESQUERDO
              </h4>
              <p className="text-xs text-slate-500">Mundo íntimo, afetivo, família e sentimentos</p>
            </div>
            <div
              className={`w-6 h-6 rounded-md flex items-center justify-center border transition-colors ${
                leftChecked
                  ? 'bg-purple-600 border-purple-600 text-white'
                  : 'border-slate-300 bg-white'
              }`}
            >
              {leftChecked && <Check className="w-4 h-4 stroke-[3]" />}
            </div>
          </div>

          <div className="text-xs text-slate-600 space-y-1">
            <p className="font-semibold text-purple-900">
              Sacrifício afetivo & medo de rejeição na intimidade
            </p>
            <p className="text-[11px] text-slate-500">
              Tendência a ceder e se desviar para preservar a harmonia familiar.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2 text-xs text-purple-700 bg-purple-50 p-2.5 rounded-lg border border-purple-200/60">
        <Info className="w-4 h-4 shrink-0 mt-0.5 text-purple-600" />
        <p>
          O joanete (hálux valgo) sinaliza desvio de rumo para acomodar vínculos. O pé direito reflete o âmbito exterior e social; o pé esquerdo, o íntimo e familiar.
        </p>
      </div>
    </div>
  );
};
