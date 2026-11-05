import React from 'react';
import { BlogProvider, useBlog } from './context/BlogContext';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { PostList } from './components/PostList';
import { ReadingShelfSection } from './components/ReadingShelfSection';
import { MilestonesSection } from './components/MilestonesSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { PostDetailModal } from './components/PostDetailModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { CheckCircle, X } from 'lucide-react';

const MainLayout: React.FC = () => {
  const {
    activeView,
    selectedPost,
    setSelectedPost,
    notification,
    setNotification,
  } = useBlog();

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 selection:bg-zinc-950 selection:text-white flex flex-col font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 text-zinc-100 px-4 py-3 rounded-lg shadow-xl border border-zinc-800 flex items-center gap-3 text-xs font-mono animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
          <button
            onClick={() => setNotification(null)}
            className="p-1 hover:text-zinc-300 cursor-pointer ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Header */}
      <Navigation />

      {/* Main View Router */}
      {activeView === 'admin' ? (
        <AdminDashboard />
      ) : (
        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection onSelectPost={(post) => setSelectedPost(post)} />

          {/* Notes & Essays Feed */}
          <PostList onSelectPost={(post) => setSelectedPost(post)} />

          {/* Curated Articles I Like & Reading Shelf */}
          <ReadingShelfSection />

          {/* Timeline of Personal Milestones */}
          <MilestonesSection />

          {/* About Author & Correspondence */}
          <AboutSection />

          {/* Minimal Editorial Footer */}
          <Footer />
        </main>
      )}

      {/* Post Detail Reader Modal */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}

      {/* Google Authentication Modal Gate */}
      <GoogleAuthModal />
    </div>
  );
};

export default function App() {
  return (
    <BlogProvider>
      <MainLayout />
    </BlogProvider>
  );
}
