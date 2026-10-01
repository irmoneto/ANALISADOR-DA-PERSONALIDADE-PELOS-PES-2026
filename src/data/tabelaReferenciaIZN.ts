/**
 * TABELA INTEGRADA DE REFERÊNCIA PSICOSSOMÁTICA DOS PÉS
 * Baseada na estrutura relacional de Categorias, Subcategorias, Opções e Descrições
 * com expansões Reichianas, Neurociência do Apego e o rigor analítico IZN.
 */

export interface ReferenceDataEntry {
  descricaoGeral: string;
  pontosFortes?: string;
  pontosDesafiadores?: string;
  sugestoesMelhora?: string;
}

export interface ReichDefenseData {
  tipoCarater: string;
  descricao: string;
  conexaoReich: string;
  sugestaoTerapeutica: string;
}

// 1. FORMATO DO PÉ (IDs 1-3, 65-67)
export const FORMATO_DO_PE_REF: Record<string, { descricaoGeral: string; pontosFortes: string; pontosDesafiadores: string }> = {
  'Egípcio': {
    descricaoGeral: 'Uma mente cirurgicamente cartesiana que confunde o pânico irracional de perder o controle com "amor à organização", exigindo que o universo inteiro dobre-se à sua planilha mental.',
    pontosFortes: 'Predomínio do Pensamento Linear com precisão cirúrgica. Busca clareza absoluta, ordem implacável e previsibilidade matemática em suas ações, executando com rigor mecânico.',
    pontosDesafiadores: 'Rigidez tirânica diante de imprevistos e exigência de controle absoluto. Colapso imediato e desespero silencioso quando a realidade ousa desobedecer ao script pré-estabelecido.'
  },
  'Grego/Romano': {
    descricaoGeral: 'Uma mente brilhante trancada num cativeiro de teses, onde a procrastinação crônica é glorificada sob o codinome elegante de "análise de risco e prudência".',
    pontosFortes: 'Predomínio do Pensamento Sistêmico e estratégico. Capacidade aristocrática de enxergar o todo, erguendo catedrais teóricas antes de dar um único passo na poeira da realidade.',
    pontosDesafiadores: 'Paralisia crônica por excesso de análise. Tenta decifrar o cosmos com requinte intelectual enquanto afunda com classe em meio copo d\'água prático.'
  },
  'Quadrado': {
    descricaoGeral: 'Um arquiteto de conexões cósmicas que tenta abraçar o universo inteiro com teorias brilhantes enquanto a própria rotina doméstica implora por socorro no canto da sala.',
    pontosFortes: 'Predomínio do Pensamento Digital e integrador. Mente ampla e fascinada por unificar o incompatível, costurando conceitos e acolhendo a diversidade teórica com entusiasmo.',
    pontosDesafiadores: 'Alergia crônica à simplicidade e dispersão olímpica. Tenta harmonizar a humanidade inteira com braços teóricos enquanto tropeça pateticamente no fio do próprio umbigo.'
  }
};

