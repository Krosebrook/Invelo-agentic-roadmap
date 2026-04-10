import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Search, 
  Code, 
  Image as ImageIcon, 
  Globe, 
  FileText, 
  Database,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { cn } from "../lib/utils";

interface Skill {
  id: string;
  name: string;
  description: string;
  icon: any;
  enabled: boolean;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  status: 'allowed' | 'denied' | 'ask';
}

export function AgentConfigView() {
  const [model, setModel] = useState("gemini-1.5-pro");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  
  const [skills, setSkills] = useState<Skill[]>([
    { id: "search", name: "Web Search", description: "Access real-time information from the internet.", icon: Search, enabled: true },
    { id: "code", name: "Code Execution", description: "Run and debug code in a secure sandbox.", icon: Code, enabled: true },
    { id: "image", name: "Image Generation", description: "Create visual assets from text descriptions.", icon: ImageIcon, enabled: false },
    { id: "browser", name: "Browser Control", description: "Navigate and interact with websites autonomously.", icon: Globe, enabled: true },
  ]);

  const [permissions, setPermissions] = useState<Permission[]>([
    { id: "files", name: "File System Access", description: "Read and write files in the project directory.", status: 'ask' },
    { id: "network", name: "External Network", description: "Make requests to third-party APIs and services.", status: 'allowed' },
    { id: "user_data", name: "User Profile Data", description: "Access basic information about the current user.", status: 'denied' },
    { id: "database", name: "Database Operations", description: "Perform CRUD operations on the application database.", status: 'allowed' },
  ]);

  const toggleSkill = (id: string) => {
    setSkills(skills.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const updatePermission = (id: string, status: Permission['status']) => {
    setPermissions(permissions.map(p => p.id === id ? { ...p, status } : p));
  };

  return (
    <div className="max-w-6xl mx-auto p-8 pb-24">
      <header className="mb-12">
        <h2 className="font-serif text-4xl font-semibold text-zinc-100 mb-4">Agent Configuration</h2>
        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
          Fine-tune your agent's cognitive parameters, capabilities, and security boundaries.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Parameters */}
        <div className="lg:col-span-1 space-y-6">
          <section className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30">
            <h3 className="text-sm font-semibold text-zinc-100 mb-6 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" /> Cognitive Parameters
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Model Selection</label>
                <select 
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                  <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                  <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider">Temperature</label>
                  <span className="text-xs font-mono text-indigo-400">{temperature}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-zinc-600">Precise</span>
                  <span className="text-[10px] text-zinc-600">Creative</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider">Max Response Tokens</label>
                  <span className="text-xs font-mono text-indigo-400">{maxTokens}</span>
                </div>
                <input 
                  type="range" 
                  min="256" 
                  max="8192" 
                  step="256"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>
          </section>

          <div className="p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/10 flex gap-3">
            <AlertCircle className="w-5 h-5 text-indigo-400 shrink-0" />
            <p className="text-xs text-zinc-400 leading-relaxed">
              Higher temperature increases variability but may lead to hallucinations in technical tasks.
            </p>
          </div>
        </div>

        {/* Right Column: Skills & Permissions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Skills Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-zinc-100 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" /> Agent Skills
              </h3>
              <span className="text-xs font-mono text-zinc-500">
                {skills.filter(s => s.enabled).length} Active
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <button
                    key={skill.id}
                    onClick={() => toggleSkill(skill.id)}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-xl border transition-all text-left group",
                      skill.enabled 
                        ? "bg-zinc-800/40 border-indigo-500/30 ring-1 ring-indigo-500/20" 
                        : "bg-zinc-900/20 border-zinc-800 hover:border-zinc-700"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-lg shrink-0 transition-colors",
                      skill.enabled ? "bg-indigo-500/20 text-indigo-400" : "bg-zinc-800 text-zinc-500"
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-zinc-200">{skill.name}</span>
                        {skill.enabled && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed">{skill.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Permissions Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-zinc-100 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> Security Permissions
              </h3>
            </div>

            <div className="space-y-3">
              {permissions.map((perm) => (
                <div 
                  key={perm.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400">
                      {perm.id === 'files' && <FileText className="w-4 h-4" />}
                      {perm.id === 'network' && <Globe className="w-4 h-4" />}
                      {perm.id === 'user_data' && <Database className="w-4 h-4" />}
                      {perm.id === 'database' && <Database className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-zinc-200">{perm.name}</div>
                      <div className="text-xs text-zinc-500">{perm.description}</div>
                    </div>
                  </div>

                  <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-800">
                    {(['allowed', 'ask', 'denied'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => updatePermission(perm.id, status)}
                        className={cn(
                          "px-3 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider transition-all",
                          perm.status === status 
                            ? status === 'allowed' ? "bg-emerald-500/20 text-emerald-400" :
                              status === 'denied' ? "bg-rose-500/20 text-rose-400" :
                              "bg-amber-500/20 text-amber-400"
                            : "text-zinc-600 hover:text-zinc-400"
                        )}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 flex gap-3">
        <button className="px-6 py-2 rounded-full border border-zinc-800 bg-zinc-900 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors">
          Discard Changes
        </button>
        <button className="px-6 py-2 rounded-full bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all">
          Save Configuration
        </button>
      </div>
    </div>
  );
}
