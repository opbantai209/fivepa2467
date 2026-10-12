import { Router, Request, Response } from 'express';
import { mockOffersData, mockWorkStreamsData, mockUsersData, mockTransactionsData } from '../data';
import { Offer, WorkStream, Transaction } from '../../src/types';

const router = Router();

// GET all offers
router.get('/', (req: Request, res: Response) => {
  res.json(mockOffersData);
});

// POST create offer (Hourlie)
router.post('/', (req: Request, res: Response) => {
  const { title, description, category, price, deliveryDays, tags, whatsIncluded, freelancerId } = req.body;
  const freelancer = mockUsersData.find((u) => u.id === freelancerId) || mockUsersData[1];

  const newOffer: Offer = {
    id: `offer_${Date.now()}`,
    title,
    description,
    category,
    price: parseFloat(price) || 150,
    deliveryDays: parseInt(deliveryDays) || 2,
    rating: 5.0,
    reviewCount: 0,
    salesCount: 0,
    freelancerId: freelancer.id,
    freelancerName: freelancer.name,
    freelancerAvatar: freelancer.avatar,
    freelancerCert: freelancer.certLevel,
    freelancerHourlyRate: freelancer.hourlyRate,
    tags: tags || ['Hourlie', category],
    whatsIncluded: whatsIncluded || ['Professional Service Delivery'],
  };

  mockOffersData.unshift(newOffer);
  res.status(201).json(newOffer);
});

// POST buy offer (creates WorkStream & funds escrow)
router.post('/:id/buy', (req: Request, res: Response) => {
  const { id } = req.params;
  const { buyerId } = req.body;

  const offer = mockOffersData.find((o) => o.id === id);
  if (!offer) {
    return res.status(404).json({ error: 'Offer not found' });
  }

  const buyer = mockUsersData.find((u) => u.id === buyerId) || mockUsersData[0];

  const newWsId = `ws_offer_${Date.now()}`;
  const newWorkStream: WorkStream = {
    id: newWsId,
    offerId: offer.id,
    title: offer.title,
    category: offer.category,
    buyerId: buyer.id,
    buyerName: buyer.name,
    buyerAvatar: buyer.avatar,
    freelancerId: offer.freelancerId,
    freelancerName: offer.freelancerName,
    freelancerAvatar: offer.freelancerAvatar,
    freelancerCert: offer.freelancerCert,
    status: 'in_progress',
    projectType: 'fixed',
    agreedAmount: offer.price,
    escrowBalance: offer.price,
    totalPaid: 0,
    unreadCount: 0,
    lastActivity: 'Just now',
    messages: [
      {
        id: `msg_init_${Date.now()}`,
        senderId: buyer.id,
        senderName: buyer.name,
        senderRole: 'buyer',
        senderAvatar: buyer.avatar,
        content: `Hi ${offer.freelancerName}! I purchased your Hourlie offer: "${offer.title}".`,
        timestamp: 'Just now',
        type: 'message',
      },
      {
        id: `msg_escrow_${Date.now()}`,
        senderId: 'system',
        senderName: 'WorkStream Escrow System',
        senderRole: 'buyer',
        senderAvatar: buyer.avatar,
        content: `Escrow Secured: $${offer.price.toFixed(2)} funded into Escrow.`,
        timestamp: 'Just now',
        type: 'deposit_event',
        meta: { amount: offer.price },
      },
    ],
    invoices: [],
    deliverables: [],
  };

  const newTx: Transaction = {
    id: `tx_${Date.now()}`,
    type: 'deposit',
    amount: offer.price,
    description: `Escrow Deposit for Offer: "${offer.title}"`,
    timestamp: 'Just now',
    status: 'completed',
    workstreamTitle: offer.title,
  };

  offer.salesCount += 1;
  mockWorkStreamsData.unshift(newWorkStream);
  mockTransactionsData.unshift(newTx);

  res.status(201).json(newWorkStream);
});

export const offerRouter = router;
