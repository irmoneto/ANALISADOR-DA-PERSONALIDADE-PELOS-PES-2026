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
      theme: 'Convicção, Liderança e Firmeza de Posição',
      description: 'A unha encravada no dedão direito aponta para o atrito entre defender firmemente suas convicções no mundo profissional ou social e a exigência interna de perfeccionismo. Sinaliza uma pessoa determinada, com grande senso de responsabilidade e liderança, que por vezes internaliza a tensão quando precisa ceder ou se adaptar a ritmos que não são os seus.',
      reflection: 'Reconheça a sua força e capacidade realizadora, acolhendo que flexibilizar a rota não diminui sua autoridade nem seu valor pessoal.'
    },
    leftFoot: {
      theme: 'Cuidado Afetivo e Expressão nas Relações Íntimas',
      description: 'A unha encravada no dedão esquerdo reflete o zelo e a dedicação profunda aos vínculos afetivos e familiares. É o ponto onde o desejo de harmonia e cuidado com as pessoas queridas convida a expressar com clareza as próprias vontades e limites, evitando que o excesso de concessões gere tensões no corpo.',
      reflection: 'Amar e cuidar não exige anular a própria voz. Expressar seus sentimentos e limites de maneira amorosa fortalece os laços verdadeiros.'
    }
  },
  segundo: {
    name: 'Segundo Dedo',
    subname: 'Desejo / 2º Dedo',
    rightFoot: {
      theme: 'Ritmo das Conquistas e Ambição Consciente',
      description: 'No pé direito, a unha encravada no segundo dedo expressa a autoexigência de alcançar metas com rapidez. Convida a respeitar o tempo natural dos processos e a celebrar cada etapa vencida sem cobranças desmedidas.',
      reflection: 'Permita-se viver cada conquista no seu próprio tempo, equilibrando determinação e leveza.'
    },
    leftFoot: {
      theme: 'Acolhimento da Própria Vulnerabilidade e Desejos',
      description: 'No pé esquerdo, manifesta a necessidade de validar seus anseios afetivos e sentimentos com autocompaixão, permitindo-se receber apoio e carinho sem restrições.',
      reflection: 'Expressar suas necessidades afetivas é uma demonstração de coragem e autenticidade.'
    }
  },
  terceiro: {
    name: 'Terceiro Dedo',
    subname: 'Ação / 3º Dedo',
    rightFoot: {
      theme: 'Canalização da Força de Ação e Assertividade',
      description: 'No pé direito, sinaliza o ímpeto de agir e tomar iniciativas que encontram obstáculos ou regras externas, convidando a direcionar essa energia criativa de forma construtiva.',
      reflection: 'Encontre canais saudáveis e assertivos para expressar sua força de realização no mundo.'
    },
    leftFoot: {
      theme: 'Ação Afetiva com Autonomia',
      description: 'No pé esquerdo, reflete o desejo de agir em prol de seus sonhos pessoais sem o receio de desagradar pessoas próximas.',
      reflection: 'Seguir o próprio coração com respeito e amor é a base para relacionamentos maduros.'
    }
  },
  quarto: {
    name: 'Quarto Dedo',
    subname: 'Relacionamento / 4º Dedo',
    rightFoot: {
      theme: 'Amadurecimento nas Parcerias e Convivência',
      description: 'No pé direito, aponta para aprendizados em acordos profissionais e sociais, estimulando a clareza de expectativas e o perdão diante de eventuais frustrações.',
      reflection: 'Libere mágoas do passado para abrir espaço a novas parcerias leais e transparentes.'
    },
    leftFoot: {
      theme: 'Confiança e Cura nos Vínculos Afetivos',
      description: 'No pé esquerdo, indica uma sensibilidade apurada nos laços do coração, convidando ao desapego de antigas decepções e à renovação da confiança.',
      reflection: 'Ao perdoar o passado, você liberta a sua energia vital para viver o presente plenamente.'
    }
  },
  dedinho: {
    name: 'Dedinho',
    subname: 'Segurança / 5º Dedo',
    rightFoot: {
      theme: 'Construção da Segurança Material e Confiança no Futuro',
      description: 'No pé direito, representa a preocupação com a estabilidade financeira e profissional, convidando a confiar na própria capacidade de trabalho e discernimento.',
      reflection: 'Planeje o futuro com serenidade, ancorando sua segurança na sua competência e consistência.'
    },
    leftFoot: {
      theme: 'Segurança Emocional e Autossuficiência Afetiva',
      description: 'No pé esquerdo, reflete a busca por um porto seguro emocional, incentivando o fortalecimento do autoamor e da sensação de acolhimento interior.',
      reflection: 'Você é o seu porto seguro primordial; confie no seu valor e na sua história.'
    }
  }
};