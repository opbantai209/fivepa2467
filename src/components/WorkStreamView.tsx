import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare } from 'lucide-react';
import { WorkStreamListPanel } from './workstream/WorkStreamListPanel';
import { WorkStreamHeader } from './workstream/WorkStreamHeader';
import { WorkStreamActionBar } from './workstream/WorkStreamActionBar';
import { WorkStreamMessageFeed } from './workstream/WorkStreamMessageFeed';
import { WorkStreamComposer } from './workstream/WorkStreamComposer';
import { EscrowPanel } from './workstream/EscrowPanel';
import { DeliverablesVault } from './workstream/DeliverablesVault';
import { InvoicesList } from './workstream/InvoicesList';
import { DepositModal } from './workstream/DepositModal';
import { InvoiceModal } from './workstream/InvoiceModal';
import { DeliverableModal } from './workstream/DeliverableModal';
import { ReviewModal } from './workstream/ReviewModal';

export const WorkStreamView: React.FC = () => {
  const {
    workstreams,
    activeWorkStream,
    currentPersona,
    switchPersona,
    sendWorkStreamMessage,
    simulateCounterpartyReply,
    depositToEscrow,
    raiseInvoice,
    releaseEscrowPayment,
    submitDeliverable,
    approveDeliverable,
    submitReview,
  } = useApp();

  // Modals state
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isDeliverableModalOpen, setIsDeliverableModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  if (!activeWorkStream && workstreams.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">No WorkStreams Active</h2>
        <p className="text-slate-500 text-sm mb-6">Start collaborating by posting a project or buying an offer.</p>
      </div>
    );
  }

  const isCurrentBuyer = activeWorkStream ? currentPersona.id === activeWorkStream.buyerId : false;
  const counterpartyName = activeWorkStream
    ? isCurrentBuyer
      ? activeWorkStream.freelancerName
      : activeWorkStream.buyerName
    : '';
  const counterpartyAvatar = activeWorkStream
    ? isCurrentBuyer
      ? activeWorkStream.freelancerAvatar
      : activeWorkStream.buyerAvatar
    : '';
  const counterpartyId = activeWorkStream
    ? isCurrentBuyer
      ? activeWorkStream.freelancerId
      : activeWorkStream.buyerId
    : '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Title & Persona switcher */}
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">WorkStream™</h1>
            <span className="text-xs bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded-full">
              Live Collaboration
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Unified workspace for messaging, escrow milestone deposits, deliverables, and invoicing.
          </p>
        </div>

        {activeWorkStream && (
          <div className="flex items-center gap-2 text-xs bg-slate-100 p-1.5 rounded-lg border border-slate-200">
            <span className="text-slate-500 pl-2">Viewing as:</span>
            <span className="font-semibold text-slate-900">
              {currentPersona.name} ({currentPersona.role === 'buyer' ? 'Buyer' : 'Seller'})
            </span>
            <button
              onClick={() => switchPersona(counterpartyId)}
              className="ml-2 px-2.5 py-1 bg-white hover:bg-orange-50 border border-slate-300 text-orange-600 rounded-md font-medium transition-colors"
            >
              Switch to {counterpartyName.split(' ')[0]} ⇄
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Conversations List Panel */}
        <div className="lg:col-span-4">
          <WorkStreamListPanel />
        </div>

        {/* Center Column: Active Chat Canvas */}
        {activeWorkStream ? (
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col h-[750px]">
            <WorkStreamHeader
              workstream={activeWorkStream}
              isCurrentBuyer={isCurrentBuyer}
              counterpartyName={counterpartyName}
              counterpartyAvatar={counterpartyAvatar}
            />

            <WorkStreamActionBar
              workstream={activeWorkStream}
              isCurrentBuyer={isCurrentBuyer}
              counterpartyName={counterpartyName}
              onSimulateReply={() => simulateCounterpartyReply(activeWorkStream.id)}
              onOpenDeposit={() => setIsDepositModalOpen(true)}
              onOpenInvoice={() => setIsInvoiceModalOpen(true)}
            />

            <WorkStreamMessageFeed
              workstream={activeWorkStream}
              currentUserId={currentPersona.id}
              onApproveDeliverable={(delivId) => approveDeliverable(activeWorkStream.id, delivId)}
              onReleaseEscrow={() => releaseEscrowPayment(activeWorkStream.id)}
              onRequestRevision={() =>
                sendWorkStreamMessage(
                  activeWorkStream.id,
                  'Hi! Could you please make a minor adjustment to the typography and layout?'
                )
              }
            />

            <WorkStreamComposer
              counterpartyName={counterpartyName}
              onSendMessage={(content) => sendWorkStreamMessage(activeWorkStream.id, content)}
              onAttachFile={() =>
                sendWorkStreamMessage(activeWorkStream.id, 'Attached specifications document for review.', [
                  { name: 'Specifications_v2.pdf', size: '3.1 MB' },
                ])
              }
            />
          </div>
        ) : (
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-12 text-center h-[750px] flex flex-col items-center justify-center">
            <MessageSquare className="w-12 h-12 text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-800">Select a WorkStream</h3>
          </div>
        )}

        {/* Right Column: Escrow & Deliverables Vault */}
        {activeWorkStream && (
          <div className="lg:col-span-3 space-y-4">
            <EscrowPanel
              workstream={activeWorkStream}
              isCurrentBuyer={isCurrentBuyer}
              onOpenDeposit={() => setIsDepositModalOpen(true)}
              onReleaseEscrow={() => releaseEscrowPayment(activeWorkStream.id)}
              onOpenDeliverable={() => setIsDeliverableModalOpen(true)}
              onOpenInvoice={() => setIsInvoiceModalOpen(true)}
              onOpenReview={() => setIsReviewModalOpen(true)}
            />

            <DeliverablesVault deliverables={activeWorkStream.deliverables} />
            <InvoicesList invoices={activeWorkStream.invoices} />
          </div>
        )}
      </div>

      {/* Modals */}
      {isDepositModalOpen && activeWorkStream && (
        <DepositModal
          freelancerName={activeWorkStream.freelancerName}
          initialAmount={Math.max(0, activeWorkStream.agreedAmount - activeWorkStream.escrowBalance)}
          onClose={() => setIsDepositModalOpen(false)}
          onConfirm={(amt) => {
            depositToEscrow(activeWorkStream.id, amt);
            setIsDepositModalOpen(false);
          }}
        />
      )}

      {isInvoiceModalOpen && activeWorkStream && (
        <InvoiceModal
          buyerName={activeWorkStream.buyerName}
          initialAmount={activeWorkStream.escrowBalance > 0 ? activeWorkStream.escrowBalance : activeWorkStream.agreedAmount}
          initialTitle={activeWorkStream.title}
          onClose={() => setIsInvoiceModalOpen(false)}
          onConfirm={(amt, desc) => {
            raiseInvoice(activeWorkStream.id, amt, desc);
            setIsInvoiceModalOpen(false);
          }}
        />
      )}

      {isDeliverableModalOpen && activeWorkStream && (
        <DeliverableModal
          buyerName={activeWorkStream.buyerName}
          onClose={() => setIsDeliverableModalOpen(false)}
          onConfirm={(title, desc, files) => {
            submitDeliverable(activeWorkStream.id, title, desc, files);
            setIsDeliverableModalOpen(false);
          }}
        />
      )}

      {isReviewModalOpen && activeWorkStream && (
        <ReviewModal
          counterpartyName={counterpartyName}
          onClose={() => setIsReviewModalOpen(false)}
          onConfirm={(rating, comment) => {
            submitReview(activeWorkStream.id, rating, comment);
            setIsReviewModalOpen(false);
          }}
        />
      )}
    </div>
  );
};
