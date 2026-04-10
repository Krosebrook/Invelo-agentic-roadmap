import { motion } from "framer-motion";
import { opportunities } from "../data";
import { Target, Users, DollarSign, Database, Lightbulb } from "lucide-react";

export function OpportunityView() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <header className="mb-12">
        <h2 className="font-serif text-4xl font-semibold text-zinc-100 mb-4">Orphaned Demand Opportunities</h2>
        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
          High-velocity, low-risk strategies to generate new revenue streams by systematically capitalizing 
          on market gaps created by competitor exits and platform shifts.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {opportunities.map((opp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex flex-col p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-800/40 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-lg text-zinc-100">{opp.concept}</h3>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-1">
                  <Target className="w-3 h-3" /> Niche Focus
                </div>
                <p className="text-sm text-zinc-300">{opp.niche}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-1">
                  <Users className="w-3 h-3" /> Target Customer
                </div>
                <p className="text-sm text-zinc-300">{opp.target}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-1">
                  <Database className="w-3 h-3" /> Key Data Extracted
                </div>
                <p className="text-sm text-zinc-300">{opp.data}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                <DollarSign className="w-4 h-4" />
                {opp.monetization}
              </div>
              <div className="text-xs font-mono text-zinc-500">
                vs. {opp.competitor}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
