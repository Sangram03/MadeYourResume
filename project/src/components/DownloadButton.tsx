import React, { useState } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { downloadResume, DownloadFormat } from '../utils/downloadResume';

interface DownloadButtonProps {
  contentRef: React.RefObject<HTMLDivElement>;
}

const formats: { value: DownloadFormat; label: string }[] = [
  { value: 'pdf', label: 'PDF Document' },
  { value: 'docx', label: 'Word Document' },
  { value: 'txt', label: 'Plain Text' },
];

export function DownloadButton({ contentRef }: DownloadButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = async (format: DownloadFormat) => {
    if (contentRef.current) {
      await downloadResume(contentRef.current, format);
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2 shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="h-5 w-5" />
          <span>Download</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px]">
            {formats.map((format) => (
              <button
                key={format.value}
                onClick={() => handleDownload(format.value)}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {format.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}