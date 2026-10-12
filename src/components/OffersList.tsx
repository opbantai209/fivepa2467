import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Sparkles,
  Star,
  Clock,
  ShieldCheck,
  CheckCircle2,
  X,
  PlusCircle,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { Offer } from '../types';

export const OffersList: React.FC = () => {
  const {
    offers,
    selectedOfferDetail,
    setSelectedOfferDetail,
    buyOffer,
    setIsPostOfferOpen,
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [maxDays, setMaxDays] = useState<number | null>(null);

  const categories = [
    'All',
    'Design',
    'Technology & Programming',
    'Digital Marketing',
    'Writing & Translation',
  ];

  const filteredOffers = offers.filter((o) => {
    const matchesCat = categoryFilter === 'All' || o.category === categoryFilter;
    const matchesDays = maxDays === null || o.deliveryDays <= maxDays;
    const matchesSearch =
      o.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCat && matchesDays && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Fixed-Price Offers (Hourlies)</h1>
            <span className="text-xs bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded-full">
              Instant Purchase
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pre-packaged fixed-price services delivered by verified CERT talent. Funds are held in Escrow until you approve the result.
          </p>
        </div>

        <button
          onClick={() => setIsPostOfferOpen(true)}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors self-start sm:self-auto flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post an Offer</span>
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
              placeholder="Search Hourlie packages e.g. logo, react frontend, SEO report..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-orange-500 focus:bg-white"
            />
          </div>

          {/* Delivery speed filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-semibold shrink-0">
            <button
              onClick={() => setMaxDays(null)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                maxDays === null ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Any Time
            </button>
            <button
              onClick={() => setMaxDays(2)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                maxDays === 2 ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ≤ 2 Days
            </button>
            <button
              onClick={() => setMaxDays(4)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                maxDays === 4 ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ≤ 4 Days
            </button>
          </div>
        </div>

        {/* Category Pills */}
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

      {/* Grid of Offers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => (
          <div
            key={offer.id}
            onClick={() => setSelectedOfferDetail(offer)}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-orange-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            {/* Header with author info */}
            <div>
              <div className="p-4 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-3 min-w-0">
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
                      <span className="text-[9px] bg-slate-900 text-white font-bold px-1.5 py-0.2 rounded-xs shrink-0">
                        CERT {offer.freelancerCert}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block truncate">
                      {offer.category}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-base font-black text-slate-900 font-mono tabular-nums">
                    ${offer.price}
                  </span>
                </div>
              </div>

              {/* Title & Body */}
              <div className="p-4 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                  {offer.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {offer.description}
                </p>

                {/* Included bullets */}
                <div className="space-y-1 pt-1 text-[11px] text-slate-600">
                  {offer.whatsIncluded.slice(0, 2).map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 truncate">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer with Rating and Buy Button */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1 text-slate-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{offer.rating}</span>
                  <span className="text-slate-400 text-[10px]">({offer.salesCount})</span>
                </div>
                <span className="text-slate-300">·</span>
                <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                  <Clock className="w-3 h-3" />
                  <span>{offer.deliveryDays} Days</span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  buyOffer(offer.id);
                }}
                className="px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold transition-colors shadow-2xs"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* OFFER DETAIL & PURCHASE MODAL */}
      {selectedOfferDetail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedOfferDetail.freelancerAvatar}
                  alt={selectedOfferDetail.freelancerName}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">
                      {selectedOfferDetail.freelancerName}
                    </span>
                    <span className="text-[10px] bg-slate-900 text-white font-bold px-1.5 py-0.2 rounded-xs">
                      CERT {selectedOfferDetail.freelancerCert}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">{selectedOfferDetail.category}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedOfferDetail(null)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600 mb-6">
              <h2 className="text-base font-bold text-slate-900 leading-snug">
                {selectedOfferDetail.title}
              </h2>

              <div className="p-3.5 bg-orange-50/70 border border-orange-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-slate-500 text-[11px]">Price:</span>
                  <div className="text-xl font-black text-slate-900 font-mono">
                    ${selectedOfferDetail.price}.00
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 text-[11px]">Turnaround:</span>
                  <div className="text-sm font-bold text-slate-800">
                    {selectedOfferDetail.deliveryDays} Business Days
                  </div>
                </div>
              </div>

              <p className="leading-relaxed text-slate-700 whitespace-pre-line">
                {selectedOfferDetail.description}
              </p>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">What is included in this Offer:</h4>
                <div className="space-y-1.5">
                  {selectedOfferDetail.whatsIncluded.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Escrow Guarantee Callout */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <p className="text-[11px] text-emerald-800">
                  <b>PeoplePerHour Escrow Protection:</b> Your payment of ${selectedOfferDetail.price} is locked in Escrow. Only release funds after you inspect and accept the completed work.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setSelectedOfferDetail(null)}
                className="flex-1 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => buyOffer(selectedOfferDetail.id)}
                className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Buy Now & Open WorkStream</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
