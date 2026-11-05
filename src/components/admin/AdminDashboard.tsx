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
  Star
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    data,
    setActiveView,
    deletePost,
    togglePostStatus,
    deleteReadingItem,
    deleteMilestone,
    updateProfile,
    markMessageAsRead,
    deleteMessage,
    exportDataJson,
    importDataJson,
    resetToDefaults,
  } = useBlog();

  const [activeTab, setActiveTab] = useState<'posts' | 'reading' | 'milestones' | 'profile' | 'inquiries' | 'backup'>('posts');
  
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

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      ...profileForm,
      interests: interestsString.split(',').map((s) => s.trim()).filter(Boolean),
      pinnedThoughts: pinnedThoughtsString.split('\n').map((s) => s.trim()).filter(Boolean),
    });
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
                Update your bio statement, contact email ({data.profile.email}), research areas, and axioms.
              </p>
            </div>

            <form onSubmit={handleProfileSubmit} className="bg-white rounded-lg border border-zinc-200 p-8 space-y-6 text-xs font-mono shadow-2xs">
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
