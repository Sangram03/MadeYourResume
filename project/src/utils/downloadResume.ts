import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

export type DownloadFormat = 'pdf' | 'docx' | 'txt';

export async function downloadResume(
  resumeContent: HTMLElement,
  format: DownloadFormat,
  fileName: string = 'resume'
) {
  switch (format) {
    case 'pdf':
      await downloadPDF(resumeContent, fileName);
      break;
    case 'docx':
      await downloadDOCX(resumeContent, fileName);
      break;
    case 'txt':
      downloadTXT(resumeContent, fileName);
      break;
  }
}

async function downloadPDF(element: HTMLElement, fileName: string) {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
  });
  
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  
  pdf.addImage(
    imgData,
    'PNG',
    0,
    0,
    imgWidth * ratio,
    imgHeight * ratio
  );
  
  pdf.save(`${fileName}.pdf`);
}

async function downloadDOCX(element: HTMLElement, fileName: string) {
  const content = element.innerText;
  const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  saveAs(blob, `${fileName}.docx`);
}

function downloadTXT(element: HTMLElement, fileName: string) {
  const content = element.innerText;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, `${fileName}.txt`);
}