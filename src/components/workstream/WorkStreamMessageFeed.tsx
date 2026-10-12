import React, { useRef, useEffect } from 'react';
import {
  ShieldCheck,
  FileCheck,
  DollarSign,
  Star,
  CheckCircle2,
  Paperclip,
  Download,
} from 'lucide-react';
import { WorkStream } from '../../types';

interface Props {
  workstream: WorkStream;
  currentUserId: string;
  onApproveDeliverable: (deliverableId: string) => void;
  onReleaseEscrow: (invoiceId?: string) => void;
  onRequestRevision: () => void;
}

export const WorkStreamMessageFeed: React.FC<Props> = ({
  workstream,
  currentUserId,
  onApproveDeliverable,
  onReleaseEscrow,
  onRequestRevision,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [workstream.messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {workstream.messages.map((msg) => {
        const isMe = msg.senderId === currentUserId;

        if (msg.type === 'deposit_event') {
          return (
            <div key={msg.id} className="my-3 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 bg-emerald-600 text-white rounded-lg shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex-1 text-xs">
                  <div className="font-bold text-emerald-900 mb-0.5">Escrow Funds Deposited</div>
                  <p className="text-emerald-800 leading-relaxed">{msg.content}</p>
                  <span className="text-[10px] text-emerald-600 block mt-1.5 font-mono">{msg.timestamp}</span>
                </div>
              </div>
            </div>
          );
        }

        if (msg.type === 'deliverable_event') {
          return (
            <div key={msg.id} className="my-3 p-4 bg-indigo-50/80 border border-indigo-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-600 text-white rounded-lg shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-indigo-950 text-sm">Work Deliverable Submitted</span>
                    <span className="text-[10px] text-indigo-600">{msg.timestamp}</span>
                  </div>
                  <p className="text-indigo-900 mb-3">{msg.content}</p>

                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="space-y-1.5 mb-3">
                      {msg.attachments.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-white rounded-lg border text-xs">
                          <span className="font-medium text-slate-800 truncate">{file.name}</span>
                          <button
                            onClick={() => alert(`Downloading "${file.name}"...`)}
                            className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-[11px]"
                          >
                            <Download className="w-3.5 h-3.5" /> Download
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2 border-t border-indigo-100">
                    <button
                      onClick={() => {
                        if (msg.meta?.deliverableId) {
                          onApproveDeliverable(msg.meta.deliverableId);
                        } else {
                          alert('Deliverable approved!');
                        }
                      }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-xs flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve Deliverable
                    </button>
                    <button
                      onClick={onRequestRevision}
                      className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-800 rounded-lg text-xs font-medium"
                    >
                      Request Revisions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        if (msg.type === 'invoice_event') {
          const inv = workstream.invoices.find((i) => i.id === msg.meta?.invoiceId);
          const isPaid = inv ? inv.status === 'paid' : false;

          return (
            <div key={msg.id} className="my-3 p-4 bg-amber-50/80 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-600 text-white rounded-lg shrink-0">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-950 text-sm">Invoice Raised</span>
                    <span className="text-[10px] text-amber-700">{msg.timestamp}</span>
                  </div>
                  <p className="text-amber-900 mb-2">{msg.content}</p>

                  <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-amber-200 mb-3">
                    <span className="text-slate-600">Total Amount:</span>
                    <span className="text-base font-bold text-slate-900 font-mono">${msg.meta?.amount?.toFixed(2)}</span>
                  </div>

                  {isPaid ? (
                    <div className="text-xs text-emerald-700 font-bold bg-emerald-100 p-2 rounded-lg">
                      Paid & Released from Escrow
                    </div>
                  ) : (
                    <button
                      onClick={() => onReleaseEscrow(msg.meta?.invoiceId)}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <ShieldCheck className="w-4 h-4" /> Release Escrow & Pay Invoice
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        }

        if (msg.type === 'review_event') {
          return (
            <div key={msg.id} className="my-3 p-4 bg-orange-50 border border-orange-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-500 text-white rounded-lg shrink-0">
                  <Star className="w-5 h-5 fill-white" />
                </div>
                <div className="flex-1 text-xs">
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="font-bold text-slate-800 ml-1">5.0 Verified Feedback</span>
                  </div>
                  <p className="text-slate-800 italic text-xs mb-1">"{msg.content}"</p>
                  <span className="text-[10px] text-slate-400 font-mono">{msg.senderName}</span>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div key={msg.id} className={`flex items-start gap-2.5 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
            <img
              src={msg.senderAvatar}
              alt={msg.senderName}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover shrink-0 border mt-1"
            />
            <div
              className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-xs ${
                isMe ? 'bg-orange-500 text-white rounded-tr-xs' : 'bg-slate-100 text-slate-800 border'
              }`}
            >
              <div className={`text-[10px] font-semibold mb-1 flex items-center gap-1.5 ${isMe ? 'text-orange-100 justify-end' : 'text-slate-500'}`}>
                <span>{msg.senderName}</span>
                <span>·</span>
                <span className="font-mono">{msg.timestamp}</span>
              </div>
              <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};
