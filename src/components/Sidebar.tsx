import { Network, FileText, Target, Scissors, Settings, Database } from "lucide-react";
import { cn } from "../lib/utils";

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const navItems = [
    { id: "synthesis", label: "Synthesis Weave", icon: Network },
    { id: "memos", label: "Strategic Memos", icon: FileText },
    { id: "opportunities", label: "Market Opportunities", icon: Target },
    { id: "knowledge", label: "Knowledge Base", icon: Database },
    { id: "weaving", label: "Historical Weaving", icon: Scissors },
    { id: "config", label: "Agent Configuration", icon: Settings },
  ];

  return (
    <div className="w-64 h-screen border-r border-zinc-800 bg-zinc-950/50 flex flex-col">
      <div className="p-6 border-b border-zinc-800">
        <h1 className="font-serif text-xl font-semibold tracking-tight text-zinc-100">
          Agentic Intelligence
        </h1>
        <p className="text-xs font-mono text-zinc-500 mt-1">Strategic Portal 2026</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-zinc-800/50 text-zinc-100" 
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
            <span className="text-xs font-mono text-indigo-400">KR</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-medium text-zinc-300">Kyle Rosebrook</span>
            <span className="text-[10px] font-mono text-zinc-500">Staff Engineer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
