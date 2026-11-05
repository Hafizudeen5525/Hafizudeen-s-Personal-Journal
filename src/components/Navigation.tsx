import React from 'react';
import { useBlog } from '../context/BlogContext';
import { LayoutDashboard, Compass } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { activeView, setActiveView, setSelectedPost, data } = useBlog();
  const unreadMessages = data.messages.filter((m) => !m.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            setSelectedPost(null);
            setActiveView('public');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-sm"
        >
          <span className="text-xl md:text-2xl font-bold tracking-tight text-zinc-950 group-hover:text-zinc-700 transition-colors whitespace-nowrap shrink-0 block">
            {data.profile.name.toUpperCase()}
          </span>
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-700 block">
            Quantitative Research · Mathematical Finance
          </span>
        </button>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        {activeView === 'public' ? (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <a
              href="#posts"
              className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0"
            >
              Writing & Notes
            </a>
            <a
              href="#reading"
              className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0"
            >
              Reading Shelf
            </a>
            <a
              href="#milestones"
              className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0"
            >
              Milestones
            </a>
            <a
              href="#about"
              className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0"
            >
              About & SoP
            </a>
            <a
              href="#contact"
              className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-2 text-xs text-zinc-500 font-mono">
            <span>STUDIO DASHBOARD</span>
            <span aria-hidden="true">·</span>
            <span>{data.posts.length} Notes</span>
            <span aria-hidden="true">·</span>
            <span>{data.readingShelf.length} Shelf Items</span>
          </div>
        )}

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {activeView === 'public' ? (
            <button
              onClick={() => setActiveView('admin')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium tracking-wide uppercase text-zinc-100 bg-zinc-950 hover:bg-zinc-800 transition-all rounded-md shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Studio Admin</span>
              {unreadMessages > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-blue-600 text-white rounded-full">
                  {unreadMessages}
                </span>
              )}
            </button>
          ) : (
            <button
              onClick={() => setActiveView('public')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium tracking-wide uppercase text-zinc-900 bg-zinc-100 hover:bg-white border border-zinc-300 transition-all rounded-md shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>View Public Site</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
