import React, { createContext, useContext, useState, useEffect } from 'react';
import { BlogData, Post, ReadingItem, Milestone, SiteProfile, ContactMessage, PostStream, AuthUser } from '../types/blog';
import { INITIAL_BLOG_DATA } from '../data/initialData';

const STORAGE_KEY = 'hafizudeen_quant_journal_v5';
const AUTH_STORAGE_KEY = 'hafizudeen_auth_user_v1';
export const OWNER_EMAIL = 'hafizudeen991022@gmail.com';

interface BlogContextType {
  data: BlogData;
  activeView: 'public' | 'admin';
  setActiveView: (view: 'public' | 'admin') => void;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
  activeStream: string;
  setActiveStream: (stream: string) => void;
  
  // Authentication & Admin Access Control
  user: AuthUser | null;
  isOwnerAuthenticated: boolean;
  loginWithGoogle: (email?: string, name?: string, picture?: string) => boolean;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  openAdminWithAuthCheck: () => void;
  
  // Post operations
  createPost: (postData: Partial<Post>) => Post;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  togglePostStatus: (id: string) => void;
  
  // Reading Shelf operations
  addReadingItem: (item: Partial<ReadingItem>) => void;
  updateReadingItem: (id: string, updates: Partial<ReadingItem>) => void;
  deleteReadingItem: (id: string) => void;
  
  // Milestones operations
  addMilestone: (m: Partial<Milestone>) => void;
  updateMilestone: (id: string, updates: Partial<Milestone>) => void;
  deleteMilestone: (id: string) => void;

  // Profile
  updateProfile: (updates: Partial<SiteProfile>) => void;
  
  // Contact messages
  submitContactMessage: (msg: { name: string; email: string; subject: string; message: string }) => void;
  markMessageAsRead: (id: string) => void;
  deleteMessage: (id: string) => void;

  // Data management
  exportDataJson: () => void;
  importDataJson: (jsonString: string) => boolean;
  resetToDefaults: () => void;