// 2. TAMANHO DOS DEDOS (IDs 4-8, 57-58)
export const TAMANHO_DOS_DEDOS_REF: Record<string, { descricaoGeral: string; pontosFortes: string; pontosDesafiadores: string }> = {
  'Curtos': {
    descricaoGeral: 'Uma urgência implacável que atropela processos, atropela o bom senso e decide tudo antes de descobrir se estava, ao menos, na direção correta.',
    pontosFortes: 'Agilidade cirúrgica e resposta imediata. Praticidade inegociável para desatar nós e atropelar burocracias no mundo material com eficiência brutal.',
    pontosDesafiadores: 'Intolerância infantil com o tempo alheio e a mania augusta de agir antes de ligar o cérebro, colecionando desastres em velocidade recorde.'
  },
  'Curtos para Normais': {
    descricaoGeral: 'O delicado e tenso equilíbrio entre atropelar o mundo com pressa e fingir que pondera as consequências por dois segundos.',
    pontosFortes: 'A rara habilidade de executar com ímpeto pressuroso sem perder totalmente a ternura e a sensibilidade ao atropelar os outros.',
    pontosDesafiadores: 'A oscilação neurótica entre o impulso feroz de chutar o balde e a culpa subsequente de ter que recolher os cacos.'
  },
  'Normais para Curtos': {
    descricaoGeral: 'O delicado e tenso equilíbrio entre atropelar o mundo com pressa e fingir que pondera as consequências por dois segundos.',
    pontosFortes: 'A rara habilidade de executar com ímpeto pressuroso sem perder totalmente a ternura e a sensibilidade ao atropelar os outros.',
    pontosDesafiadores: 'A oscilação neurótica entre o impulso feroz de chutar o balde e a culpa subsequente de ter que recolher os cacos.'
  },
  'Normais': {
    descricaoGeral: 'A neutralidade asséptica de quem foi fabricado em série para não se comprometer com absolutamente lado nenhum da vida.',
    pontosFortes: 'Harmonia impecável e polida entre pensar, sentir e agir. Flexibilidade adaptativa tão discreta que beira a anestesia emocional.',
    pontosDesafiadores: 'A neutralidade morna de quem tem pavor visceral de escolher um lado e ter que arcar com o preço de uma opinião radical.'
  },
  'Normais para Longos': {
    descricaoGeral: 'Uma sensibilidade refinada que oscila perigosamente entre o colapso emocional e a epifania confortável de sofá.',
    pontosFortes: 'Empatia sutil de quem capta todas as nuances invisíveis do ambiente e sofre profundamente pelas dores do mundo enquanto teoriza sobre elas.',
    pontosDesafiadores: 'A extrema fragilidade de uma antena parabólica emocional que capta até o vento desfavorável do vizinho, gerando exaustão crônica.'
  },
  'Longos': {
    descricaoGeral: 'Um habitante de andares superiores da consciência que decifra o cosmos com maestria, mas consegue se perder com classe na própria gaveta de meias.',
    pontosFortes: 'Mente aristocrática, analítica e imaginativa, capaz de construir catedrais teóricas e abstrações brilhantes no vazio absoluto.',
    pontosDesafiadores: 'O vício aristocrático da ruminação infinita, trocando a lama viva da realidade pelo conforto estéril da poltrona teórica.'
  }
};

// 3. TAMANHO DAS UNHAS (IDs 9-11, 59)
export const TAMANHO_DAS_UNHAS_REF: Record<string, { descricaoGeral: string; pontosFortes: string; pontosDesafiadores: string }> = {
  'Bem Visíveis (Grandes)': {
    descricaoGeral: 'A convicção dogmática e infantil de quem confunde teimosia obstinada e repetição de eco com revelação divina.',
    pontosFortes: 'Firmeza inabalável de convicção e autoconfiança pétrea para sustentar pontos de vista contra ventos e marés.',
    pontosDesafiadores: 'Teimosia insuportável, resistência alérgica a pontos de vista divergentes e autoritarismo cognitivo disfarçado de firmeza.'
  },
  'Normais': {
    descricaoGeral: 'O verniz polido de quem transita com elegância técnica entre a convicção própria e a complacência social.',
    pontosFortes: 'Flexibilidade saudável para sustentar o próprio valor sem fechar completamente as portas para o argumento alheio.',
    pontosDesafiadores: 'Risco constante de hesitação em momentos de polarização que exigem o sujo trabalho de tomar partido.'
  },
  'Pouco Visíveis (Pequenas)': {
    descricaoGeral: 'Uma profunda dependência das verdades alheias, terceirizando a segurança existencial para o que dita o rebanho.',
    pontosFortes: 'Capacidade exemplar de cooperação, respeito sacrossanto às regras sociais e apreço pelos referenciais externos.',
    pontosDesafiadores: 'Tendência patológica ao dogmatismo alheio, anulação pessoal e asfixia da própria voz para não melindrar o meio.'
  }
};

// 4. UNHAS ENCRAVADAS (IDs 12-14, 68-73)
export const UNHAS_ENCRAVADAS_REF = {
  'Dedões': {
    descricaoGeral: 'Convicções firmes e forte integridade moral que convidam a equilibrar a firmeza dos próprios princípios com a flexibilidade diante do ambiente e das relações.',
    pontosFortes: 'Elevado senso de responsabilidade, integridade, postura comprometida e dedicação aos acordos assumidos.',
    pontosDesafiadores: 'Tendência à autocobrança excessiva, exigência elevada de perfeição e o hábito de reter tensões internas em vez de expressar limites com leveza.'
  },
  'Outros Dedos': {
    descricaoGeral: 'Sensibilidade aos atritos do cotidiano, revelando a importância de estabelecer limites claros nas relações e na rotina prática sem acumular sobrecargas.',
    pontosFortes: 'Comprometimento com a harmonia e coerência nas estruturas do dia a dia.',
    pontosDesafiadores: 'Dificuldade momentânea de dizer não e tendência a absorver tensões do ambiente.'
  },
  'Não': {
    descricaoGeral: 'A fluidez natural de quem transita entre o que pensa e o que faz com flexibilidade e equilíbrio somático.',
    pontosFortes: 'Excepcional maleabilidade psicológica e corporal, adaptando-se às situações sem rigidez autodirigida.',
    pontosDesafiadores: 'Manter a firmeza necessária nos momentos que exigem posicionamento firme.'
  }
};

