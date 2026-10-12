import React from 'react';
import { FileText, Download } from 'lucide-react';
import { Deliverable } from '../../types';

interface Props {
  deliverables: Deliverable[];
}

export const DeliverablesVault: React.FC<Props> = ({ deliverables }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-indigo-600" />
          Deliverables ({deliverables.length})
        </span>
      </div>

      {deliverables.length === 0 ? (
        <p className="text-xs text-slate-400 italic">No files submitted yet.</p>
      ) : (
        <div className="space-y-2.5">
          {deliverables.map((deliv) => (
            <div key={deliv.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-900 truncate">{deliv.title}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-sm font-bold uppercase ${
                    deliv.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {deliv.status === 'accepted' ? 'Approved' : 'Under Review'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2 truncate">{deliv.description}</p>
              <div className="space-y-1">
                {deliv.files.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-[11px] text-indigo-600 bg-white p-1 rounded-sm border"
                  >
                    <span className="truncate">{f.name}</span>
                    <button
                      onClick={() => alert(`Downloading "${f.name}"`)}
                      className="text-[10px] font-semibold text-slate-600 hover:text-indigo-600 flex items-center gap-0.5 ml-1"
                    >
                      <Download className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
