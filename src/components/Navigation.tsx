import React from 'react';
import { useBlog } from '../context/BlogContext';
import { LayoutDashboard, Compass, Lock, LogOut, CheckCircle2 } from 'lucide-react';

export const Navigation: React.FC = () => {
  const {
    activeView,
    setActiveView,
    setSelectedPost,
    data,
    openAdminWithAuthCheck,
    isOwnerAuthenticated,
    user,
    logout,
  } = useBlog();

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
          <div className="hidden md:flex items-center gap-3 text-xs text-zinc-500 font-mono">
            <span className="font-bold text-zinc-800">STUDIO DASHBOARD</span>
            <span aria-hidden="true">·</span>
            <span>{data.posts.length} Notes</span>
            <span aria-hidden="true">·</span>
            {user && (
              <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{user.email}</span>
              </span>
            )}
          </div>
        )}

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {activeView === 'public' ? (
            <button
              onClick={openAdminWithAuthCheck}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium tracking-wide uppercase text-zinc-100 bg-zinc-950 hover:bg-zinc-800 transition-all rounded-md shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isOwnerAuthenticated ? (
                <LayoutDashboard className="w-3.5 h-3.5" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-zinc-400" />
              )}
              <span>{isOwnerAuthenticated ? 'Studio Admin' : 'Admin Login'}</span>
              {unreadMessages > 0 && isOwnerAuthenticated && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-blue-600 text-white rounded-full">
                  {unreadMessages}
                </span>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView('public')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium uppercase text-zinc-800 bg-zinc-100 hover:bg-white border border-zinc-300 rounded-md transition-colors whitespace-nowrap cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>View Public</span>
              </button>
              <button
                onClick={logout}
                className="p-1.5 text-zinc-500 hover:text-red-600 transition-colors cursor-pointer"
                title="Sign out of Google account"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
