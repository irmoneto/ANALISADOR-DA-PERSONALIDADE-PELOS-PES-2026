import { ToeKey } from '../types';

export interface ToeClawInfo {
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

export const TOE_CLAW_DATA: Record<ToeKey, ToeClawInfo> = {
  dedao: {
    name: 'Dedão',
    subname: 'Hálux / 1º Dedo',
    rightFoot: {
      theme: 'Apego ao Controle & Rigidez nos Projetos Externos',
      description: 'O dedão em garra (virado para baixo) no pé direito revela uma tentativa contínua de "agarrar o chão" e controlar os acontecimentos futuros, a carreira ou a vida material. Mostra medo de perder a liderança ou de ser surpreendido por imprevistos, levando a uma postura de hipervigilância.',
      reflection: 'Nem tudo depende exclusivamente do seu esforço para se sustentar. Confie mais no fluxo natural dos seus passos e solte o excesso de vigilância.'
    },
    leftFoot: {
      theme: 'Insegurança Afetiva & Retenção Emocional',
      description: 'O dedão em garra no pé esquerdo expressa apego e medo profundo de abandono ou desamparo emocional. A pessoa "crava as garras" internamente nas relações mais íntimas e nas memórias afetivas, temendo que os laços familiares ou amorosos se desfaçam se não mantiver tudo sob rédea curta.',
      reflection: 'O amor verdadeiro e o afeto florescem na liberdade, nunca no medo de perder ou na tentativa de prender.'
    }
  },
  segundo: {
    name: 'Segundo Dedo',
    subname: 'Desejo / 2º Dedo',
    rightFoot: {
      theme: 'Tensão com Metas Futuras & Ambição Travada',
      description: 'O segundo dedo em garra no pé direito aponta tensão e ansiedade extrema ligadas ao direcionamento profissional e ambições. Indica a sensação de precisar se agarrar a qualquer custo a uma meta ou cargo, com medo de falhar ou não corresponder ao sucesso esperado.',
      reflection: 'Sua dignidade e valor não se resumem à velocidade das suas vitórias. Caminhe com determinação, mas sem cravar a pressa no peito.'
    },
    leftFoot: {
      theme: 'Desejos Ocultos & Medo de Desapontar Quem Ama',
      description: 'O segundo dedo em garra no pé esquerdo mostra anseios afetivos e desejos profundos que são "engolidos" e curvados para dentro. Há um receio latente de expressar o que realmente quer no amor ou na intimidade, preferindo se conter para não criar conflito.',
      reflection: 'Dar voz aos seus sentimentos genuínos é um ato de coragem e autocuidado; não curve suas vontades legítimas.'
    }
  },
  terceiro: {
    name: 'Terceiro Dedo',
    subname: 'Ação / 3º Dedo',
    rightFoot: {
      theme: 'Sobrecarga de Ação & Medo de Ficar Parado',
      description: 'O terceiro dedo em garra no pé direito revela alguém que vive em estado de alerta prático, sentindo que precisa agir o tempo todo sem direito a descanso. "Agarra-se" ao trabalho por receio da instabilidade, somatizando cansaço e tensão muscular crônica.',
      reflection: 'O descanso consciente não é perda de tempo, é o solo onde a sua verdadeira produtividade e clareza se regeneram.'
    },
    leftFoot: {
      theme: 'Culpa ao Descansar & Autocobrança Íntima',
      description: 'O terceiro dedo em garra no pé esquerdo reflete uma autocobrança implacável no mundo interno. A pessoa sente culpa quando prioriza seu bem-estar ou quando não consegue agradar a todos que ama, cravando os dedos no chão por inquietação emocional.',
      reflection: 'Você tem todo o direito de cuidar de si mesmo sem pedir licença ou carregar culpas imaginárias.'
    }
  },
  quarto: {
    name: 'Quarto Dedo',
    subname: 'Relacionamento / 4º Dedo',
    rightFoot: {
      theme: 'Apego a Posições Sociais & Ciúmes de Espaço',
      description: 'O quarto dedo em garra no pé direito sinaliza medo de ser excluído de grupos, parcerias profissionais ou círculos de amizade. Há uma postura defensiva nas relações interpessoais, buscando garantir seu espaço e aceitação com esforço e tensão constante.',
      reflection: 'Quem reconhece seu próprio valor não precisa forçar espaço nem se agarrar desesperadamente a relações que não fluem.'
    },
    leftFoot: {
      theme: 'Apego Afetivo Profundo & Medo da Desconexão',
      description: 'O quarto dedo em garra no pé esquerdo é o sinal somático clássico do apego emocional extremo a pessoas queridas ou ao passado. Revela dificuldade em lidar com términos, distanciamentos ou mudanças familiares, cravando as garras emocionais para reter o vínculo.',
      reflection: 'Aceitar as transformações dos laços humanos é um passo fundamental para que novos encontros luminosos possam entrar na sua vida.'
    }
  },
  dedinho: {
    name: 'Dedinho',
    subname: 'Segurança / 5º Dedo',
    rightFoot: {
      theme: 'Pânico de Instabilidade Material & Escassez',
      description: 'O quinto dedo em garra no pé direito indica sensação crônica de instabilidade em relação à sobrevivência prática, finanças e segurança física. A pessoa curva o dedinho como um reflexo ancestral de quem teme "cair no abismo" ou perder o chão.',
      reflection: 'Reconheça a sua capacidade comprovada de se reinventar e sobreviver aos desertos da vida. Você é mais forte do que a incerteza.'
    },
    leftFoot: {
      theme: 'Insegurança Existencial & Medo de Ficar Desamparado',
      description: 'O quinto dedo em garra no pé esquerdo expressa desconfiança basilar e solidão existencial. Aponta para uma ferida primitiva de insegurança, onde a pessoa sente que, no momento crítico, não haverá ninguém com quem contar verdadeiramente.',
      reflection: 'Construa diariamente o afeto e a segurança dentro de você; quando seu porto seguro é interno, nenhum vento o derruba.'
    }
  }
};
