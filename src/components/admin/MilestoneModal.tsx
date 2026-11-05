import React, { useState } from 'react';
import { Milestone } from '../../types/blog';
import { useBlog } from '../../context/BlogContext';
import { X, Check } from 'lucide-react';

interface MilestoneModalProps {
  milestone?: Milestone | null;
  onClose: () => void;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({ milestone, onClose }) => {
  const { addMilestone, updateMilestone } = useBlog();

  const [year, setYear] = useState(milestone?.year || `${new Date().getFullYear()}`);
  const [title, setTitle] = useState(milestone?.title || '');
  const [category, setCategory] = useState<Milestone['category']>(milestone?.category || 'Quant & Code');
  const [description, setDescription] = useState(milestone?.description || '');
  const [metrics, setMetrics] = useState(milestone?.metrics || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const payload: Partial<Milestone> = {
      year,
      title,
      category,
      description,
      metrics: metrics.trim() || undefined,
    };

    if (milestone) {
      updateMilestone(milestone.id, payload);
    } else {
      addMilestone(payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-md flex justify-center p-3 md:p-6">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto">
        <div className="px-6 py-4 bg-white border-b border-stone-200 flex items-center justify-between">
          <h3 className="text-base font-serif font-bold text-stone-900">
            {milestone ? 'Edit Milestone' : 'Record New Milestone'}
          </h3>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-mono">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 uppercase mb-1">Year / Period *</label>
              <input
                type="text"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2026"
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-stone-900 font-sans text-xs"
              />
            </div>
            <div>
              <label className="block text-stone-700 uppercase mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-stone-900 font-sans text-xs"
              >
                <option value="Quant & Code">Quant & Code</option>
                <option value="Academic">Academic</option>
                <option value="Career">Career</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-stone-700 uppercase mb-1">Milestone Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Deployed Walk-Forward Backtest Simulator"
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-stone-900 font-sans text-xs"
            />
          </div>

          <div>
            <label className="block text-stone-700 uppercase mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What you built, learned, or accomplished..."
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-stone-900 font-sans text-xs"
            />
          </div>

          <div>
            <label className="block text-stone-700 uppercase mb-1">Metrics / Outcome Note</label>
            <input
              type="text"
              value={metrics}
              onChange={(e) => setMetrics(e.target.value)}
              placeholder="e.g. Zero lookahead bias verified across 10-year dataset"
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
              <span>Save Milestone</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
