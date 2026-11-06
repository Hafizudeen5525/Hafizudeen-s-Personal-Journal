import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  BlogData, 
  Post, 
  ReadingItem, 
  Milestone, 
  SiteProfile, 
  ContactMessage, 
  PostStream, 
  AuthUser,
  PageCustomization,
  AnalyticsEvent
} from '../types/blog';
import { INITIAL_BLOG_DATA } from '../data/initialData';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  db,
  User as FirebaseUser
} from '../firebase';
import { doc, getDoc, setDoc, onSnapshot, collection, addDoc } from 'firebase/firestore';

const STORAGE_KEY = 'hafizudeen_quant_journal_cloud_cache_v1';
const FIRESTORE_DOC_PATH = 'site_content';
const FIRESTORE_MAIN_DOC = 'main';
export const OWNER_EMAIL = 'hafizudeen991022@gmail.com';

interface BlogContextType {
  data: BlogData;
  activeView: 'public' | 'admin';
  setActiveView: (view: 'public' | 'admin') => void;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
  activeStream: string;
  setActiveStream: (stream: string) => void;
  
  // Real Firebase Authentication & Admin Access Control
  user: AuthUser | null;
  firebaseUser: FirebaseUser | null;
  isOwnerAuthenticated: boolean;
  isAuthLoading: boolean;
  loginWithGoogleReal: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  openAdminWithAuthCheck: () => void;
  
  // Cloud Sync Status
  isCloudSynced: boolean;
  isSavingToCloud: boolean;
  cloudSyncError: string | null;
  saveDataToFirestore: (newData: BlogData) => Promise<boolean>;

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

  // Profile & Customization
  updateProfile: (updates: Partial<SiteProfile>) => void;
  updateCustomization: (updates: Partial<PageCustomization>) => void;
  
  // Contact messages
  submitContactMessage: (msg: { name: string; email: string; subject: string; message: string }) => void;
  markMessageAsRead: (id: string) => void;
  deleteMessage: (id: string) => void;

