"use client";
import React, { useState } from 'react';
import { Copy, Check, Trash2, FolderTree } from 'lucide-react';
import FileNode from './FileNode';

const TreeView = ({ treeData, onClear }) => {
  const [copied, setCopied] = useState(false);

  // Accurate ASCII Generator Logic
  const generateASCII = (nodes, prefix = "") => {
    let output = "";
    nodes.forEach((node, index) => {
      const isLast = index === nodes.length - 1;
      const connector = isLast ? "└── " : "├── ";
      
      output += prefix + connector + node.name + (node.type === "folder" ? "/" : "") + "\n";
      
      if (node.children && node.children.length > 0) {
        const newPrefix = prefix + (isLast ? "    " : "│   ");
        output += generateASCII(node.children, newPrefix);
      }
    });
    return output;
  };

  const handleCopy = () => {
    const asciiText = generateASCII(treeData);
    navigator.clipboard.writeText(asciiText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!treeData || treeData.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-slide-down">
      <div className="glass-card overflow-hidden">
        {/* Header / Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <FolderTree size={18} className="text-purple-400" />
            <span className="text-sm font-medium text-gray-300">Generated Structure</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-xs font-medium transition-all"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy Structure"}
            </button>
            
            <button 
              onClick={onClear}
              className="p-1.5 rounded-md hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all"
              title="Clear all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Tree Content Area */}
        <div className="p-6 max-h-[600px] overflow-y-auto scrollbar-thin">
          <div className="font-mono">
             {treeData.map((node, index) => (
               <FileNode key={index} node={node} />
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeView;
