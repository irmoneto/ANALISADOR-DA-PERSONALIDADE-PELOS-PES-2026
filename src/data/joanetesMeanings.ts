export interface JoanetesState {
  hasJoanetes: 'Sim' | 'Não' | '';
  rightFoot: boolean;
  leftFoot: boolean;
}

export const JOANETES_MEANINGS = {
  rightFoot: {
    side: 'Pé Direito',
    sphere: 'Mundo Externo, Social, Profissional & Futuro',
    theme: 'Esforço de Adaptação às Expectativas Externas & Sobrecarga por Reconhecimento',
    description: 'O joanete no pé direito manifesta uma inclinação inconsciente a desviar o próprio rumo para caber nas exigências do ambiente profissional, social ou público. Representa a sensação de ter que carregar o peso das obrigações externas, fazer concessões excessivas no trabalho e um medo constante de decepcionar figuras de autoridade ou perder aprovação pública.',
    reflection: 'Você não precisa desviar seu eixo de integridade para ser aceito ou bem-sucedido. Aprenda a impor limites claros às demandas do mundo exterior.'
  },
  leftFoot: {
    side: 'Pé Esquerdo',
    sphere: 'Mundo Íntimo, Afetivo, Familiar & Passado',
    theme: 'Sacrifício Afetivo na Família & Medo de Rejeição Amorosa',
    description: 'O joanete no pé esquerdo aponta para um padrão de renúncia e autoanulação nos vínculos afetivos mais íntimos (família de origem, cônjuge ou filhos). Revela o hábito arraigado de se dobrar e ceder para manter a harmonia familiar a qualquer custo, guardando para si a dor de não se sentir plenamente acolhido ou compreendido por quem ama.',
    reflection: 'Ceder constantemente para manter a paz ao redor gera um desvio interno doloroso. Amar o outro não exige que você abandone a si mesmo.'
  },
  bothFeet: {
    theme: 'Sobrecarga Holística & Síndrome do Cuidador Universal',
    description: 'A presença de joanetes em ambos os pés evidencia um padrão generalizado de sobrecarga relacional. A pessoa atua como o alicerce que tenta sustentar tanto a estabilidade da família quanto as exigências da carreira, colocando as próprias necessidades invariavelmente em segundo plano.',
    reflection: 'Sustentar o mundo dos outros desaba a sua própria base. Recupere o apoio em seus próprios pés.'
  }
};