  // Notification
  notification: string | null;
  setNotification: (text: string | null) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<BlogData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse stored blog data', e);
    }
    return INITIAL_BLOG_DATA;
  });

  const [activeView, setActiveView] = useState<'public' | 'admin'>('public');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [activeStream, setActiveStream] = useState<string>('All');
  const [notification, setNotification] = useState<string | null>(null);
  
  // Auth state
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      // ignore
    }
    return null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const isOwnerAuthenticated = Boolean(
    user && user.email.toLowerCase() === OWNER_EMAIL.toLowerCase() && user.isOwner
  );

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [data]);

  // Sync Auth with localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      // ignore
    }
  }, [user]);

  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => setNotification(null), 3500);
      return () => clearTimeout(t);
    }
  }, [notification]);

  const showNotice = (msg: string) => {
    setNotification(msg);
  };

  const loginWithGoogle = (email?: string, name?: string, picture?: string): boolean => {
    const targetEmail = (email || OWNER_EMAIL).toLowerCase().trim();
    const isOwner = targetEmail === OWNER_EMAIL.toLowerCase();

    const authUser: AuthUser = {
      email: targetEmail,
      name: name || (isOwner ? data.profile.name : targetEmail.split('@')[0]),
      picture: picture || (isOwner ? data.profile.avatarUrl : undefined),
      isOwner,
    };

    setUser(authUser);

    if (isOwner) {
      showNotice(`Authenticated as ${targetEmail}. Admin access unlocked.`);
      setIsAuthModalOpen(false);
      setActiveView('admin');
      return true;
    } else {
      showNotice(`Signed in as ${targetEmail}. Access restricted: Only ${OWNER_EMAIL} can access studio management.`);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    if (activeView === 'admin') {
      setActiveView('public');
    }
    showNotice('Logged out of Google account.');
  };

  const openAdminWithAuthCheck = () => {
    if (isOwnerAuthenticated) {
      setActiveView('admin');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const createPost = (postData: Partial<Post>): Post => {
    const slug = (postData.title || 'untitled-post')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newPost: Post = {
      id: `post-${Date.now()}`,
      title: postData.title || 'Untitled Post',
      slug,
      stream: (postData.stream as PostStream) || 'Math & Quants',
      excerpt: postData.excerpt || '',
      content: postData.content || '',
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: postData.readTime || '5 min read',
      status: postData.status || 'published',
      featured: postData.featured || false,
      tags: postData.tags || ['Quantitative'],
      externalUrl: postData.externalUrl,
      sourceAuthor: postData.sourceAuthor,
      mathHighlight: postData.mathHighlight,
      keyTakeaway: postData.keyTakeaway,
    };

    setData((prev) => ({
      ...prev,
      posts: [newPost, ...prev.posts],
    }));

    showNotice(`Published: "${newPost.title}"`);
    return newPost;
  };

  const updatePost = (id: string, updates: Partial<Post>) => {
    setData((prev) => ({
      ...prev,
      posts: prev.posts.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updates };
          if (updates.title && !updates.slug) {
            updated.slug = updates.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)+/g, '');
          }
          return updated;
        }
        return p;
      }),
    }));

    setSelectedPost((curr) => (curr && curr.id === id ? { ...curr, ...updates } : curr));
    showNotice('Post updated successfully');
  };

  const deletePost = (id: string) => {
    setData((prev) => ({
      ...prev,
      posts: prev.posts.filter((p) => p.id !== id),
    }));
    if (selectedPost && selectedPost.id === id) {
      setSelectedPost(null);
    }
    showNotice('Post removed');
  };

  const togglePostStatus = (id: string) => {
    setData((prev) => ({
      ...prev,
      posts: prev.posts.map((p) =>
        p.id === id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p
      ),
    }));
    showNotice('Post status updated');
  };

  const addReadingItem = (item: Partial<ReadingItem>) => {
    const newItem: ReadingItem = {
      id: `read-${Date.now()}`,
      title: item.title || 'Untitled Item',
      author: item.author || 'Unknown',
      type: item.type || 'Book',
      url: item.url || '#',
      status: item.status || 'Recommended',
      notes: item.notes || '',
      rating: item.rating || 5,
      dateAdded: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      streamCategory: item.streamCategory || 'Math & Quants',
    };
    setData((prev) => ({
      ...prev,
      readingShelf: [newItem, ...prev.readingShelf],
    }));
    showNotice('Item added to reading shelf');
  };

  const updateReadingItem = (id: string, updates: Partial<ReadingItem>) => {
    setData((prev) => ({
      ...prev,
      readingShelf: prev.readingShelf.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    }));
    showNotice('Reading item updated');
  };

  const deleteReadingItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      readingShelf: prev.readingShelf.filter((r) => r.id !== id),
    }));
    showNotice('Removed from reading shelf');
  };

  const addMilestone = (m: Partial<Milestone>) => {
    const newM: Milestone = {
      id: `m-${Date.now()}`,
      year: m.year || `${new Date().getFullYear()}`,
      title: m.title || 'Milestone',
      category: m.category || 'Quant & Code',
      description: m.description || '',
      metrics: m.metrics,
    };
    setData((prev) => ({
      ...prev,
      milestones: [newM, ...prev.milestones],
    }));
    showNotice('Milestone added');
  };

  const updateMilestone = (id: string, updates: Partial<Milestone>) => {
    setData((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    }));
    showNotice('Milestone updated');
  };

  const deleteMilestone = (id: string) => {
    setData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((m) => m.id !== id),
    }));
    showNotice('Milestone deleted');
  };

  const updateProfile = (updates: Partial<SiteProfile>) => {
    setData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...updates,
      },
    }));
    showNotice('Profile & picture saved');
  };

  const submitContactMessage = (msg: { name: string; email: string; subject: string; message: string }) => {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      ...msg,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      read: false,
    };
    setData((prev) => ({
      ...prev,
      messages: [newMsg, ...prev.messages],
    }));
    showNotice('Thank you! Your message was sent to Hafizudeen.');
  };

  const markMessageAsRead = (id: string) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.map((m) => (m.id === id ? { ...m, read: true } : m)),
    }));
  };

  const deleteMessage = (id: string) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.filter((m) => m.id !== id),
    }));
    showNotice('Message removed');
  };

  const exportDataJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hafizudeen-journal-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showNotice('Backup downloaded as JSON');
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile && Array.isArray(parsed.posts)) {
        setData(parsed);
        showNotice('Journal data restored successfully');
        return true;
      }
      throw new Error('Invalid format');
    } catch (e) {
      showNotice('Error importing backup: invalid JSON format');
      return false;
    }
  };

  const resetToDefaults = () => {
    setData(INITIAL_BLOG_DATA);
    localStorage.removeItem(STORAGE_KEY);
    showNotice('Reset journal to original curated notes and essays');
  };

  return (
    <BlogContext.Provider
      value={{
        data,
        activeView,
        setActiveView,
        selectedPost,
        setSelectedPost,
        activeStream,
        setActiveStream,
        user,
        isOwnerAuthenticated,
        loginWithGoogle,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        openAdminWithAuthCheck,
        createPost,
        updatePost,
        deletePost,
        togglePostStatus,
        addReadingItem,
        updateReadingItem,
        deleteReadingItem,
        addMilestone,
        updateMilestone,
        deleteMilestone,
        updateProfile,
        submitContactMessage,
        markMessageAsRead,
        deleteMessage,
        exportDataJson,
        importDataJson,
        resetToDefaults,
        notification,
        setNotification,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within BlogProvider');
  }
  return context;
}
