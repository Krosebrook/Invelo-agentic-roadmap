import { motion } from "framer-motion";
import { memos } from "../data";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";

interface MemoViewProps {
  memoId: string | null;
  onBack: () => void;
  onSelectMemo: (id: string) => void;
}

export function MemoView({ memoId, onBack, onSelectMemo }: MemoViewProps) {
  if (!memoId) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <header className="mb-8">
          <h2 className="font-serif text-3xl font-semibold text-zinc-100">Strategic Memos</h2>
          <p className="text-zinc-400 mt-2">Select a memo to read the full analysis.</p>
        </header>
        <div className="grid gap-4">
          {memos.map((memo) => (
            <div 
              key={memo.id}
              onClick={() => onSelectMemo(memo.id)}
              className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-800/40 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 mb-3">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {memo.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {memo.readTime}</span>
                <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">{memo.topic}</span>
              </div>
              <h3 className="text-xl font-medium text-zinc-200 mb-2 group-hover:text-indigo-400 transition-colors">
                {memo.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {memo.keyArgument}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const memo = memos.find(m => m.id === memoId);
  if (!memo) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto p-8 pb-24"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-mono text-zinc-500 hover:text-zinc-300 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Memos
      </button>

      <header className="mb-12">
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 mb-6">
          <span className="px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {memo.topic}
          </span>
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {memo.date}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {memo.readTime}</span>
        </div>
        <h1 className="font-serif text-4xl leading-tight font-semibold text-zinc-100 mb-6">
          {memo.title}
        </h1>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
            <User className="w-5 h-5 text-zinc-400" />
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-200">{memo.author}</div>
            <div className="text-xs font-mono text-zinc-500">{memo.publication}</div>
          </div>
        </div>
      </header>

      <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-serif prose-headings:font-medium prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-p:text-zinc-300 prose-li:text-zinc-300">
        {memo.content.split('\\n').map((paragraph, idx) => {
          if (!paragraph.trim()) return <br key={idx} />;
          
          // Basic markdown parsing for the content
          if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
            return <h3 key={idx} className="mt-8 mb-4">{paragraph.replace(/\\*\\*/g, '')}</h3>;
          }
          if (paragraph.startsWith('- **')) {
            const [bold, rest] = paragraph.substring(4).split('**');
            return (
              <li key={idx} className="mb-2">
                <strong className="text-zinc-200">{bold}</strong>{rest}
              </li>
            );
          }
          if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ') || paragraph.startsWith('4. ') || paragraph.startsWith('5. ') || paragraph.startsWith('6. ') || paragraph.startsWith('7. ')) {
            // Check if it's a heading vs a list item
            if (paragraph.includes(':')) {
               const [bold, rest] = paragraph.split(':');
               return <h2 key={idx} className="mt-10 mb-4 text-indigo-300">{bold}:{rest}</h2>;
            }
          }

          return <p key={idx} className="mb-4">{paragraph}</p>;
        })}
      </div>
    </motion.div>
  );
}
