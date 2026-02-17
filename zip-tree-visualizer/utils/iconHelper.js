import { 
  FileText, 
  Code2, 
  Type, 
  Image as ImageIcon, 
  FileJson, 
  FileCode,
  FileBox
} from 'lucide-react';

/**
 * Yeh helper function file extension check karke 
 * sahi Icon aur Color return karta hai.
 */
export const getFileIcon = (fileName) => {
  const ext = fileName.split('.').pop().toLowerCase();

  const iconMap = {
    // Code Files
    js: { icon: Code2, color: 'text-yellow-400' },
    jsx: { icon: Code2, color: 'text-blue-400' },
    ts: { icon: FileCode, color: 'text-blue-500' },
    tsx: { icon: FileCode, color: 'text-blue-400' },
    html: { icon: Code2, color: 'text-orange-500' },
    css: { icon: Type, color: 'text-blue-300' },
    
    // Data Files
    json: { icon: FileJson, color: 'text-yellow-300' },
    md: { icon: FileText, color: 'text-gray-300' },
    
    // Assets
    png: { icon: ImageIcon, color: 'text-green-400' },
    jpg: { icon: ImageIcon, color: 'text-green-400' },
    jpeg: { icon: ImageIcon, color: 'text-green-400' },
    svg: { icon: ImageIcon, color: 'text-orange-300' },
    
    // Others
    zip: { icon: FileBox, color: 'text-purple-400' },
  };

  return iconMap[ext] || { icon: FileText, color: 'text-gray-400' };
};
