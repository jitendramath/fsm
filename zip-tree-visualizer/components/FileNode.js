"use client";
import React, { useState } from 'react';
import { Folder, ChevronRight, ChevronDown } from 'lucide-react';
import { getFileIcon } from '@/utils/iconHelper'; // Icon helper import kiya

const FileNode = ({ node, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = node.type === "folder";

  // File ke liye sahi icon aur color nikaalna
  const { icon: FileIcon, color: iconColor } = isFolder 
    ? { icon: Folder, color: 'text-purple-400' } 
    : getFileIcon(node.name);

  const toggleOpen = () => {
    if (isFolder) setIsOpen(!isOpen);
  };

  return (
    <div className="select-none">
      {/* Node Row */}
      <div 
        onClick={toggleOpen}
        className={`flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer transition-all duration-200 group
          ${isFolder ? 'hover:bg-white/5' : 'hover:bg-white/10'}
        `}
        style={{ paddingLeft: `${depth * 1.5}rem` }}
      >
        {/* Chevron Icon for Folders */}
        <div className="w-4 h-4 flex items-center justify-center">
          {isFolder && (
            isOpen ? 
            <ChevronDown size={14} className="text-gray-500 group-hover:text-gray-300" /> : 
            <ChevronRight size={14} className="text-gray-500 group-hover:text-gray-300" />
          )}
        </div>

        {/* Dynamic Icon (Folder or File specific) */}
        <div className="transition-transform duration-200 group-hover:scale-110">
          <FileIcon 
            size={18} 
            className={`${isFolder && isOpen ? 'text-purple-400 fill-current' : iconColor} opacity-90`} 
          />
        </div>

        {/* Name */}
        <span className={`text-sm tracking-wide transition-colors
          ${isFolder ? 'text-gray-200 font-medium group-hover:text-white' : 'text-gray-400 group-hover:text-gray-200'}
        `}>
          {node.name}
        </span>
      </div>

      {/* Recursive Children (Render folders/files inside) */}
      {isFolder && isOpen && node.children && (
        <div className="animate-slide-down border-l border-white/5 ml-[1.5rem]">
          {node.children.map((child, index) => (
            <FileNode key={index} node={child} depth={depth} /> 
            /* Note: depth is handled by the left border and margin now for better alignment */
          ))}
        </div>
      )}
    </div>
  );
};

export default FileNode;
