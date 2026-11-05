import React, { useState } from 'react';
import { Post, PostStream } from '../../types/blog';
import { useBlog } from '../../context/BlogContext';
import { X, Check, Binary, BookOpen, Compass, Target, HelpCircle } from 'lucide-react';

interface PostEditorModalProps {
  post?: Post | null;
  onClose: () => void;
}

export const PostEditorModal: React.FC<PostEditorModalProps> = ({ post, onClose }) => {
  const { createPost, updatePost } = useBlog();
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const [title, setTitle] = useState(post?.title || '');
  const [stream, setStream] = useState<PostStream>(post?.stream || 'Math & Quants');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [readTime, setReadTime] = useState(post?.readTime || '5 min read');
  const [status, setStatus] = useState<Post['status']>(post?.status || 'published');
  const [featured, setFeatured] = useState<boolean>(post?.featured || false);
  const [tagsString, setTagsString] = useState(post?.tags?.join(', ') || 'Quantitative, Probability');
  const [mathHighlight, setMathHighlight] = useState(post?.mathHighlight || '');
  const [keyTakeaway, setKeyTakeaway] = useState(post?.keyTakeaway || '');
  const [sourceAuthor, setSourceAuthor] = useState(post?.sourceAuthor || '');
  const [externalUrl, setExternalUrl] = useState(post?.externalUrl || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please provide a title');
      return;
    }

    const tags = tagsString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: Partial<Post> = {
      title,
      stream,
      excerpt,
      content,
      readTime,
      status,
      featured,
      tags: tags.length > 0 ? tags : ['General'],
      mathHighlight: mathHighlight.trim() || undefined,
      keyTakeaway: keyTakeaway.trim() || undefined,
      sourceAuthor: sourceAuthor.trim() || undefined,
      externalUrl: externalUrl.trim() || undefined,
    };

    if (post) {
      updatePost(post.id, payload);
    } else {
      createPost(payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-md flex justify-center p-3 md:p-6">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-serif font-bold text-stone-900">
              {post ? 'Edit Post or Note' : 'Draft New Note or Story'}
            </h3>
            <div className="flex items-center gap-1 p-0.5 bg-stone-100 rounded-md text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1 rounded-sm cursor-pointer ${
                  activeTab === 'edit' ? 'bg-white shadow-2xs font-semibold text-stone-900' : 'text-stone-500'
                }`}
              >
                Editor
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded-sm cursor-pointer ${
                  activeTab === 'preview' ? 'bg-white shadow-2xs font-semibold text-stone-900' : 'text-stone-500'
                }`}
              >
                Preview
              </button>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-stone-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'edit' ? (
            <form id="post-editor-form" onSubmit={handleSubmit} className="space-y-6 text-xs font-mono">
              {/* Title & Stream */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8">
                  <label className="block text-stone-700 uppercase mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. The Kelly Criterion in Practice"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-stone-900 font-sans text-sm focus:ring-1 focus:ring-stone-600 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-4">
                  <label className="block text-stone-700 uppercase mb-1">Stream / Topic</label>
                  <select
                    value={stream}
                    onChange={(e) => setStream(e.target.value as PostStream)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-stone-900 font-sans text-sm focus:ring-1 focus:ring-stone-600 focus:outline-none"
                  >
                    <option value="Math & Quants">Math & Quants</option>
                    <option value="Personal & Life">Personal & Life</option>
                    <option value="Articles I Like">Articles I Like</option>
                    <option value="Achievements">Achievements</option>
                    <option value="Musings">Musings</option>
                  </select>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-stone-700 uppercase mb-1">Short Excerpt / Summary</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A clear 1-2 sentence overview of the concept or personal narrative..."
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-stone-900 font-sans text-sm focus:ring-1 focus:ring-stone-600 focus:outline-none"
                />
              </div>

              {/* Math / Quants Specific Fields */}
              <div className="bg-white border border-stone-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between text-stone-800 uppercase font-semibold">
                  <div className="flex items-center gap-2">
                    <Binary className="w-4 h-4 text-amber-600" />
                    <span>Mathematical Highlight & Key Takeaway</span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-normal">Optional</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-500 text-[10px] uppercase mb-1">
                      Key Formula or Equation (LaTeX / Plain)
                    </label>
                    <input
                      type="text"
                      value={mathHighlight}
                      onChange={(e) => setMathHighlight(e.target.value)}
                      placeholder="e.g. f* = (bp - q) / b or dS_t = mu S_t dt + sigma S_t dW_t"
                      className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-md text-stone-900 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-500 text-[10px] uppercase mb-1">
                      Key Takeaway / Epistemic Synthesis
                    </label>
                    <input
                      type="text"
                      value={keyTakeaway}
                      onChange={(e) => setKeyTakeaway(e.target.value)}
                      placeholder="Core mental model or rule of thumb in 1 line..."
                      className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-md text-stone-900 font-sans text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Article I Like Specific Fields */}
              {stream === 'Articles I Like' && (
                <div className="bg-white border border-stone-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2 text-stone-800 uppercase font-semibold">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span>External Source Reference</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-500 text-[10px] uppercase mb-1">
                        Author / Original Creator
                      </label>
                      <input
                        type="text"
                        value={sourceAuthor}
                        onChange={(e) => setSourceAuthor(e.target.value)}
                        placeholder="e.g. Terence Tao / Gregory Zuckerman"
                        className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-md text-stone-900 font-sans text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-500 text-[10px] uppercase mb-1">
                        Original Article or Paper Link
                      </label>
                      <input
                        type="url"
                        value={externalUrl}
                        onChange={(e) => setExternalUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-md text-stone-900 font-sans text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Body Content */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-stone-700 uppercase">
                    Essay Content & Formulations (Supports ### for headers, {'>'} for quotes, and $$ formula $$)
                  </label>
                </div>
                <textarea
                  rows={10}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your explanation, thoughts, derivation or narrative..."
                  className="w-full p-3 bg-white border border-stone-300 rounded-md text-stone-900 font-sans text-sm leading-relaxed focus:ring-1 focus:ring-stone-600 focus:outline-none"
                />
              </div>

              {/* Tags & Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-2">
                <div className="sm:col-span-6">
                  <label className="block text-stone-700 uppercase mb-1">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={tagsString}
                    onChange={(e) => setTagsString(e.target.value)}
                    placeholder="Probability, Python, Quant, Books"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-stone-900 text-xs font-sans"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-stone-700 uppercase mb-1">Read Time</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="e.g. 6 min read"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-stone-900 text-xs font-sans"
                  />
                </div>

                <div className="sm:col-span-3 flex items-center gap-4 pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="rounded-xs text-stone-900"
                    />
                    <span className="text-stone-800 font-sans text-xs">Featured Hero</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={status === 'published'}
                      onChange={(e) => setStatus(e.target.checked ? 'published' : 'draft')}
                      className="rounded-xs text-stone-900"
                    />
                    <span className="text-stone-800 font-sans text-xs">Published</span>
                  </label>
                </div>
              </div>
            </form>
          ) : (
            /* Preview Tab */
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-stone-500">
                <span>{stream}</span>
                <span>·</span>
                <span>{readTime}</span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 leading-tight">
                {title || 'Untitled Note'}
              </h2>
              <p className="text-stone-600 italic font-serif text-lg">"{excerpt}"</p>
              {mathHighlight && (
                <div className="bg-stone-900 text-amber-300 p-4 rounded-md font-mono text-center">
                  <code>{mathHighlight}</code>
                </div>
              )}
              {keyTakeaway && (
                <div className="p-3 bg-stone-100 border-l-2 border-stone-800 text-stone-800 italic">
                  "{keyTakeaway}"
                </div>
              )}
              <div className="space-y-4 text-stone-800 text-sm leading-relaxed font-sans">
                {content.split('\n\n').map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-stone-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono uppercase text-stone-600 hover:text-stone-900 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="post-editor-form"
            className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-mono uppercase tracking-wider rounded-md transition-colors cursor-pointer shadow-xs flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>{post ? 'Save Updates' : 'Publish Note'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
