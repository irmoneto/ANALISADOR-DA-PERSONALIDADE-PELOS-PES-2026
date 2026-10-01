import React, { useState } from 'react';
import { ShapeResult, RatioResult, PersonalAnswers, ToeKey } from '../types';
import { ANALYSIS_DATA, HEALTH_DATA, BANCO_PROVOCATIVO } from '../data/analysisData';
import { BANCO_PROVOCATIVO_IZN } from '../data/bancoProvocativoIZN';
import { TOE_CALLUS_DATA } from '../data/callusMeanings';
import { TOE_CLAW_DATA } from '../data/clawToeMeanings';
import { TOE_INGROWN_NAIL_DATA } from '../data/ingrownNailMeanings';
import { JOANETES_MEANINGS } from '../data/joanetesMeanings';
import {
  FORMATO_DO_PE_REF,
  TAMANHO_DOS_DEDOS_REF,
  TAMANHO_DAS_UNHAS_REF,
  UNHAS_ENCRAVADAS_REF,
  POSICAO_DOS_DEDOS_REF,
  CARACTERES_REICH_MAP,
} from '../data/tabelaReferenciaIZN';
import { generateReportPDF, downloadReportPDF } from '../utils/pdfGenerator';
import {
  Download,
  Share2,
  RotateCcw,
  ExternalLink,
  Sparkles,
  Check,
  ShieldAlert,
  Footprints,
  Flame,
  Activity,
  Layers,
  HeartHandshake,
  Printer,
  Copy,
} from 'lucide-react';

interface ReportViewProps {
  targetName: string;
  imageUrl: string;
  shapeResult: ShapeResult;
  ratioResult: RatioResult;
  personalAnswers: PersonalAnswers;
  onRestart: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  targetName,
  imageUrl,
  shapeResult,
  ratioResult,
  personalAnswers,
  onRestart,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const nailsMap: Record<string, string> = {
    'pouco-visiveis': 'Pouco Visíveis',
    'visiveis': 'Visíveis',
    'bem-visiveis': 'Bem Visíveis',
  };

  const nailsKeyMap: Record<string, 'Pouco Visível' | 'Visível' | 'Bem Visível'> = {
    'pouco-visiveis': 'Pouco Visível',
    'visiveis': 'Visível',
    'bem-visiveis': 'Bem Visível',
  };

  const ratioKey = (
    ratioResult?.classification?.includes('Curtos') && !ratioResult.classification.includes('Normais')
      ? 'Curtos'
      : ratioResult?.classification?.includes('Longos') && !ratioResult.classification.includes('Normais')
      ? 'Longos'
      : ratioResult?.classification?.includes('Normais para Curtos')
      ? 'Normais para Curtos'
      : ratioResult?.classification?.includes('Normais para Longos')
      ? 'Normais para Longos'
      : 'Normais'
  ) as keyof typeof ANALYSIS_DATA['Tamanho dos Dedos'];

  const shapeKey = (shapeResult?.type || 'Egípcio') as keyof typeof ANALYSIS_DATA['Formato do Pé'];
  const nailsKey = (personalAnswers?.unhas ? nailsKeyMap[personalAnswers.unhas] : 'Visível') || 'Visível';

  const shapeDesc = ANALYSIS_DATA['Formato do Pé']?.[shapeKey] || '';
  const ratioDesc = ANALYSIS_DATA['Tamanho dos Dedos']?.[ratioKey] || '';
  const nailsDesc = ANALYSIS_DATA['Tamanho das Unhas']?.[nailsKey] || '';
  const strongPoints = ANALYSIS_DATA['Pontos Fortes']?.[ratioKey] || '';
  const challengingPoints = ANALYSIS_DATA['Pontos Desafiadores']?.[ratioKey] || '';

  // Pontos de Referência da Tabela de Referência Zuccato/Reich
  const shapeTableRef = FORMATO_DO_PE_REF[shapeKey] || FORMATO_DO_PE_REF['Egípcio'] || {
    descricaoGeral: '',
    pontosFortes: '',
    pontosDesafiadores: '',
  };
  const ratioTableRef =
    TAMANHO_DOS_DEDOS_REF[ratioKey] ||
    TAMANHO_DOS_DEDOS_REF['Normais para Curtos'] ||
    TAMANHO_DOS_DEDOS_REF['Normais'] || {
      descricaoGeral: '',
      pontosFortes: '',
      pontosDesafiadores: '',
    };
  const nailsTableRef =
    TAMANHO_DAS_UNHAS_REF[
      nailsKey === 'Bem Visível'
        ? 'Bem Visíveis (Grandes)'
        : nailsKey === 'Pouco Visível'
        ? 'Pouco Visíveis (Pequenas)'
        : 'Normais'
    ] ||
    TAMANHO_DAS_UNHAS_REF['Normais'] || {
      descricaoGeral: '',
      pontosFortes: '',
      pontosDesafiadores: '',
    };

  const relationKey =
    personalAnswers?.q2_relation === 'Muito Confortável' ? 'Confortável' : personalAnswers?.q2_relation || 'Confortável';
  const relationDesc = ANALYSIS_DATA['Relação com os Pés']?.[relationKey] || '';

  const hasIngrownNails = personalAnswers?.ingrownNails?.hasIngrownNails === 'Sim';
  const rightIngrownToes = (hasIngrownNails && personalAnswers?.ingrownNails?.rightFoot)
    ? (Object.keys(personalAnswers.ingrownNails.rightFoot) as ToeKey[]).filter(
        (k) => personalAnswers.ingrownNails.rightFoot[k]
      )
    : [];
  const leftIngrownToes = (hasIngrownNails && personalAnswers?.ingrownNails?.leftFoot)
    ? (Object.keys(personalAnswers.ingrownNails.leftFoot) as ToeKey[]).filter(
        (k) => personalAnswers.ingrownNails.leftFoot[k]
      )
    : [];
  const hasDetailedIngrownNails = hasIngrownNails && (rightIngrownToes.length > 0 || leftIngrownToes.length > 0);

  const hasDedaoIngrown = Boolean(
    personalAnswers?.ingrownNails?.rightFoot?.dedao || personalAnswers?.ingrownNails?.leftFoot?.dedao
  );
  const ingrownTableKey = !hasIngrownNails
    ? 'Não'
    : hasDedaoIngrown
    ? 'Dedões'
    : 'Outros Dedos';
  const ingrownTableRef =
    UNHAS_ENCRAVADAS_REF[ingrownTableKey] || UNHAS_ENCRAVADAS_REF['Não'] || {
      descricaoGeral: '',
      pontosFortes: '',
      pontosDesafiadores: '',
    };

