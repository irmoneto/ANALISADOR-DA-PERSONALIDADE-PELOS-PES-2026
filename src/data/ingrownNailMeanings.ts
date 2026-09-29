import { ToeKey } from '../types';

export interface FootIngrownNails {
  dedao: boolean;
  segundo: boolean;
  terceiro: boolean;
  quarto: boolean;
  dedinho: boolean;
}

export interface IngrownNailsState {
  hasIngrownNails: 'Sim' | 'Não' | '';
  rightFoot: FootIngrownNails;
  leftFoot: FootIngrownNails;
}

export interface ToeIngrownNailInfo {
  name: string;
  subname: string;
  rightFoot: {
    theme: string;
    description: string;
    reflection: string;
  };
  leftFoot: {
    theme: string;
    description: string;
    reflection: string;
  };
}

export const TOE_INGROWN_NAIL_DATA: Record<ToeKey, ToeIngrownNailInfo> = {
  dedao: {
    name: 'Dedão',
    subname: 'Hálux / 1º Dedo',
    rightFoot: {
      theme: 'Certezas Rígidas no Trabalho & Dificuldade em Ceder Perante o Mundo',
      description: 'A unha encravada no dedão direito aponta para convicções que se voltam contra si mesmo na esfera profissional ou social. Há um sentimento de ter razão, mas encontrar barreiras ou imposições externas que geram irritação profunda e a sensação de estar sendo invadido por regras ou cobranças alheias.',
      reflection: 'Defender sua verdade não precisa machucar sua própria carne. Flexibilize a exigência de que o mundo externo funcione exatamente sob o seu ponto de vista.'
    },
    leftFoot: {
      theme: 'Feridas de Convicção na Intimidade & Culpa nos Vínculos Familiares',
      description: 'A unha encravada no dedão esquerdo revela dor emocional gerada por convicções arraigadas na dinâmica familiar ou conjugal. Mostra um choque entre os seus valores mais íntimos e o comportamento das pessoas que você ama, causando um ressentimento inflamado que você guarda para não romper a relação.',
      reflection: 'Permita que as pessoas que você ama tenham os caminhos e ritmos delas, sem que você precise internalizar essa divergência como dor.'
    }
  },
  segundo: {
    name: 'Segundo Dedo',
    subname: 'Desejo / 2º Dedo',
    rightFoot: {
      theme: 'Autocrítica Feroz em Metas & Frustração de Ambição',
      description: 'No pé direito, a unha encravada no segundo dedo expressa uma sensação de culpa ou bloqueio ao desejar mais para sua carreira ou vida material. A pessoa se cobra metas altas e, ao mesmo tempo, pune a si mesma por não alcançá-las com a rapidez ou perfeição que exige.',
      reflection: 'O desejo de crescer é saudável. Substitua a autopunição por passos práticos e celebre pequenos progressos diários.'
    },
    leftFoot: {
      theme: 'Culpa pelos Próprios Desejos Afetivos & Medo de Incomodar',
      description: 'No pé esquerdo, a unha encravada no segundo dedo manifesta sofrimento por querer algo na relação que a pessoa acha que "não deveria" pedir. Há uma censura severa contra a própria carência ou necessidade de afeto, inflamando a sensação de rejeição.',
      reflection: 'Você tem todo o direito de desejar carinho, atenção e presença. Não se culpe por aquilo que seu coração genuinamente almeja.'
    }
  },
  terceiro: {
    name: 'Terceiro Dedo',
    subname: 'Ação / 3º Dedo',
    rightFoot: {
      theme: 'Impotência na Ação Prática & Raiva Contida na Produtividade',
      description: 'A unha encravada no terceiro dedo direito indica uma situação externa ou profissional em que a pessoa se sente obrigada a agir de um modo que contraria sua índole, ou sente que suas ações estão sendo tolhidas. Essa contenção forçada da agressividade saudável vira-se para dentro.',
      reflection: 'Canalize sua força de ação com discernimento e imponha limites claros antes de absorver a frustração.'
    },
    leftFoot: {
      theme: 'Paralisia por Medo de Errar & Bloqueio da Vontade Própria',
      description: 'No terceiro dedo esquerdo, a unha encravada traduz um conflito íntimo paralisante: o impulso de tomar uma atitude afetiva reprimido pelo medo da reprovação dos entes queridos. A ação não executada gera tensão interna constante.',
      reflection: 'Errar faz parte do caminhar. Confie na sua intuição e aja com leveza na direção do que traz paz à sua alma.'
    }
  },
  quarto: {
    name: 'Quarto Dedo',
    subname: 'Relacionamento / 4º Dedo',
    rightFoot: {
      theme: 'Mágoa Inflamada nas Relações Sociais & Parcerias',
      description: 'A unha encravada no quarto dedo direito aponta decepções profundas e não digeridas com sócios, colegas de trabalho ou amizades. A pessoa se sentiu traída em sua confiança e rumina o ocorrido, fazendo com que a lembrança continue machucando o presente.',
      reflection: 'Cortar apegos a quem não soube valorizar sua dedicação é o primeiro remédio para desinflamar suas relações.'
    },
    leftFoot: {
      theme: 'Ressentimento Amoroso Profundo & Dificuldade de Desapego',
      description: 'No quarto dedo esquerdo, a unha encravada é um sinal expressivo de dor amorosa retida e feridas afetivas que nunca cicatrizaram totalmente. Representa apego a mágoas familiares ou amorosas que continuam machucando a intimidade.',
      reflection: 'Soltar uma mágoa antiga liberta os seus passos para um amor mais leve e compassivo consigo mesmo.'
    }
  },
  dedinho: {
    name: 'Dedinho',
    subname: 'Segurança / 5º Dedo',
    rightFoot: {
      theme: 'Angústia com Futuro Material & Medo Paralisante de Escassez',
      description: 'A unha encravada no dedinho direito revela uma preocupação aguda com sobrevivência, recursos materiais e estabilidade futura. O medo do imprevisto atua como uma garra que se volta contra a própria segurança básica.',
      reflection: 'Sua capacidade de adaptação e trabalho é seu maior patrimônio; confie na sua capacidade de reconstrução.'
    },
    leftFoot: {
      theme: 'Insegurança Afetiva Raiz & Sentimento de Desamparo',
      description: 'A unha encravada no dedinho esquerdo aponta para medos ancestrais de abandono e desamparo no núcleo familiar. Reflete uma ferida arcaica de não se sentir seguro(a) no ninho ou suficientemente protegido(a) pelos seus.',
      reflection: 'O adulto que você é hoje tem a força e a sabedoria necessárias para cuidar e proteger a sua criança interior.'
    }
  }
};
