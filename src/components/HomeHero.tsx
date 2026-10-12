import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Sparkles,
  Briefcase,
  Users,
  ShieldCheck,
  Star,
  Clock,
  ArrowRight,
  Code,
  Palette,
  PenTool,
  TrendingUp,
  Video,
  FileCheck2,
  CheckCircle,
} from 'lucide-react';

export const HomeHero: React.FC = () => {
  const { setActiveTab, offers, projects, setSelectedOfferDetail, setSelectedProjectDetail } = useApp();
  const [searchTab, setSearchTab] = useState<'offers' | 'projects' | 'freelancers'>('offers');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTab === 'offers') setActiveTab('offers');
    else if (searchTab === 'projects') setActiveTab('projects');
    else setActiveTab('freelancers');
  };

  const categories = [
    { name: 'Technology & Programming', icon: Code, count: '1,240' },
    { name: 'Design', icon: Palette, count: '980' },
    { name: 'Writing & Translation', icon: PenTool, count: '650' },
    { name: 'Digital Marketing', icon: TrendingUp, count: '740' },
    { name: 'Video & Animation', icon: Video, count: '410' },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* 1. Hero Banner */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-16 sm:py-20 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-xl">
        {/* Subtle geometric background accents */}
        <div className="absolute inset-0 bg-radial from-slate-800 to-slate-950 opacity-90" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-orange-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trusted by over 1 Million Global Businesses</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Get more done with freelance talent you can <span className="text-orange-500">trust</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            From vetted CERT 5 freelancers to fixed-price Hourlie Offers, collaborate effortlessly in real-time with our protected <b>WorkStream™</b> escrow workflow.
          </p>

          {/* Unified PPH Search Card */}
          <div className="bg-white rounded-2xl p-2 sm:p-3 shadow-2xl max-w-2xl mx-auto text-slate-800">
            {/* Search Type Selector */}
            <div className="flex items-center gap-1 border-b border-slate-100 pb-2 mb-2 px-1">
              <button
                type="button"
                onClick={() => setSearchTab('offers')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  searchTab === 'offers' ? 'bg-orange-50 text-orange-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Search Offers</span>
              </button>
              <button
                type="button"
                onClick={() => setSearchTab('projects')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  searchTab === 'projects' ? 'bg-orange-50 text-orange-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Search Projects</span>
              </button>
              <button
                type="button"
                onClick={() => setSearchTab('freelancers')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  searchTab === 'freelancers' ? 'bg-orange-50 text-orange-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Search Freelancers</span>
              </button>
            </div>

            {/* Input Row */}
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder={
                    searchTab === 'offers'
                      ? 'e.g. Figma landing page, logo design, SEO audit...'
                      : searchTab === 'projects'
                      ? 'e.g. React MVP development, Flutter mobile app...'
                      : 'e.g. UI/UX Designer, Senior Full-Stack Engineer...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-hidden placeholder-slate-400 font-medium"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Popular Tag Suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 pt-2">
            <span>Popular:</span>
            {['React Web App', 'Figma UI/UX', 'SEO Optimization', 'Logo & Identity', 'Node.js API'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(tag);
                  setActiveTab('offers');
                }}
                className="hover:text-white transition-colors underline decoration-slate-600 underline-offset-4"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Three Pillars of PeoplePerHour Trust */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">CERT™ Algorithm Ranking</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every freelancer is algorithmically verified and ranked from CERT 1 to CERT 5 based on verifiable client track records, punctuality, and job success.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Protected Escrow Guarantee</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Deposit project milestones into PeoplePerHour Escrow. Freelancers start work with confidence, and your funds are released only when you approve the work.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Integrated WorkStream™</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Say goodbye to messy email chains. Chat in real-time, upload deliverables, raise invoices, and release payments in one unified workspace.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Featured Fixed-Price Offers (Hourlies) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Popular Fixed-Price Offers</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Ready-to-buy services delivered in as little as 24 hours.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('offers')}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <span>View All Offers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.slice(0, 4).map((offer) => (
            <div
              key={offer.id}
              onClick={() => {
                setSelectedOfferDetail(offer);
                setActiveTab('offers');
              }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-all cursor-pointer group flex flex-col"
            >
              {/* Card Header with Freelancer info */}
              <div className="p-4 flex items-center gap-3 border-b border-slate-100">
                <img
                  src={offer.freelancerAvatar}
                  alt={offer.freelancerName}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {offer.freelancerName}
                    </span>
                    <span className="text-[9px] bg-slate-900 text-white font-bold px-1.5 py-0.2 rounded-xs">
                      CERT {offer.freelancerCert}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block truncate">
                    {offer.category}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug mb-2">
                    {offer.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                {/* Rating & Sales */}
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-slate-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-900">{offer.rating}</span>
                    <span className="text-slate-400 text-[10px]">({offer.salesCount})</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>{offer.deliveryDays}d Delivery</span>
                  </div>
                </div>
              </div>

              {/* Footer with Price */}
              <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">Fixed Price</span>
                <span className="text-base font-extrabold text-slate-900 font-mono tabular-nums">
                  ${offer.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Recent High-Priority Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Recent Projects Posted by Buyers</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Submit proposals and open a direct WorkStream with clients.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('projects')}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <span>Browse All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.slice(0, 4).map((proj) => (
            <div
              key={proj.id}
              onClick={() => {
                setSelectedProjectDetail(proj);
                setActiveTab('projects');
              }}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-orange-300 hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-xs font-semibold text-slate-500">{proj.category}</span>
                {proj.urgent && (
                  <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                    URGENT
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-2 leading-snug">
                {proj.title}
              </h4>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                {proj.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                  <span>{proj.proposalsCount} Proposals</span>
                  <span>·</span>
                  <span>Est. {proj.duration}</span>
                </div>

                <div className="font-mono font-bold text-slate-900 text-sm tabular-nums">
                  {proj.projectType === 'fixed' ? `$${proj.budget} Fixed` : `$${proj.budget}/hr`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
