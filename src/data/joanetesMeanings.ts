export interface JoanetesState {
  hasJoanetes: 'Sim' | 'Não' | '';
  rightFoot: boolean;
  leftFoot: boolean;
}

export const JOANETES_MEANINGS = {
  rightFoot: {
    side: 'Pé Direito',
    sphere: 'Mundo Externo, Social, Profissional & Futuro',
    theme: 'O Monumento Ósseo ao Desamparo Paterno e à Fuga do Mundo',
    description: 'O joanete no pé direito manifesta uma inclinação inconsciente a desviar o próprio eixo de integridade para caber nas exigências e pressões das figuras de autoridade masculina e do ambiente social ou profissional. É o monumento ósseo erguido à custa de um esforço titânico para manter vínculos afetivos marcados pela insegurança, somatizando um profundo sentimento de desamparo diante da exigência de reconhecimento público.',
    reflection: 'Você não precisa desviar o seu eixo de suporte para ser aceito ou validado pelo mundo exterior. A fundação interna robusta que você busca não virá de aplausos alheios.'
  },
  leftFoot: {
    side: 'Pé Esquerdo',
    sphere: 'Mundo Íntimo, Afetivo, Familiar & Passado',
    theme: 'A Muralha de Defesa contra o Desamparo Materno e a Autoanulação',
    description: 'O joanete no pé esquerdo aponta para um padrão doloroso de renúncia e autoanulação nos vínculos afetivos mais íntimos, somatizando um forte trauma de desamparo ligado à figura materna ou ao passado familiar. Revela o hábito endurecido de se dobrar e ceder para preservar uma harmonia mofada, erguendo uma muralha protetora em torno de si para afastar o medo da rejeição e o terror de não ser acolhido.',
    reflection: 'Ceder constantemente para manter uma paz de fachada só esmaga a sua própria carne. Amar o outro não exige o suicídio silencioso da sua essência.'
  },
  bothFeet: {
    theme: 'A Síndrome do Cuidador Universal e o Colapso da Base',
    description: 'A presença de joanetes em ambos os pés evidencia um padrão generalizado e tirânico de sobrecarga relacional. É a somatização de quem tenta atuar como o alicerce absoluto, tentando sustentar simultaneamente as pressões da carreira e as demandas mofadas do clã, enquanto esmaga e negligencia a própria base estrutural.',
    reflection: 'Sustentar o universo alheio enquanto esmaga os próprios pés é uma garantia matemática de ruína. Recupere o apoio em sua própria fundação antes que o desabamento seja total.'
  }
};