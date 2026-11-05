import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { ReadingItem } from '../types/blog';
import { BookOpen, ExternalLink, Star } from 'lucide-react';

export const ReadingShelfSection: React.FC = () => {
  const { data } = useBlog();
  const [filterType, setFilterType] = useState<string>('All');

  const types = ['All', 'Paper', 'Book', 'Essay'];

  const filteredItems = data.readingShelf.filter((item) => {
    if (filterType === 'All') return true;
    return item.type === filterType;
  });

  return (
    <section id="reading" className="py-20 border-b border-zinc-200 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-600 block mb-2 font-semibold">
              Curated Annotations & Research
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-zinc-950 tracking-tight">
              Articles I Like & Bookshelf
            </h2>
            <p className="text-sm text-zinc-600 font-sans mt-2 max-w-xl">
              Foundational mathematics papers, market microstructure texts, and stochastic calculus references that have shaped how I reason about models.
            </p>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1 p-1 bg-zinc-200/80 rounded-lg overflow-x-auto font-mono text-xs">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  filterType === t
                    ? 'bg-zinc-950 text-white shadow-2xs font-semibold'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Reading Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-50 rounded-lg border border-zinc-200 p-6 flex flex-col justify-between hover:border-zinc-400 transition-all shadow-2xs space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-white border border-zinc-200 rounded-xs font-semibold text-zinc-800">
                      {item.type}
                    </span>
                    <span>·</span>
                    <span className="text-zinc-600 font-medium">{item.status}</span>
                  </div>

                  <div className="flex items-center gap-0.5 text-zinc-900">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-zinc-900 text-zinc-900" />
                    ))}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-zinc-950 mb-1 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-zinc-500 mb-3">by {item.author}</p>

                <p className="text-xs text-zinc-700 font-sans leading-relaxed bg-white p-3 rounded-md border border-zinc-200/80">
                  "{item.notes}"
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-zinc-200 text-xs font-mono">
                <span className="text-zinc-500">Added {item.dateAdded}</span>
                {item.url && item.url !== '#' && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-900 hover:underline font-semibold"
                  >
                    <span>Read Original</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
