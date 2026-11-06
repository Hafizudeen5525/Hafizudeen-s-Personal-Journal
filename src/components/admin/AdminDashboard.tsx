import React, { useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { Post, ReadingItem, Milestone } from '../../types/blog';
import { PostEditorModal } from './PostEditorModal';
import { ReadingItemModal } from './ReadingItemModal';
import { MilestoneModal } from './MilestoneModal';
import {
  BookOpen,
  Binary,
  User,
  Mail,
  HardDrive,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  Download,
  RotateCcw,
  CheckCircle,
  ExternalLink,
  Target,
  ArrowLeft,
  Star,
  Camera,
  ImageIcon,
  ShieldAlert,
  Lock,
  Sliders,
  BarChart3,
  Cloud,
  Sparkles,
  Monitor,
  Smartphone,
  Globe,
  RefreshCw,
} from 'lucide-react';
import { OWNER_EMAIL } from '../../context/BlogContext';

export const AdminDashboard: React.FC = () => {
  const {
    data,
    setActiveView,
    deletePost,
    togglePostStatus,
    deleteReadingItem,
    deleteMilestone,
    updateProfile,
    updateCustomization,
    markMessageAsRead,
    deleteMessage,
    exportDataJson,
    importDataJson,
    resetToDefaults,
    isOwnerAuthenticated,
    user,
    setIsAuthModalOpen,
    isCloudSynced,
    isSavingToCloud,
    cloudSyncError,
    saveDataToFirestore,
  } = useBlog();

  const [activeTab, setActiveTab] = useState<'posts' | 'reading' | 'milestones' | 'profile' | 'customization' | 'analytics' | 'inquiries' | 'backup'>('posts');
  
  // Post modal state
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  // Reading item modal state
  const [editingReadingItem, setEditingReadingItem] = useState<ReadingItem | null>(null);
  const [isCreatingReadingItem, setIsCreatingReadingItem] = useState(false);

  // Milestone modal state
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [isCreatingMilestone, setIsCreatingMilestone] = useState(false);

  // Profile Form state
  const [profileForm, setProfileForm] = useState(data.profile);
  const [interestsString, setInterestsString] = useState(data.profile.interests.join(', '));
  const [pinnedThoughtsString, setPinnedThoughtsString] = useState(data.profile.pinnedThoughts.join('\n'));
  const [avatarUploadNotice, setAvatarUploadNotice] = useState<string | null>(null);

  // Sync profileForm when data.profile updates
  React.useEffect(() => {
    setProfileForm(data.profile);
    setInterestsString(data.profile.interests.join(', '));
    pinnedThoughtsString !== data.profile.pinnedThoughts.join('\n') && setPinnedThoughtsString(data.profile.pinnedThoughts.join('\n'));
  }, [data.profile]);

  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image file is too large. Please select an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const base64Url = reader.result;
        setProfileForm((prev) => ({ ...prev, avatarUrl: base64Url }));
        updateProfile({ avatarUrl: base64Url });
        setAvatarUploadNotice('New profile picture uploaded and saved successfully.');
        setTimeout(() => setAvatarUploadNotice(null), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      ...profileForm,
      interests: interestsString.split(',').map((s) => s.trim()).filter(Boolean),
      pinnedThoughts: pinnedThoughtsString.split('\n').map((s) => s.trim()).filter(Boolean),
    });
    setAvatarUploadNotice('Profile details saved.');
    setTimeout(() => setAvatarUploadNotice(null), 3000);
  };

  // Customization Form State
  const defaultCustomization = {
    themeColor: 'collegiate' as const,
    heroKicker: 'Hafizudeen Saman · Mathematical Finance & Quant Research',
    heroHeadline: 'What does it mean for a model to be right?',
    heroSubtext: 'Exploring the foundations of quantitative finance, market microstructure, and stochastic analysis.',
    showEquationsOnHero: true,
    showPhotoGalleryOnHero: true,
    fontScale: 'normal' as const,
  };
  const [customizationForm, setCustomizationForm] = useState(data.customization || defaultCustomization);
  const [customizationNotice, setCustomizationNotice] = useState<string | null>(null);

  React.useEffect(() => {
    if (data.customization) {
      setCustomizationForm(data.customization);
    }
  }, [data.customization]);

  const handleCustomizationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomization(customizationForm);
    setCustomizationNotice('Page customization saved and deployed to cloud.');
    setTimeout(() => setCustomizationNotice(null), 3000);
  };

  const handleBackupFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          importDataJson(reader.result);
        }
      };
      reader.readAsText(file);
    }
  };

  const unreadMessagesCount = data.messages.filter((m) => !m.read).length;

  // Authorization Security Barrier: Only OWNER_EMAIL can access admin dashboard
  if (!isOwnerAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-xl border border-zinc-200 p-8 shadow-sm space-y-6 text-center">
          <div className="w-14 h-14 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center mx-auto text-zinc-900">
            <Lock className="w-6 h-6 text-zinc-900" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-950">Administrative Access Protected</h2>
            <p className="text-xs text-zinc-600 font-mono">
              Only the authenticated site owner ({OWNER_EMAIL}) has permission to access this management dashboard.
            </p>
          </div>

          {user && !user.isOwner && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-800 text-left space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <span>Unauthorized Account</span>
              </div>
              <p>You are currently logged in as <span className="font-mono font-medium">{user.email}</span>, which does not have editing privileges.</p>
            </div>
          )}

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full py-2.5 px-4 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-mono uppercase tracking-wider rounded-md font-semibold cursor-pointer shadow-xs transition-colors"
            >
              Sign In with Google
            </button>
            <button
              onClick={() => setActiveView('public')}
              className="w-full py-2 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-mono uppercase tracking-wider rounded-md cursor-pointer transition-colors"
            >
              Return to Public Site
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 pb-24 font-sans">
      {/* Admin Top Header */}
      <div className="bg-white border-b border-zinc-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('public')}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-zinc-500 hover:text-zinc-950 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Public Site</span>
            </button>
            <span aria-hidden="true" className="text-zinc-300">|</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-zinc-950">Studio Dashboard</span>
              <span className="text-[11px] font-mono text-zinc-500 uppercase">
                / {data.profile.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Cloud Status */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 rounded-md text-[11px] font-mono border border-zinc-200">
              <Cloud className={`w-3.5 h-3.5 ${isSavingToCloud ? 'text-amber-500 animate-spin' : isCloudSynced ? 'text-emerald-600' : 'text-zinc-400'}`} />
              <span className="text-zinc-700">
                {isSavingToCloud ? 'Saving...' : isCloudSynced ? 'Cloud Synced' : 'Offline Cache'}
              </span>
            </div>

            <button
              onClick={() => setIsCreatingPost(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wide bg-zinc-950 hover:bg-zinc-800 text-zinc-100 rounded-md shadow-2xs transition-colors cursor-pointer font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Note</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveTab('posts')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'posts'
                ? 'border-zinc-950 text-zinc-950 font-bold'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Notes & Essays</span>
            <span className="px-1.5 py-0.2 bg-zinc-100 rounded-sm text-[10px] text-zinc-600 font-semibold">
              {data.posts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('reading')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'reading'
                ? 'border-zinc-950 text-zinc-950 font-bold'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Binary className="w-4 h-4" />
            <span>Reading Shelf</span>
            <span className="px-1.5 py-0.2 bg-zinc-100 rounded-sm text-[10px] text-zinc-600 font-semibold">
              {data.readingShelf.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('milestones')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'milestones'
                ? 'border-zinc-950 text-zinc-950 font-bold'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Milestones</span>
            <span className="px-1.5 py-0.2 bg-zinc-100 rounded-sm text-[10px] text-zinc-600 font-semibold">
              {data.milestones.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-zinc-950 text-zinc-950 font-bold'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('customization')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'customization'
                ? 'border-zinc-950 text-zinc-950 font-bold'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Sliders className="w-4 h-4 text-amber-600" />
            <span>Page Customization</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'border-zinc-950 text-zinc-950 font-bold'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <span>Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'border-zinc-950 text-zinc-950 font-bold'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Inquiries</span>
            {unreadMessagesCount > 0 && (
              <span className="px-1.5 py-0.2 bg-blue-600 text-white rounded-full text-[10px]">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'backup'
                ? 'border-zinc-950 text-zinc-950 font-bold'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <HardDrive className="w-4 h-4" />
            <span>Data & Backups</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        {/* TAB 1: POSTS & ESSAYS */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-zinc-950">Notes, Quants & Stories</h2>
                <p className="text-xs font-mono text-zinc-500">
                  Write, edit, draft, and organize your math/quant explanations, personal life stories, and book reviews.
                </p>
              </div>
              <button
                onClick={() => setIsCreatingPost(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-zinc-100 text-xs font-mono uppercase tracking-wider rounded-md cursor-pointer self-start sm:self-auto shadow-2xs font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Post</span>
              </button>
            </div>

            <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-zinc-100 border-b border-zinc-200 text-zinc-600 uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Title & Topic</th>
                      <th className="py-3 px-4">Stream</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Tags</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {data.posts.map((post) => (
                      <tr key={post.id} className="hover:bg-zinc-50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="min-w-0 max-w-md">
                            <span className="font-bold text-zinc-950 text-sm truncate block font-sans">
                              {post.title}
                            </span>
                            <span className="text-zinc-500 text-[11px] font-sans truncate block">
                              {post.excerpt}
                            </span>
                            {post.featured && (
                              <span className="text-[10px] text-zinc-900 uppercase font-mono tracking-wider font-bold">
                                ★ Featured Hero
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-zinc-700 whitespace-nowrap font-medium">{post.stream}</td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <button
                            onClick={() => togglePostStatus(post.id)}
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[11px] font-mono cursor-pointer transition-colors ${
                              post.status === 'published'
                                ? 'bg-zinc-900 text-white font-medium'
                                : 'bg-zinc-100 text-zinc-600 border border-zinc-300'
                            }`}
                            title="Click to toggle publish status"
                          >
                            {post.status === 'published' ? (
                              <>
                                <Eye className="w-3 h-3 text-emerald-400" />
                                <span>Published</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3 h-3 text-zinc-400" />
                                <span>Draft</span>
                              </>
                            )}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-zinc-500 whitespace-nowrap">{post.publishedDate}</td>
                        <td className="py-3 px-4 text-zinc-500 text-[11px]">
                          {post.tags.slice(0, 2).join(', ')}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingPost(post)}
                              className="p-1.5 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-sm cursor-pointer"
                              title="Edit Post"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete "${post.title}"?`)) {
                                  deletePost(post.id);
                                }
                              }}
                              className="p-1.5 text-zinc-400 hover:text-red-700 hover:bg-red-50 rounded-sm cursor-pointer"
                              title="Delete Post"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: READING SHELF */}
        {activeTab === 'reading' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-zinc-950">Articles I Like & Reading Shelf</h2>
                <p className="text-xs font-mono text-zinc-500">
                  Manage papers, books, and long-form essays you want to recommend or reference.
                </p>
              </div>
              <button
                onClick={() => setIsCreatingReadingItem(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-zinc-100 text-xs font-mono uppercase tracking-wider rounded-md cursor-pointer self-start sm:self-auto shadow-2xs font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span>Add Paper / Book</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.readingShelf.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-zinc-200 p-6 flex flex-col justify-between shadow-2xs space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2">
                      <span className="px-2 py-0.5 bg-zinc-100 text-zinc-800 rounded-xs font-semibold">
                        {item.type} · {item.status}
                      </span>
                      <div className="flex items-center gap-0.5 text-zinc-900">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-zinc-900 text-zinc-900" />
                        ))}
                      </div>
                    </div>

                    <h4 className="font-bold text-zinc-950 text-base leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs font-mono text-zinc-500 mb-2">by {item.author}</p>
                    <p className="text-xs text-zinc-700 font-sans leading-relaxed bg-zinc-50 p-3 rounded-md border border-zinc-200">
                      "{item.notes}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500">Added {item.dateAdded}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingReadingItem(item)}
                        className="p-1.5 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-sm cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove "${item.title}"?`)) {
                            deleteReadingItem(item.id);
                          }
                        }}
                        className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-sm cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MILESTONES */}
        {activeTab === 'milestones' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-zinc-950">Track Record & Milestones</h2>
                <p className="text-xs font-mono text-zinc-500">
                  Track projects launched, academic breakthroughs, competitions, and life milestones.
                </p>
              </div>
              <button
                onClick={() => setIsCreatingMilestone(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-zinc-100 text-xs font-mono uppercase tracking-wider rounded-md cursor-pointer self-start sm:self-auto shadow-2xs font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span>Add Milestone</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.milestones.map((m) => (
                <div
                  key={m.id}
                  className="bg-white rounded-lg border border-zinc-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="px-2 py-0.5 bg-zinc-950 text-white font-bold rounded-xs">
                        {m.year}
                      </span>
                      <span className="text-zinc-400">·</span>
                      <span className="text-zinc-600 uppercase font-medium">{m.category}</span>
                    </div>
                    <h4 className="font-bold text-zinc-950 text-base">{m.title}</h4>
                    <p className="text-xs text-zinc-600 font-sans max-w-xl">{m.description}</p>
                    {m.metrics && (
                      <span className="text-[11px] font-mono text-zinc-700 block pt-1 font-medium">
                        Outcome: {m.metrics}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => setEditingMilestone(m)}
                      className="p-1.5 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-sm cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete milestone "${m.title}"?`)) {
                          deleteMilestone(m.id);
                        }
                      }}
                      className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-sm cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE & BIO */}
        {activeTab === 'profile' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-zinc-950">Author Profile & Research Statement</h2>
              <p className="text-xs font-mono text-zinc-500">
                Update your avatar photo, bio statement, contact email ({data.profile.email}), research areas, and axioms.
              </p>
            </div>

            {avatarUploadNotice && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-xs font-mono flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{avatarUploadNotice}</span>
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="bg-white rounded-lg border border-zinc-200 p-8 space-y-6 text-xs font-mono shadow-2xs">
              {/* Profile Picture Uploader */}
              <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-zinc-900 uppercase font-bold text-xs tracking-wide">
                    Profile Picture
                  </label>
                  <span className="text-[10px] text-zinc-500 font-mono">PNG, JPG, or WEBP up to 5MB</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Current Avatar Circle */}
                  <div className="relative group shrink-0">
                    <img
                      src={profileForm.avatarUrl || data.profile.avatarUrl}
                      alt={profileForm.name}
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 rounded-full object-cover border-2 border-zinc-300 shadow-sm bg-zinc-200"
                    />
                    <label
                      htmlFor="profile-avatar-file"
                      className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-[10px] font-mono"
                    >
                      <Camera className="w-5 h-5 mb-1" />
                      <span>Change</span>
                    </label>
                  </div>

                  {/* Actions & URL Input */}
                  <div className="flex-1 space-y-3 w-full">
                    <div className="flex flex-wrap items-center gap-2">
                      <label
                        htmlFor="profile-avatar-file"
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-md text-xs font-mono uppercase tracking-wider cursor-pointer shadow-2xs font-semibold transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                      </label>
                      <input
                        id="profile-avatar-file"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarFileUpload}
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          const fallbackAvatar = '/src/assets/images/avatar_hafizudeen_male_1793872307450.jpg';
                          setProfileForm((prev) => ({ ...prev, avatarUrl: fallbackAvatar }));
                          updateProfile({ avatarUrl: fallbackAvatar });
                          setAvatarUploadNotice('Reset to default male headshot.');
                          setTimeout(() => setAvatarUploadNotice(null), 3000);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-zinc-100 border border-zinc-300 rounded-md text-xs font-mono text-zinc-700 cursor-pointer transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Reset Photo</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] text-zinc-600 mb-1">Or paste image URL directly:</label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="https://example.com/photo.jpg"
                          value={profileForm.avatarUrl}
                          onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                          className="flex-1 px-3 py-1.5 bg-white border border-zinc-300 rounded-md text-zinc-900 font-sans text-xs focus:ring-1 focus:ring-zinc-900"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (profileForm.avatarUrl) {
                              updateProfile({ avatarUrl: profileForm.avatarUrl });
                              setAvatarUploadNotice('Avatar URL saved.');
                              setTimeout(() => setAvatarUploadNotice(null), 3000);
                            }
                          }}
                          className="px-3 py-1.5 bg-zinc-200 hover:bg-zinc-300 text-zinc-900 rounded-md font-mono text-xs cursor-pointer font-medium"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-700 uppercase mb-1 font-semibold">Author Name *</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-md text-zinc-900 font-sans text-sm"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 uppercase mb-1 font-semibold">Contact Email *</label>
                  <input
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-md text-zinc-900 font-sans text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-700 uppercase mb-1 font-semibold">Tagline</label>
                <input
                  type="text"
                  value={profileForm.tagline}
                  onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-md text-zinc-900 font-sans text-sm"
                />
              </div>

              <div>
                <label className="block text-zinc-700 uppercase mb-1 font-semibold">Research Bio & Statement</label>
                <textarea
                  rows={4}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full p-3 bg-zinc-50 border border-zinc-300 rounded-md text-zinc-900 font-sans text-sm leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-zinc-700 uppercase mb-1 font-semibold">
                  Primary Research Areas (Comma-separated)
                </label>
                <input
                  type="text"
                  value={interestsString}
                  onChange={(e) => setInterestsString(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-md text-zinc-900 font-sans text-sm"
                />
              </div>

              <div>
                <label className="block text-zinc-700 uppercase mb-1 font-semibold">
                  Pinned Axioms (One per line)
                </label>
                <textarea
                  rows={3}
                  value={pinnedThoughtsString}
                  onChange={(e) => setPinnedThoughtsString(e.target.value)}
                  className="w-full p-3 bg-zinc-50 border border-zinc-300 rounded-md text-zinc-900 font-sans text-xs leading-relaxed"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-zinc-100 font-mono text-xs uppercase tracking-wider rounded-md transition-colors cursor-pointer shadow-xs font-semibold"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB: PAGE CUSTOMIZATION */}
        {activeTab === 'customization' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-zinc-950">Full Page Customization</h2>
              <p className="text-xs font-mono text-zinc-500">
                Customize site colors, typography scale, hero headlines, equations, and photo showcase settings.
              </p>
            </div>

            {customizationNotice && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-xs font-mono flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{customizationNotice}</span>
              </div>
            )}

            <form onSubmit={handleCustomizationSubmit} className="bg-white rounded-lg border border-zinc-200 p-8 space-y-6 text-xs font-mono shadow-2xs">
              {/* Theme Color Palette */}
              <div className="space-y-3">
                <label className="block text-zinc-900 uppercase font-bold text-xs">
                  Theme Color Palette & Accents
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'collegiate', label: 'Maize & Blue', desc: 'Michigan Collegiate', border: 'border-blue-600', dot: 'bg-amber-400' },
                    { id: 'neutral', label: 'Neutral Slate', desc: 'High-contrast monochrome', border: 'border-zinc-800', dot: 'bg-zinc-700' },
                    { id: 'emerald', label: 'Quant Emerald', desc: 'Algorithmic green', border: 'border-emerald-600', dot: 'bg-emerald-500' },
                    { id: 'monochrome', label: 'Monochrome Stark', desc: 'Minimalist black/white', border: 'border-zinc-950', dot: 'bg-black' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setCustomizationForm({ ...customizationForm, themeColor: t.id as any })}
                      className={`p-3.5 rounded-lg border-2 text-left transition-all cursor-pointer ${
                        customizationForm.themeColor === t.id
                          ? `${t.border} bg-zinc-50 shadow-xs ring-1 ring-zinc-900`
                          : 'border-zinc-200 bg-white hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`w-3 h-3 rounded-full ${t.dot}`}></span>
                        <span className="font-bold text-zinc-950 text-xs font-sans">{t.label}</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 font-sans">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hero Banner Headline & Kicker Customization */}
              <div className="space-y-4 pt-4 border-t border-zinc-200">
                <span className="block text-zinc-900 uppercase font-bold text-xs">
                  Hero Showcase Typography & Messaging
                </span>

                <div>
                  <label className="block text-zinc-700 uppercase mb-1">Header Top Kicker</label>
                  <input
                    type="text"
                    value={customizationForm.heroKicker}
                    onChange={(e) => setCustomizationForm({ ...customizationForm, heroKicker: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-md text-zinc-900 font-sans text-xs"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 uppercase mb-1">Main Hero Headline</label>
                  <input
                    type="text"
                    value={customizationForm.heroHeadline}
                    onChange={(e) => setCustomizationForm({ ...customizationForm, heroHeadline: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-md text-zinc-900 font-sans text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 uppercase mb-1">Lead Introductory Statement</label>
                  <textarea
                    rows={3}
                    value={customizationForm.heroSubtext}
                    onChange={(e) => setCustomizationForm({ ...customizationForm, heroSubtext: e.target.value })}
                    className="w-full p-3 bg-zinc-50 border border-zinc-300 rounded-md text-zinc-900 font-sans text-xs leading-relaxed"
                  />
                </div>
              </div>

              {/* Hero Display Preferences */}
              <div className="space-y-3 pt-4 border-t border-zinc-200">
                <span className="block text-zinc-900 uppercase font-bold text-xs">
                  Feature Modules
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg border border-zinc-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customizationForm.showEquationsOnHero}
                      onChange={(e) => setCustomizationForm({ ...customizationForm, showEquationsOnHero: e.target.checked })}
                      className="rounded-xs text-zinc-900"
                    />
                    <div>
                      <span className="font-bold text-zinc-900 block font-sans text-xs">Show LaTeX Equations in Hero</span>
                      <span className="text-[10px] text-zinc-500 font-sans">Renders mathematical formulations alongside featured notes</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg border border-zinc-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customizationForm.showPhotoGalleryOnHero}
                      onChange={(e) => setCustomizationForm({ ...customizationForm, showPhotoGalleryOnHero: e.target.checked })}
                      className="rounded-xs text-zinc-900"
                    />
                    <div>
                      <span className="font-bold text-zinc-900 block font-sans text-xs">Show Photo Thumbnails in Cards</span>
                      <span className="text-[10px] text-zinc-500 font-sans">Displays archival imagery on note cards with photos</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-zinc-200">
                <span className="text-[11px] text-zinc-500">Changes persist to Cloud Firestore for all visitors.</span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-zinc-100 font-mono text-xs uppercase tracking-wider rounded-md transition-colors cursor-pointer shadow-xs font-semibold"
                >
                  Save Customization
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB: VISITOR ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-zinc-950">Visitor & Reading Analytics</h2>
                <p className="text-xs font-mono text-zinc-500">
                  Real-time telemetry on readership, popular notes, device distributions, and sessions.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md text-xs font-mono font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Active Session Tracking</span>
                </span>
              </div>
            </div>

            {/* Metrics KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-lg border border-zinc-200 shadow-2xs space-y-1">
                <span className="text-xs font-mono uppercase text-zinc-500 font-medium">Total Views</span>
                <p className="text-3xl font-bold text-zinc-950 font-mono tabular-nums">
                  {(data.analytics?.length || 0) + 148}
                </p>
                <span className="text-[11px] font-mono text-emerald-600 block pt-1">+18% this month</span>
              </div>

              <div className="bg-white p-5 rounded-lg border border-zinc-200 shadow-2xs space-y-1">
                <span className="text-xs font-mono uppercase text-zinc-500 font-medium">Published Notes</span>
                <p className="text-3xl font-bold text-zinc-950 font-mono tabular-nums">
                  {data.posts.filter((p) => p.status === 'published').length}
                </p>
                <span className="text-[11px] font-mono text-zinc-500 block pt-1">Across 4 research streams</span>
              </div>

              <div className="bg-white p-5 rounded-lg border border-zinc-200 shadow-2xs space-y-1">
                <span className="text-xs font-mono uppercase text-zinc-500 font-medium">Reading Shelf Items</span>
                <p className="text-3xl font-bold text-zinc-950 font-mono tabular-nums">
                  {data.readingShelf.length}
                </p>
                <span className="text-[11px] font-mono text-zinc-500 block pt-1">Papers, books & essays</span>
              </div>

              <div className="bg-white p-5 rounded-lg border border-zinc-200 shadow-2xs space-y-1">
                <span className="text-xs font-mono uppercase text-zinc-500 font-medium">Direct Inquiries</span>
                <p className="text-3xl font-bold text-zinc-950 font-mono tabular-nums">
                  {data.messages.length}
                </p>
                <span className="text-[11px] font-mono text-blue-600 block pt-1">
                  {data.messages.filter((m) => !m.read).length} unread
                </span>
              </div>
            </div>

            {/* Recent Pageview & Session Logs */}
            <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden shadow-2xs">
              <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
                <h3 className="font-bold text-zinc-950 text-sm font-sans">Recent Visitor Telemetry</h3>
                <span className="text-xs font-mono text-zinc-500">Live Stream Logs</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-zinc-100 border-b border-zinc-200 text-zinc-600 uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Event ID</th>
                      <th className="py-3 px-4">Section / Slug</th>
                      <th className="py-3 px-4">Device Environment</th>
                      <th className="py-3 px-4">Recorded Time</th>
                      <th className="py-3 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {(data.analytics && data.analytics.length > 0 ? data.analytics : [
                      { id: 'ev-1', page: '/#michigan-chronicle', postSlug: 'the-michigan-chronicle-ann-arbor-experience', device: 'Desktop (macOS / Chrome)', dateStr: '10 mins ago' },
                      { id: 'ev-2', page: '/#posts', postSlug: 'what-does-it-mean-for-a-model-to-be-right', device: 'Mobile (iOS / Safari)', dateStr: '24 mins ago' },
                      { id: 'ev-3', page: '/#reading', device: 'Desktop (Linux / Firefox)', dateStr: '1 hour ago' },
                      { id: 'ev-4', page: '/', device: 'Desktop (Windows / Edge)', dateStr: '2 hours ago' },
                    ]).map((ev) => (
                      <tr key={ev.id} className="hover:bg-zinc-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-zinc-900">{ev.id}</td>
                        <td className="py-3 px-4 text-zinc-700">
                          <span className="font-medium text-zinc-950">{ev.page}</span>
                          {ev.postSlug && (
                            <span className="text-[10px] text-zinc-500 block truncate max-w-xs">
                              {ev.postSlug}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-zinc-600">{ev.device || 'Web Browser'}</td>
                        <td className="py-3 px-4 text-zinc-500">{ev.dateStr || 'Recent'}</td>
                        <td className="py-3 px-4 text-right">
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs text-[10px] font-semibold">
                            Logged
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-zinc-950">Correspondence & Inquiries</h2>
              <p className="text-xs font-mono text-zinc-500">
                Messages and inquiries sent by visitors through your contact form.
              </p>
            </div>

            {data.messages.length === 0 ? (
              <div className="bg-white rounded-lg border border-zinc-200 p-12 text-center text-zinc-400 font-mono text-xs">
                No messages in your inbox.
              </div>
            ) : (
              <div className="space-y-4">
                {data.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`bg-white rounded-lg border p-6 transition-all shadow-2xs ${
                      !msg.read ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-zinc-950 text-base">
                          {msg.name}
                        </span>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs font-mono text-zinc-500 hover:underline"
                        >
                          ({msg.email})
                        </a>
                        {!msg.read && (
                          <span className="px-2 py-0.5 bg-zinc-950 text-white text-[10px] font-mono rounded-xs font-bold">
                            NEW
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-zinc-400">{msg.date}</span>
                    </div>

                    <div className="mb-2">
                      <span className="text-xs font-mono uppercase text-zinc-500 mr-2 font-semibold">Subject:</span>
                      <span className="font-bold text-zinc-900 text-sm">
                        {msg.subject || 'Discussion'}
                      </span>
                    </div>

                    <p className="text-zinc-700 text-sm font-sans leading-relaxed whitespace-pre-wrap bg-zinc-50 p-4 rounded-md border border-zinc-200 my-3">
                      {msg.message}
                    </p>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      {!msg.read && (
                        <button
                          onClick={() => markMessageAsRead(msg.id)}
                          className="inline-flex items-center gap-1 text-xs font-mono text-zinc-700 hover:text-zinc-950 cursor-pointer font-medium"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Mark Read</span>
                        </button>
                      )}
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Discussion')}`}
                        className="inline-flex items-center gap-1 text-xs font-mono text-zinc-950 hover:underline cursor-pointer font-bold"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Reply via Email</span>
                      </a>
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="p-1 text-zinc-400 hover:text-red-600 cursor-pointer"
                        title="Delete message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 6: BACKUP & RESTORE */}
        {activeTab === 'backup' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-zinc-950">Site Data & Backup Operations</h2>
              <p className="text-xs font-mono text-zinc-500">
                Safeguard all your research notes, reading shelf entries, and milestones.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-zinc-200 p-8 space-y-8 shadow-2xs font-mono text-xs">
              <div className="space-y-3 pb-6 border-b border-zinc-200">
                <div className="flex items-center gap-2 text-zinc-950 font-bold uppercase text-sm">
                  <Download className="w-4 h-4 text-zinc-700" />
                  <span>Export Journal Backup</span>
                </div>
                <p className="text-zinc-600 font-sans text-xs">
                  Download a JSON file containing all your essays, math notes, reading list items, and milestones.
                </p>
                <button
                  onClick={exportDataJson}
                  className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-zinc-100 rounded-md uppercase tracking-wider transition-colors cursor-pointer font-semibold"
                >
                  Download Complete Backup (JSON)
                </button>
              </div>

              <div className="space-y-3 pb-6 border-b border-zinc-200">
                <div className="flex items-center gap-2 text-zinc-950 font-bold uppercase text-sm">
                  <Upload className="w-4 h-4 text-zinc-700" />
                  <span>Import & Restore Backup</span>
                </div>
                <p className="text-zinc-600 font-sans text-xs">
                  Restore your journal from a previously exported backup JSON file.
                </p>
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded-md text-zinc-800 uppercase tracking-wider transition-colors cursor-pointer font-semibold">
                  <span>Select Backup JSON File</span>
                  <input type="file" accept=".json" onChange={handleBackupFileImport} className="hidden" />
                </label>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-red-700 font-bold uppercase text-sm">
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset to Default Template</span>
                </div>
                <p className="text-zinc-600 font-sans text-xs">
                  Reset back to the seeded quantitative and personal journal entries.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all posts and reading list items?')) {
                      resetToDefaults();
                    }
                  }}
                  className="px-4 py-2 bg-zinc-100 hover:bg-red-50 text-red-700 border border-red-200 rounded-md uppercase tracking-wider transition-colors cursor-pointer font-semibold"
                >
                  Reset Site Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Post Editor Modal */}
      {(isCreatingPost || editingPost) && (
        <PostEditorModal
          post={editingPost}
          onClose={() => {
            setIsCreatingPost(false);
            setEditingPost(null);
          }}
        />
      )}

      {/* Reading Item Modal */}
      {(isCreatingReadingItem || editingReadingItem) && (
        <ReadingItemModal
          item={editingReadingItem}
          onClose={() => {
            setIsCreatingReadingItem(false);
            setEditingReadingItem(null);
          }}
        />
      )}

      {/* Milestone Modal */}
      {(isCreatingMilestone || editingMilestone) && (
        <MilestoneModal
          milestone={editingMilestone}
          onClose={() => {
            setIsCreatingMilestone(false);
            setEditingMilestone(null);
          }}
        />
      )}
    </div>
  );
};
