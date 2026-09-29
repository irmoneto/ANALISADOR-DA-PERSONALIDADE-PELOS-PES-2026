import React, { useState } from 'react';
import { ShapeResult, RatioResult, PersonalAnswers, ToeKey } from '../types';
import { ANALYSIS_DATA, HEALTH_DATA, BANCO_PROVOCATIVO } from '../data/analysisData';
import { BANCO_PROVOCATIVO_IZN } from '../data/bancoProvocativoIZN';
import { TOE_CALLUS_DATA } from '../data/callusMeanings';
import { TOE_INGROWN_NAIL_DATA } from '../data/ingrownNailMeanings';
import { JOANETES_MEANINGS } from '../data/joanetesMeanings';
import { Download, Share2, RotateCcw, ExternalLink, Sparkles, Check, ShieldAlert } from 'lucide-react';

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
    ratioResult.classification.includes('Curtos') && !ratioResult.classification.includes('Normais')
      ? 'Curtos'
      : ratioResult.classification.includes('Longos') && !ratioResult.classification.includes('Normais')
      ? 'Longos'
      : ratioResult.classification.includes('Normais para Curtos')
      ? 'Normais para Curtos'
      : ratioResult.classification.includes('Normais para Longos')
      ? 'Normais para Longos'
      : 'Normais'
  ) as keyof typeof ANALYSIS_DATA['Tamanho dos Dedos'];

  const shapeKey = shapeResult.type as keyof typeof ANALYSIS_DATA['Formato do Pé'];
  const nailsKey = nailsKeyMap[personalAnswers.unhas] || 'Visível';

  const shapeDesc = ANALYSIS_DATA['Formato do Pé'][shapeKey] || '';
  const ratioDesc = ANALYSIS_DATA['Tamanho dos Dedos'][ratioKey] || '';
  const nailsDesc = ANALYSIS_DATA['Tamanho das Unhas'][nailsKey] || '';
  const strongPoints = ANALYSIS_DATA['Pontos Fortes'][ratioKey] || '';
  const challengingPoints = ANALYSIS_DATA['Pontos Desafiadores'][ratioKey] || '';

  const relationKey =
    personalAnswers.q2_relation === 'Muito Confortável' ? 'Confortável' : personalAnswers.q2_relation;
  const relationDesc = ANALYSIS_DATA['Relação com os Pés'][relationKey] || '';

  const hasIngrownNails = personalAnswers.ingrownNails?.hasIngrownNails === 'Sim';
  const rightIngrownToes = hasIngrownNails
    ? (Object.keys(personalAnswers.ingrownNails.rightFoot) as ToeKey[]).filter(
        (k) => personalAnswers.ingrownNails.rightFoot[k]
      )
    : [];
  const leftIngrownToes = hasIngrownNails
    ? (Object.keys(personalAnswers.ingrownNails.leftFoot) as ToeKey[]).filter(
        (k) => personalAnswers.ingrownNails.leftFoot[k]
      )
    : [];
  const hasDetailedIngrownNails = hasIngrownNails && (rightIngrownToes.length > 0 || leftIngrownToes.length > 0);

  const getIngrownNailSummaryText = () => {
    if (!hasIngrownNails) return 'Não';
    const parts: string[] = [];
    if (rightIngrownToes.length > 0) {
      const names = rightIngrownToes.map((k) => TOE_INGROWN_NAIL_DATA[k].name).join(', ');
      parts.push(`Pé Dir: ${names}`);
    }
    if (leftIngrownToes.length > 0) {
      const names = leftIngrownToes.map((k) => TOE_INGROWN_NAIL_DATA[k].name).join(', ');
      parts.push(`Pé Esq: ${names}`);
    }
    return parts.length > 0 ? `Sim (${parts.join(' | ')})` : 'Sim';
  };

  const ingrownNailsBaseDesc = HEALTH_DATA['Unhas Encravadas'][hasIngrownNails ? 'Sim' : 'Não'] || '';

  const hasJoanetes = personalAnswers.q3_joanetes.hasJoanetes === 'Sim';
  const rightJoanete = hasJoanetes && personalAnswers.q3_joanetes.rightFoot;
  const leftJoanete = hasJoanetes && personalAnswers.q3_joanetes.leftFoot;
  const bothJoanetes = rightJoanete && leftJoanete;

  const joanetesDesc = HEALTH_DATA['Joanetes'][hasJoanetes ? 'Sim' : 'Não'] || '';
  const calosBaseDesc = HEALTH_DATA['Calos nos Dedos'][personalAnswers.calluses.hasCalluses === 'Sim' ? 'Sim' : 'Não'] || '';

  const getJoanetesSummaryText = () => {
    if (!hasJoanetes) return 'Não';
    if (bothJoanetes) return 'Sim (Ambos os Pés)';
    if (rightJoanete) return 'Sim (Pé Direito)';
    if (leftJoanete) return 'Sim (Pé Esquerdo)';
    return 'Sim';
  };

  // Calculate detailed calluses
  const rightToesMarked = (Object.keys(personalAnswers.calluses.rightFoot) as ToeKey[]).filter(
    (k) => personalAnswers.calluses.rightFoot[k]
  );
  const leftToesMarked = (Object.keys(personalAnswers.calluses.leftFoot) as ToeKey[]).filter(
    (k) => personalAnswers.calluses.leftFoot[k]
  );
  const hasDetailedCalluses =
    personalAnswers.calluses.hasCalluses === 'Sim' && (rightToesMarked.length > 0 || leftToesMarked.length > 0);

  const getCallusSummaryText = () => {
    if (personalAnswers.calluses.hasCalluses !== 'Sim') return 'Não';
    const parts: string[] = [];
    if (rightToesMarked.length > 0) {
      const names = rightToesMarked.map((k) => TOE_CALLUS_DATA[k].name).join(', ');
      parts.push(`Pé Dir: ${names}`);
    }
    if (leftToesMarked.length > 0) {
      const names = leftToesMarked.map((k) => TOE_CALLUS_DATA[k].name).join(', ');
      parts.push(`Pé Esq: ${names}`);
    }
    return parts.length > 0 ? `Sim (${parts.join(' | ')})` : 'Sim';
  };

  // Banco provocativo selection (Aprimorado com Banco Provocativo IZN - Versão Osho & Jô Soares)
  const shapeReg = BANCO_PROVOCATIVO_IZN[shapeKey] || BANCO_PROVOCATIVO_IZN['Egípcio'];

  let ratioRegKey = 'Dedos-Normais';
  if (ratioKey === 'Curtos') ratioRegKey = 'Dedos-Curtos';
  else if (ratioKey === 'Normais para Curtos') ratioRegKey = 'Dedos-Normais-para-Curtos';
  else if (ratioKey === 'Normais para Longos') ratioRegKey = 'Dedos-Normais-para-Longos';
  else if (ratioKey === 'Longos') ratioRegKey = 'Dedos-Longos';
  const ratioReg = BANCO_PROVOCATIVO_IZN[ratioRegKey] || BANCO_PROVOCATIVO_IZN['Dedos-Normais'];

  let nailsRegKey = 'Unhas-Normais';
  if (personalAnswers.unhas === 'pouco-visiveis') nailsRegKey = 'Unhas-Pequenas';
  else if (personalAnswers.unhas === 'bem-visiveis') nailsRegKey = 'Unhas-Grandes';
  const nailsReg = BANCO_PROVOCATIVO_IZN[nailsRegKey] || BANCO_PROVOCATIVO_IZN['Unhas-Normais'];

  let ingrownRegKey = 'Unhas-Encravadas-Nenhum';
  if (hasIngrownNails) {
    const hasDedaoIngrown =
      personalAnswers.ingrownNails.rightFoot.dedao || personalAnswers.ingrownNails.leftFoot.dedao;
    ingrownRegKey = hasDedaoIngrown ? 'Unhas-Encravadas-Dedao' : 'Unhas-Encravadas-Outros';
  }
  const ingrownReg = BANCO_PROVOCATIVO_IZN[ingrownRegKey] || BANCO_PROVOCATIVO_IZN['Unhas-Encravadas-Nenhum'];

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    const element = document.getElementById('report-printable-area');
    if (!element) {
      setIsExporting(false);
      return;
    }

    try {
      const w = window as any;
      if (w.html2pdf) {
        const opt = {
          margin: [8, 8, 8, 8],
          filename: `Analise_dos_Pes_${targetName.replace(/\s+/g, '_')}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, logging: false },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        };
        await w.html2pdf().from(element).set(opt).save();
        showToast('PDF gerado e baixado com sucesso!');
      } else {
        window.print();
      }
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    const textToShare = `Relatório da Análise dos Pés de ${targetName}\n` +
      `Formato: ${shapeResult.type}\n` +
      `Tamanho dos Dedos: ${ratioResult.classification}\n` +
      `Unhas: ${nailsMap[personalAnswers.unhas] || personalAnswers.unhas}\n` +
      `Unhas Encravadas: ${getIngrownNailSummaryText()}\n` +
      `Joanetes: ${getJoanetesSummaryText()}\n` +
      `Calos: ${getCallusSummaryText()}\n\n` +
      `Metodologia por Irmo Zuccato Neto.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Análise dos Pés de ${targetName}`,
          text: textToShare,
        });
        showToast('Compartilhado com sucesso!');
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(textToShare);
      showToast('Resumo copiado para a área de transferência!');
    }
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
        <div className="flex flex-col md:flex-row gap-6 items-stretch mb-8">
          <div className="flex-1 bg-slate-50/80 p-5 rounded-2xl border-2 border-slate-200/90 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200 flex items-center justify-between">
              <span>Resumo dos Dados</span>
              <span className="text-xs font-normal text-slate-500">Mapeamento Físico</span>
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-700">
              <li className="flex justify-between items-center py-0.5 border-b border-slate-100">
                <span className="font-semibold text-slate-600">Formato do Pé:</span>
                <span className="font-bold text-slate-900">{shapeResult.type}</span>
              </li>
              <li className="flex justify-between items-center py-0.5 border-b border-slate-100">
                <span className="font-semibold text-slate-600">Tamanho dos Dedos:</span>
                <span className="font-bold text-slate-900">{ratioResult.classification}</span>
              </li>
              <li className="flex justify-between items-center py-0.5 border-b border-slate-100">
                <span className="font-semibold text-slate-600">Tamanho das Unhas:</span>
                <span className="font-bold text-slate-900">{nailsMap[personalAnswers.unhas] || personalAnswers.unhas}</span>
              </li>
              <li className="flex justify-between items-center py-0.5 border-b border-slate-100">
                <span className="font-semibold text-slate-600">Cócegas nos Pés:</span>
                <span className="font-bold text-slate-900">{personalAnswers.q1_tickles}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between py-1 bg-slate-100/70 px-2 rounded-lg border-b border-slate-200/60">
                <span className="font-bold text-slate-900">Unhas Encravadas:</span>
                <span className="font-bold text-teal-800 text-right sm:max-w-[65%] text-xs sm:text-sm">
                  {getIngrownNailSummaryText()}
                </span>
              </li>
              <li className="flex justify-between items-center py-0.5 border-b border-slate-100">
                <span className="font-semibold text-slate-600">Relação com os Pés:</span>
                <span className="font-bold text-slate-900">{personalAnswers.q2_relation}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between py-1 bg-slate-100/70 px-2 rounded-lg border-b border-slate-200/60">
                <span className="font-bold text-slate-900">Joanetes:</span>
                <span className="font-bold text-teal-800 text-right sm:max-w-[65%] text-xs sm:text-sm">
                  {getJoanetesSummaryText()}
                </span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between py-1 bg-slate-100/70 px-2 rounded-lg">
                <span className="font-bold text-slate-900">Calos nos Dedos:</span>
                <span className="font-bold text-teal-800 text-right sm:max-w-[65%] text-xs sm:text-sm">
                  {getCallusSummaryText()}
                </span>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-64 flex flex-col items-center justify-center p-4 bg-slate-50/80 rounded-2xl border-2 border-slate-200/90 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 mb-2">Imagem Analisada</span>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`Pé de ${targetName}`}
                className="rounded-xl shadow-md max-h-48 w-auto object-contain border-2 border-white"
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

          {/* Formato do Pé */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border-2 border-slate-200/90 shadow-xs">
            <h4 className="text-base font-bold text-slate-900 mb-2 pb-1.5 border-b border-slate-200">
              Formato do Pé: {shapeResult.type}
            </h4>
            <p className="text-sm text-slate-700">
              Seu formato de pé <strong>{shapeResult.type}</strong> traz a primeira pista sobre sua estrutura cognitiva e mental, com tendência a{' '}
              <em>{shapeDesc}</em>
            </p>
            <p className="text-xs text-slate-500 mt-2 italic">
              Fundamento anatômico: {shapeResult.reasoning}
            </p>
          </div>

          {/* Tamanho dos Dedos */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border-2 border-slate-200/90 shadow-xs">
            <h4 className="text-base font-bold text-slate-900 mb-2 pb-1.5 border-b border-slate-200">
              Tamanho dos Dedos: {ratioResult.classification}
            </h4>
            <p className="text-sm text-slate-700">
              A proporção dos seus dedos em relação ao peito do pé (proporção calculada: {ratioResult.calculatedRatio.toFixed(3)}) revela sua tendência inata para{' '}
              <em>{ratioDesc}</em>
            </p>
          </div>

          {/* Unhas */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border-2 border-slate-200/90 shadow-xs">
            <h4 className="text-base font-bold text-slate-900 mb-2 pb-1.5 border-b border-slate-200">
              Tamanho das Unhas: {nailsKey}
            </h4>
            <p className="text-sm text-slate-700">
              Suas unhas <strong>{nailsKey}</strong> mostram como você constrói e lida com suas certezas e convicções. Em geral, revelam{' '}
              <em>{nailsDesc}</em>
            </p>
          </div>

          {/* Sinais Estruturais: Unhas Encravadas, Joanetes e Calos Base */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border-2 border-slate-200/90 shadow-xs">
            <h4 className="text-base font-bold text-slate-900 mb-2 pb-1.5 border-b border-slate-200">
              Sinais Estruturais: Unhas Encravadas, Joanetes e Calos
            </h4>
            <p className="text-sm text-slate-700 mb-1.5">
              <strong>Unhas Encravadas:</strong> {ingrownNailsBaseDesc}
            </p>
            <p className="text-sm text-slate-700 mb-1.5">
              <strong>Joanetes:</strong> {joanetesDesc}
            </p>
            <p className="text-sm text-slate-700">
              <strong>Calos nos Dedos:</strong> {calosBaseDesc}
            </p>
            <p className="mt-2 text-xs text-slate-500 italic">
              {!hasIngrownNails && !hasJoanetes && personalAnswers.calluses.hasCalluses === 'Não'
                ? 'A ausência dessas marcas e atritos indica boa plasticidade biológica e capacidade de fluir sem criar couraças de defesa duradouras.'
                : 'Essas marcas nos pés sinalizam áreas onde o corpo endureceu a pele, inflamou as bordas ou desviou sua estrutura para acomodar atritos emocionais ou sobrecargas que a mente ainda não conseguiu expressar verbalmente.'}
            </p>
          </div>

          {/* NOVO BLOCO ENRIQUECIDO: DETALHAMENTO DAS UNHAS ENCRAVADAS POR DEDO E POR PÉ */}
          {hasDetailedIngrownNails && (
            <div className="p-5 rounded-2xl bg-slate-50/80 border-2 border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200">
                <ShieldAlert className="w-5 h-5 text-teal-700" />
                <div>
                  <h4 className="text-base font-black text-slate-900 uppercase tracking-wide">
                    Mapeamento Específico das Unhas Encravadas (Reflexologia Psicossomática)
                  </h4>
                  <p className="text-xs text-slate-600">
                    Leitura detalhada das convicções que ferem a si mesmo identificadas em cada dedo e pé
                  </p>
                </div>
              </div>

              {/* Unhas Encravadas no Pé Direito */}
              {rightIngrownToes.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    <h5 className="font-bold text-sm text-slate-900 uppercase">
                      Pé Direito (Mundo Exterior, Ação, Trabalho & Futuro)
                    </h5>
                  </div>
                  <div className="space-y-3 pl-3 border-l-2 border-blue-400">
                    {rightIngrownToes.map((toeKey) => {
                      const item = TOE_INGROWN_NAIL_DATA[toeKey];
                      return (
                        <div key={`ingrown-report-right-${toeKey}`} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                          <p className="font-bold text-sm text-slate-900">
                            • {item.name} ({item.subname}): {item.rightFoot.theme}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                            {item.rightFoot.description}
                          </p>
                          <p className="text-xs text-slate-800 bg-slate-50 p-2 rounded-lg mt-2 italic font-medium border border-slate-200/60">
                            <strong>Para refletir e desbloquear:</strong> {item.rightFoot.reflection}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Unhas Encravadas no Pé Esquerdo */}
              {leftIngrownToes.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                    <h5 className="font-bold text-sm text-slate-900 uppercase">
                      Pé Esquerdo (Mundo Íntimo, Afetivo, Família & Passado)
                    </h5>
                  </div>
                  <div className="space-y-3 pl-3 border-l-2 border-purple-400">
                    {leftIngrownToes.map((toeKey) => {
                      const item = TOE_INGROWN_NAIL_DATA[toeKey];
                      return (
                        <div key={`ingrown-report-left-${toeKey}`} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                          <p className="font-bold text-sm text-slate-900">
                            • {item.name} ({item.subname}): {item.leftFoot.theme}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                            {item.leftFoot.description}
                          </p>
                          <p className="text-xs text-slate-800 bg-slate-50 p-2 rounded-lg mt-2 italic font-medium border border-slate-200/60">
                            <strong>Para refletir e desbloquear:</strong> {item.leftFoot.reflection}
                          </p>
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
            <div className="p-5 rounded-2xl bg-slate-50/80 border-2 border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200">
                <ShieldAlert className="w-5 h-5 text-teal-700" />
                <div>
                  <h4 className="text-base font-black text-slate-900 uppercase tracking-wide">
                    Mapeamento Específico dos Joanetes (Leitura Somática & Vínculos)
                  </h4>
                  <p className="text-xs text-slate-600">
                    Interpretação reflexológica do desvio ósseo e acomodação relacional
                  </p>
                </div>
              </div>

              {/* Visão de Ambos os Pés se presente */}
              {bothJoanetes && (
                <div className="mb-4 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                  <p className="font-bold text-sm text-slate-900">
                    Padrão Bilateral: {JOANETES_MEANINGS.bothFeet.theme}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                    {JOANETES_MEANINGS.bothFeet.description}
                  </p>
                  <p className="text-xs text-slate-800 bg-slate-50 p-2 rounded-lg mt-2 italic font-medium border border-slate-200/60">
                    <strong>Para refletir e desbloquear:</strong> {JOANETES_MEANINGS.bothFeet.reflection}
                  </p>
                </div>
              )}

              {/* Joanete no Pé Direito */}
              {rightJoanete && (
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    <h5 className="font-bold text-sm text-slate-900 uppercase">
                      Pé Direito — {JOANETES_MEANINGS.rightFoot.sphere}
                    </h5>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs pl-3 border-l-4 border-l-blue-600">
                    <p className="font-bold text-sm text-slate-900">
                      • {JOANETES_MEANINGS.rightFoot.theme}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1.5 leading-relaxed">
                      {JOANETES_MEANINGS.rightFoot.description}
                    </p>
                    <p className="text-xs text-slate-800 bg-slate-50 p-2 rounded-lg mt-2 italic font-medium border border-slate-200/60">
                      <strong>Para refletir e desbloquear:</strong> {JOANETES_MEANINGS.rightFoot.reflection}
                    </p>
                  </div>
                </div>
              )}

              {/* Joanete no Pé Esquerdo */}
              {leftJoanete && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                    <h5 className="font-bold text-sm text-slate-900 uppercase">
                      Pé Esquerdo — {JOANETES_MEANINGS.leftFoot.sphere}
                    </h5>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs pl-3 border-l-4 border-l-purple-600">
                    <p className="font-bold text-sm text-slate-900">
                      • {JOANETES_MEANINGS.leftFoot.theme}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1.5 leading-relaxed">
                      {JOANETES_MEANINGS.leftFoot.description}
                    </p>
                    <p className="text-xs text-slate-800 bg-slate-50 p-2 rounded-lg mt-2 italic font-medium border border-slate-200/60">
                      <strong>Para refletir e desbloquear:</strong> {JOANETES_MEANINGS.leftFoot.reflection}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* NOVO BLOCO ENRIQUECIDO: DETALHAMENTO DOS CALOS SELECIONADOS POR DEDO E POR PÉ */}
          {hasDetailedCalluses && (
            <div className="p-5 rounded-2xl bg-slate-50/80 border-2 border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200">
                <ShieldAlert className="w-5 h-5 text-teal-700" />
                <div>
                  <h4 className="text-base font-black text-slate-900 uppercase tracking-wide">
                    Mapeamento Específico dos Calos (Reflexologia Psicossomática)
                  </h4>
                  <p className="text-xs text-slate-600">
                    Leitura detalhada dos pontos de atrito identificados em cada dedo e pé
                  </p>
                </div>
              </div>

              {/* Calos no Pé Direito */}
              {rightToesMarked.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    <h5 className="font-bold text-sm text-slate-900 uppercase">
                      Pé Direito (Mundo Exterior, Ação, Trabalho & Futuro)
                    </h5>
                  </div>
                  <div className="space-y-3 pl-3 border-l-2 border-blue-400">
                    {rightToesMarked.map((toeKey) => {
                      const info = TOE_CALLUS_DATA[toeKey];
                      return (
                        <div key={`report-right-${toeKey}`} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                          <p className="font-bold text-sm text-slate-900">
                            • {info.name} ({info.subname}) — <span className="font-semibold text-slate-700">{info.rightFoot.theme}</span>
                          </p>
                          <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                            {info.rightFoot.description}
                          </p>
                          <p className="text-xs text-slate-800 bg-slate-50 p-2 rounded-lg mt-2 italic font-medium border border-slate-200/60">
                            <strong>Para refletir e desbloquear:</strong> {info.rightFoot.reflection}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Calos no Pé Esquerdo */}
              {leftToesMarked.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                    <h5 className="font-bold text-sm text-slate-900 uppercase">
                      Pé Esquerdo (Mundo Íntimo, Emoções, Família & Passado)
                    </h5>
                  </div>
                  <div className="space-y-3 pl-3 border-l-2 border-purple-400">
                    {leftToesMarked.map((toeKey) => {
                      const info = TOE_CALLUS_DATA[toeKey];
                      return (
                        <div key={`report-left-${toeKey}`} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                          <p className="font-bold text-sm text-slate-900">
                            • {info.name} ({info.subname}) — <span className="font-semibold text-slate-700">{info.leftFoot.theme}</span>
                          </p>
                          <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                            {info.leftFoot.description}
                          </p>
                          <p className="text-xs text-slate-800 bg-slate-50 p-2 rounded-lg mt-2 italic font-medium border border-slate-200/60">
                            <strong>Para refletir e desbloquear:</strong> {info.leftFoot.reflection}
                          </p>
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
            <p className="text-sm text-slate-700 mb-1.5">
              {personalAnswers.q1_tickles === 'Sim' ? (
                <span>
                  A sensibilidade quanto às cócegas é um sinal refinado que{' '}
                  <em>indica um sistema nervoso altamente responsivo e uma ligação direta com memórias corporais primárias.</em>
                </span>
              ) : (
                <span>
                  A ausência de cócegas é um sinal de estabilidade que{' '}
                  <em>indica um sistema nervoso mais estável e previsível, com menor reatividade a estímulos sutis.</em>
                </span>
              )}
            </p>
            <p className="text-sm text-slate-700">
              Sua relação com os pés (<strong>{personalAnswers.q2_relation}</strong>) reflete seu grau de acolhimento físico e espontaneidade, pois{' '}
              <em>{relationDesc}</em>
            </p>
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
                    Nível 01 • Observação Irônica que Parece Elogio
                  </span>
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                    LEVE
                  </span>
                </div>
                <p className="font-medium text-slate-800 text-sm sm:text-base leading-relaxed">
                  "{shapeReg.niveis[1]}"
                </p>
              </div>

              {/* Nível 02 */}
              <div className="bg-slate-50/90 border-2 border-slate-200/90 border-l-4 border-l-blue-500 p-4 rounded-xl shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-black text-blue-900 text-xs uppercase tracking-wider">
                    Nível 02 • Ironia que Cutuca com Leveza e Humor
                  </span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                    LEVE
                  </span>
                </div>
                <p className="font-medium text-slate-800 text-sm sm:text-base leading-relaxed">
                  "{shapeReg.niveis[2]}"
                </p>
              </div>

              {/* Nível 03 */}
              <div className="bg-slate-50/90 border-2 border-slate-200/90 border-l-4 border-l-indigo-500 p-4 rounded-xl shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-black text-indigo-900 text-xs uppercase tracking-wider">
                    Nível 03 • Sarcasmo que Gera Reconhecimento Cáustico
                  </span>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                    MÉDIA
                  </span>
                </div>
                <p className="font-medium text-slate-800 text-sm sm:text-base leading-relaxed">
                  "{ratioReg.niveis[3]}"
                </p>
              </div>

              {/* Nível 04 */}
              <div className="bg-slate-50/90 border-2 border-slate-200/90 border-l-4 border-l-amber-500 p-4 rounded-xl shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-black text-amber-900 text-xs uppercase tracking-wider">
                    Nível 04 • Contraste Devastador entre o Dito e o Feito
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    MÉDIA
                  </span>
                </div>
                <p className="font-medium text-slate-800 text-sm sm:text-base leading-relaxed">
                  "{shapeReg.niveis[4]}"
                </p>
              </div>

              {/* Nível 05 */}
              <div className="bg-slate-50/90 border-2 border-slate-200/90 border-l-4 border-l-orange-500 p-4 rounded-xl shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-black text-orange-900 text-xs uppercase tracking-wider">
                    Nível 05 • Ironia que Desmancha a Pose e a Defesa
                  </span>
                  <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
                    MÉDIA
                  </span>
                </div>
                <p className="font-medium text-slate-800 text-sm sm:text-base leading-relaxed">
                  "{nailsReg.niveis[5]}"
                </p>
              </div>

              {/* Nível 06 */}
              <div className="bg-slate-50/90 border-2 border-slate-200/90 border-l-4 border-l-rose-500 p-4 rounded-xl shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-black text-rose-900 text-xs uppercase tracking-wider">
                    Nível 06 • Provocação Emocional que Atinge o Osso
                  </span>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                    FORTE
                  </span>
                </div>
                <p className="font-medium text-slate-800 text-sm sm:text-base leading-relaxed">
                  "{ratioReg.niveis[6]}"
                </p>
              </div>

              {/* Nível 07 */}
              <div className="bg-slate-50/90 border-2 border-slate-200/90 border-l-4 border-l-red-500 p-4 rounded-xl shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-black text-red-900 text-xs uppercase tracking-wider">
                    Nível 07 • A Pergunta que Não Sai da Cabeça de Jeito Nenhum
                  </span>
                  <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                    FORTE
                  </span>
                </div>
                <p className="font-medium text-slate-800 text-sm sm:text-base leading-relaxed">
                  "{shapeReg.niveis[7]}"
                </p>
              </div>

              {/* Nível 08 */}
              <div className="bg-slate-50/90 border-2 border-slate-200/90 border-l-4 border-l-purple-500 p-4 rounded-xl shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-black text-purple-900 text-xs uppercase tracking-wider">
                    Nível 08 • Sentença que Ecoa por Dias na Consciência
                  </span>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                    FORTE
                  </span>
                </div>
                <p className="font-medium text-slate-800 text-sm sm:text-base leading-relaxed">
                  "{ratioReg.niveis[8]}"
                </p>
              </div>

              {/* Nível 09 */}
              <div className="bg-slate-50/90 border-2 border-slate-200/90 border-l-4 border-l-violet-600 p-4 rounded-xl shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-black text-violet-900 text-xs uppercase tracking-wider">
                    Nível 09 • Frase de Impacto Absoluto
                  </span>
                  <span className="text-[10px] font-bold text-violet-700 bg-violet-100 px-2 py-0.5 rounded-full">
                    IMPACTO
                  </span>
                </div>
                <p className="font-bold text-slate-900 text-sm sm:text-base leading-relaxed">
                  "{shapeReg.niveis[9]}"
                </p>
              </div>

              {/* Nível 10 - O Golpe de Mestre */}
              <div className="bg-slate-900 text-white p-5 sm:p-6 rounded-2xl shadow-xl text-center mt-5 border-2 border-amber-400/80">
                <span className="inline-block px-3 py-0.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-2">
                  Nível 10 • O Golpe de Mestre — Suprema Ironia Final
                </span>
                <p className="text-base sm:text-lg font-black italic text-yellow-300 leading-snug">
                  "{shapeReg.niveis[10]}"
                </p>
                <p className="text-[11px] text-slate-400 mt-2 italic">
                  — Contradição Central: {shapeReg.contradicao}
                </p>
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
      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
          type="button"
          onClick={handleDownloadPDF}
          disabled={isExporting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all cursor-pointer disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          <span>{isExporting ? 'Preparando PDF...' : 'Salvar Relatório (PDF)'}</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all cursor-pointer"
        >
          <Share2 className="w-5 h-5" />
          <span>Compartilhar / Copiar</span>
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Realizar Nova Análise</span>
        </button>
      </div>
    </div>
  );
};
