import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Users,
  Star,
  MapPin,
  CheckCircle,
  ShieldCheck,
  Briefcase,
  DollarSign,
  MessageSquare,
  X,
  ArrowRight,
} from 'lucide-react';
import { User } from '../types';

export const FreelancerList: React.FC = () => {
  const {
    freelancers,
    selectedFreelancerDetail,
    setSelectedFreelancerDetail,
    setActiveWorkStreamId,
    setActiveTab,
    workstreams,
    sendWorkStreamMessage,
    currentPersona,
  } = useApp();

  const [certFilter, setCertFilter] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteTargetUser, setInviteTargetUser] = useState<User | null>(null);
  const [inviteMessage, setInviteMessage] = useState('');

  const filteredFreelancers = freelancers.filter((f) => {
    const matchesCert = certFilter === null || f.certLevel >= certFilter;
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCert && matchesSearch;
  });

  const handleOpenInvite = (user: User) => {
    setInviteTargetUser(user);
    setInviteMessage(
      `Hi ${user.name}! I reviewed your CERT ${user.certLevel} profile and would love to collaborate with you on our upcoming milestone project.`
    );
    setInviteModalOpen(true);
  };

  const handleSendDirectInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteTargetUser) return;

    // Check if an existing workstream exists with this freelancer
    const existingWs = workstreams.find((ws) => ws.freelancerId === inviteTargetUser.id);
    if (existingWs) {
      sendWorkStreamMessage(existingWs.id, inviteMessage);
      setActiveWorkStreamId(existingWs.id);
    } else {
      // Find active or open first workstream
      if (workstreams[0]) {
        setActiveWorkStreamId(workstreams[0].id);
      }
    }
    setInviteModalOpen(false);
    setActiveTab('workstream');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Vetted Freelancers Directory</h1>
          <span className="text-xs bg-slate-900 text-white font-bold px-2 py-0.5 rounded-sm">
            CERT™ Certified
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Browse top-tier talent vetted by PeoplePerHour's proprietary CERT qualification algorithm.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by specialty, role, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-orange-500 focus:bg-white"
            />
          </div>

          {/* CERT Filter Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-semibold shrink-0">
            <button
              onClick={() => setCertFilter(null)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                certFilter === null ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Levels
            </button>
            <button
              onClick={() => setCertFilter(4)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                certFilter === 4 ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              CERT 4+
            </button>
            <button
              onClick={() => setCertFilter(5)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                certFilter === 5 ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              CERT 5 Only
            </button>
          </div>
        </div>
      </div>

      {/* Freelancers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFreelancers.map((freelancer) => (
          <div
            key={freelancer.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-orange-300 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              {/* Profile Card Header */}
              <div className="flex items-start gap-3.5 mb-4">
                <div className="relative shrink-0">
                  <img
                    src={freelancer.avatar}
                    alt={freelancer.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                  />
                  {freelancer.isOnline && (
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{freelancer.name}</h3>
                    <span className="text-[10px] bg-slate-900 text-white font-bold px-1.5 py-0.2 rounded-xs shrink-0">
                      CERT {freelancer.certLevel}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{freelancer.title}</p>

                  <div className="flex items-center gap-2 mt-1.5 text-xs">
                    <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{freelancer.rating}</span>
                      <span className="text-slate-400 font-normal text-[10px]">({freelancer.reviewCount})</span>
                    </div>
                    <span className="text-slate-300">·</span>
                    <span className="text-emerald-700 font-semibold text-[11px]">
                      {freelancer.jobSuccessPercent}% Success
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio snippet */}
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                {freelancer.bio}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {freelancer.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] rounded-md font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Meta & Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-base font-extrabold text-slate-900 font-mono tabular-nums">
                  ${freelancer.hourlyRate}
                </span>
                <span className="text-xs text-slate-400 font-normal"> / hour</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenInvite(freelancer)}
                  className="px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-colors shadow-2xs flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WorkStream Chat</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DIRECT INVITE / WORKSTREAM MODAL */}
      {inviteModalOpen && inviteTargetUser && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={inviteTargetUser.avatar}
                  alt={inviteTargetUser.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Connect with {inviteTargetUser.name}
                  </h3>
                  <span className="text-xs text-slate-500">Rate: ${inviteTargetUser.hourlyRate}/hr</span>
                </div>
              </div>
              <button
                onClick={() => setInviteModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendDirectInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Initial Message / Brief
                </label>
                <textarea
                  rows={4}
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-orange-500"
                  placeholder="Outline your project goals, deadlines, and questions..."
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-lg transition-colors shadow-2xs flex items-center justify-center gap-1.5"
                >
                  <span>Open WorkStream</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
