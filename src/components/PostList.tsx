import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { Post, PostStream } from '../types/blog';
import { Search, ArrowUpRight, Binary, BookOpen, Compass, Target } from 'lucide-react';

interface PostListProps {
  onSelectPost: (post: Post) => void;
}

export const PostList: React.FC<PostListProps> = ({ onSelectPost }) => {
  const { data, activeStream, setActiveStream } = useBlog();
  const [searchQuery, setSearchQuery] = useState('');

  const streams: ('All' | PostStream)[] = [
    'All',
    'Math & Quants',
    'Personal & Life',
    'Articles I Like',
    'Achievements',
    'Musings',
  ];

  const publishedPosts = data.posts.filter((p) => p.status === 'published');

  const filteredPosts = publishedPosts.filter((post) => {
    const matchesStream = activeStream === 'All' || post.stream === activeStream;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (post.sourceAuthor && post.sourceAuthor.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStream && matchesSearch;
  });

  const getStreamIcon = (stream: PostStream) => {
    switch (stream) {
      case 'Math & Quants':
        return Binary;
      case 'Personal & Life':
        return Compass;
      case 'Articles I Like':
        return BookOpen;
      case 'Achievements':
        return Target;
      default:
        return Compass;
    }
  };

  return (
    <section id="posts" className="py-20 border-b border-zinc-200 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-600 block mb-2 font-semibold">
              Research & Discourse Archive
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-zinc-950 tracking-tight">
              Essays, Technical Notes & Field Logs
            </h2>
          </div>

          {/* Search & Segmented Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search notes, formulas, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-60 pl-9 pr-3 py-1.5 text-xs bg-white border border-zinc-300 rounded-md text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 transition-colors font-sans"
              />
            </div>

            {/* Segmented Filter Control */}
            <div className="flex items-center gap-1 p-1 bg-zinc-200/80 rounded-lg overflow-x-auto font-mono text-xs">
              {streams.map((stream) => (
                <button
                  key={stream}
                  onClick={() => setActiveStream(stream)}
                  className={`px-3 py-1 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    activeStream === stream
                      ? 'bg-zinc-950 text-white shadow-2xs font-semibold'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {stream}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Post Grid */}
        {filteredPosts.length === 0 ? (
          <div className="py-16 text-center text-zinc-500 bg-white rounded-lg border border-zinc-200">
            <BookOpen className="w-8 h-8 mx-auto mb-3 text-zinc-400" />
            <p className="text-sm font-sans">No posts found matching this stream or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => {
              const StreamIcon = getStreamIcon(post.stream);

              return (
                <article
                  key={post.id}
                  onClick={() => onSelectPost(post)}
                  className="group cursor-pointer flex flex-col bg-white rounded-lg border border-zinc-200 p-6 hover:border-zinc-400 transition-all duration-300 shadow-2xs justify-between"
                >
                  <div className="space-y-4">
                    {/* Unboxed Metadata Header */}
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-600 border-b border-zinc-100 pb-3">
                      <div className="flex items-center gap-1.5 text-zinc-800 font-semibold">
                        <StreamIcon className="w-3.5 h-3.5 text-zinc-700" />
                        <span>{post.stream}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{post.publishedDate}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Source citation if article annotation */}
                    {post.sourceAuthor && (
                      <div className="text-[11px] font-mono text-zinc-600 flex items-center gap-1">
                        <span>Referencing:</span>
                        <span className="font-semibold text-zinc-800 truncate">{post.sourceAuthor}</span>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-lg font-bold text-zinc-950 leading-snug group-hover:text-zinc-700 transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-zinc-600 leading-relaxed font-sans line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Formula highlight snippet if present */}
                    {post.mathHighlight && (
                      <div className="p-2.5 bg-zinc-900 rounded-md font-mono text-xs text-zinc-200 border border-zinc-800 truncate">
                        <span className="text-[10px] uppercase text-zinc-400 block mb-0.5">Equation:</span>
                        <code className="text-zinc-100 font-semibold">{post.mathHighlight}</code>
                      </div>
                    )}
                  </div>

                  {/* Card Footer with tags and action */}
                  <div className="pt-6 border-t border-zinc-100 flex items-center justify-between mt-6">
                    <div className="flex flex-wrap gap-1 max-w-[70%]">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="text-[10px] font-mono text-zinc-600 self-center">
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-zinc-900 group-hover:translate-x-1 transition-transform">
                      <span>Read Note</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
