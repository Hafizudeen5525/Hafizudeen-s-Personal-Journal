import React from 'react';
import { useBlog } from '../context/BlogContext';
import { Post } from '../types/blog';
import { ArrowRight, Clock, Binary, BookOpen, Target, Compass, Terminal, Cpu } from 'lucide-react';

interface HeroSectionProps {
  onSelectPost: (post: Post) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectPost }) => {
  const { data, setActiveStream } = useBlog();
  const featuredPost = data.posts.find((p) => p.featured && p.status === 'published') || data.posts[0];

  const streamBadges = [
    { label: 'Math & Quants', icon: Binary, count: data.posts.filter((p) => p.stream === 'Math & Quants').length },
    { label: 'Personal & Life', icon: Compass, count: data.posts.filter((p) => p.stream === 'Personal & Life').length },
    { label: 'Articles I Like', icon: BookOpen, count: data.posts.filter((p) => p.stream === 'Articles I Like').length },
    { label: 'Achievements', icon: Target, count: data.posts.filter((p) => p.stream === 'Achievements').length },
  ];

  return (
    <section className="relative pt-10 pb-16 border-b border-zinc-200 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Header Block */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-600 mb-4">
            <span className="font-semibold text-zinc-900">Muhammad Hafizudeen</span>
            <span aria-hidden="true">·</span>
            <span>Mathematical Finance & Quant Research</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-zinc-950 tracking-tight leading-[1.08] mb-6 [text-wrap:balance]">
            What does it mean for a model to be right?
          </h1>

          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
            Exploring the foundations of quantitative finance, market microstructure, and stochastic analysis. Documenting technical notes, book annotations, and milestones bridging Olympiad mathematics, university research, and trading desks.
          </p>

          {/* Stream Quick Filter Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            {streamBadges.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.label}
                  onClick={() => {
                    setActiveStream(s.label);
                    const el = document.getElementById('posts');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded-md text-xs font-mono text-zinc-800 transition-colors cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-zinc-700" />
                  <span className="font-medium">{s.label}</span>
                  <span className="text-[10px] text-zinc-600 font-semibold">({s.count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Post Split Container */}
        {featuredPost && (
          <div className="bg-zinc-50 rounded-xl border border-zinc-300/80 p-6 sm:p-8 lg:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 uppercase">
                  <span className="font-bold text-zinc-900">Selected Work</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredPost.stream}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredPost.publishedDate}</span>
                </div>

                <h2
                  onClick={() => onSelectPost(featuredPost)}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-950 hover:text-zinc-700 transition-colors cursor-pointer leading-tight [text-wrap:balance]"
                >
                  {featuredPost.title}
                </h2>

                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-sans">
                  {featuredPost.excerpt}
                </p>

                {featuredPost.keyTakeaway && (
                  <div className="p-4 bg-white border-l-2 border-zinc-950 rounded-r-md text-xs sm:text-sm text-zinc-800 font-sans shadow-2xs">
                    <span className="font-semibold font-mono uppercase text-[10px] text-zinc-600 block mb-1">
                      Core Research Takeaway:
                    </span>
                    "{featuredPost.keyTakeaway}"
                  </div>
                )}

                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={() => onSelectPost(featuredPost)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-widest text-zinc-100 bg-zinc-950 hover:bg-zinc-800 rounded-md transition-colors cursor-pointer group shadow-xs"
                  >
                    <span>Read Full Note</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-600">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Technical / Formula Block */}
              <div className="lg:col-span-5 bg-zinc-950 text-zinc-100 p-6 sm:p-8 rounded-lg font-mono text-xs shadow-md space-y-4 border border-zinc-800">
                <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800 pb-2">
                  <span className="uppercase text-[10px] tracking-wider font-semibold text-zinc-300">
                    Mathematical Formulation
                  </span>
                  <Terminal className="w-4 h-4 text-zinc-400" />
                </div>

                {featuredPost.mathHighlight ? (
                  <div className="py-4 text-center">
                    <code className="text-sm sm:text-base font-semibold text-zinc-100 block bg-zinc-900 p-3.5 rounded-md border border-zinc-800">
                      {featuredPost.mathHighlight}
                    </code>
                  </div>
                ) : (
                  <p className="text-zinc-300 text-sm italic">
                    "{featuredPost.keyTakeaway || featuredPost.excerpt}"
                  </p>
                )}

                <div className="text-[11px] text-zinc-400 leading-relaxed pt-2 border-t border-zinc-800">
                  <span className="text-zinc-300 font-semibold block mb-1">Index Tags:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {featuredPost.tags.map((t) => (
                      <span key={t} className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded-xs text-[10px]">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pinned Axioms / Principles Row */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-zinc-200">
          {data.profile.pinnedThoughts.map((thought, i) => (
            <div key={i} className="text-left space-y-1.5 p-4 bg-zinc-50 rounded-lg border border-zinc-200/80">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 block font-semibold">
                Principle {i + 1}
              </span>
              <p className="text-xs text-zinc-700 leading-relaxed font-sans">
                {thought}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
