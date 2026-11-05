import React, { useState } from 'react';
import { ReadingItem } from '../../types/blog';
import { useBlog } from '../../context/BlogContext';
import { X, Check } from 'lucide-react';

interface ReadingItemModalProps {
  item?: ReadingItem | null;
  onClose: () => void;
}

export const ReadingItemModal: React.FC<ReadingItemModalProps> = ({ item, onClose }) => {
  const { addReadingItem, updateReadingItem } = useBlog();

  const [title, setTitle] = useState(item?.title || '');
  const [author, setAuthor] = useState(item?.author || '');
  const [type, setType] = useState<ReadingItem['type']>(item?.type || 'Paper');
  const [url, setUrl] = useState(item?.url || '');
  const [status, setStatus] = useState<ReadingItem['status']>(item?.status || 'Recommended');
  const [rating, setRating] = useState<number>(item?.rating || 5);
  const [notes, setNotes] = useState(item?.notes || '');
  const [streamCategory, setStreamCategory] = useState(item?.streamCategory || 'Math & Quants');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const payload: Partial<ReadingItem> = {
      title,
      author,
      type,
      url: url || '#',
      status,
      rating,
      notes,
      streamCategory,
    };

    if (item) {
      updateReadingItem(item.id, payload);
    } else {
      addReadingItem(payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-md flex justify-center p-3 md:p-6">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto">
        <div className="px-6 py-4 bg-white border-b border-stone-200 flex items-center justify-between">
          <h3 className="text-base font-serif font-bold text-stone-900">
            {item ? 'Edit Reading Shelf Entry' : 'Add Paper / Book to Reading Shelf'}
          </h3>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-mono">
          <div>
            <label className="block text-stone-700 uppercase mb-1">Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. A Mathematical Theory of Communication"
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-stone-900 font-sans text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 uppercase mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Claude Shannon"
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-stone-900 font-sans text-xs"
              />
            </div>
            <div>
              <label className="block text-stone-700 uppercase mb-1">Format Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-stone-900 font-sans text-xs"
              >
                <option value="Paper">Paper</option>
                <option value="Book">Book</option>
                <option value="Essay">Essay</option>
                <option value="Article">Article</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 uppercase mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-stone-900 font-sans text-xs"
              >
                <option value="Recommended">Recommended</option>
                <option value="Read">Read</option>
                <option value="Currently Reading">Currently Reading</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-700 uppercase mb-1">Rating (1 to 5 Stars)</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-stone-900 font-sans text-xs"
              >
                <option value={5}>★★★★★ (5/5)</option>
                <option value={4}>★★★★☆ (4/5)</option>
                <option value={3}>★★★☆☆ (3/5)</option>
                <option value={2}>★★☆☆☆ (2/5)</option>
                <option value={1}>★☆☆☆☆ (1/5)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-stone-700 uppercase mb-1">URL to Source</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://arxiv.org/... or publisher link"
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-stone-900 font-sans text-xs"
            />
          </div>

          <div>
            <label className="block text-stone-700 uppercase mb-1">Personal Notes & Synthesis</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Why this paper/book is significant, key theorems or insights..."
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-stone-900 font-sans text-xs"
            />
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-600 hover:text-stone-900 cursor-pointer uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-stone-900 text-stone-100 rounded-md uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Entry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
