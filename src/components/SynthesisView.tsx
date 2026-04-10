import { motion } from "framer-motion";
import { threads, memos } from "../data";
import { cn } from "../lib/utils";
import { ArrowRight, FileText } from "lucide-react";

interface SynthesisViewProps {
  onSelectMemo: (id: string) => void;
}

export function SynthesisView({ onSelectMemo }: SynthesisViewProps) {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <header className="mb-12">
        <h2 className="font-serif text-4xl font-semibold text-zinc-100 mb-4">The Strategic Weave</h2>
        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
          A synthesis of the 2026 enterprise paradigm shift. The transition from SaaS consumption to 
          in-house agentic orchestration requires a modular infrastructure, autonomous execution engines, 
          and a keen eye for orphaned market demand.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {threads.map((thread, index) => (
          <motion.div 
            key={thread.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col gap-4"
          >
            <div className={cn("p-4 rounded-lg border", thread.color)}>
              <h3 className="font-semibold text-lg mb-2">{thread.title}</h3>
              <p className="text-sm opacity-80">{thread.description}</p>
            </div>

            <div className="flex-1 flex flex-col gap-3 relative">
              {/* Connecting line behind cards */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-zinc-800 -z-10" />
              
              {thread.memos.map((memoId, memoIndex) => {
                const memo = memos.find(m => m.id === memoId);
                if (!memo) return null;
                
                return (
                  <motion.div
                    key={memo.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index * 0.1) + (memoIndex * 0.1) + 0.2 }}
                    onClick={() => onSelectMemo(memo.id)}
                    className="ml-4 p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all cursor-pointer group relative"
                  >
                    {/* Node connector */}
                    <div className="absolute -left-4 top-6 w-4 h-px bg-zinc-800" />
                    <div className="absolute -left-5 top-5 w-2 h-2 rounded-full bg-zinc-700" />

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-3 h-3 text-zinc-500" />
                          <span className="text-xs font-mono text-zinc-500">{memo.topic}</span>
                        </div>
                        <h4 className="font-medium text-zinc-200 text-sm leading-snug mb-2 group-hover:text-indigo-400 transition-colors">
                          {memo.title}
                        </h4>
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                          {memo.keyArgument}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 transition-colors shrink-0 mt-1" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
