import { Router, Request, Response } from 'express';
import { mockWorkStreamsData, mockTransactionsData } from '../data';
import { WorkStreamMessage, Invoice, Deliverable, Review, Transaction } from '../../src/types';

const router = Router();

// GET all workstreams
router.get('/', (req: Request, res: Response) => {
  res.json(mockWorkStreamsData);
});

// POST send message
router.post('/:id/messages', (req: Request, res: Response) => {
  const { id } = req.params;
  const { senderId, senderName, senderRole, senderAvatar, content, attachments } = req.body;

  const ws = mockWorkStreamsData.find((w) => w.id === id);
  if (!ws) return res.status(404).json({ error: 'WorkStream not found' });

  const newMessage: WorkStreamMessage = {
    id: `msg_${Date.now()}`,
    senderId,
    senderName,
    senderRole,
    senderAvatar,
    content,
    timestamp: 'Just now',
    type: 'message',
    attachments: attachments || [],
  };

  ws.messages.push(newMessage);
  ws.lastActivity = 'Just now';
  res.status(201).json(ws);
});

// POST deposit into escrow
router.post('/:id/deposit', (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount, senderId, senderName, senderAvatar } = req.body;

  const ws = mockWorkStreamsData.find((w) => w.id === id);
  if (!ws) return res.status(404).json({ error: 'WorkStream not found' });

  const depositVal = parseFloat(amount) || 0;
  ws.escrowBalance += depositVal;
  ws.status = 'in_progress';

  const eventMessage: WorkStreamMessage = {
    id: `dep_${Date.now()}`,
    senderId,
    senderName,
    senderRole: 'buyer',
    senderAvatar,
    content: `Deposit Confirmed: ${senderName} deposited $${depositVal.toFixed(2)} into Escrow.`,
    timestamp: 'Just now',
    type: 'deposit_event',
    meta: { amount: depositVal },
  };

  const newTx: Transaction = {
    id: `tx_${Date.now()}`,
    type: 'deposit',
    amount: depositVal,
    description: `Deposited $${depositVal} to Escrow for "${ws.title}"`,
    timestamp: 'Just now',
    status: 'completed',
    workstreamTitle: ws.title,
  };

  ws.messages.push(eventMessage);
  mockTransactionsData.unshift(newTx);
  res.json(ws);
});

// POST raise invoice
router.post('/:id/invoices', (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount, description, senderId, senderName, senderRole, senderAvatar } = req.body;

  const ws = mockWorkStreamsData.find((w) => w.id === id);
  if (!ws) return res.status(404).json({ error: 'WorkStream not found' });

  const invAmount = parseFloat(amount) || 0;
  const newInvoice: Invoice = {
    id: `inv_${Date.now()}`,
    number: `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    amount: invAmount,
    description: description || `Milestone payment for ${ws.title}`,
    status: 'pending',
    issuedAt: 'Just now',
  };

  ws.invoices.push(newInvoice);
  ws.status = 'invoiced';

  const eventMessage: WorkStreamMessage = {
    id: `msg_inv_${Date.now()}`,
    senderId,
    senderName,
    senderRole,
    senderAvatar,
    content: `Invoice #${newInvoice.number} raised for $${invAmount.toFixed(2)}: ${description}`,
    timestamp: 'Just now',
    type: 'invoice_event',
    meta: { amount: invAmount, invoiceId: newInvoice.id },
  };

  ws.messages.push(eventMessage);
  res.status(201).json(ws);
});