  const getIngrownNailSummaryText = () => {
    if (!hasIngrownNails) return 'Não';
    const parts: string[] = [];
    if (rightIngrownToes.length > 0) {
      const names = rightIngrownToes.map((k) => TOE_INGROWN_NAIL_DATA[k]?.name || k).join(', ');
      parts.push(`Pé Dir: ${names}`);
    }
    if (leftIngrownToes.length > 0) {
      const names = leftIngrownToes.map((k) => TOE_INGROWN_NAIL_DATA[k]?.name || k).join(', ');
      parts.push(`Pé Esq: ${names}`);
    }
    return parts.length > 0 ? `Sim (${parts.join(' | ')})` : 'Sim';
  };

  const ingrownNailsBaseDesc = HEALTH_DATA['Unhas Encravadas']?.[hasIngrownNails ? 'Sim' : 'Não'] || '';

  const hasJoanetes = personalAnswers?.q3_joanetes?.hasJoanetes === 'Sim';
  const rightJoanete = Boolean(hasJoanetes && personalAnswers?.q3_joanetes?.rightFoot);
  const leftJoanete = Boolean(hasJoanetes && personalAnswers?.q3_joanetes?.leftFoot);
  const bothJoanetes = rightJoanete && leftJoanete;

  const joanetesDesc = HEALTH_DATA['Joanetes']?.[hasJoanetes ? 'Sim' : 'Não'] || '';
  const calosBaseDesc = HEALTH_DATA['Calos nos Dedos']?.[personalAnswers?.calluses?.hasCalluses === 'Sim' ? 'Sim' : 'Não'] || '';
  const clawToesBaseDesc = HEALTH_DATA['Dedos em Garra']?.[personalAnswers?.clawToes?.hasClawToes === 'Sim' ? 'Sim' : 'Não'] || '';

  const getJoanetesSummaryText = () => {
    if (!hasJoanetes) return 'Não';
    if (bothJoanetes) return 'Sim (Ambos os Pés)';
    if (rightJoanete) return 'Sim (Pé Direito)';
    if (leftJoanete) return 'Sim (Pé Esquerdo)';
    return 'Sim';
  };

  // Calculate detailed calluses
  const hasCalluses = personalAnswers?.calluses?.hasCalluses === 'Sim';
  const rightToesMarked = (hasCalluses && personalAnswers?.calluses?.rightFoot)
    ? (Object.keys(personalAnswers.calluses.rightFoot) as ToeKey[]).filter(
        (k) => personalAnswers.calluses.rightFoot[k]
      )
    : [];
  const leftToesMarked = (hasCalluses && personalAnswers?.calluses?.leftFoot)
    ? (Object.keys(personalAnswers.calluses.leftFoot) as ToeKey[]).filter(
        (k) => personalAnswers.calluses.leftFoot[k]
      )
    : [];
  const hasDetailedCalluses =
    hasCalluses && (rightToesMarked.length > 0 || leftToesMarked.length > 0);

  const getCallusSummaryText = () => {
    if (!hasCalluses) return 'Não';
    const parts: string[] = [];
    if (rightToesMarked.length > 0) {
      const names = rightToesMarked.map((k) => TOE_CALLUS_DATA[k]?.name || k).join(', ');
      parts.push(`Pé Dir: ${names}`);
    }
    if (leftToesMarked.length > 0) {
      const names = leftToesMarked.map((k) => TOE_CALLUS_DATA[k]?.name || k).join(', ');
      parts.push(`Pé Esq: ${names}`);
    }
    return parts.length > 0 ? `Sim (${parts.join(' | ')})` : 'Sim';
  };

  // Calculate detailed claw toes
  const hasClawToes = personalAnswers?.clawToes?.hasClawToes === 'Sim';
  const rightClawToesMarked = (hasClawToes && personalAnswers?.clawToes?.rightFoot)
    ? (Object.keys(personalAnswers.clawToes.rightFoot) as ToeKey[]).filter(
        (k) => personalAnswers.clawToes.rightFoot[k]
      )
    : [];
  const leftClawToesMarked = (hasClawToes && personalAnswers?.clawToes?.leftFoot)
    ? (Object.keys(personalAnswers.clawToes.leftFoot) as ToeKey[]).filter(
        (k) => personalAnswers.clawToes.leftFoot[k]
      )
    : [];
  const hasDetailedClawToes = hasClawToes && (rightClawToesMarked.length > 0 || leftClawToesMarked.length > 0);

  const getClawToeSummaryText = () => {
    if (!hasClawToes) return 'Não';
    const parts: string[] = [];
    if (rightClawToesMarked.length > 0) {
      const names = rightClawToesMarked.map((k) => TOE_CLAW_DATA[k]?.name || k).join(', ');
      parts.push(`Pé Dir: ${names}`);
    }
    if (leftClawToesMarked.length > 0) {
      const names = leftClawToesMarked.map((k) => TOE_CLAW_DATA[k]?.name || k).join(', ');
      parts.push(`Pé Esq: ${names}`);
    }
    return parts.length > 0 ? `Sim (${parts.join(' | ')})` : 'Sim';
  };

  // Banco provocativo selection (Aprimorado com Banco Provocativo IZN - Versão Osho & Jô Soares)
  const defaultProvocative = BANCO_PROVOCATIVO_IZN['Egípcio'] || {
    registro: '001',
    categoria: 'Formato do Pé',
    subcategoria: 'Forma',
    dificuldadeCentral: '',
    contradicao: '',
    emocaoPrincipal: '',
    alvoEmocional: '',
    niveis: {
      1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '', 10: ''
    }
  };
  const shapeReg = BANCO_PROVOCATIVO_IZN[shapeKey] || defaultProvocative;

  let ratioRegKey = 'Dedos-Normais';
  if (ratioKey === 'Curtos') ratioRegKey = 'Dedos-Curtos';
  else if (ratioKey === 'Normais para Curtos') ratioRegKey = 'Dedos-Normais-para-Curtos';
  else if (ratioKey === 'Normais para Longos') ratioRegKey = 'Dedos-Normais-para-Longos';
  else if (ratioKey === 'Longos') ratioRegKey = 'Dedos-Longos';
  const ratioReg = BANCO_PROVOCATIVO_IZN[ratioRegKey] || BANCO_PROVOCATIVO_IZN['Dedos-Normais'] || defaultProvocative;

  let nailsRegKey = 'Unhas-Normais';
  if (personalAnswers?.unhas === 'pouco-visiveis') nailsRegKey = 'Unhas-Pequenas';
  else if (personalAnswers?.unhas === 'bem-visiveis') nailsRegKey = 'Unhas-Grandes';
  const nailsReg = BANCO_PROVOCATIVO_IZN[nailsRegKey] || BANCO_PROVOCATIVO_IZN['Unhas-Normais'] || defaultProvocative;

  let ingrownRegKey = 'Unhas-Encravadas-Nenhum';
  if (hasIngrownNails && personalAnswers?.ingrownNails) {
    const hasDedaoIngrown = Boolean(
      personalAnswers.ingrownNails.rightFoot?.dedao || personalAnswers.ingrownNails.leftFoot?.dedao
    );
    ingrownRegKey = hasDedaoIngrown ? 'Unhas-Encravadas-Dedao' : 'Unhas-Encravadas-Outros';
  }
  const ingrownReg = BANCO_PROVOCATIVO_IZN[ingrownRegKey] || BANCO_PROVOCATIVO_IZN['Unhas-Encravadas-Nenhum'] || defaultProvocative;

