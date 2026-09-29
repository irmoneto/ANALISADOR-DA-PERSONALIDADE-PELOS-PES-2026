import { ToeKey } from '../types';

export interface ToeCallusInfo {
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

export const TOE_CALLUS_DATA: Record<ToeKey, ToeCallusInfo> = {
  dedao: {
    name: 'Dedão',
    subname: 'Hálux / 1º Dedo',
    rightFoot: {
      theme: 'Expressão no Mundo & Sobrecarga de Responsabilidade',
      description: 'O calo no dedão direito aponta atrito na comunicação com o mundo exterior. Indica uma forte tendência a reprimir ideias por medo de não ser compreendido, ou um esforço exaustivo em ter que justificar suas decisões a terceiros e carregar o peso do mundo nas costas.',
      reflection: 'Você não precisa provar nada a ninguém o tempo todo. Aprenda a soltar a necessidade de convencer quem não quer escutar.'
    },
    leftFoot: {
      theme: 'Expressão Íntima & Tristeza Silenciada',
      description: 'O calo no dedão esquerdo sinaliza mágoas engolidas e sentimentos profundos que foram calados para não criar atrito na família ou com quem você ama. Representa uma tristeza retida na expressão dos seus sentimentos mais genuínos.',
      reflection: 'Calar o que você sente para manter a paz ao redor só transfere a guerra para dentro de si.'
    }
  },
  segundo: {
    name: 'Segundo Dedo',
    subname: 'Desejo / 2º Dedo',
    rightFoot: {
      theme: 'Ambição Bloqueada & Pressão por Resultados',
      description: 'No pé direito, o calo no segundo dedo revela frustração e tensão diante de metas e projetos profissionais. Há uma sensação constante de que as coisas demoram mais do que deveriam ou de estar sendo contido pelas circunstâncias materiais.',
      reflection: 'A pressa em colher os frutos pode estar endurecendo sua caminhada. Respeite os ciclos naturais das suas conquistas.'
    },
    leftFoot: {
      theme: 'Desejos Afetivos Reprimidos & Abnegação',
      description: 'No pé esquerdo, o calo no segundo dedo indica anulação das próprias vontades afetivas em prol dos desejos alheios. Mostra alguém que teme pedir o que realmente precisa por receio de ser visto como exigente ou carente.',
      reflection: 'Seus anseios e necessidades emocionais têm valor sagrado; não se coloque sempre no final da fila.'
    }
  },
  terceiro: {
    name: 'Terceiro Dedo',
    subname: 'Ação / 3º Dedo',
    rightFoot: {
      theme: 'Sobrecarga de Ação & Impaciência no Trabalho',
      description: 'O calo no terceiro dedo direito surge quando a pessoa sente que está "remando contra a maré" em suas atividades diárias. Expressa raiva contida no ambiente de trabalho ou social, cobrança excessiva por produtividade e cansaço por ter que fazer tudo sozinho.',
      reflection: 'Nem toda batalha precisa ser travada na força bruta. Permita-se delegar e desacelerar o ritmo de cobrança.'
    },
    leftFoot: {
      theme: 'Autocrítica Corrosiva & Conflito Interno ao Agir',
      description: 'O calo no terceiro dedo esquerdo reflete culpa inconsciente ao agir em benefício próprio. Aponta uma forte censura interna que paralisa a ação criativa e gera atrito entre o que o coração quer e o que a mente julga correto.',
      reflection: 'Agir pelo seu próprio bem não é egoísmo, é autopreservação. Seja mais tolerante com suas próprias escolhas.'
    }
  },
  quarto: {
    name: 'Quarto Dedo',
    subname: 'Relacionamento / 4º Dedo',
    rightFoot: {
      theme: 'Atrito nas Relações Sociais & Exigência Afetiva Externa',
      description: 'O calo no quarto dedo direito revela atritos e decepções em amizades, parcerias profissionais ou redes sociais. Sinaliza uma expectativa elevada sobre os outros e a sensação frequente de doação desmedida sem o devido reconhecimento.',
      reflection: 'Ajuste a régua das suas expectativas para que o comportamento alheio pare de machucar você.'
    },
    leftFoot: {
      theme: 'Apego a Mágoas & Dificuldade em Soltar o Passado',
      description: 'O calo no quarto dedo esquerdo é uma das marcas mais claras de feridas afetivas íntimas e ressentimentos guardados. Indica medo de se entregar a novos laços emocionais por receio de reviver dores do passado e um apego nostálgico que ainda pesa.',
      reflection: 'Perdoar não significa concordar com o erro alheio, mas sim tirar o peso da mágoa dos seus próprios passos.'
    }
  },
  dedinho: {
    name: 'Dedinho',
    subname: 'Segurança / 5º Dedo',
    rightFoot: {
      theme: 'Insegurança Material & Medo do Futuro',
      description: 'O calo no dedinho direito expressa tensão crônica com dinheiro, estabilidade financeira e o rumo prático da vida. Mostra uma sensação latente de vulnerabilidade e medo de perder o chão ou os recursos necessários para o amanhã.',
      reflection: 'A ansiedade pelo amanhã não previne problemas futuros, apenas rouba a estabilidade e a clareza do seu presente.'
    },
    leftFoot: {
      theme: 'Insegurança Íntima & Medo da Solidão',
      description: 'O calo no dedinho esquerdo aponta insegurança emocional básica e desconfiança instintiva. Revela o temor de ficar desamparado(a) afetivamente ou a crença enraizada de que, no fundo, você só pode contar consigo mesmo(a).',
      reflection: 'Fortaleça a sua segurança interna: o seu verdadeiro porto seguro sempre reside dentro de você.'
    }
  }
};
