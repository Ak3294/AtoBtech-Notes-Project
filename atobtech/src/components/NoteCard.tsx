import React, { useState } from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleViewPDF = () => {
    window.open(note.pdfUrl, '_blank');
  };

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = note.pdfUrl;
    link.download = `${note.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={note.thumbnail} 
        alt={note.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{note.subject}</p>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{note.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-indigo-600">
            <FileText className="h-4 w-4 mr-1" />
            <span className="text-sm">PDF</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={handleViewPDF}
            className="flex items-center justify-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            <Eye className="h-4 w-4 mr-2" />
            View PDF
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;