  const getNivel = (reg: any, lvl: number, fallback: string = '') => {
    return reg?.niveis?.[lvl] || defaultProvocative?.niveis?.[lvl] || fallback;
  };

  const shapeProvocativo =
    BANCO_PROVOCATIVO['Formato do Pé']?.[shapeKey] ||
    BANCO_PROVOCATIVO['Formato do Pé']['Egípcio'];

  const ratioProvocativo =
    BANCO_PROVOCATIVO['Tamanho dos Dedos']?.[ratioKey] ||
    BANCO_PROVOCATIVO['Tamanho dos Dedos']['Curtos'];

  const ratioDisplay = ratioResult?.classification?.startsWith('Dedos')
    ? ratioResult.classification
    : `Dedos ${ratioResult?.classification || 'Normais'}`;

  const summaryText = `Relatório da Análise dos Pés de ${targetName}\n` +
    `Formato: ${shapeResult.type}\n` +
    `Tamanho dos Dedos: ${ratioDisplay}\n` +
    `Unhas: ${nailsMap[personalAnswers.unhas] || personalAnswers.unhas}\n` +
    `Unhas Encravadas: ${getIngrownNailSummaryText()}\n` +
    `Joanetes: ${getJoanetesSummaryText()}\n` +
    `Calos: ${getCallusSummaryText()}\n` +
    `Dedos em Garra: ${getClawToeSummaryText()}`;

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    try {
      downloadReportPDF({
        targetName,
        imageUrl,
        shapeResult,
        ratioResult,
        personalAnswers,
      });

      showToast('PDF gerado com sucesso! Se o download não iniciou automaticamente, use o botão ao lado "Imprimir / Salvar como PDF".');
    } catch (err) {
      console.error('Erro ao gerar PDF nativo:', err);
      try {
        window.print();
      } catch (printErr) {
        showToast('Erro ao baixar PDF. Use o botão Copiar Resumo.');
      }
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(summaryText);
        showToast('Resumo copiado para a área de transferência!');
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = summaryText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Resumo copiado para a área de transferência!');
      }
    } catch (e) {
      showToast('Erro ao copiar texto.');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Relatório da Análise dos Pés de ${targetName}`,
          text: summaryText,
        });
        showToast('Compartilhado com sucesso!');
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }
    await handleCopySummary();
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-sm font-medium py-2.5 px-5 rounded-lg shadow-xl border border-slate-700 animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* Main Printable / Display Card */}
      <div
        id="report-printable-area"
        className="bg-white rounded-2xl shadow-xl border-2 border-emerald-300 p-6 sm:p-10 text-slate-800"
      >
        {/* Header */}
        <div className="text-center pb-6 mb-8 border-b border-slate-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Método Irmo Zuccato Neto
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-800 tracking-tight">
            Relatório de Análise da Personalidade pelos Pés
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-1">
            Análise personalizada para:{' '}
            <span className="font-bold text-teal-700">{targetName}</span>
          </p>
        </div>

        {/* Resumo da Análise & Foto */}
        <div className="flex flex-col md:flex-row print:flex-row gap-6 print:gap-4 items-stretch mb-8 print-avoid-break">
          <div className="flex-1 bg-slate-50/80 p-5 rounded-2xl border-2 border-slate-200/90 shadow-xs print:border print:border-slate-300">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>Resumo da Análise</span>
                <span className="text-xs font-normal text-slate-500">Mapeamento Físico</span>
              </h3>
              <button
                type="button"
                onClick={handleCopySummary}
                className="no-print inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                title="Copiar texto do resumo"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Resumo</span>
              </button>
            </div>
            <ul className="space-y-2.5 text-sm text-slate-700">
              <li className="flex justify-between items-center py-0.5 border-b border-slate-100">
                <span className="font-semibold text-slate-600">Formato:</span>
                <span className="font-bold text-slate-900">{shapeResult.type}</span>
              </li>
              <li className="flex justify-between items-center py-0.5 border-b border-slate-100">
                <span className="font-semibold text-slate-600">Tamanho dos Dedos:</span>
                <span className="font-bold text-slate-900">{ratioDisplay}</span>
              </li>
              <li className="flex justify-between items-center py-0.5 border-b border-slate-100">
                <span className="font-semibold text-slate-600">Unhas:</span>
                <span className="font-bold text-slate-900">{nailsMap[personalAnswers.unhas] || personalAnswers.unhas}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between py-1 bg-rose-50/70 px-2 rounded-lg border border-rose-200/60">
                <span className="font-bold text-rose-950">Unhas Encravadas:</span>
                <span className="font-bold text-rose-800 text-right sm:max-w-[65%] text-xs sm:text-sm">
                  {getIngrownNailSummaryText()}
                </span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between py-1 bg-slate-100/70 px-2 rounded-lg border-b border-slate-200/60">
                <span className="font-bold text-slate-900">Joanetes:</span>
                <span className="font-bold text-teal-800 text-right sm:max-w-[65%] text-xs sm:text-sm">
                  {getJoanetesSummaryText()}
                </span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between py-1 bg-slate-100/70 px-2 rounded-lg border-b border-slate-200/60">
                <span className="font-bold text-slate-900">Calos:</span>
                <span className="font-bold text-teal-800 text-right sm:max-w-[65%] text-xs sm:text-sm">
                  {getCallusSummaryText()}
                </span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between py-1 bg-slate-100/70 px-2 rounded-lg">
                <span className="font-bold text-slate-900">Dedos em Garra:</span>
                <span className="font-bold text-teal-800 text-right sm:max-w-[65%] text-xs sm:text-sm">
                  {getClawToeSummaryText()}
                </span>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-64 print:w-64 print:shrink-0 flex flex-col items-center justify-center p-4 bg-slate-50/80 rounded-2xl border-2 border-slate-200/90 shadow-xs print:border print:border-slate-300 print-avoid-break">
            <span className="text-xs font-semibold text-slate-500 mb-2">Imagem Analisada</span>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`Pé de ${targetName}`}
                className="rounded-xl shadow-md max-h-48 w-auto object-contain border-2 border-white print:max-h-44"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="h-40 w-full flex items-center justify-center bg-slate-200 rounded-xl text-slate-400 text-xs">
                Foto não disponível
              </div>
            )}
            <span className="text-[11px] text-slate-400 mt-2 text-center">Registrado para laudo</span>
          </div>
        </div>

        {/* Detailed Interpretive Report */}
        <div className="space-y-6 text-slate-800 leading-relaxed text-justify">
          <div className="bg-slate-50/80 border-2 border-slate-200/90 border-l-4 border-l-teal-600 p-5 rounded-2xl shadow-xs">
            <p className="text-base text-slate-800 font-medium">
              <strong>{targetName}</strong>, seus pés revelam muito sobre como você pensa, sente e age no mundo. Vamos juntos compreender essa linguagem silenciosa gravada em cada traço do seu corpo?
            </p>
          </div>

          {/* Formato do Pé - Reorganizado com Tabela de Referência */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm transition-all hover:border-teal-300">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-teal-600 ring-2 ring-teal-200"></span>
                <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Formato do Pé: {shapeResult.type}
                </h4>
              </div>
              <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                Categoria: Formato do Pé
              </span>
            </div>

            <div className="space-y-3 text-sm text-slate-700">
              <div>
                <span className="font-extrabold text-slate-900 text-xs uppercase tracking-wider block text-slate-500 mb-0.5">
                  Descrição Geral
                </span>
                <p className="leading-relaxed">
                  {shapeDesc || shapeTableRef.descricaoGeral}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/80">
                  <span className="font-bold text-xs uppercase tracking-wide text-emerald-800 flex items-center gap-1 mb-1">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    Pontos Fortes
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {shapeTableRef.pontosFortes}
                  </p>
                </div>

                <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80">
                  <span className="font-bold text-xs uppercase tracking-wide text-amber-800 flex items-center gap-1 mb-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                    Pontos Desafiadores
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {shapeTableRef.pontosDesafiadores}
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-100">
                Fundamento anatômico: {shapeResult.reasoning}
              </p>
            </div>
          </div>

          {/* Tamanho dos Dedos - Reorganizado com Tabela de Referência */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm transition-all hover:border-blue-300">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600 ring-2 ring-blue-200"></span>
                <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Tamanho dos Dedos: {ratioResult.classification}
                </h4>
              </div>
              <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                Proporção: {ratioResult.calculatedRatio.toFixed(3)}
              </span>
            </div>

            <div className="space-y-3 text-sm text-slate-700">
              <div>
                <span className="font-extrabold text-slate-900 text-xs uppercase tracking-wider block text-slate-500 mb-0.5">
                  Descrição Geral (Proporção)
                </span>
                <p className="leading-relaxed">
                  {ratioDesc || ratioTableRef.descricaoGeral}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/80">
                  <span className="font-bold text-xs uppercase tracking-wide text-emerald-800 flex items-center gap-1 mb-1">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    Pontos Fortes (Potenciais)
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {strongPoints || ratioTableRef.pontosFortes}
                  </p>
                </div>

                <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80">
                  <span className="font-bold text-xs uppercase tracking-wide text-amber-800 flex items-center gap-1 mb-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                    Pontos Desafiadores (Desafios)
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {challengingPoints || ratioTableRef.pontosDesafiadores}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tamanho das Unhas - Reorganizado com Tabela de Referência */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm transition-all hover:border-purple-300">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-600 ring-2 ring-purple-200"></span>
                <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Tamanho das Unhas: {nailsKey}
                </h4>
              </div>
              <span className="text-xs font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                Visibilidade: {nailsMap[personalAnswers.unhas] || personalAnswers.unhas}
              </span>
            </div>

            <div className="space-y-3 text-sm text-slate-700">
              <div>
                <span className="font-extrabold text-slate-900 text-xs uppercase tracking-wider block text-slate-500 mb-0.5">
                  Descrição Geral (Expressão Psicológica)
                </span>
                <p className="leading-relaxed">
                  {nailsDesc || nailsTableRef.descricaoGeral}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/80">
                  <span className="font-bold text-xs uppercase tracking-wide text-emerald-800 flex items-center gap-1 mb-1">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    Pontos Fortes
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {nailsTableRef.pontosFortes}
                  </p>
                </div>

                <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80">
                  <span className="font-bold text-xs uppercase tracking-wide text-amber-800 flex items-center gap-1 mb-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                    Pontos Desafiadores
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {nailsTableRef.pontosDesafiadores}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sinais Estruturais: Unhas Encravadas, Joanetes, Calos e Dedos em Garra */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border-2 border-slate-200/90 shadow-xs">
            <h4 className="text-base font-bold text-slate-900 mb-2 pb-1.5 border-b border-slate-200">
              Sinais Estruturais: Unhas Encravadas, Joanetes, Calos e Dedos em Garra
            </h4>
            <p className="text-sm text-slate-700 mb-1.5">
              <strong>Unhas Encravadas:</strong> <span className="font-bold text-teal-800">{getIngrownNailSummaryText()}</span> — {HEALTH_DATA['Unhas Encravadas']?.[hasIngrownNails ? 'Sim' : 'Não'] || ingrownNailsBaseDesc}
            </p>
            <p className="text-sm text-slate-700 mb-1.5">
              <strong>Joanetes:</strong> <span className="font-bold text-teal-800">{getJoanetesSummaryText()}</span> — {HEALTH_DATA['Joanetes']?.[hasJoanetes ? 'Sim' : 'Não'] || joanetesDesc}
            </p>
            <p className="text-sm text-slate-700 mb-1.5">
              <strong>Calos:</strong> <span className="font-bold text-teal-800">{getCallusSummaryText()}</span> — {HEALTH_DATA['Calos nos Dedos']?.[hasCalluses ? 'Sim' : 'Não'] || calosBaseDesc}
            </p>
            <p className="text-sm text-slate-700">
              <strong>Dedos em Garra:</strong> <span className="font-bold text-teal-800">{getClawToeSummaryText()}</span> — {HEALTH_DATA['Dedos em Garra']?.[hasClawToes ? 'Sim' : 'Não'] || clawToesBaseDesc}
            </p>
            <p className="mt-2 text-xs text-slate-500 italic">
              {!hasIngrownNails && !hasJoanetes && !hasCalluses && !hasClawToes
                ? 'A ausência dessas marcas e atritos indica boa plasticidade biológica e capacidade de fluir sem criar couraças de defesa ou apegos controladores.'
                : 'Essas marcas e posições nos pés sinalizam áreas onde o corpo endureceu a pele, curvou as articulações ou desviou sua estrutura para acomodar atritos emocionais, apegos ou sobrecargas que a mente ainda tenta manter sob controle.'}
            </p>
          </div>

          {/* NOVO BLOCO ENRIQUECIDO: DETALHAMENTO DAS UNHAS ENCRAVADAS POR DEDO E POR PÉ */}
          {hasDetailedIngrownNails && (
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-rose-50/60 via-slate-50 to-white border-2 border-rose-200/90 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-rose-200/80 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 shrink-0 shadow-xs">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-rose-950 uppercase tracking-wide">
                      Unhas Encravadas: {getIngrownNailSummaryText()}
                    </h4>
                    <p className="text-xs sm:text-sm text-rose-800/80 font-medium">
                      Convicções profundas e integridade pessoal — Leitura psicossomática por dedo
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-rose-800 bg-rose-100/90 px-3 py-1 rounded-full border border-rose-200">
                  Subcategoria: {ingrownTableKey}
                </span>
              </div>

              {/* Tabela de Referência Zuccato para Unhas Encravadas */}
              {ingrownTableRef && ingrownTableRef.descricaoGeral && (
                <div className="mb-5 bg-white p-4 rounded-xl border border-rose-200/90 shadow-xs">
                  <span className="font-extrabold text-xs uppercase tracking-wider block text-rose-900 mb-1">
                    Padrão Psicossomático Central ({ingrownTableKey})
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                    {ingrownTableRef.descricaoGeral}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200/70">
                      <span className="font-bold text-xs uppercase tracking-wide text-emerald-800 flex items-center gap-1 mb-0.5">
                        <Check className="w-3 h-3 text-emerald-700" />
                        Pontos Fortes
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {ingrownTableRef.pontosFortes}
                      </p>
                    </div>
                    <div className="bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/70">
                      <span className="font-bold text-xs uppercase tracking-wide text-amber-800 flex items-center gap-1 mb-0.5">
                        <ShieldAlert className="w-3 h-3 text-amber-700" />
                        Pontos Desafiadores
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {ingrownTableRef.pontosDesafiadores}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Unhas Encravadas no Pé Direito */}
              {rightIngrownToes.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-3 h-3 rounded-full bg-blue-600 ring-2 ring-blue-200"></span>
                    <h5 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-wide">
                      Pé Direito (Mundo Exterior, Ação, Trabalho & Futuro)
                    </h5>
                  </div>
                  <div className="space-y-3 pl-3 sm:pl-4 border-l-4 border-blue-400">
                    {rightIngrownToes.map((toeKey) => {
                      const item = TOE_INGROWN_NAIL_DATA[toeKey];
                      return (
                        <div key={`ingrown-report-right-${toeKey}`} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs transition-all hover:border-rose-300">
                          <div className="flex items-start justify-between flex-wrap gap-2 mb-1.5">
                            <span className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                              {item.name} <span className="text-xs font-semibold text-slate-500">({item.subname})</span>
                            </span>
                            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                              {item.rightFoot.theme}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2">
                            {item.rightFoot.description}
                          </p>
                          <div className="text-xs text-slate-800 bg-rose-50/70 p-2.5 rounded-lg mt-2.5 italic font-medium border border-rose-200/60 flex items-start gap-1.5">
                            <Sparkles className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                            <span><strong>Para refletir e desbloquear:</strong> {item.rightFoot.reflection}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Unhas Encravadas no Pé Esquerdo */}
              {leftIngrownToes.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-3 h-3 rounded-full bg-purple-600 ring-2 ring-purple-200"></span>
                    <h5 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-wide">
                      Pé Esquerdo (Mundo Íntimo, Afetivo, Família & Passado)
                    </h5>
                  </div>
                  <div className="space-y-3 pl-3 sm:pl-4 border-l-4 border-purple-400">
                    {leftIngrownToes.map((toeKey) => {
                      const item = TOE_INGROWN_NAIL_DATA[toeKey];
                      return (
                        <div key={`ingrown-report-left-${toeKey}`} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs transition-all hover:border-rose-300">
                          <div className="flex items-start justify-between flex-wrap gap-2 mb-1.5">
                            <span className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                              {item.name} <span className="text-xs font-semibold text-slate-500">({item.subname})</span>
                            </span>
                            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                              {item.leftFoot.theme}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2">
                            {item.leftFoot.description}
                          </p>
                          <div className="text-xs text-slate-800 bg-purple-50/70 p-2.5 rounded-lg mt-2.5 italic font-medium border border-purple-200/60 flex items-start gap-1.5">
                            <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                            <span><strong>Para refletir e desbloquear:</strong> {item.leftFoot.reflection}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* NOVO BLOCO ENRIQUECIDO: DETALHAMENTO DOS JOANETES POR PÉ */}
          {hasJoanetes && (rightJoanete || leftJoanete) && (
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50/60 via-slate-50 to-white border-2 border-amber-200/90 shadow-sm">
              <div className="flex items-center gap-3 pb-3 mb-4 border-b border-amber-200/80">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 shadow-xs">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-amber-950 uppercase tracking-wide">
                    Detalhamento dos Joanetes por Pé (Vínculos & Desvios)
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-800/80 font-medium">
                    Esforço inconsciente para manter vínculos afetivos e acomodação relacional
                  </p>
                </div>
              </div>

              {/* Visão de Ambos os Pés se presente */}
              {bothJoanetes && (
                <div className="mb-4 bg-white p-4 rounded-xl border border-amber-200 shadow-xs">
                  <span className="font-extrabold text-sm sm:text-base text-slate-900 block mb-1">
                    Padrão Bilateral: {JOANETES_MEANINGS.bothFeet.theme}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {JOANETES_MEANINGS.bothFeet.description}
                  </p>
                  <div className="text-xs text-slate-800 bg-amber-50/70 p-2.5 rounded-lg mt-2.5 italic font-medium border border-amber-200/60 flex items-start gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span><strong>Para refletir e desbloquear:</strong> {JOANETES_MEANINGS.bothFeet.reflection}</span>
                  </div>
                </div>
              )}

              {/* Joanete no Pé Direito */}
              {rightJoanete && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-blue-600 ring-2 ring-blue-200"></span>
                    <h5 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase">
                      Pé Direito — {JOANETES_MEANINGS.rightFoot.sphere}
                    </h5>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs pl-4 border-l-4 border-l-blue-600">
                    <span className="font-extrabold text-sm sm:text-base text-slate-900 block mb-1">
                      • {JOANETES_MEANINGS.rightFoot.theme}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                      {JOANETES_MEANINGS.rightFoot.description}
                    </p>
                    <div className="text-xs text-slate-800 bg-blue-50/70 p-2.5 rounded-lg mt-2.5 italic font-medium border border-blue-200/60 flex items-start gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Para refletir e desbloquear:</strong> {JOANETES_MEANINGS.rightFoot.reflection}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Joanete no Pé Esquerdo */}
              {leftJoanete && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-purple-600 ring-2 ring-purple-200"></span>
                    <h5 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase">
                      Pé Esquerdo — {JOANETES_MEANINGS.leftFoot.sphere}
                    </h5>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs pl-4 border-l-4 border-l-purple-600">
                    <span className="font-extrabold text-sm sm:text-base text-slate-900 block mb-1">
                      • {JOANETES_MEANINGS.leftFoot.theme}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                      {JOANETES_MEANINGS.leftFoot.description}
                    </p>
                    <div className="text-xs text-slate-800 bg-purple-50/70 p-2.5 rounded-lg mt-2.5 italic font-medium border border-purple-200/60 flex items-start gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span><strong>Para refletir e desbloquear:</strong> {JOANETES_MEANINGS.leftFoot.reflection}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* NOVO BLOCO ENRIQUECIDO: DETALHAMENTO DOS CALOS SELECIONADOS POR DEDO E POR PÉ */}
          {hasDetailedCalluses && (
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50/50 via-slate-50 to-white border-2 border-amber-300/90 shadow-sm">
              <div className="flex items-center gap-3 pb-3 mb-4 border-b border-amber-200/80">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 shadow-xs">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-amber-950 uppercase tracking-wide">
                    Detalhamento dos Calos Dedo a Dedo
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-800/80 font-medium">
                    Acúmulo de energia reprimida e atrito psicossomático identificado em cada dedo
                  </p>
                </div>
              </div>

              {/* Calos no Pé Direito */}
              {rightToesMarked.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-3 h-3 rounded-full bg-blue-600 ring-2 ring-blue-200"></span>
                    <h5 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-wide">
                      Pé Direito (Mundo Exterior, Ação, Trabalho & Futuro)
                    </h5>
                  </div>
                  <div className="space-y-3 pl-3 sm:pl-4 border-l-4 border-blue-400">
                    {rightToesMarked.map((toeKey) => {
                      const info = TOE_CALLUS_DATA[toeKey];
                      return (
                        <div key={`report-right-${toeKey}`} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs transition-all hover:border-amber-300">
                          <div className="flex items-start justify-between flex-wrap gap-2 mb-1.5">
                            <span className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                              {info.name} <span className="text-xs font-semibold text-slate-500">({info.subname})</span>
                            </span>
                            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                              {info.rightFoot.theme}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2">
                            {info.rightFoot.description}
                          </p>
                          <div className="text-xs text-slate-800 bg-amber-50/70 p-2.5 rounded-lg mt-2.5 italic font-medium border border-amber-200/60 flex items-start gap-1.5">
                            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                            <span><strong>Para refletir e desbloquear:</strong> {info.rightFoot.reflection}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Calos no Pé Esquerdo */}
              {leftToesMarked.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-3 h-3 rounded-full bg-purple-600 ring-2 ring-purple-200"></span>
                    <h5 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-wide">
                      Pé Esquerdo (Mundo Íntimo, Emoções, Família & Passado)
                    </h5>
                  </div>
                  <div className="space-y-3 pl-3 sm:pl-4 border-l-4 border-purple-400">
                    {leftToesMarked.map((toeKey) => {
                      const info = TOE_CALLUS_DATA[toeKey];
                      return (
                        <div key={`report-left-${toeKey}`} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs transition-all hover:border-amber-300">
                          <div className="flex items-start justify-between flex-wrap gap-2 mb-1.5">
                            <span className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                              {info.name} <span className="text-xs font-semibold text-slate-500">({info.subname})</span>
                            </span>
                            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                              {info.leftFoot.theme}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2">
                            {info.leftFoot.description}
                          </p>
                          <div className="text-xs text-slate-800 bg-purple-50/70 p-2.5 rounded-lg mt-2.5 italic font-medium border border-purple-200/60 flex items-start gap-1.5">
                            <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                            <span><strong>Para refletir e desbloquear:</strong> {info.leftFoot.reflection}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* NOVO BLOCO ENRIQUECIDO: DETALHAMENTO DOS DEDOS EM GARRA POR DEDO E POR PÉ */}
          {hasDetailedClawToes && (
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50/60 via-slate-50 to-white border-2 border-indigo-200/90 shadow-sm">
              <div className="flex items-center gap-3 pb-3 mb-4 border-b border-indigo-200/80">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 shrink-0 shadow-xs">
                  <Footprints className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-indigo-950 uppercase tracking-wide">
                    Detalhamento dos Dedos em Garra Dedo a Dedo
                  </h4>
                  <p className="text-xs sm:text-sm text-indigo-800/80 font-medium">
                    Dedos virados para baixo que se agarram ao chão por controle, insegurança ou retenção
                  </p>
                </div>
              </div>

              {/* Dedos em Garra no Pé Direito */}
              {rightClawToesMarked.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-3 h-3 rounded-full bg-blue-600 ring-2 ring-blue-200"></span>
                    <h5 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-wide">
                      Pé Direito (Mundo Exterior, Ação, Trabalho & Futuro)
                    </h5>
                  </div>
                  <div className="space-y-3 pl-3 sm:pl-4 border-l-4 border-blue-400">
                    {rightClawToesMarked.map((toeKey) => {
                      const info = TOE_CLAW_DATA[toeKey];
                      return (
                        <div key={`claw-report-right-${toeKey}`} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs transition-all hover:border-indigo-300">
                          <div className="flex items-start justify-between flex-wrap gap-2 mb-1.5">
                            <span className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span>
                              {info.name} <span className="text-xs font-semibold text-slate-500">({info.subname})</span>
                            </span>
                            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                              {info.rightFoot.theme}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2">
                            {info.rightFoot.description}
                          </p>
                          <div className="text-xs text-slate-800 bg-indigo-50/70 p-2.5 rounded-lg mt-2.5 italic font-medium border border-indigo-200/60 flex items-start gap-1.5">
                            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                            <span><strong>Para refletir e desbloquear:</strong> {info.rightFoot.reflection}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Dedos em Garra no Pé Esquerdo */}
              {leftClawToesMarked.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-3 h-3 rounded-full bg-purple-600 ring-2 ring-purple-200"></span>
                    <h5 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-wide">
                      Pé Esquerdo (Mundo Íntimo, Emoções, Família & Passado)
                    </h5>
                  </div>
                  <div className="space-y-3 pl-3 sm:pl-4 border-l-4 border-purple-400">
                    {leftClawToesMarked.map((toeKey) => {
                      const info = TOE_CLAW_DATA[toeKey];
                      return (
                        <div key={`claw-report-left-${toeKey}`} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs transition-all hover:border-indigo-300">
                          <div className="flex items-start justify-between flex-wrap gap-2 mb-1.5">
                            <span className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span>
                              {info.name} <span className="text-xs font-semibold text-slate-500">({info.subname})</span>
                            </span>
                            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                              {info.leftFoot.theme}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2">
                            {info.leftFoot.description}
                          </p>
                          <div className="text-xs text-slate-800 bg-purple-50/70 p-2.5 rounded-lg mt-2.5 italic font-medium border border-purple-200/60 flex items-start gap-1.5">
                            <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                            <span><strong>Para refletir e desbloquear:</strong> {info.leftFoot.reflection}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sensibilidade e Relação com o Corpo */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border-2 border-slate-200/90 shadow-xs">
            <h4 className="text-base font-bold text-slate-900 mb-2 pb-1.5 border-b border-slate-200">
              Sensibilidade e Integração Corporal
            </h4>
            <p className="text-sm text-slate-700 mb-2 leading-relaxed">
              <strong>Cócegas nos Pés ({personalAnswers.q1_tickles}):</strong>{' '}
              {personalAnswers.q1_tickles === 'Sim'
                ? ANALYSIS_DATA['Cócegas nos Pés']['Sim']
                : (ANALYSIS_DATA['Cócegas nos Pés'][personalAnswers.q1_tickles] || ANALYSIS_DATA['Cócegas nos Pés']['Não'])}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>Relação com os Pés ({personalAnswers.q2_relation}):</strong>{' '}
              {relationDesc}
            </p>
          </div>

          {/* NOVA SEÇÃO: INTEGRAÇÃO DOS CARACTERES DE REICH & DINÂMICAS SOMÁTICAS (TABELA DE REFERÊNCIA) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-500/30">
            <div className="flex items-center gap-3 pb-3 mb-4 border-b border-indigo-500/30">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-black tracking-wide text-indigo-100 uppercase">
                  Estrutura de Caráter & Couraças Corporais (Wilhelm Reich)
                </h4>
                <p className="text-xs sm:text-sm text-indigo-300 font-medium">
                  Mapeamento da organização neuromuscular, fluxo de energia vital e mecanismos de defesa
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-xs">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                  <span className="font-extrabold text-sm text-indigo-200 uppercase">
                    Predominância Psicoenergética: {shapeResult.type === 'Egípcio' ? 'Padrão Rígido / Perfeccionista' : shapeResult.type === 'Grego/Romano' ? 'Padrão Sistêmico / Estrategista' : 'Padrão Integrador / Utópico'}
                  </span>
                  <span className="text-[11px] font-semibold bg-indigo-400/20 text-indigo-200 px-2.5 py-0.5 rounded-full border border-indigo-400/30">
                    Segmentos de Couraça
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {shapeResult.type === 'Egípcio'
                    ? 'A couraça tende a se concentrar nos segmentos cervical, torácico e pélvico. A energia é direcionada para a cabeça e para a execução, mantendo o controle sobre as variáveis. A respiração tende a ser ritmada com foco na ação, guardando uma máscara de eficiência que protege a vulnerabilidade interna.'
                    : shapeResult.type === 'Grego/Romano'
                    ? 'A couraça tende a se concentrar nos segmentos ocular e cervical, com deslocamento da energia vital para a análise reflexiva. O corpo busca estabilidade através da estratégia e de planos meticulosos para evitar a imprevisibilidade emocional.'
                    : 'A couraça tende a se distribuir de forma difusa entre os segmentos torácico e pélvico, buscando integrar múltiplos estímulos mentais e emocionais, mantendo uma visão ampla como proteção contra a fragmentação.'}
                </p>
              </div>

              {/* Expressão do Amor, Afeto & Relações Interpessoais */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-xs">
                <div className="flex items-center gap-2 mb-2 text-rose-300 font-bold text-sm">
                  <HeartHandshake className="w-4 h-4 text-rose-400" />
                  <span>Dinâmica de Afeto e Relações Interpessoais</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {shapeResult.type === 'Egípcio'
                    ? 'Amor demonstrado através de atos de serviço, ordem e cuidados práticos objetivos. Constrói segurança mantendo compromissos claros e consistentes com o parceiro, precisando apenas permitir-se receber afeto sem sentir que precisa "merecê-lo" por desempenho.'
                    : shapeResult.type === 'Grego/Romano'
                    ? 'Amor expresso através de diálogo profundo, lealdade e planejamento compartilhado. Constrói intimidade através da sintonia intelectual e da cumplicidade em planos futuros, beneficiando-se da espontaneidade sem necessidade de roteiros perfeitos.'
                    : 'Amor vivido com visão integradora, acolhimento de diferenças e cumplicidade em projetos de vida. Busca um ideal elevado de conexão humana, transformando desafios relacionais em oportunidades de crescimento mútuo.'}
                </p>
              </div>

              {/* Sugestão de Equilíbrio Terapêutico */}
              <div className="bg-indigo-900/40 border border-indigo-400/30 p-3.5 rounded-xl text-indigo-100 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-xs uppercase tracking-wide block text-indigo-200 mb-0.5">
                    Chave Bioenergética de Integração
                  </span>
                  <p className="text-xs text-indigo-200/90 leading-relaxed">
                    Práticas de aterramento (pés descalços na terra ou grama), respiração diafragmática profunda e permissão para soltar o controle voluntário equilibram a descarga energética dos pés com a mente, restabelecendo a fluidez somática natural.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Radiografia Sem Filtros — Banco Provocativo IZN (Versão Osho & Jô Soares) */}
          <div className="mt-8 pt-6 border-t-2 border-amber-300">
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black uppercase tracking-wider mb-2">
                10 Níveis de Provocação Psicoemocional
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-amber-950 uppercase tracking-wide">
                Radiografia Sem Filtros
              </h4>
              <p className="text-xs sm:text-sm text-amber-800 font-medium max-w-xl mx-auto mt-1">
                O Raio-X Incômodo que Ninguém te Conta — Pelo olhar cáustico e profundo de <strong>Irmo Zuccato Neto</strong> (estilo Osho & Jô Soares)
              </p>
            </div>

            <div className="space-y-3.5 text-sm">
              {/* Nível 01 */}
              <div className="bg-slate-50/90 border-2 border-slate-200/90 border-l-4 border-l-sky-500 p-4 rounded-xl shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-black text-sky-900 text-xs uppercase tracking-wider">
                    Nível 01 • {shapeProvocativo.titulo1 || 'Observação Irônica'}
                  </span>
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                    LEVE
                  </span>
                </div>
                <p className="font-medium text-slate-800 text-sm sm:text-base leading-relaxed">
                  "{getNivel(shapeReg, 1) || shapeProvocativo.modo1}"
                </p>
              </div>

              {/* Nível 02 */}
              <div className="bg-slate-50/90 border-2 border-slate-200/90 border-l-4 border-l-blue-500 p-4 rounded-xl shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-black text-blue-900 text-xs uppercase tracking-wider">
                    Nível 02 • {shapeProvocativo.titulo2 || 'Ironia que Cutuca'}
                  </span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                    LEVE
                  </span>
                </div>
                <p className="font-medium text-slate-800 text-sm sm:text-base leading-relaxed">
                  "{getNivel(shapeReg, 2) || shapeProvocativo.modo2}"
                </p>
              </div>

              {/* Nível 03 */}
              <div className="bg-slate-50/90 border-2 border-slate-200/90 border-l-4 border-l-indigo-500 p-4 rounded-xl shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-black text-indigo-900 text-xs uppercase tracking-wider">
                    Nível 03 • {ratioProvocativo.titulo1 || 'Sarcasmo de Reconhecimento'}
                  </span>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                    MÉDIA
                  </span>
                </div>
                <p className="font-medium text-slate-800 text-sm sm:text-base leading-relaxed">
                  "{getNivel(ratioReg, 3) || ratioProvocativo.modo1}"
                </p>
              </div>

              {/* Nível 04 */}
              <div className="bg-slate-50/90 border-2 border-slate-200/90 border-l-4 border-l-amber-500 p-4 rounded-xl shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-black text-amber-900 text-xs uppercase tracking-wider">
                    Nível 04 • {shapeProvocativo.titulo3 || 'Contraste Dito vs Feito'}
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    MÉDIA
                  </span>
                </div>
                <p className="font-medium text-slate-800 text-sm sm:text-base leading-relaxed">
                  "{getNivel(shapeReg, 4) || shapeProvocativo.modo3}"
                </p>
              </div>

              {/* Nível 05 */}
              <div className="bg-slate-50/90 border-2 border-slate-200/90 border-l-4 border-l-orange-500 p-4 rounded-xl shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-black text-orange-900 text-xs uppercase tracking-wider">
                    Nível 05 • {ratioProvocativo.titulo2 || 'Desmancha a Pose'}
                  </span>
                  <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
                    MÉDIA
                  </span>
                </div>
                <p className="font-medium text-slate-800 text-sm sm:text-base leading-relaxed">
                  "{getNivel(ratioReg, 5) || getNivel(nailsReg, 5) || ratioProvocativo.modo2}"
                </p>
              </div>

              {/* Nível 06 */}
              <div className="bg-slate-50/90 border-2 border-slate-200/90 border-l-4 border-l-rose-500 p-4 rounded-xl shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-black text-rose-900 text-xs uppercase tracking-wider">
                    Nível 06 • {shapeProvocativo.titulo4 || 'Provocação no Osso'}
                  </span>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                    FORTE
                  </span>
                </div>
                <p className="font-medium text-slate-800 text-sm sm:text-base leading-relaxed">
                  "{getNivel(ratioReg, 6) || shapeProvocativo.modo4}"
                </p>
              </div>

              {/* Nível 07 */}
              <div className="bg-slate-50/90 border-2 border-slate-200/90 border-l-4 border-l-red-500 p-4 rounded-xl shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-black text-red-900 text-xs uppercase tracking-wider">
                    Nível 07 • {ratioProvocativo.titulo3 || 'Pergunta que Não Sai da Cabeça'}
                  </span>
                  <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                    FORTE
                  </span>
                </div>
                <p className="font-medium text-slate-800 text-sm sm:text-base leading-relaxed">
                  "{getNivel(shapeReg, 7) || ratioProvocativo.modo3}"
                </p>
              </div>

              {/* Nível 08 */}
              <div className="bg-slate-50/90 border-2 border-slate-200/90 border-l-4 border-l-purple-500 p-4 rounded-xl shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-black text-purple-900 text-xs uppercase tracking-wider">
                    Nível 08 • {shapeProvocativo.titulo5 || 'Sentença que Ecoa'}
                  </span>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                    FORTE
                  </span>
                </div>
                <p className="font-medium text-slate-800 text-sm sm:text-base leading-relaxed">
                  "{getNivel(ratioReg, 8) || shapeProvocativo.modo5}"
                </p>
              </div>

              {/* Nível 09 */}
              <div className="bg-slate-50/90 border-2 border-slate-200/90 border-l-4 border-l-violet-600 p-4 rounded-xl shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-black text-violet-900 text-xs uppercase tracking-wider">
                    Nível 09 • {ratioProvocativo.titulo5 || ratioProvocativo.titulo4 || 'Impacto Absoluto'}
                  </span>
                  <span className="text-[10px] font-bold text-violet-700 bg-violet-100 px-2 py-0.5 rounded-full">
                    IMPACTO
                  </span>
                </div>
                <p className="font-bold text-slate-900 text-sm sm:text-base leading-relaxed">
                  "{getNivel(shapeReg, 9) || ratioProvocativo.modo5 || ratioProvocativo.modo4}"
                </p>
              </div>

              {/* Nível 10 - O Golpe de Mestre */}
              <div className="bg-slate-900 text-white p-5 sm:p-6 rounded-2xl shadow-xl text-center mt-5 border-2 border-amber-400/80">
                <span className="inline-block px-3 py-0.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-2">
                  Nível 10 • {shapeProvocativo.titulo6 || 'O Golpe de Mestre — Suprema Ironia Final'}
                </span>
                <p className="text-base sm:text-lg font-black italic text-yellow-300 leading-snug">
                  "{getNivel(shapeReg, 10) || shapeProvocativo.modo6}"
                </p>
                {ratioProvocativo.modo6 && (
                  <p className="text-xs sm:text-sm text-slate-300 mt-3 pt-3 border-t border-slate-700/80 italic">
                    <strong className="text-amber-400">A Carapuça dos Dedos:</strong> "{ratioProvocativo.modo6}"
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Pontos Fortes e Desafiadores */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border-2 border-slate-200/90 shadow-xs mt-6">
            <h4 className="text-base font-bold text-slate-900 mb-2 pb-1.5 border-b border-slate-200">
              Pontos Fortes & Desafios Evolutivos
            </h4>
            <p className="text-sm text-slate-700 mb-2">
              Seus <strong>pontos fortes</strong> — <em>{strongPoints}</em> — são talentos naturais instalados na sua bagagem biográfica.
            </p>
            <p className="text-sm text-slate-700">
              O grande segredo do amadurecimento é usar essa base sólida para acolher e transformar seus{' '}
              <strong>pontos desafiadores</strong>: <em>{challengingPoints}</em>
            </p>
          </div>

          {/* Conclusão */}
          <div className="pt-4 border-t-2 border-emerald-200 text-xs text-slate-600">
            <p className="font-semibold text-slate-700 mb-2">
              A compreensão sobre si é o primeiro passo para a transformação real. Compreender como você pensa, sente e age é a jornada mais extraordinária de todas!
            </p>
            <div className="text-right mt-3 text-slate-800">
              <span className="text-xs text-slate-500 block">Com estima e respeito ao seu caminho,</span>
              <strong className="text-sm text-teal-900">Irmo Zuccato Neto</strong>
            </div>
          </div>

          {/* Botão para Infoprodutos */}
          <div className="pt-4 text-center">
            <a
              href="https://irmoneto.github.io/INFOPRODUTOS-BY-IRMONETO/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-[1.02] text-sm sm:text-base"
            >
              <span>CLIQUE AQUI E ACESSE MAIS CONTEÚDOS SOBRE O TEMA</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Action Buttons Below Report */}
      <div className="no-print mt-8 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3.5">
        <button
          type="button"
          onClick={handleDownloadPDF}
          disabled={isExporting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all cursor-pointer disabled:opacity-50"
          title="Baixar arquivo PDF completo"
        >
          <Download className="w-5 h-5" />
          <span>{isExporting ? 'Preparando PDF...' : 'Salvar Relatório (PDF)'}</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all cursor-pointer"
          title="Abrir diálogo de impressão do navegador ou salvar direto como PDF"
        >
          <Printer className="w-5 h-5" />
          <span>Imprimir / Salvar como PDF</span>
        </button>

        <button
          type="button"
          onClick={handleCopySummary}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all cursor-pointer"
          title="Copiar o resumo estruturado"
        >
          <Copy className="w-5 h-5" />
          <span>Copiar Resumo</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all cursor-pointer"
        >
          <Share2 className="w-5 h-5" />
          <span>Compartilhar</span>
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Nova Análise</span>
        </button>
      </div>
    </div>
  );
};
