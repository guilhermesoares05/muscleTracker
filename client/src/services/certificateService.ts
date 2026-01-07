import { jsPDF } from 'jspdf';
import { UserData } from '@/models/types';

export const certificateService = {
  generateCertificate: (userData: UserData): void => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFillColor(30, 64, 175);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    doc.setFillColor(255, 255, 255);
    doc.rect(15, 20, pageWidth - 30, pageHeight - 40, 'F');

    doc.setTextColor(30, 64, 175);
    doc.setFontSize(48);
    doc.setFont('helvetica', 'bold');
    doc.text('CERTIFICADO', pageWidth / 2, 50, { align: 'center' });

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('DE CONCLUSÃO', pageWidth / 2, 65, { align: 'center' });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Certificamos que', pageWidth / 2, 85, { align: 'center' });

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(22, 163, 74);
    doc.text(userData.profile.name.toUpperCase(), pageWidth / 2, 100, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('Completou com sucesso o programa de acompanhamento de evolução', pageWidth / 2, 115, {
      align: 'center',
    });
    doc.text('Muscle Tracker por 12 semanas consecutivas.', pageWidth / 2, 122, { align: 'center' });

    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text('Dados do Participante:', 30, 145);

    const dataY = 155;
    const lineHeight = 8;
    const col1X = 30;
    const col2X = 100;

    doc.setFontSize(10);
    doc.text(`Nome: ${userData.profile.name}`, col1X, dataY);
    doc.text(`Idade: ${userData.profile.age} anos`, col2X, dataY);

    doc.text(`Peso Inicial: ${userData.evolutions[0]?.weight || userData.profile.weight} kg`, col1X, dataY + lineHeight);
    doc.text(`Peso Final: ${userData.profile.weight} kg`, col2X, dataY + lineHeight);

    doc.text(`Altura: ${userData.profile.height} cm`, col1X, dataY + lineHeight * 2);

    const firstEvolution = userData.evolutions[0];
    const lastEvolution = userData.evolutions[userData.evolutions.length - 1];

    if (firstEvolution && lastEvolution) {
      const chestDiff = (lastEvolution.measurements.chest - firstEvolution.measurements.chest).toFixed(1);
      const bicepsDiff = (lastEvolution.measurements.biceps - firstEvolution.measurements.biceps).toFixed(1);
      const waistDiff = (lastEvolution.measurements.waist - firstEvolution.measurements.waist).toFixed(1);

      doc.text(`Evolução Peito: ${chestDiff} cm`, col1X, dataY + lineHeight * 4);
      doc.text(`Evolução Bíceps: ${bicepsDiff} cm`, col2X, dataY + lineHeight * 4);
      doc.text(`Evolução Cintura: ${waistDiff} cm`, col1X, dataY + lineHeight * 5);
    }

    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    doc.text(`Emitido em: ${formattedDate}`, pageWidth / 2, pageHeight - 20, { align: 'center' });

    doc.save(`certificado-muscle-tracker-${userData.profile.name.replace(/\s+/g, '-')}.pdf`);
  },
};
