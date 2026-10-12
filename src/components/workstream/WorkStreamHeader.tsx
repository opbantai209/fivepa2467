import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { WorkStream } from '../../types';

interface Props {
  workstream: WorkStream;
  isCurrentBuyer: boolean;
  counterpartyName: string;
  counterpartyAvatar: string;
}

export const WorkStreamHeader: React.FC<Props> = ({
  workstream,
  isCurrentBuyer,
  counterpartyName,
  counterpartyAvatar,
}) => {
  return (
    <div className="p-4 border-b border-slate-200 bg-slate-50/70 rounded-t-xl flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={counterpartyAvatar}
          alt={counterpartyName}
          referrerPolicy="no-referrer"
          className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900 truncate">{counterpartyName}</h2>
            {isCurrentBuyer && (
              <span className="text-[10px] bg-slate-900 text-white font-bold px-1.5 py-0.2 rounded-sm shrink-0">
                CERT {workstream.freelancerCert}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 truncate">{workstream.title}</p>
        </div>
      </div>

      <div className="text-right shrink-0">
        <div className="text-[11px] font-bold text-slate-800 font-mono tabular-nums">
          ${workstream.agreedAmount.toFixed(2)}
        </div>
        <div className="text-[10px] font-medium text-emerald-600 flex items-center gap-1 justify-end">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          <span>${workstream.escrowBalance.toFixed(2)} Escrow</span>
        </div>
      </div>
    </div>
  );
};