// 5. POSIÇÃO DOS DEDOS (IDs 15-21, 74-91)
export const POSICAO_DOS_DEDOS_REF = {
  'Em garra': {
    descricaoGeral: 'O pânico instintivo de despencar no vazio; um agarro desesperado e feroz ao chão motivado pelo pavor crônico da instabilidade.',
    pontosFortes: 'Resistência titânica, firmeza de sustentação inabalável e autocontrole estoico em meio ao caos.',
    pontosDesafiadores: 'Acúmulo grotesco de tensão física e emocional, revelando apego patológico, terror da mudança e retenção muscular de socorro.'
  },
  'Esticados': {
    descricaoGeral: 'Uma hiper-expansão voluntariosa e tensa, projetando a energia para a frente como quem avisa que não aceita parar.',
    pontosFortes: 'Iniciativa fulminante, foco cirúrgico e clareza de intenção no caminhar em direção aos objetivos.',
    pontosDesafiadores: 'Desespero latente por afirmação constante e hiperatividade frenética que desconhece o significado de pausa.'
  },
  'Contraídos': {
    descricaoGeral: 'O recolhimento defensivo de quem puxa a ponte levadiça e se tranca na fortaleza para evitar o contato com o mundo exterior.',
    pontosFortes: 'Prudência acentuada, economia rigorosa de energia vital e blindagem seletiva contra invasões.',
    pontosDesafiadores: 'Retração paralisante, pavor irracional de exposição e bloqueio absoluto na autoexpressão autêntica.'
  },
  'Abertos': {
    descricaoGeral: 'Portas escancaradas para o mundo; uma curiosidade insaciável e porosa que absorve tudo o que vê pela frente.',
    pontosFortes: 'Formidável flexibilidade cognitiva e emocional, mente inventiva, curiosa e receptiva ao novo.',
    pontosDesafiadores: 'Dispersão crônica, incapacidade patológica de manter o foco e falta absoluta de constância nos alvos de longo prazo.'
  },
  'Colados': {
    descricaoGeral: 'Um pacto de silêncio entre os artelhos; a rigidez de quem se recusa a separar os conceitos e idolatra a mesmice.',
    pontosFortes: 'Estabilidade granitica, lealdade inegociável aos princípios e preservação estrita de valores fundamentais.',
    pontosDesafiadores: 'Petrificação cognitiva e emocional, aversão visceral ao elemento surpresa e apego cego a dogmas do passado.'
  }
};

// 6. JOANETES / ALTERAÇÕES FÍSICAS (IDs 53-54)
export const JOANETES_REF = {
  'Pé Direito': {
    descricaoGeral: 'O monumento ósseo erguido à custa de um esforço titânico e inconsciente para manter vínculos mofados com a autoridade masculina e o mundo profissional.',
    sugestao: 'Desarmar o tribunal da autoridade externa, cessando a autoanulação em troca de crachás de aprovação pública.'
  },
  'Pé Esquerdo': {
    descricaoGeral: 'A muralha de chumbo construída para conter o terror do desamparo materno, dobrando a coluna vertebral e os tecidos para comprar afeto familiar.',
    sugestao: 'Compreender que o amor legítimo não exige o suicídio silencioso da própria identidade no altar do clã.'
  }
};

// 7. CALOS (ID 55)
export const CALOS_REF = {
  descricaoGeral: 'O depósito clandestino de energia reprimida — partes do seu ser que tentaram gritar, mas bateram de frente com a rigidez do cotidiano.',
  pontosDesafiadores: 'A cristalização mecânica do atrito diário em cascas grossas de armadura, impedindo o fluxo orgânico da sensibilidade.',
  sugestoesMelhora: 'Identificar a esfera exata do atrito (trabalho, metas ou afeto) e ter a coragem de dissolver a armadura através da expressão honesta.'
};

