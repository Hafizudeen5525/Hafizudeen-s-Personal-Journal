import React from 'react';
import { useBlog } from '../context/BlogContext';
import { Target, CheckCircle2 } from 'lucide-react';

export const MilestonesSection: React.FC = () => {
  const { data } = useBlog();

  return (
    <section id="milestones" className="py-20 border-b border-zinc-200 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-600 block mb-2 font-semibold">
            Track Record
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-zinc-950 tracking-tight">
            Milestones & Mathematical Achievements
          </h2>
          <p className="text-sm text-zinc-600 font-sans mt-2">
            Key inflection points across Olympiad mathematics, academic preparation, multi-billion-dollar trading risk, and quantitative alpha research.
          </p>
        </div>

        <div className="relative border-l border-zinc-300 ml-4 md:ml-6 space-y-10 pl-6 md:pl-8">
          {data.milestones.map((m) => (
            <div key={m.id} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-zinc-950 border-4 border-white group-hover:scale-125 transition-transform shadow-xs" />

              <div className="bg-zinc-50 rounded-lg border border-zinc-200 p-6 shadow-2xs space-y-2 hover:border-zinc-400 transition-colors">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className="px-2 py-0.5 bg-zinc-950 text-white font-bold rounded-xs">
                    {m.year}
                  </span>
                  <span className="text-zinc-400">·</span>
                  <span className={`uppercase font-semibold tracking-wider text-[11px] ${
                    m.category === 'Academic' ? 'text-blue-700' :
                    m.category === 'Career' ? 'text-amber-800' :
                    m.category === 'Quant & Code' ? 'text-emerald-700' :
                    'text-indigo-700'
                  }`}>
                    {m.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-950">
                  {m.title}
                </h3>

                <p className="text-sm text-zinc-600 font-sans leading-relaxed">
                  {m.description}
                </p>

                {m.metrics && (
                  <div className="pt-2 flex items-center gap-2 text-xs font-mono text-zinc-700 border-t border-zinc-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900" />
                    <span>{m.metrics}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
