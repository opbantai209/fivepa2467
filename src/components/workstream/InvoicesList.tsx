import React from 'react';
import { DollarSign } from 'lucide-react';
import { Invoice } from '../../types';

interface Props {
  invoices: Invoice[];
}

export const InvoicesList: React.FC<Props> = ({ invoices }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-amber-600" />
          Invoices ({invoices.length})
        </span>
      </div>

      {invoices.length === 0 ? (
        <p className="text-xs text-slate-400 italic">No invoices issued yet.</p>
      ) : (
        <div className="space-y-2">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs flex items-center justify-between"
            >
              <div>
                <div className="font-mono font-bold text-slate-900">{inv.number}</div>
                <div className="text-[10px] text-slate-500 truncate max-w-[130px]">{inv.description}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-900 font-mono">${inv.amount.toFixed(2)}</div>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-sm font-bold uppercase ${
                    inv.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {inv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
