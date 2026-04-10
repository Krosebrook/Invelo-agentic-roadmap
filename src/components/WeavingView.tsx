import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Settings2, Grid3X3, Info } from "lucide-react";

const TECHNIQUES = [
  {
    name: "Tabby (Plain Weave)",
    structure: "The simplest and most common weaving pattern. Each weft thread passes over one warp thread and under the next, alternating in each row.",
    useCase: "Basic fabrics like cotton muslin, canvas, and linen.",
    pattern: [[1, 0], [0, 1]]
  },
  {
    name: "Twill",
    structure: "Characterized by diagonal ribs or lines. The weft thread passes over one or more warp threads and then under two or more warp threads, with an offset between rows to create the diagonal effect.",
    useCase: "Durable fabrics like denim, gabardine, and tweed.",
    pattern: [[1, 1, 0], [0, 1, 1], [1, 0, 1]]
  },
  {
    name: "Satin",
    structure: "Produces a smooth, lustrous surface. Long 'floats' are created where the weft passes over many warp threads (usually four or more) before interlacing.",
    useCase: "Formal wear, bedding, and lining fabrics.",
    pattern: [[1, 1, 1, 1, 0], [1, 1, 0, 1, 1], [0, 1, 1, 1, 1], [1, 1, 1, 0, 1], [1, 0, 1, 1, 1]]
  }
];

export function WeavingView() {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [colors, setColors] = useState("indigo, slate, zinc");
  const [selectedType, setSelectedType] = useState("Tabby");

  const colorArray = useMemo(() => 
    colors.split(",").map(c => c.trim()).filter(c => c.length > 0), 
    [colors]
  );

  const patternData = useMemo(() => {
    const type = TECHNIQUES.find(t => t.name.includes(selectedType)) || TECHNIQUES[0];
    const p = type.pattern;
    const rows = [];
    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        const isOver = p[y % p.length][x % p[0].length] === 1;
        row.push({
          isOver,
          warpColor: colorArray[x % colorArray.length] || "zinc",
          weftColor: colorArray[y % colorArray.length] || "zinc",
        });
      }
      rows.push(row);
    }
    return rows;
  }, [width, height, colorArray, selectedType]);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <header className="mb-12">
        <h2 className="font-serif text-4xl font-semibold text-zinc-100 mb-4">Historical Weaving</h2>
        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
          Explore the fundamental structures of textile creation and generate custom interlacing patterns.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {TECHNIQUES.map((tech) => (
          <div key={tech.name} className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30">
            <h3 className="text-xl font-medium text-zinc-100 mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-400" />
              {tech.name}
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">Structure</p>
                <p className="text-sm text-zinc-400 leading-relaxed">{tech.structure}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">Common Use Case</p>
                <p className="text-sm text-zinc-300">{tech.useCase}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-1 space-y-6">
          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
            <h3 className="text-sm font-semibold text-zinc-100 mb-6 flex items-center gap-2">
              <Settings2 className="w-4 h-4" /> Pattern Controls
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-500 mb-2">Technique</label>
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Tabby">Tabby</option>
                  <option value="Twill">Twill</option>
                  <option value="Satin">Satin</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-500 mb-2">Width (in)</label>
                  <input 
                    type="number" 
                    value={width}
                    onChange={(e) => setWidth(Math.min(40, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-500 mb-2">Height (in)</label>
                  <input 
                    type="number" 
                    value={height}
                    onChange={(e) => setHeight(Math.min(40, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-500 mb-2">Colors (Tailwind names)</label>
                <input 
                  type="text" 
                  value={colors}
                  onChange={(e) => setColors(e.target.value)}
                  placeholder="e.g. red, blue, white"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-200"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-3">
          <div className="p-8 rounded-xl border border-zinc-800 bg-zinc-950 flex items-center justify-center overflow-auto min-h-[400px]">
            <div 
              className="grid gap-px bg-zinc-800 p-px"
              style={{ 
                gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`,
                width: `${width * 30}px`
              }}
            >
              {patternData.map((row, y) => (
                row.map((cell, x) => (
                  <div 
                    key={`${x}-${y}`}
                    className="w-full aspect-square relative"
                  >
                    {/* Warp Thread (Vertical) */}
                    <div 
                      className={cn(
                        "absolute inset-y-0 left-1/4 right-1/4 z-10",
                        `bg-${cell.warpColor}-500`,
                        cell.isOver ? "z-0" : "z-20 shadow-lg"
                      )}
                    />
                    {/* Weft Thread (Horizontal) */}
                    <div 
                      className={cn(
                        "absolute inset-x-0 top-1/4 bottom-1/4",
                        `bg-${cell.weftColor}-400`,
                        cell.isOver ? "z-20 shadow-lg" : "z-0"
                      )}
                    />
                  </div>
                ))
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-zinc-500">
            <Grid3X3 className="w-3 h-3" />
            Visualizing {width}x{height} interlacing grid
          </div>
        </div>
      </div>
    </div>
  );
}
