import { jsPDF } from 'jspdf';
import { ShapeResult, RatioResult, PersonalAnswers, ToeKey } from '../types';
import { ANALYSIS_DATA, HEALTH_DATA, BANCO_PROVOCATIVO } from '../data/analysisData';
import { BANCO_PROVOCATIVO_IZN } from '../data/bancoProvocativoIZN';
import { TOE_CALLUS_DATA } from '../data/callusMeanings';
import { TOE_CLAW_DATA } from '../data/clawToeMeanings';
import { TOE_INGROWN_NAIL_DATA } from '../data/ingrownNailMeanings';
import { JOANETES_MEANINGS } from '../data/joanetesMeanings';
import {
  FORMATO_DO_PE_REF,
  TAMANHO_DOS_DEDOS_REF,
  TAMANHO_DAS_UNHAS_REF,
  UNHAS_ENCRAVADAS_REF,
} from '../data/tabelaReferenciaIZN';

export interface PDFReportData {
  targetName: string;
  imageUrl?: string;
  shapeResult: ShapeResult;
  ratioResult: RatioResult;
  personalAnswers: PersonalAnswers;
}

export function createReportPDFDoc(data: PDFReportData): jsPDF {
  const { targetName, imageUrl, shapeResult, ratioResult, personalAnswers } = data;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin - 10) {
      doc.addPage();
      y = margin;
      drawPageHeader();
    }
  };

  const drawPageHeader = () => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(140, 150, 160);
    doc.text('Analisador da Personalidade pelos Pés - Método Irmo Zuccato Neto', margin, y);
    doc.text(`Cliente: ${targetName}`, pageWidth - margin, y, { align: 'right' });
    y += 3;
    doc.setDrawColor(220, 226, 235);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
  };

  // 1. CAPA / CABEÇALHO PRINCIPAL
  doc.setFillColor(15, 118, 110); // Teal 700
  doc.roundedRect(margin, y, contentWidth, 24, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('RELATÓRIO DE ANÁLISE DA PERSONALIDADE PELOS PÉS', margin + contentWidth / 2, y + 9, {
    align: 'center',
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(204, 251, 241); // Teal 100
  doc.text('Metodologia & Leitura Somática por Irmo Zuccato Neto', margin + contentWidth / 2, y + 16, {
    align: 'center',
  });
  y += 28;

  // Informações do Laudo
  doc.setFillColor(248, 250, 252); // Slate 50
  doc.setDrawColor(203, 213, 225); // Slate 300
  doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42); // Slate 900
  doc.text(`Avaliado(a): ${targetName}`, margin + 4, y + 7);

  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`Data de Emissão: ${dateStr}`, margin + 4, y + 12);
  doc.text('Documento Personalizado e Confidencial', pageWidth - margin - 4, y + 12, { align: 'right' });
  y += 20;

  // Preparação de dados
  const nailsMap: Record<string, string> = {
    'pouco-visiveis': 'Pouco Visíveis',
    'visiveis': 'Visíveis',
    'bem-visiveis': 'Bem Visíveis',
  };
  const nailsKeyMap: Record<string, 'Pouco Visível' | 'Visível' | 'Bem Visível'> = {
    'pouco-visiveis': 'Pouco Visível',
    'visiveis': 'Visível',
    'bem-visiveis': 'Bem Visível',
  };

  const ratioKey = (
    ratioResult?.classification?.includes('Curtos') && !ratioResult.classification.includes('Normais')
      ? 'Curtos'
      : ratioResult?.classification?.includes('Longos') && !ratioResult.classification.includes('Normais')
      ? 'Longos'
      : ratioResult?.classification?.includes('Normais para Curtos')
      ? 'Normais para Curtos'
      : ratioResult?.classification?.includes('Normais para Longos')
      ? 'Normais para Longos'
      : 'Normais'
  ) as keyof typeof ANALYSIS_DATA['Tamanho dos Dedos'];

  const shapeKey = (shapeResult?.type || 'Egípcio') as keyof typeof ANALYSIS_DATA['Formato do Pé'];
  const nailsKey = (personalAnswers?.unhas ? nailsKeyMap[personalAnswers.unhas] : 'Visível') || 'Visível';

  const shapeTableRef = FORMATO_DO_PE_REF[shapeKey] || FORMATO_DO_PE_REF['Egípcio'];
  const ratioTableRef =
    TAMANHO_DOS_DEDOS_REF[ratioKey] ||
    TAMANHO_DOS_DEDOS_REF['Normais para Curtos'] ||
    TAMANHO_DOS_DEDOS_REF['Normais'];
  const nailsTableRef =
    TAMANHO_DAS_UNHAS_REF[
      nailsKey === 'Bem Visível'
        ? 'Bem Visíveis (Grandes)'
        : nailsKey === 'Pouco Visível'
        ? 'Pouco Visíveis (Pequenas)'
        : 'Normais'
    ] || TAMANHO_DAS_UNHAS_REF['Normais'];

  const hasIngrownNails = personalAnswers?.ingrownNails?.hasIngrownNails === 'Sim';
  const rightIngrownToes = (hasIngrownNails && personalAnswers?.ingrownNails?.rightFoot)
    ? (Object.keys(personalAnswers.ingrownNails.rightFoot) as ToeKey[]).filter(
        (k) => personalAnswers.ingrownNails.rightFoot[k]
      )
    : [];
  const leftIngrownToes = (hasIngrownNails && personalAnswers?.ingrownNails?.leftFoot)
    ? (Object.keys(personalAnswers.ingrownNails.leftFoot) as ToeKey[]).filter(
        (k) => personalAnswers.ingrownNails.leftFoot[k]
      )
    : [];

  const hasJoanetes = personalAnswers?.q3_joanetes?.hasJoanetes === 'Sim';
  const rightJoanete = Boolean(hasJoanetes && personalAnswers?.q3_joanetes?.rightFoot);
  const leftJoanete = Boolean(hasJoanetes && personalAnswers?.q3_joanetes?.leftFoot);
  const bothJoanetes = rightJoanete && leftJoanete;

  const hasCalluses = personalAnswers?.calluses?.hasCalluses === 'Sim';
  const rightToesMarked = (hasCalluses && personalAnswers?.calluses?.rightFoot)
    ? (Object.keys(personalAnswers.calluses.rightFoot) as ToeKey[]).filter(
        (k) => personalAnswers.calluses.rightFoot[k]
      )
    : [];
  const leftToesMarked = (hasCalluses && personalAnswers?.calluses?.leftFoot)
    ? (Object.keys(personalAnswers.calluses.leftFoot) as ToeKey[]).filter(
        (k) => personalAnswers.calluses.leftFoot[k]
      )
    : [];

  const hasClawToes = personalAnswers?.clawToes?.hasClawToes === 'Sim';
  const rightClawToesMarked = (hasClawToes && personalAnswers?.clawToes?.rightFoot)
    ? (Object.keys(personalAnswers.clawToes.rightFoot) as ToeKey[]).filter(
        (k) => personalAnswers.clawToes.rightFoot[k]
      )
    : [];
  const leftClawToesMarked = (hasClawToes && personalAnswers?.clawToes?.leftFoot)
    ? (Object.keys(personalAnswers.clawToes.leftFoot) as ToeKey[]).filter(
        (k) => personalAnswers.clawToes.leftFoot[k]
      )
    : [];

  const defaultProvocative = BANCO_PROVOCATIVO_IZN['Egípcio'];
  const shapeReg = BANCO_PROVOCATIVO_IZN[shapeKey] || defaultProvocative;

  let ratioRegKey = 'Dedos-Normais';
  if (ratioKey === 'Curtos') ratioRegKey = 'Dedos-Curtos';
  else if (ratioKey === 'Normais para Curtos') ratioRegKey = 'Dedos-Normais-para-Curtos';
  else if (ratioKey === 'Normais para Longos') ratioRegKey = 'Dedos-Normais-para-Longos';
  else if (ratioKey === 'Longos') ratioRegKey = 'Dedos-Longos';
  const ratioReg = BANCO_PROVOCATIVO_IZN[ratioRegKey] || BANCO_PROVOCATIVO_IZN['Dedos-Normais'] || defaultProvocative;

  let nailsRegKey = 'Unhas-Normais';
  if (personalAnswers?.unhas === 'pouco-visiveis') nailsRegKey = 'Unhas-Pequenas';
  else if (personalAnswers?.unhas === 'bem-visiveis') nailsRegKey = 'Unhas-Grandes';
  const nailsReg = BANCO_PROVOCATIVO_IZN[nailsRegKey] || BANCO_PROVOCATIVO_IZN['Unhas-Normais'] || defaultProvocative;

  const hasDedaoIngrown = Boolean(
    personalAnswers?.ingrownNails?.rightFoot?.dedao || personalAnswers?.ingrownNails?.leftFoot?.dedao
  );
  const ingrownTableKey = !hasIngrownNails
    ? 'Não'
    : hasDedaoIngrown
    ? 'Dedões'
    : 'Outros Dedos';
  const ingrownTableRef = UNHAS_ENCRAVADAS_REF[ingrownTableKey] || UNHAS_ENCRAVADAS_REF['Não'];

  const ingrownSummaryText = hasIngrownNails
    ? `Sim (${rightIngrownToes.length > 0 ? `Pé Dir: ${rightIngrownToes.map(k => TOE_INGROWN_NAIL_DATA[k]?.name || k).join(', ')}` : ''}${rightIngrownToes.length > 0 && leftIngrownToes.length > 0 ? ' | ' : ''}${leftIngrownToes.length > 0 ? `Pé Esq: ${leftIngrownToes.map(k => TOE_INGROWN_NAIL_DATA[k]?.name || k).join(', ')}` : ''})`
    : 'Não';

  const joanetesSummaryText = bothJoanetes ? 'Sim (Ambos os Pés)' : rightJoanete ? 'Sim (Pé Direito)' : leftJoanete ? 'Sim (Pé Esquerdo)' : 'Não';

  const callusSummaryText = hasCalluses
    ? `Sim (${rightToesMarked.length > 0 ? `Pé Dir: ${rightToesMarked.map(k => TOE_CALLUS_DATA[k]?.name || k).join(', ')}` : ''}${rightToesMarked.length > 0 && leftToesMarked.length > 0 ? ' | ' : ''}${leftToesMarked.length > 0 ? `Pé Esq: ${leftToesMarked.map(k => TOE_CALLUS_DATA[k]?.name || k).join(', ')}` : ''})`
    : 'Não';

  const clawToeSummaryText = hasClawToes
    ? `Sim (${rightClawToesMarked.length > 0 ? `Pé Dir: ${rightClawToesMarked.map(k => TOE_CLAW_DATA[k]?.name || k).join(', ')}` : ''}${rightClawToesMarked.length > 0 && leftClawToesMarked.length > 0 ? ' | ' : ''}${leftClawToesMarked.length > 0 ? `Pé Esq: ${leftClawToesMarked.map(k => TOE_CLAW_DATA[k]?.name || k).join(', ')}` : ''})`
    : 'Não';

  const getNivel = (reg: any, lvl: number) => {
    return reg?.niveis?.[lvl] || defaultProvocative?.niveis?.[lvl] || '';
  };

  // 2. RESUMO DOS DADOS & CONTAINER COM A FOTO DOS PÉS
  const summaryStartY = y;
  const tableWidth = 121;
  const imageContainerWidth = 56;
  const gap = 5;
  const cardHeight = 62;

  // 2.1 Card Esquerdo: Mapeamento Físico e Estrutural
  doc.setFillColor(248, 250, 252); // Slate 50
  doc.setDrawColor(203, 213, 225); // Slate 300
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, summaryStartY, tableWidth, cardHeight, 2, 2, 'FD');

  // Cabeçalho do Card de Resumo
  doc.setFillColor(241, 245, 249); // Slate 100
  doc.roundedRect(margin, summaryStartY, tableWidth, 6.5, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42); // Slate 900
  doc.text('RESUMO DO MAPEAMENTO FÍSICO', margin + 3, summaryStartY + 4.6);
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139); // Slate 500
  doc.text('Sinais Físicos & Estruturais', margin + tableWidth - 3, summaryStartY + 4.6, { align: 'right' });

  const ratioDisplay = ratioResult.classification.startsWith('Dedos')
    ? ratioResult.classification
    : `Dedos ${ratioResult.classification}`;

  const summaryItems = [
    ['Formato do Pé:', `${shapeResult.type}`],
    ['Tamanho dos Dedos:', ratioDisplay],
    ['Unhas:', `${nailsMap[personalAnswers.unhas] || personalAnswers.unhas}`],
    ['Cócegas nos Pés:', `${personalAnswers.q1_tickles}`],
    ['Relação com os Pés:', `${personalAnswers.q2_relation}`],
    ['Unhas Encravadas:', ingrownSummaryText],
    ['Joanetes:', joanetesSummaryText],
    ['Calos:', callusSummaryText],
    ['Dedos em Garra:', clawToeSummaryText],
  ];

  let lineY = summaryStartY + 11.2;
  summaryItems.forEach(([label, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105); // Slate 600
    doc.text(label, margin + 3, lineY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42); // Slate 900
    const maxValWidth = tableWidth - 42;
    const splitVal = doc.splitTextToSize(val, maxValWidth);
    doc.text(splitVal[0] || '', margin + 38, lineY);
    lineY += 5.5;
  });

  // 2.2 Card Direito: Container com a Foto dos Pés
  const imgBoxX = margin + tableWidth + gap;
  doc.setFillColor(248, 250, 252); // Slate 50
  doc.setDrawColor(203, 213, 225); // Slate 300
  doc.setLineWidth(0.3);
  doc.roundedRect(imgBoxX, summaryStartY, imageContainerWidth, cardHeight, 2, 2, 'FD');

  // Cabeçalho do Card da Imagem
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('IMAGEM ANALISADA', imgBoxX + imageContainerWidth / 2, summaryStartY + 5, { align: 'center' });

  // Área interna da imagem
  const innerImgX = imgBoxX + 4;
  const innerImgY = summaryStartY + 7;
  const innerImgW = imageContainerWidth - 8; // 48mm
  const innerImgH = 46; // 46mm

  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(innerImgX, innerImgY, innerImgW, innerImgH, 1.5, 1.5, 'FD');

  let imageRendered = false;
  if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim().length > 0) {
    try {
      let format = 'JPEG';
      if (imageUrl.startsWith('data:image/png')) format = 'PNG';
      else if (imageUrl.startsWith('data:image/webp')) format = 'WEBP';

      let imgProps: any = null;
      try {
        imgProps = doc.getImageProperties(imageUrl);
      } catch (errProps) {
        // fallback
      }

      const maxW = innerImgW - 2;
      const maxH = innerImgH - 2;
      let renderW = maxW;
      let renderH = maxH;

      if (imgProps && imgProps.width && imgProps.height) {
        const imgRatio = imgProps.width / imgProps.height;
        const targetRatio = maxW / maxH;
        if (imgRatio > targetRatio) {
          renderW = maxW;
          renderH = maxW / imgRatio;
        } else {
          renderH = maxH;
          renderW = maxH * imgRatio;
        }
        if (imgProps.fileType) {
          format = imgProps.fileType;
        }
      }

      const posX = innerImgX + (innerImgW - renderW) / 2;
      const posY = innerImgY + (innerImgH - renderH) / 2;

      doc.addImage(imageUrl, format, posX, posY, renderW, renderH);
      imageRendered = true;
    } catch (imgErr) {
      console.warn('Não foi possível renderizar imagem no PDF:', imgErr);
    }
  }

  if (!imageRendered) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184); // Slate 400
    doc.text('Foto não disponível', innerImgX + innerImgW / 2, innerImgY + innerImgH / 2 - 2, { align: 'center' });
    doc.setFontSize(6.5);
    doc.text('Registrado no laudo', innerImgX + innerImgW / 2, innerImgY + innerImgH / 2 + 3, { align: 'center' });
  }

  // Rodapé do Card da Foto
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Registrado para laudo', imgBoxX + imageContainerWidth / 2, summaryStartY + cardHeight - 2.5, { align: 'center' });

  y = summaryStartY + cardHeight + 8;

  // Função auxiliar para imprimir seções de texto longo formatado
  const printSectionHeader = (title: string, tag: string) => {
    checkPageBreak(12);
    doc.setFillColor(224, 242, 254); // Sky 100
    doc.roundedRect(margin, y, contentWidth, 7, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(3, 105, 161); // Sky 700
    doc.text(title.toUpperCase(), margin + 3, y + 4.8);
    doc.setFontSize(8);
    doc.text(tag, pageWidth - margin - 3, y + 4.8, { align: 'right' });
    y += 10;
  };

  const printParagraph = (text: string, boldLabel?: string) => {
    doc.setFontSize(8.5);
    let fullText = text;
    if (boldLabel) {
      fullText = `${boldLabel} ${text}`;
    }
    const lines = doc.splitTextToSize(fullText, contentWidth - 4);
    checkPageBreak(lines.length * 4.2 + 2);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(lines, margin + 2, y);
    y += lines.length * 4.2 + 3;
  };

  const printCard = (title: string, text: string, color: 'green' | 'amber' | 'blue' | 'purple') => {
    const lines = doc.splitTextToSize(text, contentWidth - 10);
    const cardHeight = lines.length * 4 + 9;
    checkPageBreak(cardHeight);

    if (color === 'green') {
      doc.setFillColor(240, 253, 244);
      doc.setDrawColor(187, 247, 208);
      doc.setTextColor(22, 101, 52);
    } else if (color === 'amber') {
      doc.setFillColor(254, 252, 232);
      doc.setDrawColor(254, 240, 138);
      doc.setTextColor(133, 77, 14);
    } else if (color === 'blue') {
      doc.setFillColor(239, 246, 255);
      doc.setDrawColor(191, 219, 254);
      doc.setTextColor(30, 64, 175);
    } else {
      doc.setFillColor(250, 245, 255);
      doc.setDrawColor(233, 213, 255);
      doc.setTextColor(107, 33, 168);
    }

    doc.roundedRect(margin, y, contentWidth, cardHeight, 2, 2, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(title, margin + 4, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    doc.text(lines, margin + 4, y + 9);
    y += cardHeight + 3;
  };

  // 3. FORMATO DO PÉ
  printSectionHeader(`1. Formato do Pé: ${shapeResult.type}`, 'Categoria Anatômica');
  printParagraph(ANALYSIS_DATA['Formato do Pé']?.[shapeKey] || shapeTableRef.descricaoGeral, 'Descrição Geral:');
  printCard('Pontos Fortes:', shapeTableRef.pontosFortes, 'green');
  printCard('Pontos Desafiadores:', shapeTableRef.pontosDesafiadores, 'amber');

  // 4. TAMANHO DOS DEDOS
  printSectionHeader(`2. Tamanho dos Dedos: ${ratioDisplay}`, `Proporção Áurea: ${ratioResult.calculatedRatio.toFixed(3)}`);
  printParagraph(ANALYSIS_DATA['Tamanho dos Dedos']?.[ratioKey] || ratioTableRef.descricaoGeral, 'Descrição da Proporção:');
  printCard('Pontos Fortes (Potenciais):', ANALYSIS_DATA['Pontos Fortes']?.[ratioKey] || ratioTableRef.pontosFortes, 'green');
  printCard('Pontos Desafiadores (Desafios):', ANALYSIS_DATA['Pontos Desafiadores']?.[ratioKey] || ratioTableRef.pontosDesafiadores, 'amber');

  // 5. TAMANHO DAS UNHAS
  printSectionHeader(`3. Tamanho das Unhas: ${nailsKey}`, `Visibilidade: ${nailsMap[personalAnswers.unhas] || personalAnswers.unhas}`);
  printParagraph(ANALYSIS_DATA['Tamanho das Unhas']?.[nailsKey] || nailsTableRef.descricaoGeral, 'Expressão Psicológica:');
  printCard('Pontos Fortes:', nailsTableRef.pontosFortes, 'green');
  printCard('Pontos Desafiadores:', nailsTableRef.pontosDesafiadores, 'amber');

  // 6. SINAIS ESTRUTURAIS
  printSectionHeader('4. Sinais Estruturais e Somáticos', 'Marcas Corporais');
  printParagraph(HEALTH_DATA['Unhas Encravadas']?.[hasIngrownNails ? 'Sim' : 'Não'] || '', 'Unhas Encravadas:');
  printParagraph(HEALTH_DATA['Joanetes']?.[hasJoanetes ? 'Sim' : 'Não'] || '', 'Joanetes:');
  printParagraph(HEALTH_DATA['Calos nos Dedos']?.[hasCalluses ? 'Sim' : 'Não'] || '', 'Calos:');
  printParagraph(HEALTH_DATA['Dedos em Garra']?.[hasClawToes ? 'Sim' : 'Não'] || '', 'Dedos em Garra:');

  // DETALHAMENTO DE UNHAS ENCRAVADAS
  if (hasIngrownNails && (rightIngrownToes.length > 0 || leftIngrownToes.length > 0)) {
    printSectionHeader('Detalhamento das Unhas Encravadas Dedo a Dedo', 'Atrito & Convicções');
    if (rightIngrownToes.length > 0) {
      printParagraph('Pé Direito (Mundo Exterior, Trabalho, Ação e Metas):', 'ESFERA:');
      rightIngrownToes.forEach((k) => {
        const item = TOE_INGROWN_NAIL_DATA[k];
        if (item) {
          printCard(`${item.name} (${item.subname}) — ${item.rightFoot.theme}`, `${item.rightFoot.description}\nReflexão: ${item.rightFoot.reflection}`, 'blue');
        }
      });
    }
    if (leftIngrownToes.length > 0) {
      printParagraph('Pé Esquerdo (Mundo Íntimo, Afetivo, Família e Passado):', 'ESFERA:');
      leftIngrownToes.forEach((k) => {
        const item = TOE_INGROWN_NAIL_DATA[k];
        if (item) {
          printCard(`${item.name} (${item.subname}) — ${item.leftFoot.theme}`, `${item.leftFoot.description}\nReflexão: ${item.leftFoot.reflection}`, 'purple');
        }
      });
    }
  }

  // DETALHAMENTO DE JOANETES
  if (hasJoanetes && (rightJoanete || leftJoanete)) {
    printSectionHeader('Detalhamento dos Joanetes por Pé', 'Vínculos & Desvios');
    if (bothJoanetes) {
      printCard(`Padrão Bilateral: ${JOANETES_MEANINGS.bothFeet.theme}`, `${JOANETES_MEANINGS.bothFeet.description}\nReflexão: ${JOANETES_MEANINGS.bothFeet.reflection}`, 'amber');
    }
    if (rightJoanete) {
      printCard(`Pé Direito (${JOANETES_MEANINGS.rightFoot.sphere}): ${JOANETES_MEANINGS.rightFoot.theme}`, `${JOANETES_MEANINGS.rightFoot.description}\nReflexão: ${JOANETES_MEANINGS.rightFoot.reflection}`, 'blue');
    }
    if (leftJoanete) {
      printCard(`Pé Esquerdo (${JOANETES_MEANINGS.leftFoot.sphere}): ${JOANETES_MEANINGS.leftFoot.theme}`, `${JOANETES_MEANINGS.leftFoot.description}\nReflexão: ${JOANETES_MEANINGS.leftFoot.reflection}`, 'purple');
    }
  }

  // DETALHAMENTO DE CALOS
  if (hasCalluses && (rightToesMarked.length > 0 || leftToesMarked.length > 0)) {
    printSectionHeader('Detalhamento dos Calos Dedo a Dedo', 'Energia Reprimida & Couraças');
    if (rightToesMarked.length > 0) {
      printParagraph('Pé Direito (Mundo Exterior, Ação e Trabalho):', 'ESFERA:');
      rightToesMarked.forEach((k) => {
        const item = TOE_CALLUS_DATA[k];
        if (item) {
          printCard(`${item.name} (${item.subname}) — ${item.rightFoot.theme}`, `${item.rightFoot.description}\nReflexão: ${item.rightFoot.reflection}`, 'blue');
        }
      });
    }
    if (leftToesMarked.length > 0) {
      printParagraph('Pé Esquerdo (Mundo Íntimo, Emoções e Família):', 'ESFERA:');
      leftToesMarked.forEach((k) => {
        const item = TOE_CALLUS_DATA[k];
        if (item) {
          printCard(`${item.name} (${item.subname}) — ${item.leftFoot.theme}`, `${item.leftFoot.description}\nReflexão: ${item.leftFoot.reflection}`, 'purple');
        }
      });
    }
  }

  // DETALHAMENTO DE DEDOS EM GARRA
  if (hasClawToes && (rightClawToesMarked.length > 0 || leftClawToesMarked.length > 0)) {
    printSectionHeader('Detalhamento dos Dedos em Garra Dedo a Dedo', 'Apego, Insegurança e Retenção');
    if (rightClawToesMarked.length > 0) {
      printParagraph('Pé Direito (Mundo Exterior, Ação e Trabalho):', 'ESFERA:');
      rightClawToesMarked.forEach((k) => {
        const item = TOE_CLAW_DATA[k];
        if (item) {
          printCard(`${item.name} (${item.subname}) — ${item.rightFoot.theme}`, `${item.rightFoot.description}\nReflexão: ${item.rightFoot.reflection}`, 'blue');
        }
      });
    }
    if (leftClawToesMarked.length > 0) {
      printParagraph('Pé Esquerdo (Mundo Íntimo, Emoções e Família):', 'ESFERA:');
      leftClawToesMarked.forEach((k) => {
        const item = TOE_CLAW_DATA[k];
        if (item) {
          printCard(`${item.name} (${item.subname}) — ${item.leftFoot.theme}`, `${item.leftFoot.description}\nReflexão: ${item.leftFoot.reflection}`, 'purple');
        }
      });
    }
  }

  // 7. ESTRUTURA DE CARÁTER & WILHELM REICH
  printSectionHeader('5. Estrutura de Caráter & Couraças (Wilhelm Reich)', 'Bioenergética');
  const reichDesc = shapeResult.type === 'Egípcio'
    ? 'Couraça concentrada nos segmentos cervical, torácico e pélvico. A energia é direcionada para a cabeça e para a execução, mantendo o controle sobre as variáveis. A respiração tende a ser ritmada com foco na ação, guardando uma máscara de eficiência que protege a vulnerabilidade interna.'
    : shapeResult.type === 'Grego/Romano'
    ? 'Couraça concentrada nos segmentos ocular e cervical, com deslocamento da energia vital para a análise reflexiva. O corpo busca estabilidade através da estratégia e de planos meticulosos para evitar a imprevisibilidade emocional.'
    : 'Couraça distribuída de forma difusa entre os segmentos torácico e pélvico, buscando integrar múltiplos estímulos mentais e emocionais, mantendo uma visão ampla como proteção contra a fragmentação.';

  printParagraph(reichDesc, 'Segmentos de Couraça:');

  const afetoDesc = shapeResult.type === 'Egípcio'
    ? 'Amor demonstrado através de atos de serviço, ordem e cuidados práticos objetivos. Constrói segurança mantendo compromissos claros e consistentes com o parceiro.'
    : shapeResult.type === 'Grego/Romano'
    ? 'Amor expresso através de diálogo profundo, lealdade e planejamento compartilhado. Constrói intimidade através da sintonia intelectual e da cumplicidade em planos futuros.'
    : 'Amor vivido com visão integradora, acolhimento de diferenças e cumplicidade em projetos de vida. Busca um ideal elevado de conexão humana.';

  printCard('Dinâmica de Afeto e Relações:', afetoDesc, 'purple');

  // 8. RADIOGRAFIA SEM FILTROS (10 NÍVEIS)
  printSectionHeader('6. Radiografia Sem Filtros (10 Níveis Provocativos)', 'Método IZN');

  const shapeProvocativo =
    BANCO_PROVOCATIVO['Formato do Pé']?.[shapeKey] ||
    BANCO_PROVOCATIVO['Formato do Pé']['Egípcio'];

  const ratioProvocativo =
    BANCO_PROVOCATIVO['Tamanho dos Dedos']?.[ratioKey] ||
    BANCO_PROVOCATIVO['Tamanho dos Dedos']['Curtos'];

  const niveis = [
    { n: 1, title: `Nível 01: ${shapeProvocativo.titulo1 || 'Observação Irônica'}`, text: getNivel(shapeReg, 1) || shapeProvocativo.modo1 },
    { n: 2, title: `Nível 02: ${shapeProvocativo.titulo2 || 'Ironia que Cutuca'}`, text: getNivel(shapeReg, 2) || shapeProvocativo.modo2 },
    { n: 3, title: `Nível 03: ${ratioProvocativo.titulo1 || 'Sarcasmo de Reconhecimento'}`, text: getNivel(ratioReg, 3) || ratioProvocativo.modo1 },
    { n: 4, title: `Nível 04: ${shapeProvocativo.titulo3 || 'Contraste Dito vs Feito'}`, text: getNivel(shapeReg, 4) || shapeProvocativo.modo3 },
    { n: 5, title: `Nível 05: ${ratioProvocativo.titulo2 || 'Desmancha a Pose'}`, text: getNivel(ratioReg, 5) || getNivel(nailsReg, 5) || ratioProvocativo.modo2 },
    { n: 6, title: `Nível 06: ${shapeProvocativo.titulo4 || 'Provocação no Osso'}`, text: getNivel(ratioReg, 6) || shapeProvocativo.modo4 },
    { n: 7, title: `Nível 07: ${ratioProvocativo.titulo3 || 'Pergunta que Não Sai da Cabeça'}`, text: getNivel(shapeReg, 7) || ratioProvocativo.modo3 },
    { n: 8, title: `Nível 08: ${shapeProvocativo.titulo5 || 'Sentença que Ecoa'}`, text: getNivel(ratioReg, 8) || shapeProvocativo.modo5 },
    { n: 9, title: `Nível 09: ${ratioProvocativo.titulo5 || ratioProvocativo.titulo4 || 'Impacto Absoluto'}`, text: getNivel(shapeReg, 9) || ratioProvocativo.modo5 || ratioProvocativo.modo4 },
    { n: 10, title: `Nível 10: ${shapeProvocativo.titulo6 || 'O Golpe de Mestre Final'}`, text: `${getNivel(shapeReg, 10) || shapeProvocativo.modo6}${getNivel(ratioReg, 10) ? `\n\nA Carapuça dos Dedos: ${getNivel(ratioReg, 10)}` : ratioProvocativo.modo6 ? `\n\nA Carapuça dos Dedos: ${ratioProvocativo.modo6}` : ''}` },
  ];

  niveis.forEach((item) => {
    printCard(item.title, `"${item.text}"`, item.n >= 7 ? 'amber' : 'blue');
  });

  // 9. CONCLUSÃO E ASSINATURA
  checkPageBreak(25);
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'F');
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('A compreensão sobre si é o primeiro passo para a transformação real. Compreender como você pensa, sente e age é a jornada mais extraordinária de todas!', margin + 4, y + 7, { maxWidth: contentWidth - 8 });
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 118, 110);
  doc.text('Irmo Zuccato Neto — Analisador da Personalidade pelos Pés', margin + 4, y + 16);
  y += 24;

  // Numeração de Páginas em Todas as Páginas
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // Slate 400
    doc.text(`Página ${i} de ${pageCount}`, pageWidth - margin, pageHeight - 6, { align: 'right' });
    doc.text(`Laudo de ${targetName} • Metodologia Irmo Zuccato Neto`, margin, pageHeight - 6);
  }

  return doc;
}

export function generateReportPDF(data: PDFReportData): Blob {
  const doc = createReportPDFDoc(data);
  return doc.output('blob');
}

export function downloadReportPDF(data: PDFReportData): { filename: string; blob: Blob; doc: jsPDF } {
  const { targetName } = data;
  const cleanName = (targetName || 'Avaliador').trim().replace(/[^a-zA-Z0-9_\u00C0-\u00FF-]/g, '_');
  const filename = `Relatorio_Analise_dos_Pes_${cleanName}.pdf`;
  const doc = createReportPDFDoc(data);
  const blob = doc.output('blob');

  // Tentativa 1: Método nativo do jsPDF
  try {
    doc.save(filename);
  } catch (e) {
    console.warn('doc.save falhou, usando trigger de blob:', e);
  }

  // Tentativa 2: Trigger de Blob URL
  try {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
      URL.revokeObjectURL(url);
    }, 2000);
  } catch (e2) {
    console.warn('Blob link click falhou:', e2);
  }

  return { filename, blob, doc };
}
