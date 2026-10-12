import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Briefcase, DollarSign, Clock, ShieldCheck, Tag } from 'lucide-react';
import { ProjectType } from '../types';

export const PostProjectModal: React.FC = () => {
  const { isPostProjectOpen, setIsPostProjectOpen, createProject, currentPersona } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Technology & Programming');
  const [description, setDescription] = useState('');
  const [projectType, setProjectType] = useState<ProjectType>('fixed');
  const [budget, setBudget] = useState('650');
  const [duration, setDuration] = useState('1 to 2 weeks');
  const [experienceLevel, setExperienceLevel] = useState<'Entry' | 'Intermediate' | 'Expert'>('Expert');
  const [tagInput, setTagInput] = useState('React, TypeScript, UI/UX');

  if (!isPostProjectOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    createProject({
      title: title.trim(),
      category,
      description: description.trim(),
      projectType,
      budget: parseFloat(budget) || 500,
      duration,
      experienceLevel,
      tags: tags.length > 0 ? tags : ['Web Development', 'Design'],
      urgent: false,
      remote: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Post a Project on PeoplePerHour</h2>
              <p className="text-xs text-slate-500">Receive vetted proposals from CERT freelancers within minutes.</p>
            </div>
          </div>
          <button
            onClick={() => setIsPostProjectOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Project Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Build responsive React web application with Supabase auth"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-orange-500 bg-white"
              >
                <option value="Technology & Programming">Technology & Programming</option>
                <option value="Design">Design</option>
                <option value="Writing & Translation">Writing & Translation</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Video & Animation">Video & Animation</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Project Type</label>
              <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setProjectType('fixed')}
                  className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    projectType === 'fixed' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Fixed Price
                </button>
                <button
                  type="button"
                  onClick={() => setProjectType('hourly')}
                  className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    projectType === 'hourly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Hourly Rate
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {projectType === 'fixed' ? 'Budget ($ USD)' : 'Hourly Budget ($ / hr)'}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  required
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-lg font-mono font-bold focus:ring-1 focus:ring-orange-500"
                  placeholder="500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Estimated Timeline</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-orange-500 bg-white"
              >
                <option value="Under 1 week">Under 1 week</option>
                <option value="1 to 2 weeks">1 to 2 weeks</option>
                <option value="2 to 4 weeks">2 to 4 weeks</option>
                <option value="1 to 3 months">1 to 3 months</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Project Description & Requirements</label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail your goals, scope of work, technical specifications, and milestones..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Skills Tags (comma separated)</label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="e.g. React, TypeScript, Next.js, Figma"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-[11px] text-emerald-800 leading-tight">
              <b>Protected Escrow:</b> When you award this project to a freelancer, your deposit is safeguarded until milestones are delivered.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsPostProjectOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-2xs transition-colors"
            >
              Post Project Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
