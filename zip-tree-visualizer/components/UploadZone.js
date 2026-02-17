"use client";
import React, { useState } from 'react';
import { Upload, FileArchive, CheckCircle2 } from 'lucide-react';

const UploadZone = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/x-zip-compressed" || file.name.endsWith('.zip')) {
      setFileName(file.name);
      onFileUpload(file);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileUpload(file);
    }
  };

  return (
    <div 
      className={`relative w-full max-w-2xl mx-auto mt-10 p-10 glass-card border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer
        ${isDragging ? 'border-purple-500 bg-purple-500/10 scale-[1.02]' : 'border-white/10'}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        accept=".zip" 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
        onChange={handleChange}
      />
      
      <div className="p-4 rounded-full bg-purple-500/20 mb-4 group-hover:scale-110 transition-transform">
        {fileName ? (
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        ) : (
          <Upload className="w-10 h-10 text-purple-400" />
        )}
      </div>

      <h3 className="text-xl font-semibold text-white mb-2">
        {fileName ? fileName : "Drop your ZIP file here"}
      </h3>
      
      <p className="text-gray-400 text-sm text-center">
        {fileName 
          ? "File uploaded successfully! Generating structure..." 
          : "Drag and drop or click to browse files from your computer"}
      </p>

      {/* Premium Badge */}
      <div className="mt-6 flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
        <FileArchive size={14} className="text-purple-400" />
        <span className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">ZIP Processor (Client Side)</span>
      </div>
    </div>
  );
};

export default UploadZone;
