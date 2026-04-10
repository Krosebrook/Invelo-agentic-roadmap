import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  File, 
  FileText, 
  Image as ImageIcon, 
  Table, 
  FolderArchive, 
  Loader2, 
  CheckCircle2, 
  X,
  Database,
  Search,
  ChevronRight
} from "lucide-react";
import { cn } from "../lib/utils";
import JSZip from "jszip";
import Papa from "papaparse";

interface Artifact {
  id: string;
  name: string;
  type: 'text' | 'data' | 'image' | 'archive' | 'folder';
  size: number;
  status: 'parsing' | 'ready' | 'error';
  content?: any;
  timestamp: number;
}

export function KnowledgeBaseView() {
  const [isDragging, setIsDragging] = useState(false);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processFile = async (file: File) => {
    const id = Math.random().toString(36).substring(7);
    const newArtifact: Artifact = {
      id,
      name: file.name,
      type: 'text',
      size: file.size,
      status: 'parsing',
      timestamp: Date.now()
    };

    // Determine type
    if (file.type.includes('image')) newArtifact.type = 'image';
    else if (file.name.endsWith('.csv') || file.name.endsWith('.xlsx')) newArtifact.type = 'data';
    else if (file.name.endsWith('.zip')) newArtifact.type = 'archive';
    else if (file.type === '') newArtifact.type = 'folder';

    setArtifacts(prev => [newArtifact, ...prev]);

    // Simulate parsing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      if (file.name.endsWith('.csv')) {
        const text = await file.text();
        const results = Papa.parse(text, { header: true });
        newArtifact.content = results.data;
      } else if (file.name.endsWith('.zip')) {
        const zip = new JSZip();
        const contents = await zip.loadAsync(file);
        newArtifact.content = Object.keys(contents.files);
      } else if (file.type.includes('text')) {
        newArtifact.content = await file.text();
      }

      setArtifacts(prev => prev.map(a => a.id === id ? { ...newArtifact, status: 'ready' } : a));
    } catch (err) {
      setArtifacts(prev => prev.map(a => a.id === id ? { ...newArtifact, status: 'error' } : a));
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach(processFile);
  }, []);

  const removeArtifact = (id: string) => {
    setArtifacts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-8 pb-24">
      <header className="mb-12">
        <h2 className="font-serif text-4xl font-semibold text-zinc-100 mb-4">Knowledge Ingestion</h2>
        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
          Upload and parse documents, spreadsheets, and archives into structured **Strategic Context** 
          for your agentic workforce.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Zone */}
        <div className="lg:col-span-1">
          <motion.div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            className={cn(
              "relative h-64 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-8 text-center group",
              isDragging 
                ? "border-indigo-500 bg-indigo-500/5" 
                : "border-zinc-800 bg-zinc-900/20 hover:border-zinc-700 hover:bg-zinc-900/30"
            )}
          >
            <div className={cn(
              "p-4 rounded-full mb-4 transition-transform duration-300",
              isDragging ? "bg-indigo-500 text-white scale-110" : "bg-zinc-800 text-zinc-400 group-hover:scale-105"
            )}>
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-zinc-200 font-medium mb-1">Drop files or folders</h3>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-[200px]">
              Supports PDF, CSV, ZIP, Images, and Directories
            </p>
            <input 
              type="file" 
              multiple 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={(e) => e.target.files && Array.from(e.target.files).forEach(processFile)}
            />
          </motion.div>

          <div className="mt-8 space-y-4">
            <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Parsing Pipeline</h4>
            <div className="space-y-3">
              {[
                { label: 'Semantic Extraction', icon: FileText, color: 'text-blue-400' },
                { label: 'Tabular Structuring', icon: Table, color: 'text-emerald-400' },
                { label: 'Visual OCR', icon: ImageIcon, color: 'text-purple-400' },
                { label: 'Archive Flattening', icon: FolderArchive, color: 'text-amber-400' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-zinc-400">
                  <step.icon className={cn("w-4 h-4", step.color)} />
                  {step.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Artifacts List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-zinc-100 flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-400" /> Knowledge Artifacts
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input 
                type="text" 
                placeholder="Search context..."
                className="bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 py-1.5 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-48"
              />
            </div>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {artifacts.length === 0 ? (
                <div className="text-center py-20 border border-zinc-800 rounded-2xl bg-zinc-900/10">
                  <p className="text-zinc-600 text-sm italic">No artifacts ingested yet.</p>
                </div>
              ) : (
                artifacts.map((artifact) => (
                  <motion.div
                    key={artifact.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="group flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-800/40 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "p-2.5 rounded-lg",
                        artifact.type === 'image' ? "bg-purple-500/10 text-purple-400" :
                        artifact.type === 'data' ? "bg-emerald-500/10 text-emerald-400" :
                        artifact.type === 'archive' ? "bg-amber-500/10 text-amber-400" :
                        "bg-blue-500/10 text-blue-400"
                      )}>
                        {artifact.type === 'image' && <ImageIcon className="w-5 h-5" />}
                        {artifact.type === 'data' && <Table className="w-5 h-5" />}
                        {artifact.type === 'archive' && <FolderArchive className="w-5 h-5" />}
                        {artifact.type === 'text' && <FileText className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-zinc-200 flex items-center gap-2">
                          {artifact.name}
                          {artifact.status === 'ready' && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-2">
                          {(artifact.size / 1024).toFixed(1)} KB • 
                          {artifact.status === 'parsing' ? (
                            <span className="flex items-center gap-1 text-indigo-400">
                              <Loader2 className="w-2 h-2 animate-spin" /> Parsing...
                            </span>
                          ) : (
                            <span>Ready for inference</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-zinc-200 transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => removeArtifact(artifact.id)}
                        className="p-2 hover:bg-rose-500/10 rounded-lg text-zinc-600 hover:text-rose-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