  // Analytics
  recordPageView: (page: string, postSlug?: string) => void;

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
  // Initialize with local cache or fallback initial data
  const [data, setData] = useState<BlogData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse cached blog data', e);
    }
    return INITIAL_BLOG_DATA;
  });

  const [activeView, setActiveView] = useState<'public' | 'admin'>('public');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [activeStream, setActiveStream] = useState<string>('All');
  const [notification, setNotification] = useState<string | null>(null);

  // Cloud Firestore Sync states
  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(false);
  const [isSavingToCloud, setIsSavingToCloud] = useState<boolean>(false);
  const [cloudSyncError, setCloudSyncError] = useState<string | null>(null);

  // Firebase Real Auth state
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const isOwnerAuthenticated = Boolean(
    user && 
    user.email.toLowerCase() === OWNER_EMAIL.toLowerCase() && 
    user.isOwner
  );

  // 1. Listen for real Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setIsAuthLoading(false);
      setFirebaseUser(fbUser);
      if (fbUser && fbUser.email) {
        const email = fbUser.email.toLowerCase();
        const isOwner = email === OWNER_EMAIL.toLowerCase();
        setUser({
          email: fbUser.email,
          name: fbUser.displayName || (isOwner ? data.profile.name : email.split('@')[0]),
          picture: fbUser.photoURL || undefined,
          isOwner,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [data.profile.name]);

  // 2. Real-time Cloud Firestore synchronization (Cross-device, multi-user persistence)
  useEffect(() => {
    const docRef = doc(db, FIRESTORE_DOC_PATH, FIRESTORE_MAIN_DOC);
    
    // Subscribe to live Firestore changes
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const cloudData = docSnap.data() as BlogData;
        if (cloudData && cloudData.profile && Array.isArray(cloudData.posts)) {
          setData(cloudData);
          setIsCloudSynced(true);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
          } catch (e) {
            // ignore
          }
        }
      } else {
        // If document doesn't exist in Firestore yet, seed it with INITIAL_BLOG_DATA
        setDoc(docRef, INITIAL_BLOG_DATA).then(() => {
          setIsCloudSynced(true);
        }).catch((err) => {
          console.warn('Initial cloud seed failed or rules pending:', err);
        });
      }
    }, (error) => {
      console.warn('Firestore onSnapshot notice:', error.message);
      setCloudSyncError(error.message);
    });

    return () => unsubscribe();
  }, []);

  // Update local storage cache whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to local cache', e);
    }
  }, [data]);

  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  const showNotice = (msg: string) => {
    setNotification(msg);
  };

  // Helper to persist data to Firestore
  const saveDataToFirestore = async (newData: BlogData): Promise<boolean> => {
    setIsSavingToCloud(true);
    setCloudSyncError(null);
    try {
      const docRef = doc(db, FIRESTORE_DOC_PATH, FIRESTORE_MAIN_DOC);
      await setDoc(docRef, newData);
      setIsSavingToCloud(false);
      setIsCloudSynced(true);
      return true;
    } catch (err: any) {
      console.error('Error persisting to Firestore:', err);
      setIsSavingToCloud(false);
      setCloudSyncError(err?.message || 'Failed to sync with cloud');
      return false;
    }
  };

  // Real Google Sign-in with Popup
  const loginWithGoogleReal = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsAuthLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const loggedUser = result.user;
      const email = (loggedUser.email || '').toLowerCase().trim();
      const isOwner = email === OWNER_EMAIL.toLowerCase();

      setUser({
        email: loggedUser.email || '',
        name: loggedUser.displayName || (isOwner ? data.profile.name : email.split('@')[0]),
        picture: loggedUser.photoURL || undefined,
        isOwner,
      });

      setIsAuthLoading(false);

      if (isOwner) {
        showNotice(`Welcome, ${loggedUser.displayName || 'Owner'}. Real Google verification confirmed.`);
        setIsAuthModalOpen(false);
        setActiveView('admin');
        return { success: true };
      } else {
        showNotice(`Signed in as ${loggedUser.email}. Access restricted to ${OWNER_EMAIL}.`);
        return { 
          success: false, 
          error: `Google account ${loggedUser.email} is not authorized. Only ${OWNER_EMAIL} can access site administration.` 
        };
      }
    } catch (err: any) {
      setIsAuthLoading(false);
      console.error('Google Sign-in error:', err);
      const errMsg = err?.message || 'Google authentication was cancelled or blocked.';
      return { success: false, error: errMsg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      if (activeView === 'admin') {
        setActiveView('public');
      }
      showNotice('Signed out of Google account.');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const openAdminWithAuthCheck = () => {
    if (isOwnerAuthenticated) {
      setActiveView('admin');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  // Post Operations with Firestore persistence
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
      coverImage: postData.coverImage,
      coverImageCaption: postData.coverImageCaption,
      gallery: postData.gallery,
    };

    const nextData: BlogData = {
      ...data,
      posts: [newPost, ...data.posts],
    };

    setData(nextData);
    saveDataToFirestore(nextData);
    showNotice(`Created "${newPost.title}" and saved to cloud.`);
    return newPost;
  };

  const updatePost = (id: string, updates: Partial<Post>) => {
    const nextData: BlogData = {
      ...data,
      posts: data.posts.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    };
    setData(nextData);
    saveDataToFirestore(nextData);
    showNotice('Post updated and synced globally.');
  };

  const deletePost = (id: string) => {
    const nextData: BlogData = {
      ...data,
      posts: data.posts.filter((p) => p.id !== id),
    };
    setData(nextData);
    saveDataToFirestore(nextData);
    showNotice('Post removed from cloud database.');
  };

  const togglePostStatus = (id: string) => {
    const nextData: BlogData = {
      ...data,
      posts: data.posts.map((p) =>
        p.id === id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p
      ),
    };
    setData(nextData);
    saveDataToFirestore(nextData);
    showNotice('Post publication status updated.');
  };

  // Reading Shelf Operations
  const addReadingItem = (item: Partial<ReadingItem>) => {
    const newItem: ReadingItem = {
      id: `item-${Date.now()}`,
      title: item.title || 'Untitled',
      author: item.author || 'Unknown',
      type: item.type || 'Paper',
      url: item.url || '#',
      status: item.status || 'Recommended',
      notes: item.notes || '',
      rating: item.rating || 5,
      dateAdded: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      streamCategory: item.streamCategory || 'Math & Quants',
    };
    const nextData: BlogData = {
      ...data,
      readingShelf: [newItem, ...data.readingShelf],
    };
    setData(nextData);
    saveDataToFirestore(nextData);
    showNotice('Reading item added to shelf.');
  };

  const updateReadingItem = (id: string, updates: Partial<ReadingItem>) => {
    const nextData: BlogData = {
      ...data,
      readingShelf: data.readingShelf.map((it) => (it.id === id ? { ...it, ...updates } : it)),
    };
    setData(nextData);
    saveDataToFirestore(nextData);
    showNotice('Reading shelf entry updated.');
  };

  const deleteReadingItem = (id: string) => {
    const nextData: BlogData = {
      ...data,
      readingShelf: data.readingShelf.filter((it) => it.id !== id),
    };
    setData(nextData);
    saveDataToFirestore(nextData);
    showNotice('Reading item removed.');
  };

  // Milestones Operations
  const addMilestone = (m: Partial<Milestone>) => {
    const newM: Milestone = {
      id: `m-${Date.now()}`,
      year: m.year || `${new Date().getFullYear()}`,
      title: m.title || 'New Milestone',
      category: m.category || 'Academic',
      description: m.description || '',
      metrics: m.metrics,
    };
    const nextData: BlogData = {
      ...data,
      milestones: [newM, ...data.milestones],
    };
    setData(nextData);
    saveDataToFirestore(nextData);
    showNotice('Milestone added.');
  };

  const updateMilestone = (id: string, updates: Partial<Milestone>) => {
    const nextData: BlogData = {
      ...data,
      milestones: data.milestones.map((it) => (it.id === id ? { ...it, ...updates } : it)),
    };
    setData(nextData);
    saveDataToFirestore(nextData);
    showNotice('Milestone updated.');
  };

  const deleteMilestone = (id: string) => {
    const nextData: BlogData = {
      ...data,
      milestones: data.milestones.filter((it) => it.id !== id),
    };
    setData(nextData);
    saveDataToFirestore(nextData);
    showNotice('Milestone removed.');
  };

  // Profile & Customization
  const updateProfile = (updates: Partial<SiteProfile>) => {
    const nextData: BlogData = {
      ...data,
      profile: {
        ...data.profile,
        ...updates,
      },
    };
    setData(nextData);
    saveDataToFirestore(nextData);
    showNotice('Profile updated and saved to cloud.');
  };

  const updateCustomization = (updates: Partial<PageCustomization>) => {
    const nextData: BlogData = {
      ...data,
      customization: {
        ...(data.customization || {
          themeColor: 'collegiate',
          heroHeadline: 'What does it mean for a model to be right?',
          heroSubtext: 'Exploring the foundations of quantitative finance, market microstructure, and stochastic analysis.',
          heroKicker: 'Hafizudeen Saman · Mathematical Finance & Quant Research',
          showEquationsOnHero: true,
          showPhotoGalleryOnHero: true,
          fontScale: 'normal',
        }),
        ...updates,
      },
    };
    setData(nextData);
    saveDataToFirestore(nextData);
    showNotice('Page customization saved.');
  };

  // Contact messages
  const submitContactMessage = (msg: { name: string; email: string; subject: string; message: string }) => {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      read: false,
    };
    const nextData: BlogData = {
      ...data,
      messages: [newMsg, ...data.messages],
    };
    setData(nextData);
    saveDataToFirestore(nextData);
    showNotice('Your message was sent successfully.');

    // Also record message to Firestore messages collection for independent auditing
    try {
      addDoc(collection(db, 'messages'), newMsg);
    } catch (e) {
      // ignore
    }
  };

  const markMessageAsRead = (id: string) => {
    const nextData: BlogData = {
      ...data,
      messages: data.messages.map((m) => (m.id === id ? { ...m, read: true } : m)),
    };
    setData(nextData);
    saveDataToFirestore(nextData);
  };

  const deleteMessage = (id: string) => {
    const nextData: BlogData = {
      ...data,
      messages: data.messages.filter((m) => m.id !== id),
    };
    setData(nextData);
    saveDataToFirestore(nextData);
    showNotice('Message removed.');
  };

  // Analytics
  const recordPageView = (page: string, postSlug?: string) => {
    const ev: AnalyticsEvent = {
      id: `ev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: Date.now(),
      page,
      postSlug,
      device: typeof navigator !== 'undefined' ? (navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop') : 'Web',
      dateStr: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };

    const currentAnalytics = data.analytics || [];
    // Keep last 150 events
    const updatedAnalytics = [ev, ...currentAnalytics.slice(0, 149)];
    const nextData: BlogData = {
      ...data,
      analytics: updatedAnalytics,
    };
    setData(nextData);

    // Write event to Firestore analytics collection silently
    try {
      addDoc(collection(db, 'analytics'), ev).catch(() => {});
    } catch (e) {
      // ignore
    }
  };

  const exportDataJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hafizudeen-journal-cloud-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showNotice('Backup downloaded as JSON.');
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile && Array.isArray(parsed.posts)) {
        setData(parsed);
        saveDataToFirestore(parsed);
        showNotice('Journal data restored and synced with Cloud Firestore.');
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
    saveDataToFirestore(INITIAL_BLOG_DATA);
    showNotice('Reset journal to original curated notes and synced to Cloud.');
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
        firebaseUser,
        isOwnerAuthenticated,
        isAuthLoading,
        loginWithGoogleReal,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        openAdminWithAuthCheck,
        isCloudSynced,
        isSavingToCloud,
        cloudSyncError,
        saveDataToFirestore,
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
        updateCustomization,
        submitContactMessage,
        markMessageAsRead,
        deleteMessage,
        recordPageView,
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
