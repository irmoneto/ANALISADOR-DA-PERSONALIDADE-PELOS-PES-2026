export interface RegistroProvocativo {
  registro: string;
  categoria: string;
  subcategoria: string;
  dificuldadeCentral: string;
  contradicao: string;
  emocaoPrincipal: string;
  alvoEmocional: string;
  niveis: { [key: number]: string };
}

export const BANCO_PROVOCATIVO_IZN: Record<string, RegistroProvocativo> = {

  // ============================================================
  // FORMATO DO PÉ
  // ============================================================

  'Egípcio': {
    registro: '001',
    categoria: 'Formato do Pé',
    subcategoria: 'Forma',
    dificuldadeCentral:
      'flexibilizar o controle, tolerar imprevistos e permitir que a realidade aconteça sem precisar obedecer ao roteiro interno',
    contradicao:
      'Quanto mais tenta controlar o resultado para sentir segurança, mais vulnerável fica diante de qualquer coisa que não possa controlar.',
    emocaoPrincipal:
      'necessidade de controle / medo de errar / vulnerabilidade',
    alvoEmocional:
      'controle, perfeccionismo e necessidade de previsibilidade',

    niveis: {
      1:
        'Você gosta de organização, planejamento e previsibilidade. Até aí, nenhuma novidade. O interessante começa quando a vida resolve improvisar.',

      2:
        'Você não é controlador. Claro que não. Você apenas acredita que tudo funciona muito melhor quando as coisas acontecem exatamente como você imaginou.',

      3:
        'Seu planejamento é uma força. Mas quando qualquer imprevisto parece uma ameaça, talvez não seja mais organização. Talvez seja necessidade de segurança.',

      4:
        'Você pode ter aprendido a chamar de perfeccionismo aquilo que, em algum momento, começou simplesmente como medo de errar.',

      5:
        'Quanto da sua exigência é realmente excelência e quanto é uma tentativa elegante de impedir que alguém descubra que você também pode falhar?',

      6:
        'Você construiu uma competência admirável para antecipar problemas. Só precisa tomar cuidado para não transformar antecipação em vigilância permanente.',

      7:
        'Talvez o mais difícil para você não seja organizar a vida. Talvez seja permanecer inteiro quando a vida decide não respeitar a sua organização.',

      8:
        'Se você só consegue relaxar quando tudo está sob controle, quem está realmente controlando quem?',

      9:
        'Você passou tanto tempo tentando evitar o erro que talvez tenha esquecido que errar também é uma forma de aprender.',

      10:
        'Você chamou de responsabilidade adulta a tarefa de algemar o imprevisível. Só faltou perceber que a primeira pessoa presa nessa cela foi você.'
    }
  },


  'Grego/Romano': {
    registro: '002',
    categoria: 'Formato do Pé',
    subcategoria: 'Forma',
    dificuldadeCentral:
      'sair da análise, tolerar incerteza e transformar compreensão em experiência e ação',
    contradicao:
      'Quanto mais possibilidades precisa compreender antes de agir, maior pode ficar a distância entre saber e fazer.',
    emocaoPrincipal:
      'dúvida / insegurança / necessidade de compreensão',
    alvoEmocional:
      'excesso de análise, intelectualização e adiamento',

    niveis: {
      1:
        'Você gosta de entender o contexto antes de tomar uma decisão. É uma qualidade. O problema é quando o contexto nunca termina.',

      2:
        'Você não está indeciso. Está apenas realizando uma investigação minuciosa que, por alguma coincidência, ainda não chegou ao capítulo da decisão.',

      3:
        'Analisar possibilidades é inteligência. Transformar toda decisão em uma análise de risco interminável pode ser apenas medo usando roupa social.',

      4:
        'Sua mente consegue construir argumentos brilhantes para quase tudo. Inclusive para explicar por que ainda não fez aquilo que já sabe que precisa fazer.',

      5:
        'Talvez você não precise de mais informação. Talvez precise apenas descobrir como é tomar uma decisão sem a garantia confortável de que ela será perfeita.',

      6:
        'Existe uma forma sofisticada de fugir da experiência: compreendê-la infinitamente antes de permitir que ela aconteça.',

      7:
        'Você pode passar tanto tempo estudando todas as possibilidades que transforma a própria vida em um projeto eternamente em fase de planejamento.',

      8:
        'E se essa necessidade de compreender tudo antes de agir não for prudência, mas uma maneira inteligente de evitar o desconforto de se expor ao resultado?',

      9:
        'Você já possui conhecimento suficiente para começar. O que talvez esteja faltando não é resposta. É tolerância para não saber exatamente o que acontecerá depois.',

      10:
        'Você construiu um labirinto intelectual tão sofisticado que conseguiu transformar a própria inteligência em esconderijo. E ainda chama isso de prudência.'
    }
  },


  'Quadrado': {
    registro: '003',
    categoria: 'Formato do Pé',
    subcategoria: 'Forma',
    dificuldadeCentral:
      'simplificar, aceitar limites e transformar visão ampla em realidade concreta',
    contradicao:
      'Quanto mais conexões percebe, maior pode ser a dificuldade de aceitar que algumas situações são simplesmente aquilo que parecem ser.',
    emocaoPrincipal:
      'curiosidade / idealismo / frustração diante da simplicidade',
    alvoEmocional:
      'complexidade, idealização e necessidade de conexão',

    niveis: {
      1:
        'Você possui uma facilidade admirável para perceber conexões entre pessoas, acontecimentos e ideias.',

      2:
        'O problema é que, às vezes, até aquilo que estava perfeitamente bem sem conexão alguma acaba recebendo uma teoria para explicar por que deveria estar conectado.',

      3:
        'Sua capacidade de enxergar sistemas é uma força. Mas nem toda situação precisa virar uma teoria para ser compreendida.',

      4:
        'Você pode ter tanta facilidade para enxergar o todo que corre o risco de esquecer aquela pequena coisa concreta que está acontecendo bem diante dos seus olhos.',

      5:
        'Talvez algumas respostas não estejam escondidas atrás de uma grande complexidade. Talvez você apenas não goste da simplicidade da resposta.',

      6:
        'Existe uma diferença entre profundidade e complicação. Uma mergulha. A outra apenas coloca mais água na piscina.',

      7:
        'Você pode passar horas tentando compreender o funcionamento do universo e ainda não perceber que está repetindo exatamente o mesmo padrão dentro da própria vida.',

      8:
        'E se a resposta que você procura for tão simples que sua inteligência se recusa a considerá-la interessante?',

      9:
        'Nem tudo precisa ser integrado, harmonizado ou explicado. Algumas coisas precisam apenas ser reconhecidas.',

      10:
        'Você passou tanto tempo procurando a grande arquitetura por trás de tudo que talvez não tenha percebido a pequena verdade que estava diante dos seus olhos o tempo inteiro.'
    }
  },


  // ============================================================
  // TAMANHO DOS DEDOS
  // ============================================================

  'Dedos-Curtos': {
    registro: '004',
    categoria: 'Tamanho dos Dedos',
    subcategoria: 'Proporção',
    dificuldadeCentral:
      'tolerar espera, ambiguidade e tempo de elaboração antes de transformar percepção em ação',
    contradicao:
      'A rapidez que permite agir também pode impedir que algo amadureça antes da decisão.',
    emocaoPrincipal:
      'urgência / impaciência / necessidade de ação',
    alvoEmocional:
      'pressa, impulsividade e intolerância à espera',

    niveis: {
      1:
        'Você tende a perceber rapidamente o que precisa ser feito e transformar percepção em movimento.',

      2:
        'Esperar não parece exatamente o seu esporte favorito. Se existe uma maneira mais rápida de resolver, você provavelmente já está procurando.',

      3:
        'Sua rapidez é uma força quando a situação exige ação. O problema começa quando toda espera parece desperdício de tempo.',

      4:
        'Você pode chamar de objetividade aquilo que, em determinadas situações, é simplesmente dificuldade de permanecer alguns segundos diante da dúvida.',

      5:
        'Quantas decisões realmente precisavam ser tomadas imediatamente e quantas apenas não suportaram a sua ansiedade por uma resposta?',

      6:
        'Existe uma diferença entre agir com rapidez e agir para se livrar rapidamente do desconforto de não saber.',

      7:
        'Talvez você não tenha medo de perder tempo. Talvez tenha dificuldade de permanecer no espaço silencioso entre uma coisa e outra.',

      8:
        'O que aconteceria se, desta vez, você não resolvesse imediatamente aquilo que está incomodando?',

      9:
        'Talvez algumas coisas não estejam atrasadas. Talvez estejam apenas amadurecendo em uma velocidade que você ainda não aprendeu a respeitar.',

      10:
        'Você passou tanto tempo correndo para chegar logo a algum lugar que talvez não tenha percebido quantas experiências morreram no caminho simplesmente porque não tiveram tempo de acontecer.'
    }
  },

  'Dedos-Normais-para-Curtos': {
    registro: '005',
    categoria: 'Tamanho dos Dedos',
    subcategoria: 'Proporção Transição Curtos',
    dificuldadeCentral:
      'tolerar espera, ambiguidade e tempo de elaboração antes de transformar percepção em ação',
    contradicao:
      'A agilidade para agir pode entrar em atrito com a necessidade de ponderar o caminho.',
    emocaoPrincipal:
      'impulso / ponderação / pressa temperada',
    alvoEmocional:
      'transição entre ação imediata e reflexão',

    niveis: {
      1:
        'Você tende a equilibrar uma resposta prática com alguma ponderação prévia antes da ação.',

      2:
        'Você consegue agir rápido, mas às vezes para no meio do caminho para se perguntar se a direção era mesmo aquela.',

      3:
        'Sua praticidade é uma força, desde que a urgência não transforme qualquer reflexão em perda de tempo.',

      4:
        'Você oscila entre ir imediatamente e pensar se não seria melhor esperar um pouco mais.',

      5:
        'Quantas decisões realmente precisavam ser tomadas imediatamente e quantas apenas não suportaram a ansiedade por uma resposta?',

      6:
        'Existe um conflito elegante entre o impulso de fazer e a prudência de planejar.',

      7:
        'O desafio é não deixar que a ponderação paralise nem que a pressa atropele o amadurecimento.',

      8:
        'O que aconteceria se você desse um pouco mais de tempo para aquilo que não precisa ser decidido hoje?',

      9:
        'Algumas decisões ganham força quando você permite que elas descansem antes de serem executadas.',

      10:
        'Você passou tanto tempo aprendendo a dosar pressa e cautela que agora só precisa não transformar esse equilíbrio em desculpa para hesitar quando o momento pedir firmeza.'
    }
  },

  'Dedos-Normais': {
    registro: '006',
    categoria: 'Tamanho dos Dedos',
    subcategoria: 'Proporção',
    dificuldadeCentral:
      'sustentar equilíbrio sem transformar moderação em neutralização da própria vontade',
    contradicao:
      'A capacidade de equilibrar extremos pode se transformar em dificuldade de assumir uma posição própria.',
    emocaoPrincipal:
      'equilíbrio / adaptação / receio de conflito',
    alvoEmocional:
      'neutralidade, acomodação e necessidade de agradar',

    niveis: {
      1:
        'Você tende a buscar equilíbrio antes de escolher extremos. É uma habilidade importante para conviver com pessoas e situações diferentes.',

      2:
        'Você consegue enxergar os dois lados de quase tudo. Uma qualidade admirável. Principalmente quando chega a hora de escolher um deles.',

      3:
        'Equilíbrio é maturidade. Mas equilíbrio usado para evitar qualquer desconforto pode virar uma maneira muito educada de não se posicionar.',

      4:
        'Existe uma diferença entre adaptar-se ao ambiente e adaptar-se tanto que ninguém mais sabe exatamente o que você queria.',

      5:
        'Quantas vezes você chamou de compreensão aquilo que, no fundo, era apenas medo de contrariar alguém?',

      6:
        'Aqui aparece uma das armadilhas clássicas da chamada “criança boazinha”: aprender a administrar tão bem as necessidades dos outros que começa a esquecer das próprias.',

      7:
        'Você pode ser tão eficiente em manter a paz que acaba pagando a conta emocional dessa paz sozinho.',

      8:
        'Quando você diz “para mim tanto faz”, é realmente tanto faz ou você já aprendeu que querer alguma coisa pode gerar conflito?',

      9:
        'Ser uma pessoa boa não exige ser permanentemente conveniente. E ser compreensivo não significa desaparecer da própria história.',

      10:
        'Você passou tanto tempo aprendendo a não incomodar ninguém que talvez tenha transformado a própria vontade na pessoa mais inconveniente da casa.'
    }
  },

  'Dedos-Normais-para-Longos': {
    registro: '007',
    categoria: 'Tamanho dos Dedos',
    subcategoria: 'Proporção Transição Longos',
    dificuldadeCentral:
      'descer da elaboração mental para a experiência concreta sem antecipar desfechos',
    contradicao:
      'A sensibilidade para perceber nuances pode virar hipervigilância e excesso de análise.',
    emocaoPrincipal:
      'sensibilidade / captação / ruminação',
    alvoEmocional:
      'antena emocional e intelectualização',

    niveis: {
      1:
        'Você percebe nuances e detalhes emocionais que passam completamente despercebidos pela maioria.',

      2:
        'Sua sensibilidade é refinada, mas antena potente também pode captar ruídos demais do ambiente.',

      3:
        'Compreender estados emocionais é um dom, até virar mania de achar que todo suspiro do outro tem a ver com você.',

      4:
        'Sua mente elabora com profundidade, correndo o risco de transformar uma simples conversa em tese existencial.',

      5:
        'Existe uma defesa muito elegante chamada intelectualização: transformar uma experiência emocional em um problema interessante para não precisar permanecer dentro dela.',

      6:
        'Você consegue captar o clima de uma sala antes de todo mundo; o desafio é não levar o clima para casa.',

      7:
        'Nem toda pequena mudança no ambiente precisa ser decodificada como uma mensagem urgente.',

      8:
        'O que aconteceria se você confiasse mais no que vê e menos nas teorias que cria sobre o que vê?',

      9:
        'Sua inteligência emocional brilha quando encontra ação, e sofre quando fica presa apenas na imaginação.',

      10:
        'Você passou tanto tempo tentando decifrar os outros que talvez tenha esquecido de permitir que a sua própria vida aconteça com espontaneidade.'
    }
  },

  'Dedos-Longos': {
    registro: '008',
    categoria: 'Tamanho dos Dedos',
    subcategoria: 'Proporção',
    dificuldadeCentral:
      'transformar elaboração mental em experiência corporal e ação concreta',
    contradicao:
      'A capacidade de compreender profundamente pode ser usada para adiar justamente aquilo que precisa ser vivido.',
    emocaoPrincipal:
      'elaboração / sensibilidade / ansiedade diante da experiência',
    alvoEmocional:
      'intelectualização, ruminação e afastamento da experiência',

    niveis: {
      1:
        'Você tende a elaborar profundamente aquilo que vive. Não apenas percebe o acontecimento; procura entender o significado dele.',

      2:
        'Sua cabeça trabalha tanto que, às vezes, o corpo parece precisar marcar reunião para conseguir participar da experiência.',

      3:
        'Compreender profundamente é uma qualidade. O problema começa quando entender substitui experimentar.',

      4:
        'Você pode encontrar uma explicação brilhante para aquilo que sente antes mesmo de permitir que o sentimento termine de acontecer.',

      5:
        'Existe uma defesa muito elegante chamada intelectualização: transformar uma experiência emocional em um problema interessante para não precisar permanecer dentro dela.',

      6:
        'Você pode saber exatamente por que faz determinada coisa e continuar fazendo exatamente a mesma coisa. Conhecimento não é automaticamente transformação.',

      7:
        'Talvez o seu maior desafio não seja compreender mais. Talvez seja confiar suficientemente na experiência para não precisar explicá-la enquanto ela acontece.',

      8:
        'Quantas coisas você já entendeu perfeitamente e continua sem conseguir viver?',

      9:
        'Sua mente pode construir uma explicação impecável para aquilo que o corpo ainda está tentando aprender.',

      10:
        'Você passou tanto tempo tentando compreender a vida que talvez tenha esquecido da pequena diferença entre saber o que é viver e efetivamente permitir-se viver.'
    }
  },

  // ============================================================
  // TAMANHO DAS UNHAS
  // ============================================================

  'Unhas-Grandes': {
    registro: '009',
    categoria: 'Tamanho das Unhas',
    subcategoria: 'Visibilidade',
    dificuldadeCentral: 'flexibilizar convicções sem sentir que está abrindo mão da própria identidade',
    contradicao: 'A firmeza que protege princípios pode se transformar em resistência a aprender com o novo.',
    emocaoPrincipal: 'convicção / firmeza / resistência à mudança',
    alvoEmocional: 'convicções, identidade e flexibilidade',
    niveis: {
      1: 'Você sabe o que pensa e sustenta suas opiniões com clareza.',
      2: 'Existe firmeza de caráter nas suas posições; o desafio é quando mudar de ideia parece uma derrota.',
      3: 'Defender princípios é nobre; confundir princípios com teimosia é outra coisa.',
      4: 'Nem toda discussão precisa virar uma batalha de sobrevivência moral.',
      5: 'Você pode estar tão apegado a ter razão que esquece de perguntar se quer ter razão ou ser feliz.',
      6: 'Quando foi a última vez que você mudou de ideia sem precisar de uma intimação formal da realidade?',
      7: 'Sustentar posições exige coragem; saber soltá-las quando não fazem mais sentido exige sabedoria.',
      8: 'O que você perderia de verdade se permitisse que o outro também tivesse razão?',
      9: 'Firmeza sem flexibilidade não é força; é rigidez esperando a primeira tempestade para quebrar.',
      10: 'Você passou a vida inteira construindo um monumento às suas convicções; só não percebeu que agora precisa pagar a manutenção desse monumento todo santo dia.'
    }
  },

  'Unhas-Normais': {
    registro: '010',
    categoria: 'Tamanho das Unhas',
    subcategoria: 'Visibilidade',
    dificuldadeCentral: 'sustentar a própria voz diante do coletivo sem se anular',
    contradicao: 'A moderação social pode se transformar em medo de se expor.',
    emocaoPrincipal: 'adaptação / diplomacia / receio de julgamento',
    alvoEmocional: 'expressão pessoal e posicionamento',
    niveis: {
      1: 'Você transita com facilidade entre suas opiniões e o que os outros pensam.',
      2: 'Uma convivência pacífica é saudável, desde que você não apague o que pensa para agradar.',
      3: 'Equilibrar referências internas e externas é sinal de maturidade.',
      4: 'Às vezes você prefere o silêncio para evitar desgaste; só tome cuidado para o silêncio não virar rotina.',
      5: 'Sua diplomacia é uma virtude, desde que não esconda um medo discreto de discordar.',
      6: 'Quando você concorda por educação, seu corpo anota a dívida com juros.',
      7: 'Nem todo ambiente merece a sua concessão permanente.',
      8: 'O que aconteceria se você colocasse a sua vontade na frente da conveniência alheia?',
      9: 'Você não precisa da autorização do comitê social para ter a sua própria vida.',
      10: 'Aprender a agradar o mundo inteiro é o caminho mais rápido para esquecer de agradar a si mesmo.'
    }
  },

  'Unhas-Pequenas': {
    registro: '011',
    categoria: 'Tamanho das Unhas',
    subcategoria: 'Visibilidade',
    dificuldadeCentral: 'fortalecer as próprias referências internas e diminuir o peso da opinião alheia',
    contradicao: 'Buscar validação constante no outro enfraquece a confiança na própria intuição.',
    emocaoPrincipal: 'insegurança / necessidade de aprovação / autocobrança',
    alvoEmocional: 'autoestima, autonomia e validação externa',
    niveis: {
      1: 'Você observa com atenção o ambiente antes de colocar a sua opinião.',
      2: 'Consultar os outros é prudente; esquecer de consultar a si mesmo é abandono.',
      3: 'Sua sensibilidade ao contexto é grande; o desafio é não se diminuir para caber no espaço do outro.',
      4: 'Você tende a dar mais autoridade ao que os outros dizem do que ao que você mesmo sente.',
      5: 'Quantas decisões suas foram tomadas apenas para não desapontar alguém?',
      6: 'Sua voz interna tem tanto direito de existir quanto a dos especialistas ao seu redor.',
      7: 'O que você diria se tivesse a certeza de que ninguém iria criticar?',
      8: 'Aprovação alheia é um alimento que nunca sacia a fome de autoconfiança.',
      9: 'Você já passou tempo suficiente pedindo licença para existir.',
      10: 'O mundo não precisa de mais uma cópia bem-educada das expectativas alheias; precisa da sua verdade.'
    }
  },

  // ============================================================
  // UNHAS ENCRAVADAS
  // ============================================================

  'Unhas-Encravadas-Dedao': {
    registro: '012',
    categoria: 'Unhas Encravadas',
    subcategoria: 'Dedões',
    dificuldadeCentral: 'equilibrar firmeza de princípios com flexibilidade diante das pressões externas',
    contradicao: 'Apertar o controle interno inflama o corpo toda vez que se cede contra a própria vontade.',
    emocaoPrincipal: 'conflito interno / autocobrança / resistência silenciosa',
    alvoEmocional: 'direção, liderança e concessão excessiva',
    niveis: {
      1: 'Você tem fortes princípios e não gosta de ser forçado a agir contra o que acredita.',
      2: 'Quando você aceita algo por fora enquanto discorda por dentro, a conta chega no corpo.',
      3: 'Cedência com raiva acumulada é a receita clássica para a inflamação somática.',
      4: 'A unha encravada no dedão fala de atrito entre para onde você quer ir e para onde foi empurrado.',
      5: 'Você pode estar sendo excessivamente duro consigo mesmo na tentativa de ser impecável.',
      6: 'Aprenda a dizer "não" com calma antes que o seu organismo precise gritar em forma de dor.',
      7: 'Quanto da sua exigência com os outros é apenas o reflexo da tirania que exerce sobre si?',
      8: 'Resistir não significa esmagar a si mesmo; significa escolher as batalhas que valem a pena.',
      9: 'Sua dignidade não depende de você carregar o mundo nas costas sem reclamar.',
      10: 'Solte a obrigação de ser o sustentáculo inabalável de tudo e de todos; seus pés agradecem.'
    }
  },

  'Unhas-Encravadas-Outros': {
    registro: '013',
    categoria: 'Unhas Encravadas',
    subcategoria: 'Outros Dedos',
    dificuldadeCentral: 'expressar sentimentos e desconfortos nas relações cotidianas sem engolir sapos',
    contradicao: 'Manter a paz superficial gerando guerra interna contra os próprios tecidos.',
    emocaoPrincipal: 'ressentimento / repressão emocional / atrito interpessoal',
    alvoEmocional: 'relacionamentos, mágoas guardadas e comunicação',
    niveis: {
      1: 'Pequenos atritos nos dedos menores denunciam pequenas mágoas que não foram expressas.',
      2: 'Engolir o que incomoda para não criar clima ruim é o primeiro passo para a somatização.',
      3: 'O corpo é transparente: o que a boca cala, as pontas dos pés expressam.',
      4: 'Você não precisa explodir, mas precisa aprender a colocar limites com clareza.',
      5: 'Atrito relacional não se resolve fingindo que está tudo bem.',
      6: 'Por quanto tempo mais você vai continuar pagando com dor física a conta da gentileza forçada?',
      7: 'Permita-se expressar seu desconforto na hora em que ele acontece, em vez de guardá-lo para inflamar.',
      8: 'Relações maduras sobrevivem a divergências sinceras.',
      9: 'Limpar mágoas antigas é tão necessário para a saúde quanto cuidar dos próprios pés.',
      10: 'Você merece relações onde não precise machucar a si mesmo para continuar pertencendo.'
    }
  },

  'Unhas-Encravadas-Nenhum': {
    registro: '014',
    categoria: 'Unhas Encravadas',
    subcategoria: 'Ausência',
    dificuldadeCentral: 'manter a harmonia corporal sem cair na anestesia diante dos conflitos da vida',
    contradicao: 'A ausência de sinais visíveis pode indicar fluidez ou simplesmente afastamento da percepção.',
    emocaoPrincipal: 'fluidez / estabilidade / integração',
    alvoEmocional: 'equilíbrio e presença corporal',
    niveis: {
      1: 'Seus pés mostram boa fluidez e ausência de atritos profundos nas bordas unguais.',
      2: 'A estabilidade física é uma aliada; o convite é manter essa harmonia viva e atenta.',
      3: 'Ausência de dor física é o ponto de partida para aprofundar na sensibilidade do corpo.',
      4: 'Caminhar sem resistências dolorosas nos pés permite passos mais leves e decididos.',
      5: 'Celebre a saúde e a integridade da sua base.',
      6: 'A harmonia nos tecidos reflete capacidade de avançar sem comprimir excessivamente o que sente.',
      7: 'Mantenha a escuta aberta para os sinais sutis do seu organismo.',
      8: 'Um corpo sem nós é um solo fértil para escolhas mais conscientes.',
      9: 'A verdadeira leveza não é a falta de problemas, mas a capacidade de atravessá-los sem se ferir.',
      10: 'Avance com a confiança de quem tem raízes firmes e pés livres para trilhar o próprio caminho.'
    }
  }

};
