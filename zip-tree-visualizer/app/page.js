"use client";
import React, { useState } from 'react';
import UploadZone from '@/components/UploadZone';
import TreeView from '@/components/TreeView';
import { parseZipFiles } from '@/utils/zipParser';
import { buildTree } from '@/utils/treeBuilder';
import { Loader2, Zap } from 'lucide-react';

export default function Home() {
  const [treeData, setTreeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 1. ZIP scan karke paths nikaalna
      const paths = await parseZipFiles(file);
      
      // 2. Paths ko accurate Tree structure mein badalna
      const structuredTree = buildTree(paths);
      
      // Thoda delay for premium feel (loading animation dikhane ke liye)
      setTimeout(() => {
        setTreeData(structuredTree);
        setIsLoading(false);
      }, 800);

    } catch (err) {
      setError("Opps! Something went wrong with the ZIP file.");
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setTreeData(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-mesh flex flex-col items-center p-6 md:p-24">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-slide-down">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
          <Zap size={14} className="text-purple-400 fill-current" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-purple-300">Fast & Secure</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
          Zip<span className="text-purple-500">Tree</span>.
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto text-lg">
          Upload any ZIP file and get an accurate folder structure instantly. 
          Perfect for documentation and READMEs.
        </p>
      </div>

      {/* Main Interaction Area */}
      <div className="w-full max-w-4xl">
        {!treeData && !isLoading && (
          <UploadZone onFileUpload={handleFileUpload} />
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center p-20 glass-card">
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
            <p className="text-gray-300 font-medium animate-pulse">Mapping folder structure...</p>
          </div>
        )}

        {treeData && !isLoading && (
          <TreeView treeData={treeData} onClear={handleClear} />
        )}

        {error && (
          <p className="mt-4 text-red-400 text-center text-sm bg-red-400/10 py-2 px-4 rounded-lg border border-red-400/20">
            {error}
          </p>
        )}
      </div>

      {/* Footer Note */}
      <footer className="mt-auto pt-10 text-gray-500 text-xs">
        <p>© 2026 ZipTree Visualizer • Built for Developers</p>
      </footer>
    </main>
  );
}
