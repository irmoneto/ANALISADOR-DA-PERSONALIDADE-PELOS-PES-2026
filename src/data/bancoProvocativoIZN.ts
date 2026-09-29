export interface RegistroProvocativo {
  registro: string;
  categoria: string;
  subcategoria: string;
  dificuldadeCentral: string;
  contradicao: string;
  emocaoPrincipal: string;
  alvoEmocional: string;
  niveis: {
    [key: number]: string;
  };
}

export const BANCO_PROVOCATIVO_IZN: Record<string, RegistroProvocativo> = {
  // FORMATO DO PÉ
  'Egípcio': {
    registro: '001',
    categoria: 'Formato do Pé',
    subcategoria: 'Forma',
    dificuldadeCentral: 'lidar com imprevistos, erros e perda de controle',
    contradicao: 'Quanto mais tenta controlar o resultado, mais vulnerável fica ao imprevisto.',
    emocaoPrincipal: 'frustração / vulnerabilidade / necessidade de controle',
    alvoEmocional: 'controle e perfeccionismo',
    niveis: {
      1: 'Você é tão metodicamente organizado que até o acaso precisa agendar hora com a sua secretária para acontecer.',
      2: 'Claro que você não é um controlador compulsivo. Você só adora que o universo siga estritamente o roteiro que você escreveu, e chora em silêncio quando a realidade ousa improvisar.',
      3: 'Você chama de planejamento estratégico aquilo que os seus amigos mais próximos chamam de neurose crônica com a simetria da toalha de mesa.',
      4: 'Você insiste em chamar isso de perfeccionismo porque admitir que tem pavor de perder o controle soaria cafona demais num jantar de gala.',
      5: 'Você passou a existência inteira blindando-se contra imprevistos, e acabou transformando a sua passagem pela terra numa planilha de Excel que nem o criador tem paciência para ler.',
      6: 'Desarme o espírito. Nem tudo neste vasto mundo precisa sair exatamente do jeito que você determinou, inclusive o seu próprio temperamento insuportável.',
      7: 'Se você não consegue mandar nem na circulação do seu próprio sangue, por que diabos ainda acredita que governa o resto do planeta?',
      8: 'O que aconteceria na sua vidinha engessada se você parasse de usar esse formato egípcio como trincheira e simplesmente permitisse que o mistério da vida acontecesse?',
      9: 'Desarme o espírito. Nem tudo neste vasto mundo precisa sair exatamente do jeito que você determinou, inclusive o seu próprio temperamento.',
      10: 'Você passou a vida inteira tentando algemar o incontrolável, e ainda tem o desplante de chamar essa prisão de responsabilidade adulta.'
    }
  },
  'Grego/Romano': {
    registro: '002',
    categoria: 'Formato do Pé',
    subcategoria: 'Forma',
    dificuldadeCentral: 'sair da análise e transformar planejamento em ação',
    contradicao: 'Entender muito não garante fazer o que já sabe que precisa ser feito.',
    emocaoPrincipal: 'dúvida / ansiedade / confronto com a ação',
    alvoEmocional: 'excesso de análise',
    niveis: {
      1: 'Você possui um plano infalível para absolutamente tudo, inclusive para decidir o exato segundo em que vai começar a pensar nos planos.',
      2: 'Você já filosofou tanto sobre esse problema que ele já deve ter constituído família e pedido aposentadoria.',
      3: 'Você não está indeciso, meu caro intelectual. Você está apenas conduzindo uma pesquisa acadêmica de campo que já dura décadas sobre a própria lentidão.',
      4: 'Sua cachola funciona como um labirinto grego tão sofisticado que nem o minotauro consegue achar a saída para ir tomar um café.',
      5: 'Você domina a teoria de cor e salteado. O único detalhe é que ainda está esperando um sinal divino para descobrir se sabe mesmo.',
      6: 'Você já mapeou todos os cenários possíveis da galáxia. Agora falta ter a ousadia de viver um deles, caso isso não exija muito esforço da sua inércia.',
      7: 'Quantas epopeias heroicas você já venceu com bravura e glória... exclusivamente dentro do conforto da sua imaginação?',
      8: 'O que aconteceria se você abandonasse essa pose de pensador grego e desse o primeiro passo sem consultar antes um comitê de sábios?',
      9: 'Você domina a teoria de cor e salteado. O único detalhe é que ainda está esperando um sinal divino para descobrir se sabe mesmo.',
      10: 'Você não está indeciso por cautela. Está apenas entorpecido pelas próprias elucubrações enquanto o trem da vida passa buzinando na sua cara.'
    }
  },
  'Quadrado': {
    registro: '003',
    categoria: 'Formato do Pé',
    subcategoria: 'Forma',
    dificuldadeCentral: 'simplificar, aceitar limites e lidar com o concreto',
    contradicao: 'Enxergar muitas possibilidades pode dificultar aceitar uma realidade simples.',
    emocaoPrincipal: 'frustração / confronto com limites / excesso de complexidade',
    alvoEmocional: 'complexidade e idealismo',
    niveis: {
      1: 'Você tem o dom magnífico de encontrar conexões cósmicas profundas até entre coisas que estavam perfeitamente felizes sem saber da existência uma da outra.',
      2: 'Convenhamos que a situação não é complexa. É você que tem uma necessidade quase alcoólica de transformar qualquer brisa em tese de doutorado.',
      3: 'Você consegue costurar teorias mirabolantes para tudo, unindo pontos que só fazem sentido na sua mente habitada por duendes geométricos.',
      4: 'Não venha me dizer que o assunto é intrincado. É você que exige que a existência venha acompanhada de manual, diagrama de blocos e mapa mental plastificado.',
      5: 'Algumas vezes a vida não esconde nenhum grande segredo místico; ela apenas apresenta uma verdade elementar que você está correndo léguas para evitar.',
      6: 'Você vive repetindo que esse é o seu jeitão inegociável. Mas será que é genuinamente a sua essência, ou foi o disfarce perfeito que encontrou para jamais se expor ao ridículo?',
      7: 'E se a resposta definitiva para o seu dilema for tão escandalosamente simples que a sua soberba intelectual simplesmente recusa-se a aceitá-la?',
      8: 'O que aconteceria se você parasse de usar essa rigidez quadrada como couraça e tivesse a coragem de abraçar a simplicidade nua e crua?',
      9: 'Algumas vezes a vida não esconde nenhum grande segredo místico; ela apenas apresenta uma verdade elementar que você está evitando.',
      10: 'Você passou a existência inteira caçando a fórmula definitiva de tudo, e ainda não percebeu que a resposta era tão singela que ofendia a sua vaidade.'
    }
  },

  // TAMANHO DOS DEDOS
  'Dedos-Curtos': {
    registro: '004',
    categoria: 'Tamanho dos Dedos',
    subcategoria: 'Proporção',
    dificuldadeCentral: 'tolerar espera, ambiguidade e reflexão prolongada',
    contradicao: 'Aquilo que protege também pode se tornar aquilo que limita.',
    emocaoPrincipal: 'dúvida / ansiedade / confronto com a ação',
    alvoEmocional: 'pressa e objetividade',
    niveis: {
      1: 'Para que gastar neurônios pensando tanto, se você já tomou partido antes de o vento começar a soprar?',
      2: 'Você não sofre de impaciência crônica, claro que não. Você apenas considera que o restante da humanidade possui a velocidade mental de uma lesma manca.',
      3: 'Você chama de pragmatismo fulminante aquilo que as testemunhas oculares do seu estresse costumam apelidar carinhosamente de pura precipitação.',
      4: 'Se pensar antes de abrir a boca ou agir fosse um requisito obrigatório para a sobrevivência, você pediria falência múltipla de órgãos em dois minutos.',
      5: 'Você não sofre de impaciência crônica. Você apenas considera que o resto do mundo demora uma eternidade geológica para captar o óbvio ululante.',
      6: 'Se a reflexão prévia fosse cobrada em impostos, você pediria isenção total e ainda faria um abaixo-assinado reclamando da lentidão do cobrador.',
      7: 'Quantas vezes na vida você atropelou o destino só para descobrir que a linha de chegada continuava exatamente no mesmo lugar?',
      8: 'O que aconteceria com a sua adrenalina se você usasse esses dedinhos curtos para dar uma freada brusca e experimentasse a virtude maldita da paciência?',
      9: 'Se pensar antes de agir fosse um requisito obrigatório para a sobrevivência, você provavelmente exigiria reembolso imediato do criador.',
      10: 'Você não é uma pessoa rápida por eficiência. Você é apenas alguém que tem um pavor indescritível de encarar o silêncio que vem antes da escolha.'
    }
  },
  'Dedos-Normais-para-Curtos': {
    registro: '005',
    categoria: 'Tamanho dos Dedos',
    subcategoria: 'Proporção',
    dificuldadeCentral: 'encarar o padrão descrito sem depender apenas da explicação racional',
    contradicao: 'Entender muito não garante fazer o que já sabe que precisa ser feito.',
    emocaoPrincipal: 'curiosidade / desconforto / autorreflexão',
    alvoEmocional: 'padrão automático',
    niveis: {
      1: 'O termo coincidência é uma muleta maravilhosa para quando o seu roteiro repetitivo começa a ranger nas juntas da alma.',
      2: 'Você pode continuar fantasiando que isso é apenas o seu jeito exótico. O problema real é quando esse seu jeitinho toma as rédeas e decide por você.',
      3: 'Talvez a parte mais deliciosa — e aterrorizante — de observar você seja ver exatamente aquilo que você faz com a convicção de quem está dormindo acordado.',
      4: 'Você vive proclamando que age assim por puro estilo próprio. Mas será que é escolha consciente ou apenas a velha armadura que encontrou para não sangrar na vitrine?',
      5: 'Talvez você tenha transformado o seu mecanismo de defesa num crachá de identidade, e agora gaste a energia de uma usina defendendo a própria cela.',
      6: 'O que você faria se um espelho de verdade soprasse no seu ouvido que o seu comportamento notório não passa de uma fita gravada em loop?',
      7: 'A anatomia dos seus pés está sussurrando um segredo milenar que você prefere abafar com explicações pseudocientíficas sofisticadas.',
      8: 'O que desmoronaria na sua arquitetura mental se você parasse de se esconder atrás desse padrão de transição e encarasse o precipício?',
      9: 'Talvez a parte mais deliciosa de observar você seja justamente o espetáculo daquilo que você executa sem perceber o próprio automatismo.',
      10: 'Você passou décadas vestindo de personalidade autêntica o que nunca passou de medo empacotado em hábito automatizado.'
    }
  },
  'Dedos-Normais': {
    registro: '006',
    categoria: 'Tamanho dos Dedos',
    subcategoria: 'Proporção',
    dificuldadeCentral: 'encarar o padrão descrito sem depender apenas da explicação racional',
    contradicao: 'Entender muito não garante fazer o que já sabe que precisa ser feito.',
    emocaoPrincipal: 'curiosidade / desconforto / autorreflexão',
    alvoEmocional: 'padrão automático',
    niveis: {
      1: 'Chamar de mero acaso é um excelente analgésico mental quando o espelho começa a mostrar rugas de repetição que incomodam.',
      2: 'Você pode chamar essa monotonia de prudência sensata. O perigo real é quando essa prudência se torna a sua mordaça definitiva.',
      3: 'O mais fascinante na sua biografia não são os grandes feitos, mas sim os pequenos rituais automáticos que você executa acreditando ter inventado a roda.',
      4: 'Você jura de pés juntos que isso é a sua genuína identidade. Mas não seria apenas a velha estratégia de se fazer de invisível para não encarar o risco?',
      5: 'O que aconteceria com a sua suposta serenidade se você admitisse que esse equilíbrio impecável não passa de covardia gourmetizada?',
      6: 'Talvez você tenha polido tanto a sua carapaça defensiva que hoje se orgulha de ser uma ostra vazia, porém muito bem comportada.',
      7: 'Os seus pés carregam o peso de uma rotina tão previsível que até o relógio de ponto da sua casa suspira de tédio ao vê-lo passar.',
      8: 'O que se revelaria por baixo dessa casca de normalidade absoluta se você tivesse a ousadia de cometer uma extravagância espiritual?',
      9: 'O mais fascinante na sua biografia não são os grandes feitos, mas sim os pequenos rituais automáticos que você executa acreditando ter inventado a roda.',
      10: 'Você passou a vida inteira ostentando o troféu da moderação, e ainda não percebeu que equilibrar-se em cima do muro é só medo covarde de escolher um lado.'
    }
  },
  'Dedos-Normais-para-Longos': {
    registro: '007',
    categoria: 'Tamanho dos Dedos',
    subcategoria: 'Proporção',
    dificuldadeCentral: 'encarar o padrão descrito sem depender apenas da explicação racional',
    contradicao: 'Entender muito não garante fazer o que já sabe que precisa ser feito.',
    emocaoPrincipal: 'dúvida / ansiedade / confronto com a ação',
    alvoEmocional: 'padrão automático',
    niveis: {
      1: 'É reconfortante culpar o destino pelas repetições quando o incômodo bate à porta e exige respostas incômodas.',
      2: 'Você adora rotular suas hesitações como sabedoria milenar, mas o espelho sabe muito bem que isso é apenas procrastinação com diploma universitário.',
      3: 'Será que essa sua pretensa profundidade existencial é escolha deliberada da alma ou apenas a muleta intelectual que sustenta o seu medo de errar?',
      4: 'E se a característica que você exibe com tanto orgulho como seu maior trunfo for exatamente a âncora que impede o seu barco de singrar os mares?',
      5: 'Talvez você tenha transformado o hábito de sofisticar as desculpas numa obra de arte, a ponto de aplaudir a si mesmo enquanto afunda na paralisia.',
      6: 'Os seus pés denunciam uma trajetória de quem gasta mais tempo arquitetando a viagem do que colocando os sapatos para caminhar na poeira.',
      7: 'O que você descobriria sobre si mesmo se a sua inteligência brilhante resolvesse tirar férias de um mês e deixasse o corpo agir por instinto?',
      8: 'O que mudaria na sua realidade se você deixasse de usar essa transição anatômica como álibi para contemplar o mundo em vez de habitá-lo?',
      9: 'E se aquilo que você mais admira no próprio umbigo for justamente o mecanismo genial que garante a sua total estagnação?',
      10: 'Você passou décadas chamando de alta reflexão filosófica o que nunca passou de aversão incurável ao suor da ação prática.'
    }
  },
  'Dedos-Longos': {
    registro: '008',
    categoria: 'Tamanho dos Dedos',
    subcategoria: 'Proporção',
    dificuldadeCentral: 'transformar reflexão e possibilidades em ação concreta',
    contradicao: 'Entender muito não garante fazer o que já sabe que precisa ser feito.',
    emocaoPrincipal: 'dúvida / ansiedade / confronto com a ação',
    alvoEmocional: 'intelectualização e ação',
    niveis: {
      1: 'Você já desconstruiu o universo em partículas subatômicas na sua cabeça; agora só falta ter a decência de levantar da poltrona e trocar a lâmpada queimada.',
      2: 'O seu cérebro processa tantas hipóteses simultâneas que o resto do seu corpo já emitiu nota de falência por falta de uso e tédio mortal.',
      3: 'Você consegue discursar com a eloquência de um profeta sobre a urgência da mudança. Que prodígio intelectual! Agora experimente fazer alguma coisa concreta.',
      4: 'Você já analisou todas as variáveis da matriz cósmica. Falta apenas viver uma vidinha real, se não for pedir demais à sua realeza pensante.',
      5: 'A sua cachola funciona em ritmo de cúpula internacional de cientistas, enquanto as suas pernas continuam estagnadas na sala de espera da mediocridade.',
      6: 'Você teoriza com maestria sobre a beleza do risco, mas na hora H prefere o conforto asséptico de assistir à vida pelo buraco da fechadura.',
      7: 'Quantas civilizações brilhantes já nasceram, prosperaram e colapsaram inteirinhas dentro da sua imaginação, sem que ninguém no mundo real soubesse?',
      8: 'O que desabaria na sua torre de marfim se você jogasse fora os tratados teóricos e simplesmente se sujasse com a lama viva da experiência?',
      9: 'Você consegue explicar perfeitamente por que a humanidade precisa agir. Impressionante espetáculo retórico. Agora tenha a hombridade de agir você mesmo.',
      10: 'Você passou a vida inteira arquitetando discursos mirabolantes sobre o sentido da vida, e ainda não caiu na real de que a vida escorreu inteira enquanto você discursava.'
    }
  },

  // TAMANHO DAS UNHAS
  'Unhas-Grandes': {
    registro: '009',
    categoria: 'Tamanho das Unhas',
    subcategoria: 'Visibilidade',
    dificuldadeCentral: 'flexibilizar convicções sem sentir que está abrindo mão de si',
    contradicao: 'Aquilo que protege também pode se tornar aquilo que limita.',
    emocaoPrincipal: 'incômodo com limites / dispersão',
    alvoEmocional: 'convicções e teimosia',
    niveis: {
      1: 'Você transborda opiniões irredutíveis sobre o cosmos, e aparentemente também contratou um serviço expresso de entrega para descarregá-las em qualquer roda de conversa.',
      2: 'Você não é teimoso nem cabeça-dura, de jeito nenhum. Você apenas tem a firme convicção de que ceder um milímetro seria o equivalente a declarar falência moral para o inimigo.',
      3: 'É espantoso como a sua verdade absoluta chega com sirene ligada e camburão antes mesmo que qualquer outra ideia ouse pedir licença para entrar.',
      4: 'Você desfila por aí ostentando certezas do tamanho de bondes, enquanto a modéstia chora copiosamente nos fundos da sua alfândega mental.',
      5: 'Para você, mudar de opinião não é um sinal de evolução da consciência, mas uma traição imperdoável à sua soberana e infalível majestade.',
      6: 'Quando foi a última vez que você admitiu um erro retumbante sem contra-atacar com um argumento ainda mais estapafúrdio para salvar o ego?',
      7: 'O que aconteceria com a estrutura do seu universo particular se alguém provasse documentalmente que você estava redondamente errado desde o princípio?',
      8: 'O que se revelaria por trás dessas unhas pontudas se você tivesse a grandeza de recolher as garras e escutar o que o outro tem a ensinar?',
      9: 'É fascinante notar como a sua verdade inabalável chega sempre antes de qualquer possibilidade humana de escuta sincera.',
      10: 'Você passou a existência inteira arrotando convicções pétreas, e ainda não percebeu que a sua grande obra-prima foi apenas repetir o próprio eco no deserto.'
    }
  },
  'Unhas-Normais': {
    registro: '010',
    categoria: 'Tamanho das Unhas',
    subcategoria: 'Visibilidade',
    dificuldadeCentral: 'encarar o padrão descrito sem depender apenas da explicação racional',
    contradicao: 'Entender muito não garante fazer o que já sabe que precisa ser feito.',
    emocaoPrincipal: 'curiosidade / desconforto / autorreflexão',
    alvoEmocional: 'padrão automático',
    niveis: {
      1: 'A palavra coincidência é o refúgio dourado dos aflitos quando a repetição mecânica da vida começa a ranger nas dobradiças da alma.',
      2: 'Você pode continuar justificando isso como o seu charme particular. O problema grave surge quando esse seu jeitinho automático assume o volante da sua história.',
      3: 'O mais saboroso nessa comédia humana que é você é flagrar exatamente aquilo que você executa no piloto automático, convencido de que exerce livre-arbítrio.',
      4: 'Você alega que é apenas a sua natureza inalterável. Mas não será o disfarce perfeito que encontrou para jamais se comprometer com a própria transformação?',
      5: 'O que aconteceria com a sua postura de pessoa sensata se você descobrisse que a sua moderação elegante não passa de medo patológico de assumir um lado?',
      6: 'Talvez você tenha transformado o muro da indiferença na sua pátria definitiva, e agora exija aplausos por não ter opiniões que incomodem.',
      7: 'Os seus pés carregam os rastros de uma caminhada tão morna que até o vento parece desviar de você por puro tédio climático.',
      8: 'O que desmoronaria na sua fachada de bom moço se você tivesse a coragem de sujar as mãos com uma paixão desmedida?',
      9: 'O mais divertido em observar os seus passos é flagrar o mecanismo exato daquilo que você faz acreditando ser fruto da sua genialidade consciente.',
      10: 'Você passou décadas posando de equilibrado supremo, e ainda não entendeu que ficar em cima do muro é apenas a forma mais covarde de recusar a dança.'
    }
  },
  'Unhas-Pequenas': {
    registro: '011',
    categoria: 'Tamanho das Unhas',
    subcategoria: 'Visibilidade',
    dificuldadeCentral: 'sustentar a própria posição diante da opinião externa',
    contradicao: 'Adaptar-se ao mundo pode custar a própria posição.',
    emocaoPrincipal: 'incômodo com limites / dispersão',
    alvoEmocional: 'opinião externa e dogma',
    niveis: {
      1: 'Você manifesta uma porosidade impressionante às opiniões alheias, sobretudo quando elas trazem o carimbo oficial da maioria que aplaude.',
      2: 'Você veste a carapuça do bom senso universal, repetindo com voz mansa dogmas alheios que jamais teve a petulância de submeter ao próprio fogo.',
      3: 'Se a patota inteira decretar que a Terra é quadrada, você provavelmente fará uma palestra técnica defendendo a esquina mais próxima.',
      4: 'Você se molda ao ambiente com a destreza de um camaleão diplomata, a ponto de desaparecer por completo caso o sofá da sala mude de cor.',
      5: 'Onde foi parar a sua espinha dorsal nesse processo todo? Foi esquecida na lavanderia ou trocada por um sorriso de concordância generalizada?',
      6: 'Quando foi a última vez que você sustentou uma convicção própria capaz de fazer os seus amigos arregalarem os olhos de espanto?',
      7: 'Você possui algum pensamento genuíno que não seja a média ponderada das bobagens que ouviu na televisão e nos livros de autoajuda?',
      8: 'O que tremeria nas bases da sua persona dócil se você tivesse a ousadia de discordar de todo mundo apenas pelo prazer de escutar a própria voz?',
      9: 'Se a manada inteira decidir marchar em direção ao penhasco, você certamente elogiará a vista panorâmica durante a queda.',
      10: 'Você passou a vida inteira balançando a cabeça em sinal de sim, e ainda tem a pachorra de chamar essa submissão crônica de bom senso diplomático.'
    }
  },

  // UNHAS ENCRAVADAS
  'Unhas-Encravadas-Dedao': {
    registro: '012',
    categoria: 'Unhas Encravadas',
    subcategoria: 'Dedões',
    dificuldadeCentral: 'encarar o padrão descrito sem depender apenas da explicação racional',
    contradicao: 'Entender muito não garante fazer o que já sabe que precisa ser feito.',
    emocaoPrincipal: 'frustração / vulnerabilidade / necessidade de controle',
    alvoEmocional: 'imagem, cobrança e controle',
    niveis: {
      1: 'Nem a sua própria unha ousa desobedecer às suas ordens executivas; imagine então o resto do universo caótico ao seu redor.',
      2: 'Você vive propagando que não precisa controlar o mundo, mas esqueceu de avisar esse pequeno detalhe inflamado aos tecidos do seu próprio pé.',
      3: 'Quando até a queratina do seu dedão entra em greve insurreta contra você, talvez o diagnóstico correto não esteja na farmácia, mas na sua mania de triturar o controle.',
      4: 'Você aperta os parafusos da própria existência com tanta força que até o seu corpo resolveu encravar para ver se você toma um susto e desarma a bomba.',
      5: 'O seu nível de exigência interna é tão tirânico que a carne grita em protesto enquanto você finge que está tudo sob controle absoluto.',
      6: 'Que monstro invisível você está tentando algemar tão desesperadamente na sua mente, que até o seu dedão preferiu inflamar em legítima defesa?',
      7: 'O que aconteceria com o seu castelo de cartas se você permitisse que o corpo relaxasse e deixasse de esmagar a si mesmo por pura teimosia?',
      8: 'O que se desmancharia na sua pose de ferro se você parasse de travar as engrenagens e experimentasse a santa leveza de soltar as rédeas?',
      9: 'Quando até o seu próprio corpo rebela-se e perfura a própria carne, fica evidente que o tirano principal mora bem dentro da sua cabeça.',
      10: 'Você passou a vida inteira exercendo uma ditadura implacável sobre si mesmo, e ainda se surpreende quando o seu próprio organismo pede socorro na base da dor.'
    }
  },
  'Unhas-Encravadas-Outros': {
    registro: '013',
    categoria: 'Unhas Encravadas',
    subcategoria: 'Outros Dedos',
    dificuldadeCentral: 'encarar o padrão descrito sem depender apenas da explicação racional',
    contradicao: 'Entender muito não garante fazer o que já sabe que precisa ser feito.',
    emocaoPrincipal: 'frustração / vulnerabilidade / necessidade de controle',
    alvoEmocional: 'imagem, cobrança e controle',
    niveis: {
      1: 'É admirável ver como o seu sistema de controle é tão abrangente que nem as unhas laterais escapam do seu regime de prisões domiciliares.',
      2: 'Você proclama aos quatro ventos a sua paz de espírito, enquanto os seus pés mandam boletins diários de guerra civil através de inflamações agudas.',
      3: 'Quando o corpo inteiro decide encravar em solidariedade à sua teimosia, culpar a botina apertada já não cola nem em consulta de comadre.',
      4: 'Você insiste em dizer que o seu jeito de lidar com a pressão é perfeitamente natural, mas a sua anatomia está emitindo decretos de calamidade pública.',
      5: 'O seu autocontrole é uma obra de ficção tão violenta que os seus tecidos periféricos resolveram fazer piquete de dor para ver se você acorda.',
      6: 'O que você está contendo com tanta força marcial nos bastidores da alma que até a extremidade dos dedos virou uma zona de conflito armado?',
      7: 'O que aconteceria se você desse férias à sua carochinha interna e permitisse que o sangue circulasse sem o seu alvará de soltura?',
      8: 'O que desmoronaria na sua fachada de pessoa inabalável se você admitisse que está ferindo a si mesmo por pura incapacidade de flexibilizar?',
      9: 'Quando a dor física se torna o único canal pelo qual a sua alma consegue gritar, o seu orgulho racional faliu de vez.',
      10: 'Você passou décadas amarrando a própria alma com arame farpado, e ainda finge surpresa quando o corpo inteiro resolve sangrar em protesto.'
    }
  },
  'Unhas-Encravadas-Nenhum': {
    registro: '014',
    categoria: 'Unhas Encravadas',
    subcategoria: 'Ausência',
    dificuldadeCentral: 'encarar o padrão descrito sem depender apenas da explicação racional',
    contradicao: 'Entender muito não garante fazer o que já sabe que precisa ser feito.',
    emocaoPrincipal: 'frustração / vulnerabilidade / necessidade de controle',
    alvoEmocional: 'imagem, cobrança e controle',
    niveis: {
      1: 'Que espetáculo de flexibilidade anatômica! Nem parece que você carrega nas costas o peso de ser o juiz implacável de si mesmo e dos outros.',
      2: 'Você transita por essa vida com uma leveza tão imaculada que a gente até desconfia se você tem pulso ou se é feito de gelatina espiritual.',
      3: 'O fato de não ter unhas encravadas prova que ou você flutua acima dos problemas ou anestesiou tão bem os nervos que já não sente nem o próprio piso.',
      4: 'Você relaxa com tanta competência que às vezes o observador desatento pode confundir a sua paz de espírito com uma sutil forma de abulia crônica.',
      5: 'Será que esse seu relaxamento olímpico é fruto de iluminação interior ou apenas um entorpecimento sofisticado para não ver o circo pegar fogo?',
      6: 'O que você faria se a vida exigisse um pingo de tensão legítima, em vez desse desfile contínuo de quem parece estar sempre flutuando em cima de nuvens de algodão?',
      7: 'O que se esconde por trás dessa ausência total de conflitos físicos? Seria sabedoria de mestre ou preguiça generalizada de encarar o ringue?',
      8: 'O que aconteceria com a sua modorrenta harmonia se o destino resolvesse sacudir a sua maca com um terremoto de verdade?',
      9: 'Você transita incólume pelos microtraumas da carne, mas resta saber se o seu coração continua batendo ou se já entrou em repouso eterno por falta de emoção.',
      10: 'Você passou tanto tempo evitando qualquer sobressalto que acabou transformando a sua suposta iluminação num elegante cemitério de inércias.'
    }
  }
};
