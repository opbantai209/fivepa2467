import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface Props {
  counterpartyName: string;
  onClose: () => void;
  onConfirm: (rating: number, comment: string) => void;
}

export const ReviewModal: React.FC<Props> = ({ counterpartyName, onClose, onConfirm }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('Outstanding work, extremely prompt communication and first-class quality!');

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
          <h3 className="text-lg font-bold text-slate-900">Review & Rating</h3>
        </div>
        <p className="text-xs text-slate-600 mb-4">
          Share your feedback for <b>{counterpartyName}</b>. This will be posted publicly to their profile.
        </p>

        <div className="mb-4 text-center">
          <div className="flex justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 text-amber-400 hover:scale-110 transition-transform"
              >
                <Star
                  className={`w-8 h-8 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs font-bold text-slate-700">{rating} out of 5 Stars</span>
        </div>

        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Your Testimonial</label>
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
          />
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onClose} className="flex-1 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg">
            Cancel
          </button>
          <button
            onClick={() => {
              if (comment.trim()) onConfirm(rating, comment.trim());
            }}
            className="flex-1 py-2 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-2xs"
          >
            Publish Feedback
          </button>
        </div>
      </div>
    </div>
  );
};
