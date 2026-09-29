import React, { useState, useRef, useEffect } from 'react';
import {
  Step,
  Point,
  ShapeResult,
  RatioResult,
  PersonalAnswers,
  CallusesState,
} from './types';
import { JoanetesState } from './data/joanetesMeanings';
import { IngrownNailsState } from './data/ingrownNailMeanings';
import { JoanetesSelector } from './components/JoanetesSelector';
import { CallusSelector } from './components/CallusSelector';
import { IngrownNailSelector } from './components/IngrownNailSelector';
import { QuestionHelpTooltip } from './components/QuestionHelpTooltip';
import { FootMeasurementCanvas } from './components/FootMeasurementCanvas';
import { ReportView } from './components/ReportView';
import {
  Camera,
  Upload,
  RotateCw,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  FileText,
  User,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

const GOLDEN_RATIO_IDEAL = 1.618;

const SHAPE_STEP_LABELS = [
  'Ponta do Hálux (Dedão)',
  'Ponta do 2º Dedo',
  'Ponta do 3º Dedo',
  'Ponta do 5º Dedo (Dedinho)',
];

const RATIO_STEP_LABELS = [
  'Ponta do 2º Dedo',
  'Base / Início do 2º Dedo',
  'Fim do Peito do Pé (em direção ao tornozelo)',
];

const INITIAL_INGROWN_NAILS: IngrownNailsState = {
  hasIngrownNails: '',
  rightFoot: {
    dedao: false,
    segundo: false,
    terceiro: false,
    quarto: false,
    dedinho: false,
  },
  leftFoot: {
    dedao: false,
    segundo: false,
    terceiro: false,
    quarto: false,
    dedinho: false,
  },
};

const INITIAL_JOANETES: JoanetesState = {
  hasJoanetes: '',
  rightFoot: false,
  leftFoot: false,
};

const INITIAL_CALLUSES: CallusesState = {
  hasCalluses: '',
  rightFoot: {
    dedao: false,
    segundo: false,
    terceiro: false,
    quarto: false,
    dedinho: false,
  },
  leftFoot: {
    dedao: false,
    segundo: false,
    terceiro: false,
    quarto: false,
    dedinho: false,
  },
};

const INITIAL_ANSWERS: PersonalAnswers = {
  unhas: 'visiveis',
  q1_tickles: 'Não',
  ingrownNails: INITIAL_INGROWN_NAILS,
  q2_relation: 'Confortável',
  q3_joanetes: INITIAL_JOANETES,
  calluses: INITIAL_CALLUSES,
};

export default function App() {
  const [step, setStep] = useState<Step>('splash');
  const [evaluatorName, setEvaluatorName] = useState('');
  const [targetType, setTargetType] = useState<'me' | 'client'>('me');
  const [clientName, setClientName] = useState('');
  const [persoError, setPersoError] = useState('');

  // Image & Points state
  const [imageUrl, setImageUrl] = useState<string>('');
  const [rotation, setRotation] = useState<number>(0);
  const [points, setPoints] = useState<Point[]>([]);
  const [canvasDimensions, setCanvasDimensions] = useState<{ width: number; height: number }>({ width: 600, height: 600 });

  // Results state
  const [shapeResult, setShapeResult] = useState<ShapeResult | null>(null);
  const [ratioResult, setRatioResult] = useState<RatioResult | null>(null);

  // Questionnaire state
  const [answers, setAnswers] = useState<PersonalAnswers>(INITIAL_ANSWERS);
  const [nailsSelection, setNailsSelection] = useState<'pouco-visiveis' | 'visiveis' | 'bem-visiveis'>('visiveis');
  const [questionsError, setQuestionsError] = useState('');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Target name for display
  const targetName = (targetType === 'client' ? clientName : evaluatorName).trim() || 'Avaliador';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result as string;
      setImageUrl(data);
      setRotation(0);
      setStep('preview');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRotate = (dir: 'left' | 'right') => {
    setRotation((prev) => (dir === 'left' ? (prev - 90) % 360 : (prev + 90) % 360));
  };

  const handleConfirmPhoto = () => {
    const img = new Image();
    img.onload = () => {
      if (rotation !== 0) {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d')!;
        if (Math.abs(rotation) === 90 || Math.abs(rotation) === 270) {
          tempCanvas.width = img.height;
          tempCanvas.height = img.width;
        } else {
          tempCanvas.width = img.width;
          tempCanvas.height = img.height;
        }
        tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
        tempCtx.rotate((rotation * Math.PI) / 180);
        tempCtx.drawImage(img, -img.width / 2, -img.height / 2);
        const rotatedData = tempCanvas.toDataURL('image/jpeg', 0.95);
        setImageUrl(rotatedData);
        prepareCanvasWithImage(rotatedData);
      } else {
        prepareCanvasWithImage(imageUrl);
      }
    };
    img.src = imageUrl;
  };

  const prepareCanvasWithImage = (src: string) => {
    setPoints([]);
    setStep('shape-instruction');
  };

  const isEgyptianHarmonic = (L1: number, L2: number, L3: number, L5: number) => {
    // REQUISITO DO USUÁRIO: Dedão (L1) deve ser dominante em pelo menos 4.5% sobre o segundo dedo (L2).
    // Para o Egípcio, o Dedão (L1) deve ser o dominante, e L1 > L2 * 1.045 é a regra principal.
    // L1 > L5 também é um indicador importante da forma geral.
    if (L1 > L2 * 1.045 && L1 > L5) {
      const d1 = L1 - L2;
      const d2 = L2 - L3;
      if (L2 > L3 && Math.abs(d1 - d2) / Math.max(d1, d2, 1) < 0.6) {
        return true;
      }
      if (L1 > L2 * 1.2 && L1 > L5 * 1.2) {
        return true;
      }
      return true;
    }
    return false;
  };

  const isSquareFoot = (L1: number, L2: number, L3: number, L5: number) => {
    // Lógica para o pé Quadrado (dedos centrais de tamanho similar)
    const max = Math.max(L1, L2, L3);
    const min = Math.min(L1, L2, L3);
    const range = max - min;

    // REQUISITO DO USUÁRIO: Se a variação entre os 3 primeiros dedos for no máximo 3% do dedo mais curto
    if (range / Math.max(min, 1) <= 0.03) return true;

    // Se L2 é o mais longo e L1 e L3 são similares (muito comum em Quadrado-Grego)
    if (L2 > L1 && L2 > L3 && Math.abs(L1 - L3) / Math.min(L1, L3, 1) < 0.15) return true;

    return false;
  };

  const calculateShapeResult = (currentPoints: Point[]) => {
    if (currentPoints.length < 4) return;
    const refY = (canvasDimensions.height > 0 ? canvasDimensions.height : 600) / 2;

    // L1 (Ponta do Hálux), L2 (Ponta do 2º Dedo), L3 (Ponta do 3º Dedo), L5 (Ponta do 5º Dedo)
    const [L1, L2, L3, L5] = [
      Math.abs(currentPoints[0].y - refY),
      Math.abs(currentPoints[1].y - refY),
      Math.abs(currentPoints[2].y - refY),
      Math.abs(currentPoints[3].y - refY),
    ];

    let shapeText: ShapeResult['type'] = 'Grego/Romano';
    let shapeEmoji = '🔍';
    let reasoning = 'O formato apresenta uma sequência que não se encaixa nos padrões Egípcio ou Quadrado, sendo classificado como uma variação do pé Grego/Romano, com tendência ao pensamento sistêmico e à visão global dos processos.';

    // 1. Prioridade: Egípcio
    if (isEgyptianHarmonic(L1, L2, L3, L5)) {
      shapeText = 'Egípcio';
      shapeEmoji = '🌟';
      reasoning = 'O dedão é dominante e há uma progressão de declínio perceptível nos dedos adjacentes, indicando predominância do pensamento linear e organização.';
    }
    // 2. Prioridade: Quadrado
    else if (isSquareFoot(L1, L2, L3, L5)) {
      shapeText = 'Quadrado';
      shapeEmoji = '🤖';
      reasoning = 'Os dedos centrais têm tamanhos muito semelhantes, com pouca variação, sugerindo uma estrutura de pensamento digital, com foco na integração e coerência entre as partes.';
    }
    // 3. Demais: Grego/Romano (inclui o dedo do meio mais longo)
    else {
      if (L2 > L1 && L2 > L3) {
        shapeText = 'Grego/Romano';
        shapeEmoji = '🔍';
        reasoning = 'O segundo dedo é o mais longo, uma característica forte do pé Grego, indicando predominância do pensamento sistêmico e detalhismo na elaboração de planos.';
      } else {
        shapeText = 'Grego/Romano';
        shapeEmoji = '🔍';
        reasoning = 'O formato apresenta uma sequência que não se encaixa nos padrões Egípcio ou Quadrado, sendo classificado como uma variação do pé Grego/Romano, com tendência ao pensamento sistêmico e à visão global dos processos.';
      }
    }

    setShapeResult({
      type: shapeText,
      emoji: shapeEmoji,
      reasoning,
      l1: L1,
      l2: L2,
      l3: L3,
      l5: L5,
    });
    setStep('shape-result');
  };

  const calculateRatioResult = (currentPoints: Point[]) => {
    if (currentPoints.length < 3) return;
    // pontos: [Ponta 2º, Base 2º, Fim Peito]
    const toeLength = Math.hypot(currentPoints[1].x - currentPoints[0].x, currentPoints[1].y - currentPoints[0].y);
    const footLength = Math.hypot(currentPoints[2].x - currentPoints[1].x, currentPoints[2].y - currentPoints[1].y);
    const ratio = footLength / toeLength;

    // classifyRatio original
    const diff = Math.abs(ratio - GOLDEN_RATIO_IDEAL) / GOLDEN_RATIO_IDEAL;
    let classification = 'Normais';
    let classificationKey = 'Normais';
    let colorClass = 'text-amber-600';

    if (diff <= 0.05) {
      classification = 'Normais (Análise do Tamanho dos Dedos)';
      classificationKey = 'Normais';
      colorClass = 'text-amber-600';
    } else if (ratio <= 2.0) {
      classification = 'Dedos Longos';
      classificationKey = 'Longos';
      colorClass = 'text-amber-500';
    } else if (ratio >= 3.0) {
      classification = 'Dedos Curtos';
      classificationKey = 'Curtos';
      colorClass = 'text-red-500';
    } else if (ratio > 2.5) {
      classification = 'Normais para Curtos';
      classificationKey = 'Normais para Curtos';
      colorClass = 'text-orange-500';
    } else {
      classification = 'Normais para Longos';
      classificationKey = 'Normais para Longos';
      colorClass = 'text-orange-500';
    }

    const proximity = 100 - (Math.min(Math.abs(ratio - GOLDEN_RATIO_IDEAL) / GOLDEN_RATIO_IDEAL, 1) * 100);

    setRatioResult({
      calculatedRatio: ratio,
      toeLength,
      footLength,
      classification,
      classificationKey,
      colorClass,
      progressPercent: Math.max(10, Math.min(100, proximity)),
    });
    setStep('ratio-result');
  };

  const handleStartAnalysis = () => {
    if (!evaluatorName.trim()) {
      setPersoError('Por favor, informe o seu nome para prosseguir.');
      return;
    }
    if (targetType === 'client' && !clientName.trim()) {
      setPersoError('Por favor, informe o nome do cliente.');
      return;
    }
    setPersoError('');
    setStep('upload');
  };

  const handleFinalReportGenerate = () => {
    if (!answers.ingrownNails.hasIngrownNails) {
      setQuestionsError('Por favor, responda se possui unhas encravadas.');
      return;
    }
    if (!answers.q3_joanetes.hasJoanetes) {
      setQuestionsError('Por favor, responda se possui joanetes.');
      return;
    }
    if (!answers.calluses.hasCalluses) {
      setQuestionsError('Por favor, responda se possui calos nos dedos.');
      return;
    }
    setQuestionsError('');
    setIsGeneratingReport(true);
    setTimeout(() => {
      setIsGeneratingReport(false);
      setStep('report');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  const handleFullRestart = () => {
    setStep('personalization');
    setImageUrl('');
    setPoints([]);
    setShapeResult(null);
    setRatioResult(null);
    setAnswers(INITIAL_ANSWERS);
    setNailsSelection('visiveis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-sky-50 to-blue-50 py-8 px-4 sm:px-6 flex flex-col items-center justify-start">
      {/* Top Header */}
      <header className="max-w-4xl w-full text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Analisador da Personalidade pelos Pés
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-wider uppercase mt-1">
          Metodologia & Psicosomática por Irmo Zuccato Neto
        </p>
      </header>

      {/* Main Content Card Container */}
      <main className="max-w-4xl w-full">
        {/* STEP 1: SPLASH SCREEN */}
        {step === 'splash' && (
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-200 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-5 rounded-full overflow-hidden shadow-md border-4 border-white bg-slate-100 flex items-center justify-center">
              <img
                src="https://raw.githubusercontent.com/irmoneto/Analisador-Personalidade-Pelos-P-s/main/IMAGENS%20APP/LOGO.jpg"
                alt="Logo Irmo Zuccato Neto"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <Sparkles className="w-10 h-10 text-teal-600" />
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 leading-snug">
              DESCUBRA COMO SEUS PÉS REVELAM SUA PERSONALIDADE
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-lg mx-auto">
              Compreenda porque você <strong>sempre pensa, sente e age</strong> da mesma maneira por meio do formato dos pés, razão áurea dos dedos, marcas e sinais corporais.
            </p>

            <button
              type="button"
              onClick={() => setStep('personalization')}
              className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-bold py-3.5 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105 inline-flex items-center gap-2 cursor-pointer text-base"
            >
              <span>Começar Análise</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-xs text-slate-400 mt-6">
              Ao continuar, você concorda com os{' '}
              <button
                type="button"
                onClick={() => setStep('legal')}
                className="text-teal-600 hover:underline cursor-pointer font-medium"
              >
                Termos de Uso e Política de Privacidade
              </button>
              .
            </p>
          </div>
        )}

        {/* STEP 2: PERSONALIZATION */}
        {step === 'personalization' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200 max-w-xl mx-auto">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 text-teal-700">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Vamos Começar...</h2>
              <p className="text-sm text-slate-500">Identificação para emissão do laudo personalizado</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Qual é o seu nome?
                </label>
                <input
                  type="text"
                  value={evaluatorName}
                  onChange={(e) => setEvaluatorName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Para quem é a análise?
                </label>
                <select
                  value={targetType}
                  onChange={(e) => setTargetType(e.target.value as 'me' | 'client')}
                  className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white text-slate-900"
                >
                  <option value="me">Para mim mesmo(a)</option>
                  <option value="client">Para um(a) cliente / outra pessoa</option>
                </select>
              </div>

              {targetType === 'client' && (
                <div className="animate-fade-in">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Nome do(a) Cliente:
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Nome completo do cliente"
                    className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-slate-900"
                  />
                </div>
              )}

              {persoError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {persoError}
                </div>
              )}

              <button
                type="button"
                onClick={handleStartAnalysis}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Prosseguir para a Foto do Pé</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: UPLOAD */}
        {step === 'upload' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200 text-center max-w-xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              Adicione a foto do pé de <span className="text-teal-600">{targetName}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              A foto deve ser nítida, tirada de cima e com o pé reto sobre uma superfície plana:
            </p>

            <div className="mb-6 max-w-xs mx-auto rounded-xl overflow-hidden border-2 border-slate-200 shadow-sm bg-slate-50 p-2">
              <img
                src="https://raw.githubusercontent.com/irmoneto/Analisador-Personalidade-Pelos-P-s/main/IMAGENS%20APP/EXEMPLO%2002.PNG"
                alt="Exemplo de foto para análise"
                className="w-full h-auto rounded-lg object-contain max-h-56 mx-auto"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-[11px] text-slate-400 block mt-1">Exemplo de enquadramento ideal</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <label className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition-colors cursor-pointer inline-flex items-center justify-center gap-2 text-sm">
                <Camera className="w-4 h-4" />
                <span>Tirar Foto</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <label className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition-colors cursor-pointer inline-flex items-center justify-center gap-2 text-sm">
                <Upload className="w-4 h-4" />
                <span>Fazer Upload do Arquivo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <button
              type="button"
              onClick={() => setStep('personalization')}
              className="mt-6 text-xs text-slate-500 hover:text-slate-700 inline-flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar para Identificação</span>
            </button>
          </div>
        )}

        {/* STEP 4: PREVIEW & ROTATION */}
        {step === 'preview' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200 text-center max-w-xl mx-auto">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Confirme o Enquadramento</h2>
            <p className="text-xs text-slate-500 mb-4">
              Gire se necessário para que os dedos fiquem voltados para cima.
            </p>

            <div className="max-w-md mx-auto mb-6 bg-slate-900 rounded-xl p-2 flex items-center justify-center min-h-[260px] overflow-hidden">
              <img
                src={imageUrl}
                alt="Pré-visualização do pé"
                style={{ transform: `rotate(${rotation}deg)` }}
                className="max-h-72 w-auto object-contain transition-transform duration-300 rounded"
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleRotate('left')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg text-xs inline-flex items-center gap-1.5 cursor-pointer border border-slate-300"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Girar Esquerda
                </button>
                <button
                  type="button"
                  onClick={() => handleRotate('right')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg text-xs inline-flex items-center gap-1.5 cursor-pointer border border-slate-300"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Girar Direita
                </button>
              </div>

              <div className="flex justify-center gap-3 mt-2">
                <label className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-full shadow cursor-pointer text-sm">
                  Trocar Foto
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
                <button
                  type="button"
                  onClick={handleConfirmPhoto}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 cursor-pointer text-sm"
                >
                  Usar Esta Foto
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: SHAPE INSTRUCTIONS */}
        {step === 'shape-instruction' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-dashed border-blue-300 text-center max-w-xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              Instruções: Análise do Formato do Pé
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              Na próxima tela, você irá clicar exatamente nas <strong>pontas de 4 dedos</strong>:
            </p>

            <div className="bg-blue-50 text-blue-900 p-3 rounded-lg text-xs text-left mb-5 space-y-1 border border-blue-200">
              <p><strong>1. Ponta do Hálux</strong> (Dedão)</p>
              <p><strong>2. Ponta do 2º Dedo</strong> (ao lado do dedão)</p>
              <p><strong>3. Ponta do 3º Dedo</strong> (dedo central)</p>
              <p><strong>4. Ponta do 5º Dedo</strong> (Dedinho / Mindinho)</p>
            </div>

            <div className="max-w-xs mx-auto mb-6 rounded-lg overflow-hidden border border-slate-200">
              <img
                src="https://raw.githubusercontent.com/irmoneto/Analisador-Personalidade-Pelos-P-s/main/IMAGENS%20APP/EXEMPLO%20F%20P%C3%89S.PNG"
                alt="Instruções de pontos"
                className="w-full h-auto"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setStep('preview')}
                className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2.5 px-6 rounded-full text-sm cursor-pointer"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => {
                  setPoints([]);
                  setStep('shape-measurement');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-8 rounded-full text-sm shadow-md transition-transform transform hover:scale-105 cursor-pointer"
              >
                Entendi, Começar Marcações
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: SHAPE MEASUREMENT CANVAS */}
        {step === 'shape-measurement' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Passo 1/2: Marque o Formato do Pé
                </h2>
                <p className="text-xs text-slate-500">
                  {points.length < SHAPE_STEP_LABELS.length
                    ? `Clique exatamente na: ${SHAPE_STEP_LABELS[points.length]}`
                    : '4 pontos marcados! Processando o formato...'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPoints([])}
                className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 px-3 rounded-lg border border-slate-300 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refazer Pontos
              </button>
            </div>

            <FootMeasurementCanvas
              imageUrl={imageUrl}
              points={points}
              maxPoints={4}
              step="shape-measurement"
              onDimensionsChange={(dims) => setCanvasDimensions(dims)}
              onAddPoint={(newPoint) => {
                const updated = [...points, newPoint];
                setPoints(updated);
                if (updated.length >= 4) {
                  setTimeout(() => {
                    calculateShapeResult(updated);
                  }, 400);
                }
              }}
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              {SHAPE_STEP_LABELS.map((lbl, i) => {
                const isDone = points.length > i;
                const isCurrent = points.length === i;
                return (
                  <div
                    key={lbl}
                    className={`p-2 rounded-lg text-xs text-center border font-medium transition-colors ${
                      isDone
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : isCurrent
                        ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    {i + 1}. {lbl.split(' ')[2] || lbl}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep('shape-instruction')}
                className="text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
              >
                Voltar às instruções
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: SHAPE RESULT */}
        {step === 'shape-result' && shapeResult && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-blue-200 text-center max-w-2xl mx-auto">
            <span className="text-4xl sm:text-5xl block mb-2">{shapeResult.emoji}</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-1">
              Formato Identificado: {shapeResult.type}
            </h2>
            <p className="text-sm text-slate-600 mb-6 max-w-lg mx-auto leading-relaxed">
              {shapeResult.reasoning}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-left">
              <div>
                <span className="text-xs text-slate-500 block">Dedão (L1):</span>
                <span className="font-bold text-slate-800 text-sm">{shapeResult.l1.toFixed(1)} px</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">2º Dedo (L2):</span>
                <span className="font-bold text-slate-800 text-sm">{shapeResult.l2.toFixed(1)} px</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">3º Dedo (L3):</span>
                <span className="font-bold text-slate-800 text-sm">{shapeResult.l3.toFixed(1)} px</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Dedinho (L5):</span>
                <span className="font-bold text-slate-800 text-sm">{shapeResult.l5.toFixed(1)} px</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-red-50 border border-red-200 mb-6">
              <p className="text-sm font-bold text-red-900 mb-1">Próxima Etapa Fundamental:</p>
              <p className="text-xs text-red-700">
                Agora vamos analisar o <strong>comprimento dos dedos (Razão Áurea)</strong> para revelar sua velocidade de ação e profundidade de reflexão.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setPoints([]);
                  setStep('shape-measurement');
                }}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-full text-sm cursor-pointer"
              >
                Refazer Marcações do Formato
              </button>
              <button
                type="button"
                onClick={() => setStep('ratio-instruction')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-sm shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
              >
                Analisar Tamanho dos Dedos
              </button>
            </div>
          </div>
        )}

        {/* STEP 8: RATIO INSTRUCTIONS */}
        {step === 'ratio-instruction' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-dashed border-amber-300 text-center max-w-xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              Instruções: Razão dos Dedos
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              Você fará <strong>TRÊS marcações</strong> consecutivas na mesma imagem:
            </p>

            <div className="bg-amber-50 text-amber-950 p-3 rounded-lg text-xs text-left mb-5 space-y-1.5 border border-amber-200">
              <p><strong>1. Ponta do 2º Dedo</strong> (ao lado do dedão)</p>
              <p><strong>2. Início / Base do 2º Dedo</strong> (onde ele se conecta ao pé)</p>
              <p><strong>3. Fim do Peito do Pé</strong> (região mais saliente antes da dobra do tornozelo)</p>
            </div>

            <div className="max-w-xs mx-auto mb-6 rounded-lg overflow-hidden border border-slate-200">
              <img
                src="https://raw.githubusercontent.com/irmoneto/Analisador-Personalidade-Pelos-P-s/main/IMAGENS%20APP/EXEMPLO%20T%20DEDOS.jpeg"
                alt="Exemplo proporção dedos"
                className="w-full h-auto"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setStep('shape-result')}
                className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2.5 px-6 rounded-full text-sm cursor-pointer"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => {
                  setPoints([]);
                  setStep('ratio-measurement');
                }}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-8 rounded-full text-sm shadow-md transition-transform transform hover:scale-105 cursor-pointer"
              >
                Entendi, Começar Medição
              </button>
            </div>
          </div>
        )}

        {/* STEP 9: RATIO MEASUREMENT CANVAS */}
        {step === 'ratio-measurement' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Passo 2/2: Medição do 2º Dedo & Peito do Pé
                </h2>
                <p className="text-xs text-slate-500">
                  {points.length < RATIO_STEP_LABELS.length
                    ? `Clique no ponto ${points.length + 1}: ${RATIO_STEP_LABELS[points.length]}`
                    : '3 pontos marcados! Calculando proporção áurea...'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPoints([])}
                className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 px-3 rounded-lg border border-slate-300 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refazer Pontos
              </button>
            </div>

            <FootMeasurementCanvas
              imageUrl={imageUrl}
              points={points}
              maxPoints={3}
              step="ratio-measurement"
              onDimensionsChange={(dims) => setCanvasDimensions(dims)}
              onAddPoint={(newPoint) => {
                const updated = [...points, newPoint];
                setPoints(updated);
                if (updated.length >= 3) {
                  setTimeout(() => {
                    calculateRatioResult(updated);
                  }, 400);
                }
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
              {RATIO_STEP_LABELS.map((lbl, i) => {
                const isDone = points.length > i;
                const isCurrent = points.length === i;
                return (
                  <div
                    key={lbl}
                    className={`p-2 rounded-lg text-xs text-center border font-medium transition-colors ${
                      isDone
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : isCurrent
                        ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    {i + 1}. {lbl}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 10: RATIO RESULT */}
        {step === 'ratio-result' && ratioResult && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-amber-200 text-center max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
              Resultado: Tamanho dos Dedos
            </h2>
            <div className={`text-4xl font-extrabold my-3 ${ratioResult.colorClass}`}>
              {ratioResult.classification}
            </div>

            <div className="max-w-md mx-auto space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-left mb-6">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Razão Calculada (Peito / Dedo):</span>
                <span className="font-bold text-slate-900">{ratioResult.calculatedRatio.toFixed(3)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Comprimento do 2º Dedo:</span>
                <span className="font-bold text-slate-900">{ratioResult.toeLength.toFixed(1)} px</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Comprimento do Peito do Pé:</span>
                <span className="font-bold text-slate-900">{ratioResult.footLength.toFixed(1)} px</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Razão Áurea Ideal:</span>
                <span className="font-bold text-amber-600">1.618</span>
              </div>
            </div>

            <div className="mb-6 max-w-md mx-auto">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Proximidade com a Proporção Áurea</span>
                <span className="font-bold">{ratioResult.progressPercent.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-amber-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${ratioResult.progressPercent}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setPoints([]);
                  setStep('ratio-measurement');
                }}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-full text-sm cursor-pointer"
              >
                Refazer Medição
              </button>
              <button
                type="button"
                onClick={() => setStep('nails-question')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-sm shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
              >
                Ir para Análise das Unhas
              </button>
            </div>
          </div>
        )}

        {/* STEP 11: NAILS QUESTION */}
        {step === 'nails-question' && (
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-200 text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-slate-900">Análise das Unhas dos Pés</h2>
              <QuestionHelpTooltip
                title="Tamanho e Visibilidade das Unhas"
                explanation="Segundo Irmo Zuccato Neto, as unhas revelam o sistema de crenças e a convicção pessoal. Unhas pouco visíveis indicam abertura para verdades externas; visíveis expressam equilíbrio; e bem visíveis mostram forte apego às próprias verdades e firmeza autoconfiante."
              />
            </div>
            <p className="text-sm text-slate-600 mb-6">
              As unhas refletem como você lida com suas certezas e convicções internas:
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
              <div className="w-full sm:w-1/2 rounded-xl overflow-hidden border-2 border-slate-200 p-1 bg-slate-50">
                <img
                  src="https://raw.githubusercontent.com/irmoneto/Analisador-Personalidade-Pelos-P-s/main/IMAGENS%20APP/TAMANHO%20UNHAS.png"
                  alt="Referência de unhas"
                  className="w-full h-auto rounded"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="text-[11px] text-slate-400 block mt-1">Exemplos de visibilidade</span>
              </div>
            </div>

            <p className="text-sm font-semibold text-slate-800 mb-3">
              Na sua percepção, a maioria das suas unhas dos pés são:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {[
                { val: 'pouco-visiveis', label: 'POUCO VISÍVEIS', desc: 'Pequenas ou quase imperceptíveis' },
                { val: 'visiveis', label: 'VISÍVEIS', desc: 'Tamanho padrão e equilibrado' },
                { val: 'bem-visiveis', label: 'BEM VISÍVEIS', desc: 'Grandes, marcadas e evidentes' },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.val}
                  onClick={() => setNailsSelection(opt.val as any)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    nailsSelection === opt.val
                      ? 'bg-purple-50 border-purple-500 text-purple-900 shadow-sm ring-2 ring-purple-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block font-bold text-sm">{opt.label}</span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">{opt.desc}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setStep('ratio-result')}
                className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2.5 px-6 rounded-full text-sm cursor-pointer"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => {
                  setAnswers((prev) => ({ ...prev, unhas: nailsSelection }));
                  setStep('personal-questions');
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-8 rounded-full text-sm shadow-md transition-transform transform hover:scale-105 cursor-pointer"
              >
                Perguntas Finais
              </button>
            </div>
          </div>
        )}

        {/* STEP 12: PERSONAL QUESTIONS (WITH CALLUS SELECTOR ENHANCEMENT) */}
        {step === 'personal-questions' && (
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-200 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                Perguntas Complementares
              </h2>
              <p className="text-sm text-slate-600">
                Responda com sinceridade para calibrar o relatório somático de{' '}
                <span className="font-bold text-teal-700">{targetName}</span>
              </p>
            </div>

            <form className="space-y-6">
              {/* Pergunta 1: Cócegas */}
              <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border-2 border-purple-200/80 shadow-xs transition-colors hover:border-purple-300">
                <div className="flex items-center justify-between mb-3 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                      1
                    </span>
                    <label className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      Você tem cócegas nos pés?
                    </label>
                  </div>
                  <QuestionHelpTooltip
                    title="Pergunta 1: Cócegas nos Pés"
                    explanation="No método de Irmo Zuccato Neto, a resposta a cócegas revela o grau de reatividade do sistema nervoso central e a preservação de memórias corporais primárias de defesa e vulnerabilidade. Pessoas com cócegas têm maior sensibilidade límbica e rápida prontidão sensorial."
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {(['Sim', 'Não'] as const).map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setAnswers((prev) => ({ ...prev, q1_tickles: opt }))}
                      className={`p-3 rounded-xl border font-semibold text-sm transition-all cursor-pointer text-center ${
                        answers.q1_tickles === opt
                          ? 'bg-purple-600 border-purple-600 text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-purple-50/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pergunta 2: Unhas Encravadas */}
              <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border-2 border-purple-200/80 shadow-xs transition-colors hover:border-purple-300">
                <div className="flex items-center justify-between mb-3 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                      2
                    </span>
                    <label className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      Você tem unhas encravadas?
                    </label>
                  </div>
                  <QuestionHelpTooltip
                    title="Pergunta 2: Unhas Encravadas"
                    explanation="Pelo Método Zuccato, a unha encravada representa uma convicção ou verdade íntima que, ao não encontrar espaço de manifestação no ambiente, acaba ferindo a própria carne. Indica culpa inconsciente, repressão de vontades legítimas ou resistência dolorosa a imposições externas."
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {(['Sim', 'Não'] as const).map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => {
                        setAnswers((prev) => ({
                          ...prev,
                          ingrownNails: {
                            ...prev.ingrownNails,
                            hasIngrownNails: opt,
                            // If Não, reset selections
                            rightFoot: opt === 'Não' ? INITIAL_INGROWN_NAILS.rightFoot : prev.ingrownNails.rightFoot,
                            leftFoot: opt === 'Não' ? INITIAL_INGROWN_NAILS.leftFoot : prev.ingrownNails.leftFoot,
                          },
                        }));
                      }}
                      className={`p-3 rounded-xl border font-semibold text-sm transition-all cursor-pointer text-center ${
                        answers.ingrownNails.hasIngrownNails === opt
                          ? 'bg-purple-600 border-purple-600 text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-purple-50/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {/* Se a pessoa responder SIM: ABRIR DUAS COLUNAS COM OS DEDOS DE CADA PÉ */}
                {answers.ingrownNails.hasIngrownNails === 'Sim' && (
                  <div className="animate-fade-in">
                    <IngrownNailSelector
                      value={answers.ingrownNails}
                      onChange={(updated) => {
                        setAnswers((prev) => ({
                          ...prev,
                          ingrownNails: updated,
                        }));
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Pergunta 3: Relação com os pés */}
              <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border-2 border-purple-200/80 shadow-xs transition-colors hover:border-purple-300">
                <div className="flex items-center justify-between mb-3 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                      3
                    </span>
                    <label className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      Qual sua relação com os pés?
                    </label>
                  </div>
                  <QuestionHelpTooltip
                    title="Pergunta 3: Relação com os Próprios Pés"
                    explanation="Expressa a autoaceitação corporal e a conexão instintiva com o enraizamento e a sensualidade. O desconforto em expor os pés sinaliza censura e autocrítica profunda, enquanto o conforto reflete segurança e naturalidade perante o mundo."
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { val: 'Desconfortável', desc: 'Insegurança com meus pés' },
                    { val: 'Neutro', desc: 'Indiferente / sem atenção especial' },
                    { val: 'Confortável', desc: 'À vontade com meu corpo' },
                    { val: 'Muito Confortável', desc: 'Relação totalmente natural e livre' },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.val}
                      onClick={() => setAnswers((prev) => ({ ...prev, q2_relation: opt.val as any }))}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        answers.q2_relation === opt.val
                          ? 'bg-purple-50 border-purple-600 text-purple-950 shadow-sm ring-2 ring-purple-300'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-purple-50/30'
                      }`}
                    >
                      <div className="font-semibold text-sm">{opt.val}</div>
                      <div className="text-xs text-slate-500">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pergunta 4: Joanetes */}
              <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border-2 border-purple-200/80 shadow-xs transition-colors hover:border-purple-300">
                <div className="flex items-center justify-between mb-3 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                      4
                    </span>
                    <label className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      Você tem joanetes?
                    </label>
                  </div>
                  <QuestionHelpTooltip
                    title="Pergunta 4: Joanetes (Hálux Valgo)"
                    explanation="Na leitura somática de Irmo Zuccato Neto, o joanete é um desvio estrutural que expressa a acomodação excessiva às vontades alheias para preservar laços afetivos ou evitar abandono. Mostra uma inclinação óssea onde a pessoa 'sai do seu próprio eixo' para caber no molde do outro."
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {(['Sim', 'Não'] as const).map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => {
                        setAnswers((prev) => ({
                          ...prev,
                          q3_joanetes: {
                            ...prev.q3_joanetes,
                            hasJoanetes: opt,
                            // If Não, reset foot selection
                            rightFoot: opt === 'Não' ? false : prev.q3_joanetes.rightFoot,
                            leftFoot: opt === 'Não' ? false : prev.q3_joanetes.leftFoot,
                          },
                        }));
                      }}
                      className={`p-3 rounded-xl border font-semibold text-sm transition-all cursor-pointer text-center ${
                        answers.q3_joanetes.hasJoanetes === opt
                          ? 'bg-purple-600 border-purple-600 text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-purple-50/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {/* Se a pessoa responder SIM: CAMPO ABAIXO COM DUAS COLUNAS: PÉ DIREITO E PÉ ESQUERDO */}
                {answers.q3_joanetes.hasJoanetes === 'Sim' && (
                  <div className="animate-fade-in">
                    <JoanetesSelector
                      value={answers.q3_joanetes}
                      onChange={(updated) => {
                        setAnswers((prev) => ({
                          ...prev,
                          q3_joanetes: updated,
                        }));
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Pergunta 5: Calos nos Dedos */}
              <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border-2 border-purple-200/80 shadow-xs transition-colors hover:border-purple-300">
                <div className="flex items-center justify-between mb-3 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                      5
                    </span>
                    <label className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      Você tem calos nos dedos?
                    </label>
                  </div>
                  <QuestionHelpTooltip
                    title="Pergunta 5: Calos nos Dedos"
                    explanation="O calo é a couraça biológica criada quando a pele sofre atrito mecânico continuado — que somatiza áreas onde a pessoa enfrenta forte atrito com o meio externo ou conflito consigo mesma. O dedo específico revela onde a energia vital está sendo contida (ação, ambição, relacionamentos ou sobrevivência)."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {(['Sim', 'Não'] as const).map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => {
                        setAnswers((prev) => ({
                          ...prev,
                          calluses: {
                            ...prev.calluses,
                            hasCalluses: opt,
                          },
                        }));
                      }}
                      className={`p-3 rounded-xl border font-semibold text-sm transition-all cursor-pointer text-center ${
                        answers.calluses.hasCalluses === opt
                          ? 'bg-purple-600 border-purple-600 text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-purple-50/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {/* Se a pessoa responder SIM: CAMPO ABAIXO COM DUAS COLUNAS: PÉ DIREITO E PÉ ESQUERDO */}
                {answers.calluses.hasCalluses === 'Sim' && (
                  <div className="animate-fade-in">
                    <CallusSelector
                      value={answers.calluses}
                      onChange={(updated) => {
                        setAnswers((prev) => ({
                          ...prev,
                          calluses: updated,
                        }));
                      }}
                    />
                  </div>
                )}
              </div>

              {questionsError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {questionsError}
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep('nails-question')}
                  className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-full text-sm cursor-pointer"
                >
                  Voltar às Unhas
                </button>

                <button
                  type="button"
                  disabled={isGeneratingReport}
                  onClick={handleFinalReportGenerate}
                  className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white font-bold py-3.5 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105 inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-base"
                >
                  {isGeneratingReport ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processando Laudo Completo...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      <span>Gerar Relatório Final</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 13: FINAL REPORT VIEW */}
        {step === 'report' && shapeResult && ratioResult && (
          <ReportView
            targetName={targetName}
            imageUrl={imageUrl}
            shapeResult={shapeResult}
            ratioResult={ratioResult}
            personalAnswers={answers}
            onRestart={handleFullRestart}
          />
        )}

        {/* STEP 14: LEGAL DOCUMENTS */}
        {step === 'legal' && (
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-200 max-w-2xl mx-auto text-slate-800 text-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
              Termos Legais e Política de Privacidade
            </h2>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 text-justify">
              <h3 className="font-bold text-slate-900">1. Metodologia e Propriedade Intelectual</h3>
              <p>
                Todo o conteúdo, correlações somáticas, textos reflexológicos e metodologia de análise são de autoria e propriedade de <strong>Irmo Zuccato Neto</strong>. Este aplicativo tem fins de autoconhecimento, reflexologia e desenvolvimento pessoal.
              </p>
              <h3 className="font-bold text-slate-900">2. Privacidade e Proteção de Dados</h3>
              <p>
                Todas as fotos de pés e respostas fornecidas são processadas localmente na memória do seu navegador. Nenhuma imagem é salva de forma oculta em servidores externos ou vendida a terceiros.
              </p>
              <h3 className="font-bold text-slate-900">3. Isenção Médica</h3>
              <p>
                As análises fornecidas pelo aplicativo não substituem diagnóstico médico, ortopédico ou fisioterapêutico convencional. Em caso de dores ou alterações clínicas nos pés, consulte um profissional de saúde habilitado.
              </p>
            </div>
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setStep('splash')}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-8 rounded-full cursor-pointer text-sm shadow"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} Analisador dos Formatos e Tamanhos dos Dedos dos Pés · Por Irmo Zuccato Neto</p>
      </footer>
    </div>
  );
}