// 8. CÓCEGAS NOS PÉS (IDs 60-61)
export const COCEGAS_REF = {
  'Presente': {
    descricaoGeral: 'Um sistema nervoso esfolado e à flor da pele, conectado de forma visceral a memórias infantis arcaicas que gritam ao menor sopro.'
  },
  'Ausente': {
    descricaoGeral: 'Um sistema nervoso blindado, previsível e profundamente anestesiado, que resiste estoicamente a qualquer sutileza vibracional da alma.'
  }
};

// 9. RELAÇÃO COM OS PÉS (IDs 62-64)
export const RELACAO_COM_OS_PES_REF = {
  'Desconfortável': {
    descricaoGeral: 'O recalque elegante dos instintos e da sensualidade, tratando o próprio corpo físico como um parente pobre, feio e incômodo.'
  },
  'Neutro': {
    descricaoGeral: 'A ambivalência morna de quem habita o purgatório existencial entre a repressão reprimida e a aceitação relutante.'
  },
  'Confortável': {
    descricaoGeral: 'A rara, escandalosa e bela harmonia entre a carne, o prazer e o sagrado fardo de estar vivo no mundo real.'
  }
};

// 10. CARACTERES DE REICH INTEGRADOS (IDs 146-151)
export const CARACTERES_REICH_MAP: Record<string, ReichDefenseData> = {
  'Esquizóide': {
    tipoCarater: 'Esquizóide',
    descricao: 'A fuga dramática para o castelo da mente como barricada protetora contra o terror primordial da invasão ou do desamparo precoce.',
    conexaoReich: 'Couraça ocular e pélvica impenetrável, com sucção da energia periférica para o centro e respiração de quem mal ousa ocupar espaço.',
    sugestaoTerapeutica: 'Trabalhos violentamente amorosos de aterramento (pés fincados na terra, marcha consciente) para forçar o espírito a habitar a carne.'
  },
  'Oral': {
    tipoCarater: 'Oral',
    descricao: 'A mendicância crônica por preenchimento afetivo, gerada por um berço mofado onde faltou o calor nutritivo na alvorada da vida.',
    conexaoReich: 'Couraça travada nos segmentos oral e torácico, com as antenas energéticas projetadas para fora em desespero por adoção.',
    sugestaoTerapeutica: 'Resgatar a soberania da própria voz interna, fincar estacas de autonomia e aprender a nutrir a si mesmo sem pedir licença.'
  },
  'Rígido': {
    tipoCarater: 'Rígido',
    descricao: 'O bunker blindado do autocontrole e da excelência militar, onde a vulnerabilidade é tratada como alta traição ao império da performance.',
    conexaoReich: 'Couraça polida nos segmentos torácico, cervical e pélvico; o corpo vive em perpétuo estado de prontidão com a máscara de super-herói.',
    sugestaoTerapeutica: 'Choques bioenergéticos de degelo, alongamentos de rendição e a permissão escandalosa de desabar sem culpa.'
  },
  'Masoquista': {
    tipoCarater: 'Masoquista',
    descricao: 'A liturgia silenciosa da autossabotagem e da suportação, convencido de que o bilhete para o céu exige pagar pedágio em lágrimas.',
    conexaoReich: 'Couraça pesada nos segmentos abdominal, diafragmático e pélvico; a raiva foi engolida inteira e a respiração parece um suspiro sufocado.',
    sugestaoTerapeutica: 'A fúria terapêutica da expressão assertiva, quebrando o pacto de resignação e resgatando a dignidade da própria vontade.'
  },
  'Psicopata': {
    tipoCarater: 'Psicopata',
    descricao: 'O xadrez da dominação e do cálculo, erguendo a torre da superioridade intelectual para jamais correr o risco de ser pego na fragilidade.',
    conexaoReich: 'Couraça altiva nos segmentos ocular e cervical, peito estufado de soberania e o portão do coração trancado a sete chaves.',
    sugestaoTerapeutica: 'O banho de realidade do aterramento, a escuta desarmada e o sublime ato de coragem que é acolher a própria pequenez.'
  },
  'Genital': {
    tipoCarater: 'Genital (Ideal Reichiano)',
    descricao: 'A sinfonia da liberdade orgânica; a rara biografia onde o indivíduo ama, trabalha e goza sem dever favor à culpa nem à rigidez.',
    conexaoReich: 'Arquitetura livre de couraças; respiração plena que ondula o corpo inteiro e fluxo energético contínuo sem pedágio.',
    sugestaoTerapeutica: 'Manter a vigilância amorosa do autocuidado, a reverência à respiração consciente e o pacto permanente com a alegria de existir.'
  }
};