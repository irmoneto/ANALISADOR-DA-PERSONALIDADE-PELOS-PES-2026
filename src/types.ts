import { JoanetesState } from './data/joanetesMeanings';
import { IngrownNailsState } from './data/ingrownNailMeanings';

export type Step =
  | 'splash'
  | 'personalization'
  | 'upload'
  | 'preview'
  | 'shape-instruction'
  | 'shape-measurement'
  | 'shape-result'
  | 'ratio-instruction'
  | 'ratio-measurement'
  | 'ratio-result'
  | 'nails-question'
  | 'personal-questions'
  | 'report'
  | 'legal';

export interface Point {
  x: number;
  y: number;
}

export type ToeKey = 'dedao' | 'segundo' | 'terceiro' | 'quarto' | 'dedinho';

export interface FootCalluses {
  dedao: boolean;
  segundo: boolean;
  terceiro: boolean;
  quarto: boolean;
  dedinho: boolean;
}

export interface FootClawToes {
  dedao: boolean;
  segundo: boolean;
  terceiro: boolean;
  quarto: boolean;
  dedinho: boolean;
}

export interface CallusesState {
  hasCalluses: 'Sim' | 'Não' | '';
  rightFoot: FootCalluses;
  leftFoot: FootCalluses;
}

export interface ClawToesState {
  hasClawToes: 'Sim' | 'Não' | '';
  rightFoot: FootClawToes;
  leftFoot: FootClawToes;
}

export interface PersonalAnswers {
  unhas: 'pouco-visiveis' | 'visiveis' | 'bem-visiveis';
  q1_tickles: 'Sim' | 'Não';
  ingrownNails: IngrownNailsState;
  q2_relation: 'Desconfortável' | 'Neutro' | 'Confortável' | 'Muito Confortável';
  q3_joanetes: JoanetesState;
  calluses: CallusesState;
  clawToes: ClawToesState;
}

export interface ShapeResult {
  type: 'Egípcio' | 'Grego/Romano' | 'Quadrado';
  emoji: string;
  reasoning: string;
  l1: number;
  l2: number;
  l3: number;
  l5: number;
}

export interface RatioResult {
  calculatedRatio: number;
  toeLength: number;
  footLength: number;
  classification: string;
  classificationKey: string;
  colorClass: string;
  progressPercent: number;
}
