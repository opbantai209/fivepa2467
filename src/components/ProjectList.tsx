import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  DollarSign,
  Clock,
  Briefcase,
  User,
  ShieldCheck,
  Send,
  X,
  Sparkles,
  MapPin,
  CheckCircle,
} from 'lucide-react';
import { Project } from '../types';

export const ProjectList: React.FC = () => {
  const {
    projects,
    selectedProjectDetail,
    setSelectedProjectDetail,
    sendProposal,
    currentPersona,
    setIsPostProjectOpen,
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState<'all' | 'fixed' | 'hourly'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Proposal modal state
  const [proposalBid, setProposalBid] = useState('');
  const [proposalDays, setProposalDays] = useState('7');
  const [proposalCover, setProposalCover] = useState('');

  const categories = [
    'All',
    'Technology & Programming',
    'Design',
    'Writing & Translation',
    'Digital Marketing',
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesType = typeFilter === 'all' || p.projectType === typeFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCat && matchesType && matchesSearch;
  });

  const handleOpenProposal = (proj: Project) => {
    setSelectedProjectDetail(proj);
    setProposalBid(String(proj.budget));
    setProposalDays('5');
    setProposalCover(
      `Hi ${proj.buyerName}! I have extensive experience in ${proj.category}. I can deliver this project with high standard code and full documentation. Looking forward to discussing details in the WorkStream.`
    );
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectDetail) return;
    const bidAmount = parseFloat(proposalBid) || selectedProjectDetail.budget;
    const days = parseInt(proposalDays) || 5;

    sendProposal(selectedProjectDetail.id, bidAmount, days, proposalCover);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Browse Freelance Projects</h1>
          <p className="text-xs text-slate-500 mt-1">
            Discover verified jobs posted by buyers. Submit proposals to open a direct collaboration WorkStream.
          </p>
        </div>

        <button
          onClick={() => setIsPostProjectOpen(true)}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          Post a New Project +
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by keywords, skills, or requirements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-orange-500 focus:bg-white"
            />
          </div>

          {/* Project Type Filter Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-semibold shrink-0">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                typeFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setTypeFilter('fixed')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                typeFilter === 'fixed' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fixed Price
            </button>
            <button
              onClick={() => setTypeFilter('hourly')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                typeFilter === 'hourly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hourly Rate
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
          <span className="text-xs font-semibold text-slate-400 shrink-0">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List Results */}
      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">No Projects Found</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-orange-300 transition-all shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex-1 space-y-2.5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-slate-500">{proj.category}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-400 font-mono text-[11px]">{proj.createdAt}</span>
                  {proj.urgent && (
                    <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-0.2 rounded-full">
                      URGENT
                    </span>
                  )}
                </div>

                <h3
                  onClick={() => handleOpenProposal(proj)}
                  className="text-base font-bold text-slate-900 hover:text-orange-600 cursor-pointer transition-colors leading-snug"
                >
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>

                {/* Skill Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buyer Meta */}
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <img
                      src={proj.buyerAvatar}
                      alt={proj.buyerName}
                      referrerPolicy="no-referrer"
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="font-medium text-slate-700">{proj.buyerName}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{proj.buyerLocation}</span>
                  </div>
                  <div className="font-mono text-emerald-700 font-semibold tabular-nums text-[11px]">
                    ${proj.buyerSpent.toLocaleString()} Spent
                  </div>
                  <span>·</span>
                  <span>{proj.proposalsCount} Proposals</span>
                </div>
              </div>

              {/* Budget & Action Column */}
              <div className="md:border-l md:border-slate-100 md:pl-6 flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0">
                <div className="text-left md:text-right">
                  <div className="text-lg font-black text-slate-900 font-mono tabular-nums">
                    {proj.projectType === 'fixed' ? `$${proj.budget}` : `$${proj.budget}/hr`}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {proj.projectType === 'fixed' ? 'Fixed Price Budget' : 'Hourly Rate Budget'}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Est. {proj.duration}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenProposal(proj)}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-2xs whitespace-nowrap"
                >
                  Send Proposal →
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PROPOSAL & PROJECT DETAIL MODAL */}
      {selectedProjectDetail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
                  {selectedProjectDetail.category}
                </span>
                <h2 className="text-lg font-bold text-slate-900 leading-snug">
                  {selectedProjectDetail.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProjectDetail(null)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scope & Details */}
            <div className="space-y-4 mb-6 text-xs text-slate-600 leading-relaxed">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-500">Client Budget:</span>
                  <div className="text-base font-bold text-slate-900 font-mono">
                    {selectedProjectDetail.projectType === 'fixed'
                      ? `$${selectedProjectDetail.budget} (Fixed)`
                      : `$${selectedProjectDetail.budget}/hr (Hourly)`}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500">Timeline:</span>
                  <div className="text-sm font-semibold text-slate-800">
                    {selectedProjectDetail.duration}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500">Experience Required:</span>
                  <div className="text-sm font-semibold text-slate-800">
                    {selectedProjectDetail.experienceLevel}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Project Requirements</h4>
                <p className="whitespace-pre-line text-slate-700 leading-relaxed">
                  {selectedProjectDetail.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1.5">Required Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProjectDetail.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Proposal Submission Form */}
            <form onSubmit={handleSubmitProposal} className="border-t border-slate-200 pt-5 space-y-4">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-orange-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Submit Proposal as {currentPersona.name}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Bid Amount ($ USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-400 font-bold">$</span>
                    <input
                      type="number"
                      value={proposalBid}
                      onChange={(e) => setProposalBid(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs font-mono font-bold focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Delivery In (Days)
                  </label>
                  <input
                    type="number"
                    value={proposalDays}
                    onChange={(e) => setProposalDays(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-mono font-bold focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Proposal Cover Letter & Work Plan
                </label>
                <textarea
                  rows={4}
                  value={proposalCover}
                  onChange={(e) => setProposalCover(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-orange-500"
                  placeholder="Detail your approach, milestones, and why you are the best fit..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProjectDetail(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-lg transition-colors shadow-2xs flex items-center gap-1.5"
                >
                  <span>Submit Proposal & Open WorkStream</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
