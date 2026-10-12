import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, DollarSign, Clock, CheckCircle2 } from 'lucide-react';

export const PostOfferModal: React.FC = () => {
  const { isPostOfferOpen, setIsPostOfferOpen, createOffer, currentPersona } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Design');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('180');
  const [deliveryDays, setDeliveryDays] = useState('2');
  const [bullet1, setBullet1] = useState('Complete responsive layout design');
  const [bullet2, setBullet2] = useState('Exported production assets & source files');
  const [bullet3, setBullet3] = useState('Unlimited revisions until satisfied');

  if (!isPostOfferOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    createOffer({
      title: title.startsWith('I can') ? title.trim() : `I can ${title.trim()}`,
      category,
      description: description.trim(),
      price: parseFloat(price) || 150,
      deliveryDays: parseInt(deliveryDays) || 2,
      tags: ['Fixed Price', 'Fast Delivery', category],
      whatsIncluded: [bullet1, bullet2, bullet3].filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Post a Fixed-Price Offer (Hourlie)</h2>
              <p className="text-xs text-slate-500">Sell pre-packaged services with guaranteed escrow funding.</p>
            </div>
          </div>
          <button
            onClick={() => setIsPostOfferOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Offer Title (Starts with "I can...")
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="design a high-converting Figma landing page in 2 days"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-orange-500 bg-white"
              >
                <option value="Design">Design</option>
                <option value="Technology & Programming">Technology & Programming</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Writing & Translation">Writing & Translation</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Price ($ USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-lg font-mono font-bold focus:ring-1 focus:ring-orange-500"
                  placeholder="150"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Delivery In (Days)</label>
              <input
                type="number"
                required
                min={1}
                max={30}
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold focus:ring-1 focus:ring-orange-500"
                placeholder="2"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Description & Scope</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain clearly what you will provide and how the buyer will benefit..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-2">What is Included:</label>
            <div className="space-y-2">
              <input
                type="text"
                value={bullet1}
                onChange={(e) => setBullet1(e.target.value)}
                placeholder="Feature 1"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-orange-500"
              />
              <input
                type="text"
                value={bullet2}
                onChange={(e) => setBullet2(e.target.value)}
                placeholder="Feature 2"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-orange-500"
              />
              <input
                type="text"
                value={bullet3}
                onChange={(e) => setBullet3(e.target.value)}
                placeholder="Feature 3"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsPostOfferOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-2xs transition-colors"
            >
              Publish Offer Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