// POST release escrow payment
router.post('/:id/release', (req: Request, res: Response) => {
  const { id } = req.params;
  const { invoiceId, senderId, senderName, senderAvatar } = req.body;

  const ws = mockWorkStreamsData.find((w) => w.id === id);
  if (!ws) return res.status(404).json({ error: 'WorkStream not found' });

  let releaseAmount = ws.escrowBalance;
  if (invoiceId) {
    const inv = ws.invoices.find((i) => i.id === invoiceId);
    if (inv) releaseAmount = Math.min(inv.amount, ws.escrowBalance);
  }
  if (releaseAmount <= 0) releaseAmount = ws.agreedAmount;

  ws.escrowBalance = Math.max(0, ws.escrowBalance - releaseAmount);
  ws.totalPaid += releaseAmount;
  if (ws.totalPaid >= ws.agreedAmount) {
    ws.status = 'completed';
  } else {
    ws.status = 'in_progress';
  }

  ws.invoices = ws.invoices.map((inv) =>
    invoiceId ? (inv.id === invoiceId ? { ...inv, status: 'paid' as const, paidAt: 'Just now' } : inv) : { ...inv, status: 'paid' as const, paidAt: 'Just now' }
  );

  const eventMessage: WorkStreamMessage = {
    id: `rel_${Date.now()}`,
    senderId,
    senderName,
    senderRole: 'buyer',
    senderAvatar,
    content: `Payment Released: $${releaseAmount.toFixed(2)} released from Escrow to ${ws.freelancerName}.`,
    timestamp: 'Just now',
    type: 'system_event',
    meta: { amount: releaseAmount },
  };

  const newTx: Transaction = {
    id: `tx_${Date.now()}`,
    type: 'release',
    amount: releaseAmount,
    description: `Released $${releaseAmount.toFixed(2)} to ${ws.freelancerName} for "${ws.title}"`,
    timestamp: 'Just now',
    status: 'completed',
    workstreamTitle: ws.title,
  };

  ws.messages.push(eventMessage);
  mockTransactionsData.unshift(newTx);
  res.json(ws);
});

// POST submit deliverable
router.post('/:id/deliverables', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, files, senderId, senderName, senderRole, senderAvatar } = req.body;

  const ws = mockWorkStreamsData.find((w) => w.id === id);
  if (!ws) return res.status(404).json({ error: 'WorkStream not found' });

  const newDeliverable: Deliverable = {
    id: `deliv_${Date.now()}`,
    title,
    description,
    files: files || [{ name: 'Deliverable_Files.zip', size: '15.2 MB' }],
    submittedAt: 'Just now',
    status: 'pending_approval',
  };

  ws.deliverables.push(newDeliverable);
  ws.status = 'deliverable_submitted';

  const eventMessage: WorkStreamMessage = {
    id: `msg_deliv_${Date.now()}`,
    senderId,
    senderName,
    senderRole,
    senderAvatar,
    content: `Deliverable Submitted: "${title}". ${description}`,
    timestamp: 'Just now',
    type: 'deliverable_event',
    attachments: newDeliverable.files,
    meta: { deliverableId: newDeliverable.id },
  };

  ws.messages.push(eventMessage);
  res.status(201).json(ws);
});

// POST approve deliverable
router.post('/:id/deliverables/:delivId/approve', (req: Request, res: Response) => {
  const { id, delivId } = req.params;
  const { senderId, senderName, senderAvatar } = req.body;

  const ws = mockWorkStreamsData.find((w) => w.id === id);
  if (!ws) return res.status(404).json({ error: 'WorkStream not found' });

  const deliv = ws.deliverables.find((d) => d.id === delivId);
  if (deliv) deliv.status = 'accepted';

  const eventMessage: WorkStreamMessage = {
    id: `msg_appr_${Date.now()}`,
    senderId,
    senderName,
    senderRole: 'buyer',
    senderAvatar,
    content: `Deliverable Approved: "${deliv?.title || 'Work'}" has been accepted.`,
    timestamp: 'Just now',
    type: 'system_event',
  };

  ws.messages.push(eventMessage);
  res.json(ws);
});

// POST submit review
router.post('/:id/reviews', (req: Request, res: Response) => {
  const { id } = req.params;
  const { rating, comment, reviewerId, reviewerName, reviewerRole, reviewerAvatar } = req.body;

  const ws = mockWorkStreamsData.find((w) => w.id === id);
  if (!ws) return res.status(404).json({ error: 'WorkStream not found' });

  const newReview: Review = {
    rating,
    comment,
    reviewerId,
    reviewerName,
    reviewerRole,
    createdAt: 'Just now',
  };

  ws.review = newReview;
  ws.status = 'completed';

  const eventMessage: WorkStreamMessage = {
    id: `msg_rev_${Date.now()}`,
    senderId: reviewerId,
    senderName: reviewerName,
    senderRole: reviewerRole,
    senderAvatar: reviewerAvatar,
    content: `${reviewerName} rated this project ${rating} / 5 Stars: "${comment}"`,
    timestamp: 'Just now',
    type: 'review_event',
    meta: { rating },
  };

  ws.messages.push(eventMessage);
  res.json(ws);
});

export const workstreamRouter = router;
