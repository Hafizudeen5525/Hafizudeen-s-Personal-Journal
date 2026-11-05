import React from 'react';
import { useBlog } from '../context/BlogContext';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, openAdminWithAuthCheck } = useBlog();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <span className="text-base font-bold text-zinc-950 block mb-1">
            {data.profile.name.toUpperCase()}
          </span>
          <p className="text-xs text-zinc-500 font-mono">
            Quantitative Research, Mathematical Notes & Personal Chronicle · © {new Date().getFullYear()}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-600 font-mono">
          <a href="#posts" className="hover:text-zinc-950 transition-colors">
            Notes & Essays
          </a>
          <a href="#reading" className="hover:text-zinc-950 transition-colors">
            Reading Shelf
          </a>
          <a href="#milestones" className="hover:text-zinc-950 transition-colors">
            Milestones
          </a>
          <a href="#about" className="hover:text-zinc-950 transition-colors">
            About & SoP
          </a>
          <button
            onClick={openAdminWithAuthCheck}
            className="hover:text-zinc-950 transition-colors underline cursor-pointer"
          >
            Studio Dashboard
          </button>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 hover:text-zinc-950 transition-colors cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
