import React, { useEffect } from 'react';
import { Post } from '../types/blog';
import { useBlog } from '../context/BlogContext';
import { BlockMath, FormattedArticleContent } from './MathRenderer';
import { X, ArrowLeft, Clock, Share2, Binary, ArrowRight, ExternalLink, Tag } from 'lucide-react';

interface PostDetailModalProps {
  post: Post;
  onClose: () => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, onClose }) => {
  const { data, setSelectedPost } = useBlog();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const publishedPosts = data.posts.filter((p) => p.status === 'published');
  const currentIndex = publishedPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? publishedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < publishedPosts.length - 1 ? publishedPosts[currentIndex + 1] : null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/80 backdrop-blur-md flex justify-center p-0 md:p-6 lg:p-8">
      <div className="relative w-full max-w-4xl bg-white min-h-screen md:min-h-0 md:rounded-xl shadow-2xl overflow-hidden flex flex-col my-auto border border-zinc-200">
        {/* Sticky Reading Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Writing</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-1.5 text-zinc-500 hover:text-zinc-950 transition-colors cursor-pointer rounded-sm"
              title="Share Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-500 hover:text-zinc-950 transition-colors cursor-pointer rounded-sm"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Body Container */}
        <article className="px-6 md:px-12 lg:px-16 py-12 max-w-3xl mx-auto w-full">
          {/* Stream & Meta Header */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">
            <span className="font-bold text-zinc-950">{post.stream}</span>
            <span aria-hidden="true">·</span>
            <span>{post.publishedDate}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3" />
              <span>{post.readTime}</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-950 leading-[1.12] mb-6 tracking-tight [text-wrap:balance]">
            {post.title}
          </h1>

          {/* Subtitle / Excerpt */}
          <p className="text-base md:text-lg text-zinc-600 leading-relaxed mb-8 border-b border-zinc-200 pb-8 font-sans">
            {post.excerpt}
          </p>

          {/* External Citation Box (if article annotation) */}
          {post.sourceAuthor && (
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
              <div>
                <span className="text-zinc-500 uppercase text-[10px] block mb-1">Source Material</span>
                <span className="font-bold text-zinc-900 text-sm">{post.sourceAuthor}</span>
              </div>
              {post.externalUrl && (
                <a
                  href={post.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-300 hover:bg-zinc-100 rounded-md text-zinc-900 font-semibold transition-colors self-start sm:self-auto"
                >
                  <span>Visit Original Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          {/* Formula Callout (if math post) */}
          {post.mathHighlight && (
            <div className="bg-zinc-950 text-zinc-100 p-6 rounded-lg mb-10 shadow-sm border border-zinc-800">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                <Binary className="w-3.5 h-3.5 text-zinc-300" />
                <span className="font-semibold text-zinc-200">Core Mathematical Formulation</span>
              </div>
              <BlockMath math={post.mathHighlight} className="my-0 py-3 bg-zinc-900 border-zinc-800 text-zinc-100" />
            </div>
          )}

          {/* Key Takeaway box */}
          {post.keyTakeaway && (
            <div className="mb-10 p-4 bg-zinc-50 border-l-2 border-zinc-950 rounded-r-md">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-bold block mb-1">
                Executive Synthesis
              </span>
              <p className="text-zinc-800 text-sm sm:text-base leading-relaxed font-sans">
                "{post.keyTakeaway}"
              </p>
            </div>
          )}

          {/* Prose Content with LaTeX Math */}
          <div className="mt-8">
            <FormattedArticleContent content={post.content} />
          </div>

          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-zinc-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase text-zinc-400 mr-2 flex items-center gap-1 font-semibold">
              <Tag className="w-3 h-3" />
              <span>Tags:</span>
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-sm border border-zinc-200"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Bio Footer */}
          <div className="mt-12 pt-8 border-t border-zinc-200 flex items-center gap-4">
            <img
              src={data.profile.avatarUrl}
              alt={data.profile.name}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-full object-cover border border-zinc-300"
            />
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">Written by</p>
              <h4 className="text-base font-bold text-zinc-950">{data.profile.name}</h4>
              <p className="text-xs text-zinc-600 font-sans max-w-md">{data.profile.bio}</p>
            </div>
          </div>

          {/* Next / Previous Story Navigation */}
          <div className="mt-12 pt-6 border-t border-zinc-200 flex items-center justify-between gap-4">
            {prevPost ? (
              <button
                onClick={() => setSelectedPost(prevPost)}
                className="text-left group cursor-pointer"
              >
                <span className="text-[11px] font-mono uppercase text-zinc-400 flex items-center gap-1 group-hover:text-zinc-800">
                  <ArrowLeft className="w-3 h-3" />
                  <span>Previous</span>
                </span>
                <span className="text-sm font-semibold text-zinc-800 line-clamp-1 group-hover:underline">
                  {prevPost.title}
                </span>
              </button>
            ) : (
              <div />
            )}

            {nextPost && (
              <button
                onClick={() => setSelectedPost(nextPost)}
                className="text-right group cursor-pointer ml-auto"
              >
                <span className="text-[11px] font-mono uppercase text-zinc-400 flex items-center justify-end gap-1 group-hover:text-zinc-800">
                  <span>Next</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
                <span className="text-sm font-semibold text-zinc-800 line-clamp-1 group-hover:underline">
                  {nextPost.title}
                </span>
              </button>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};
