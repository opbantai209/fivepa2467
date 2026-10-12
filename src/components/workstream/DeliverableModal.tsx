import React, { useState } from 'react';
import { FileCheck } from 'lucide-react';
import { WorkStreamAttachment } from '../../types';

interface Props {
  buyerName: string;
  onClose: () => void;
  onConfirm: (title: string, description: string, files: WorkStreamAttachment[]) => void;
}

export const DeliverableModal: React.FC<Props> = ({ buyerName, onClose, onConfirm }) => {
  const [title, setTitle] = useState('Production Assets & Source Code');
  const [desc, setDesc] = useState('Final verified version ready for review.');

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <FileCheck className="w-6 h-6 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-900">Submit Project Deliverables</h3>
        </div>
        <p className="text-xs text-slate-600 mb-4">
          Deliver your completed work package to <b>{buyerName}</b> for review and approval.
        </p>

        <div className="space-y-3 mb-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Deliverable Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Notes / Instructions</label>
            <textarea
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onClose} className="flex-1 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg">
            Cancel
          </button>
          <button
            onClick={() => {
              if (title.trim()) {
                onConfirm(title, desc, [{ name: `${title.replace(/\s+/g, '_')}_Final.zip`, size: '24.1 MB' }]);
              }
            }}
            className="flex-1 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs"
          >
            Submit Deliverable
          </button>
        </div>
      </div>
    </div>
  );
};
