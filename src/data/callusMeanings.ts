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
      theme: 'O Raio-X Incômodo da Sua Necessidade de Justificar a Própria Existência',
      description: 'O calo no dedão direito é o monumento que você ergueu à sua exaustiva compulsão de traduzir o universo em palavras e debater com quem não passa de mero espectador da própria vida. Indica o atrito constante de quem passa os dias tentando convencer o rebanho de suas próprias decisões, como se o mundo precisasse carimbar um alvará para a sua liberdade.',
      reflection: 'Querido intelectual da tribo, você não precisa prestar contas ao cosmos inteiro antes de dar um passo. Que tal parar de gastar a saliva tentando convencer quem tem a profundidade de um pires?'
    },
    leftFoot: {
      theme: 'O Cativeiro Silencioso das Suas Mágoas Polidas',
      description: 'O calo no dedão esquerdo expõe a arte masoquista de engolir sapos em família para manter uma paz de fachada que só existe na sua imaginação. É o depósito de tristezas mudas e sentimentos legítimos que você estrangulou no ninho para não correr o risco de parecer inconveniente.',
      reflection: 'Abafar o próprio grito para não perturbar o sono dos outros é apenas uma forma elegante de suicídio emocional. A guerra que você esconde embaixo do tapete familiar continua comendo seus tecidos por dentro.'
    }
  },
  segundo: {
    name: 'Segundo Dedo',
    subname: 'Desejo / 2º Dedo',
    rightFoot: {
      theme: 'A Corrida dos Ratos com Diploma de Sofisticação',
      description: 'No pé direito, o calo no segundo dedo revela a frustração crônica de quem transformou metas profissionais em uma obsessão cirúrgica. É a marca indelével da sua impaciência com a lentidão cósmica dos fatos e a irritação profunda por perceber que a matéria nem sempre se dobra à sua vontade tirânica.',
      reflection: 'Sua pressa em colher os frutos antes da estação não vai acelerar o relógio biológico do mundo. Só serve para esfolar os pés enquanto você tropeça na própria ansiedade.'
    },
    leftFoot: {
      theme: 'O Nobre Mártir do Sacrifício Afetivo',
      description: 'No pé esquerdo, o calo no segundo dedo é o recibo da sua abnegação compulsiva — aquela mania graciosa de se colocar no fim da fila para posar de salvador da pátria afetiva. Você anula os próprios anseios com um sorriso no rosto, esperando secretamente que alguém venha lhe dar uma medalha de ouro pelo martírio voluntário.',
      reflection: 'Seus desejos mais íntimos não são pecados capitais; são partes sagradas da sua biografia que você assassinou no altar da conveniência alheia. Assuma o egoísmo de existir.'
    }
  },
  terceiro: {
    name: 'Terceiro Dedo',
    subname: 'Ação / 3º Dedo',
    rightFoot: {
      theme: 'O Monopólio da Insatisfação e o Complexo de Atlas',
      description: 'O calo no terceiro dedo direito brota esplendoroso onde a sua impaciência no trabalho colide com a incompetência alheia. É a marca do general solitário que prefere fazer tudo sozinho a ver alguém estragar o seu plano milimétrico, acumulando uma raiva silenciosa contra a inércia do mundo.',
      reflection: 'Ninguém pediu para você carregar o planeta nas costas, meu caro salvador. O peso que esmaga seus pés é apenas o monumento à sua soberba de achar que o universo para sem o seu aval.'
    },
    leftFoot: {
      theme: 'O Tribunal Inquisitório do Próprio Umbigo',
      description: 'O calo no terceiro dedo esquerdo reflete o tribunal sádico que você instalou na própria mente: cada vez que o seu coração ousa desejar algo em benefício próprio, o seu fiscal interno aplica uma condenação sumária por culpa e egoísmo.',
      reflection: 'Atuar em benefício do próprio ser não é crime hediondo, é mera lei de gravidade psíquica. Tente ser um pouco menos carrasco de si mesmo e um pouco mais humano.'
    }
  },
  quarto: {
    name: 'Quarto Dedo',
    subname: 'Relacionamento / 4º Dedo',
    rightFoot: {
      theme: 'A Régua Injusta e a Fábrica de Desilusões Sociais',
      description: 'O calo no quarto dedo direito é o selo de garantia das suas expectativas estelares em relação aos reles mortais que o cercam. Você distribui generosidade com recibo de cobrança e depois passa os dias em pranto existencial porque o mundo falhou em adivinhar a sua grandeza.',
      reflection: 'Ajuste essa régua imaginária antes que a realidade termine de esmagar seus dedos. As pessoas não são falhas; elas apenas se recusam a viver no roteiro irreal que você escreveu para elas.'
    },
    leftFoot: {
      theme: 'O Museu Arqueológico de Ressentimentos Afetivos',
      description: 'O calo no quarto dedo esquerdo é a prova física de que você embalsamou seus traumas antigos e construiu um altar de ouro para as suas mágoas mais íntimas. Você prefere a segurança melancólica do passado à vertigem aterrorizante de entregar o coração a um novo começo.',
      reflection: 'Perdoar a história não é absolver o agressor; é simplesmente ter a decência de tirar o lixo da própria sala de estar e parar de tropeçar no próprio luto.'
    }
  },
  dedinho: {
    name: 'Dedinho',
    subname: 'Segurança / 5º Dedo',
    rightFoot: {
      theme: 'O Pânico Financeiro e a Paranoia do Amanhã',
      description: 'O calo no dedinho direito é a placa de neon que ilumina o seu pavor crônico de ver a conta bancária no vermelho e o futuro desabar sobre a sua cabeça. É a somatização exata de quem gasta a energia vital do presente antecipando desastres que, na esmagadora maioria das vezes, só existem na sua planilha de terrores.',
      reflection: 'Sua ansiedade obsessiva pelo amanhã não vai impedir nenhuma tempestade cósmica; ela apenas garante que você destrua a estabilidade e a clareza do seu solo atual com as próprias mãos.'
    },
    leftFoot: {
      theme: 'A Solitária Fortaleza do Cão de Guarda da Alma',
      description: 'O calo no dedinho esquerdo denuncia a desconfiança instintiva de quem foi moldado na crença implacável de que, se quiser ver algo feito direito — ou sobreviver —, terá de fazê-lo inteiramente sozinho, trancado na torre de vigia do próprio isolamento.',
      reflection: 'Construir muralhas de ferro ao redor do coração para se proteger da solidão é uma genialidade estratégica... pena que o único prisioneiro trancado nessa masmorra seja exatamente você.'
    }
  }
};