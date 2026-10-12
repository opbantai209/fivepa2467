import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Project,
  Offer,
  WorkStream,
  WorkStreamMessage,
  WorkStreamAttachment,
  Invoice,
  Deliverable,
  Transaction,
  Review,
} from '../types';
import {
  mockUsers,
  mockProjects,
  mockOffers,
  mockWorkStreams,
  mockTransactions,
} from '../data/mockData';

interface AppContextType {
  currentPersona: User;
  switchPersona: (userId: string) => void;
  activeTab: 'home' | 'projects' | 'offers' | 'freelancers' | 'workstream' | 'wallet';
  setActiveTab: (tab: 'home' | 'projects' | 'offers' | 'freelancers' | 'workstream' | 'wallet') => void;
  workstreams: WorkStream[];
  activeWorkStreamId: string | null;
  setActiveWorkStreamId: (id: string | null) => void;
  activeWorkStream: WorkStream | null;
  projects: Project[];
  offers: Offer[];
  freelancers: User[];
  transactions: Transaction[];
  buyerWallet: { available: number; inEscrow: number };
  sellerWallet: { available: number; inEscrow: number; pendingInvoices: number };
  sendWorkStreamMessage: (
    workstreamId: string,
    content: string,
    attachments?: WorkStreamAttachment[]
  ) => void;
  simulateCounterpartyReply: (workstreamId: string) => void;
  depositToEscrow: (workstreamId: string, amount: number) => void;
  raiseInvoice: (workstreamId: string, amount: number, description: string) => void;
  releaseEscrowPayment: (workstreamId: string, invoiceId?: string) => void;
  submitDeliverable: (
    workstreamId: string,
    title: string,
    description: string,
    files: WorkStreamAttachment[]
  ) => void;
  approveDeliverable: (workstreamId: string, deliverableId: string) => void;
  submitReview: (workstreamId: string, rating: number, comment: string) => void;
  createProject: (newProject: Omit<Project, 'id' | 'createdAt' | 'proposalsCount' | 'status' | 'buyerSpent' | 'buyerAvatar' | 'buyerName' | 'buyerId' | 'buyerLocation'>) => void;
  createOffer: (newOffer: Omit<Offer, 'id' | 'rating' | 'reviewCount' | 'salesCount' | 'freelancerId' | 'freelancerName' | 'freelancerAvatar' | 'freelancerCert' | 'freelancerHourlyRate'>) => void;
  sendProposal: (projectId: string, amount: number, days: number, coverLetter: string) => string;
  buyOffer: (offerId: string) => string;
  selectedProjectDetail: Project | null;
  setSelectedProjectDetail: (p: Project | null) => void;
  selectedOfferDetail: Offer | null;
  setSelectedOfferDetail: (o: Offer | null) => void;
  selectedFreelancerDetail: User | null;
  setSelectedFreelancerDetail: (u: User | null) => void;
  isPostProjectOpen: boolean;
  setIsPostProjectOpen: (open: boolean) => void;
  isPostOfferOpen: boolean;
  setIsPostOfferOpen: (open: boolean) => void;
  notificationMessage: string | null;
  dismissNotification: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence via localStorage
  const [currentPersona, setCurrentPersona] = useState<User>(() => {
    const saved = localStorage.getItem('pph_persona');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return mockUsers[0]; // Alex Chen (Buyer)
  });

  const [activeTab, setActiveTab] = useState<'home' | 'projects' | 'offers' | 'freelancers' | 'workstream' | 'wallet'>('home');
  const [workstreams, setWorkstreams] = useState<WorkStream[]>(() => {
    const saved = localStorage.getItem('pph_workstreams');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return mockWorkStreams;
  });

  const [activeWorkStreamId, setActiveWorkStreamId] = useState<string | null>(() => {
    return mockWorkStreams[0]?.id || null;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('pph_projects');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return mockProjects;
  });

  const [offers, setOffers] = useState<Offer[]>(() => {
    const saved = localStorage.getItem('pph_offers');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return mockOffers;
  });

  const [freelancers] = useState<User[]>(mockUsers.filter((u) => u.role === 'freelancer'));
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('pph_transactions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return mockTransactions;
  });

  const [selectedProjectDetail, setSelectedProjectDetail] = useState<Project | null>(null);
  const [selectedOfferDetail, setSelectedOfferDetail] = useState<Offer | null>(null);
  const [selectedFreelancerDetail, setSelectedFreelancerDetail] = useState<User | null>(null);
  const [isPostProjectOpen, setIsPostProjectOpen] = useState<boolean>(false);
  const [isPostOfferOpen, setIsPostOfferOpen] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('pph_persona', JSON.stringify(currentPersona));
  }, [currentPersona]);

  useEffect(() => {
    localStorage.setItem('pph_workstreams', JSON.stringify(workstreams));
  }, [workstreams]);

  useEffect(() => {
    localStorage.setItem('pph_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('pph_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('pph_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const notify = (msg: string) => {
    setNotificationMessage(msg);
  };

  const dismissNotification = () => setNotificationMessage(null);

  // Switch persona between Alex (Buyer), Sarah (Freelancer CERT 5), Marcus (Freelancer CERT 5), Elena (CERT 4)
  const switchPersona = (userId: string) => {
    const found = mockUsers.find((u) => u.id === userId);
    if (found) {
      setCurrentPersona(found);
      notify(`Switched perspective to ${found.name} (${found.role === 'buyer' ? 'Buyer' : `CERT ${found.certLevel} Freelancer`})`);
    }
  };

  const activeWorkStream = workstreams.find((ws) => ws.id === activeWorkStreamId) || null;

  // Calculate wallet metrics based on active workstreams & transactions
  const totalInEscrow = workstreams.reduce((acc, ws) => acc + ws.escrowBalance, 0);
  const totalBuyerSpent = workstreams.reduce((acc, ws) => acc + ws.totalPaid, 0);

  const buyerWallet = {
    available: Math.max(0, 4800 - totalInEscrow - totalBuyerSpent),
    inEscrow: totalInEscrow,
  };

  const sellerWallet = {
    available: currentPersona.role === 'freelancer' ? currentPersona.totalEarnedOrSpent : 0,
    inEscrow: workstreams
      .filter((ws) => ws.freelancerId === currentPersona.id)
      .reduce((acc, ws) => acc + ws.escrowBalance, 0),
    pendingInvoices: workstreams
      .filter((ws) => ws.freelancerId === currentPersona.id)
      .flatMap((ws) => ws.invoices)
      .filter((inv) => inv.status === 'pending')
      .reduce((acc, inv) => acc + inv.amount, 0),
  };

  // Send message in workstream
  const sendWorkStreamMessage = (
    workstreamId: string,
    content: string,
    attachments: WorkStreamAttachment[] = []
  ) => {
    if (!content.trim() && attachments.length === 0) return;

    const newMessage: WorkStreamMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentPersona.id,
      senderName: currentPersona.name,
      senderRole: currentPersona.role,
      senderAvatar: currentPersona.avatar,
      content,
      timestamp: 'Just now',
      type: 'message',
      attachments,
    };

    setWorkstreams((prev) =>
      prev.map((ws) => {
        if (ws.id !== workstreamId) return ws;
        return {
          ...ws,
          lastActivity: 'Just now',
          messages: [...ws.messages, newMessage],
        };
      })
    );
  };

  // Simulate counterparty reply in the active WorkStream
  const simulateCounterpartyReply = (workstreamId: string) => {
    const ws = workstreams.find((w) => w.id === workstreamId);
    if (!ws) return;

    const isCurrentBuyer = currentPersona.id === ws.buyerId;
    const responderName = isCurrentBuyer ? ws.freelancerName : ws.buyerName;
    const responderAvatar = isCurrentBuyer ? ws.freelancerAvatar : ws.buyerAvatar;
    const responderRole = isCurrentBuyer ? 'freelancer' : 'buyer';
    const responderId = isCurrentBuyer ? ws.freelancerId : ws.buyerId;

    const possibleReplies = isCurrentBuyer
      ? [
          "Thank you for the update! I am making steady progress and will have the next deliverable uploaded for your review shortly.",
          "Received with thanks! I've incorporated the points you mentioned and verified everything matches the agreed project brief.",
          "Great news! Working on this right now. Please let me know if you need any adjustments or preview snapshots.",
          "Understood! I will push an updated build and attach the latest assets in this WorkStream within the next few hours.",
        ]
      : [
          "Looks fantastic! Really appreciate the swift turnaround and clear communication.",
          "Thank you for the update! The progress looks right on track with our project milestones.",
          "Reviewed the latest note! Everything aligns with our startup roadmap. Please proceed to the next stage.",
          "Great job! I will review the deliverables thoroughly and process the escrow milestone release.",
        ];

    const randomReply = possibleReplies[Math.floor(Math.random() * possibleReplies.length)];

    const replyMessage: WorkStreamMessage = {
      id: `reply_${Date.now()}`,
      senderId: responderId,
      senderName: responderName,
      senderRole: responderRole,
      senderAvatar: responderAvatar,
      content: randomReply,
      timestamp: 'Just now',
      type: 'message',
    };

    setWorkstreams((prev) =>
      prev.map((w) => {
        if (w.id !== workstreamId) return w;
        return {
          ...w,
          lastActivity: 'Just now',
          messages: [...w.messages, replyMessage],
        };
      })
    );

    notify(`New message from ${responderName} in "${ws.title.substring(0, 32)}..."`);
  };

  // Deposit into Escrow
  const depositToEscrow = (workstreamId: string, amount: number) => {
    const ws = workstreams.find((w) => w.id === workstreamId);
    if (!ws) return;

    const eventMessage: WorkStreamMessage = {
      id: `dep_${Date.now()}`,
      senderId: currentPersona.id,
      senderName: currentPersona.name,
      senderRole: 'buyer',
      senderAvatar: currentPersona.avatar,
      content: `Deposit Confirmed: ${currentPersona.name} deposited $${amount.toFixed(2)} into PeoplePerHour Escrow. Funds are securely locked until project deliverables are approved.`,
      timestamp: 'Just now',
      type: 'deposit_event',
      meta: { amount },
    };

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      type: 'deposit',
      amount,
      description: `Deposited $${amount} to Escrow for "${ws.title}"`,
      timestamp: 'Just now',
      status: 'completed',
      workstreamTitle: ws.title,
    };

    setWorkstreams((prev) =>
      prev.map((w) => {
        if (w.id !== workstreamId) return w;
        return {
          ...w,
          escrowBalance: w.escrowBalance + amount,
          status: 'in_progress',
          lastActivity: 'Just now',
          messages: [...w.messages, eventMessage],
        };
      })
    );

    setTransactions((prev) => [newTx, ...prev]);
    notify(`Successfully funded $${amount.toFixed(2)} into Escrow!`);
  };

  // Raise Invoice
  const raiseInvoice = (workstreamId: string, amount: number, description: string) => {
    const ws = workstreams.find((w) => w.id === workstreamId);
    if (!ws) return;

    const newInvoice: Invoice = {
      id: `inv_${Date.now()}`,
      number: `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      amount,
      description: description || `Milestone payment for ${ws.title}`,
      status: 'pending',
      issuedAt: 'Just now',
    };

    const eventMessage: WorkStreamMessage = {
      id: `msg_inv_${Date.now()}`,
      senderId: currentPersona.id,
      senderName: currentPersona.name,
      senderRole: 'freelancer',
      senderAvatar: currentPersona.avatar,
      content: `Invoice #${newInvoice.number} raised for $${amount.toFixed(2)}: ${description}. Awaiting buyer approval and release from Escrow.`,
      timestamp: 'Just now',
      type: 'invoice_event',
      meta: { amount, invoiceId: newInvoice.id },
    };

    setWorkstreams((prev) =>
      prev.map((w) => {
        if (w.id !== workstreamId) return w;
        return {
          ...w,
          invoices: [...w.invoices, newInvoice],
          status: 'invoiced',
          lastActivity: 'Just now',
          messages: [...w.messages, eventMessage],
        };
      })
    );

    notify(`Invoice #${newInvoice.number} issued for $${amount.toFixed(2)}`);
  };

  // Release Escrow Payment
  const releaseEscrowPayment = (workstreamId: string, invoiceId?: string) => {
    const ws = workstreams.find((w) => w.id === workstreamId);
    if (!ws) return;

    let releaseAmount = ws.escrowBalance;
    if (invoiceId) {
      const inv = ws.invoices.find((i) => i.id === invoiceId);
      if (inv) releaseAmount = Math.min(inv.amount, ws.escrowBalance);
    }
    if (releaseAmount <= 0) releaseAmount = ws.agreedAmount;

    const eventMessage: WorkStreamMessage = {
      id: `rel_${Date.now()}`,
      senderId: currentPersona.id,
      senderName: currentPersona.name,
      senderRole: 'buyer',
      senderAvatar: currentPersona.avatar,
      content: `Payment Released: ${currentPersona.name} approved the work and released $${releaseAmount.toFixed(2)} from Escrow to ${ws.freelancerName}.`,
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

    setWorkstreams((prev) =>
      prev.map((w) => {
        if (w.id !== workstreamId) return w;
        const updatedInvoices = w.invoices.map((inv) =>
          invoiceId ? (inv.id === invoiceId ? { ...inv, status: 'paid' as const, paidAt: 'Just now' } : inv) : { ...inv, status: 'paid' as const, paidAt: 'Just now' }
        );
        const newEscrow = Math.max(0, w.escrowBalance - releaseAmount);
        const newTotalPaid = w.totalPaid + releaseAmount;
        const isComplete = newTotalPaid >= w.agreedAmount;

        return {
          ...w,
          escrowBalance: newEscrow,
          totalPaid: newTotalPaid,
          status: isComplete ? 'completed' : 'in_progress',
          invoices: updatedInvoices,
          lastActivity: 'Just now',
          messages: [...w.messages, eventMessage],
        };
      })
    );

    setTransactions((prev) => [newTx, ...prev]);
    notify(`Escrow payment of $${releaseAmount.toFixed(2)} released to ${ws.freelancerName}!`);
  };

  // Submit Deliverable
  const submitDeliverable = (
    workstreamId: string,
    title: string,
    description: string,
    files: WorkStreamAttachment[]
  ) => {
    const ws = workstreams.find((w) => w.id === workstreamId);
    if (!ws) return;

    const newDeliverable: Deliverable = {
      id: `deliv_${Date.now()}`,
      title,
      description,
      files: files.length > 0 ? files : [{ name: `${title.replace(/\s+/g, '_')}_Deliverables.zip`, size: '18.4 MB' }],
      submittedAt: 'Just now',
      status: 'pending_approval',
    };

    const eventMessage: WorkStreamMessage = {
      id: `msg_deliv_${Date.now()}`,
      senderId: currentPersona.id,
      senderName: currentPersona.name,
      senderRole: 'freelancer',
      senderAvatar: currentPersona.avatar,
      content: `Deliverable Submitted: "${title}". ${description}`,
      timestamp: 'Just now',
      type: 'deliverable_event',
      attachments: newDeliverable.files,
      meta: { deliverableId: newDeliverable.id },
    };

    setWorkstreams((prev) =>
      prev.map((w) => {
        if (w.id !== workstreamId) return w;
        return {
          ...w,
          deliverables: [...w.deliverables, newDeliverable],
          status: 'deliverable_submitted',
          lastActivity: 'Just now',
          messages: [...w.messages, eventMessage],
        };
      })
    );

    notify(`Deliverable "${title}" submitted to buyer!`);
  };

  // Approve Deliverable
  const approveDeliverable = (workstreamId: string, deliverableId: string) => {
    const ws = workstreams.find((w) => w.id === workstreamId);
    if (!ws) return;

    const deliv = ws.deliverables.find((d) => d.id === deliverableId);
    const delivTitle = deliv ? deliv.title : 'Deliverable';

    const eventMessage: WorkStreamMessage = {
      id: `msg_appr_${Date.now()}`,
      senderId: currentPersona.id,
      senderName: currentPersona.name,
      senderRole: 'buyer',
      senderAvatar: currentPersona.avatar,
      content: `Deliverable Approved: ${currentPersona.name} officially approved "${delivTitle}".`,
      timestamp: 'Just now',
      type: 'system_event',
    };

    setWorkstreams((prev) =>
      prev.map((w) => {
        if (w.id !== workstreamId) return w;
        return {
          ...w,
          deliverables: w.deliverables.map((d) =>
            d.id === deliverableId ? { ...d, status: 'accepted' as const } : d
          ),
          lastActivity: 'Just now',
          messages: [...w.messages, eventMessage],
        };
      })
    );

    notify(`Approved "${delivTitle}"! You can now release escrow funds.`);
  };

  // Submit Review
  const submitReview = (workstreamId: string, rating: number, comment: string) => {
    const ws = workstreams.find((w) => w.id === workstreamId);
    if (!ws) return;

    const newReview: Review = {
      rating,
      comment,
      reviewerId: currentPersona.id,
      reviewerName: currentPersona.name,
      reviewerRole: currentPersona.role,
      createdAt: 'Just now',
    };

    const eventMessage: WorkStreamMessage = {
      id: `msg_rev_${Date.now()}`,
      senderId: currentPersona.id,
      senderName: currentPersona.name,
      senderRole: currentPersona.role,
      senderAvatar: currentPersona.avatar,
      content: `${currentPersona.name} rated this project ${rating} / 5 Stars: "${comment}"`,
      timestamp: 'Just now',
      type: 'review_event',
      meta: { rating },
    };

    setWorkstreams((prev) =>
      prev.map((w) => {
        if (w.id !== workstreamId) return w;
        return {
          ...w,
          review: newReview,
          status: 'completed',
          lastActivity: 'Just now',
          messages: [...w.messages, eventMessage],
        };
      })
    );

    notify(`Thank you! Review of ${rating} stars published.`);
  };

  // Create Project
  const createProject = (
    newProjData: Omit<Project, 'id' | 'createdAt' | 'proposalsCount' | 'status' | 'buyerSpent' | 'buyerAvatar' | 'buyerName' | 'buyerId' | 'buyerLocation'>
  ) => {
    const newProject: Project = {
      ...newProjData,
      id: `proj_${Date.now()}`,
      createdAt: 'Just now',
      proposalsCount: 0,
      status: 'open',
      buyerId: currentPersona.id,
      buyerName: currentPersona.name,
      buyerAvatar: currentPersona.avatar,
      buyerLocation: currentPersona.location,
      buyerSpent: currentPersona.totalEarnedOrSpent,
    };

    setProjects((prev) => [newProject, ...prev]);
    setIsPostProjectOpen(false);
    setActiveTab('projects');
    notify(`Project "${newProject.title}" posted successfully to PeoplePerHour!`);
  };

  // Create Offer (Hourlie)
  const createOffer = (
    newOfferData: Omit<Offer, 'id' | 'rating' | 'reviewCount' | 'salesCount' | 'freelancerId' | 'freelancerName' | 'freelancerAvatar' | 'freelancerCert' | 'freelancerHourlyRate'>
  ) => {
    const newOffer: Offer = {
      ...newOfferData,
      id: `offer_${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      salesCount: 0,
      freelancerId: currentPersona.id,
      freelancerName: currentPersona.name,
      freelancerAvatar: currentPersona.avatar,
      freelancerCert: currentPersona.certLevel,
      freelancerHourlyRate: currentPersona.hourlyRate,
    };

    setOffers((prev) => [newOffer, ...prev]);
    setIsPostOfferOpen(false);
    setActiveTab('offers');
    notify(`Offer "${newOffer.title}" published! Buyers can now order it instantly.`);
  };

  // Send Proposal on a Project (creates/links WorkStream)
  const sendProposal = (projectId: string, amount: number, days: number, coverLetter: string): string => {
    const proj = projects.find((p) => p.id === projectId);
    if (!proj) return '';

    // Check if workstream already exists for this project and current freelancer
    const existingWs = workstreams.find(
      (w) => w.projectId === projectId && w.freelancerId === currentPersona.id
    );

    if (existingWs) {
      setActiveWorkStreamId(existingWs.id);
      setActiveTab('workstream');
      return existingWs.id;
    }

    const newWsId = `ws_${Date.now()}`;
    const newWorkStream: WorkStream = {
      id: newWsId,
      projectId: proj.id,
      title: proj.title,
      category: proj.category,
      buyerId: proj.buyerId,
      buyerName: proj.buyerName,
      buyerAvatar: proj.buyerAvatar,
      freelancerId: currentPersona.id,
      freelancerName: currentPersona.name,
      freelancerAvatar: currentPersona.avatar,
      freelancerCert: currentPersona.certLevel,
      status: 'proposal_sent',
      projectType: proj.projectType,
      agreedAmount: amount,
      escrowBalance: 0,
      totalPaid: 0,
      unreadCount: 0,
      lastActivity: 'Just now',
      messages: [
        {
          id: `msg_prop_${Date.now()}`,
          senderId: currentPersona.id,
          senderName: currentPersona.name,
          senderRole: 'freelancer',
          senderAvatar: currentPersona.avatar,
          content: coverLetter,
          timestamp: 'Just now',
          type: 'message',
        },
        {
          id: `msg_event_${Date.now()}`,
          senderId: currentPersona.id,
          senderName: currentPersona.name,
          senderRole: 'freelancer',
          senderAvatar: currentPersona.avatar,
          content: `Proposal Submitted: $${amount.toFixed(2)} in ${days} days. Escrow deposit required to begin.`,
          timestamp: 'Just now',
          type: 'proposal_event',
          meta: { amount, days },
        },
      ],
      invoices: [],
      deliverables: [],
    };

    // Increment proposal count on project
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, proposalsCount: p.proposalsCount + 1 } : p))
    );

    setWorkstreams((prev) => [newWorkStream, ...prev]);
    setActiveWorkStreamId(newWsId);
    setActiveTab('workstream');
    setSelectedProjectDetail(null);
    notify(`Proposal submitted! Collaboration WorkStream initialized.`);
    return newWsId;
  };

  // Buy Offer (Hourlie) - creates WorkStream & funds escrow
  const buyOffer = (offerId: string): string => {
    const offer = offers.find((o) => o.id === offerId);
    if (!offer) return '';

    const newWsId = `ws_offer_${Date.now()}`;
    const newWorkStream: WorkStream = {
      id: newWsId,
      offerId: offer.id,
      title: offer.title,
      category: offer.category,
      buyerId: currentPersona.id,
      buyerName: currentPersona.name,
      buyerAvatar: currentPersona.avatar,
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
          senderId: currentPersona.id,
          senderName: currentPersona.name,
          senderRole: 'buyer',
          senderAvatar: currentPersona.avatar,
          content: `Hi ${offer.freelancerName}! I have purchased your Hourlie Offer: "${offer.title}". Looking forward to getting this done in ${offer.deliveryDays} days!`,
          timestamp: 'Just now',
          type: 'message',
        },
        {
          id: `msg_escrow_${Date.now()}`,
          senderId: 'system',
          senderName: 'WorkStream Escrow System',
          senderRole: 'buyer',
          senderAvatar: currentPersona.avatar,
          content: `Escrow Secured: $${offer.price.toFixed(2)} funded into Escrow. Freelancer notified to start work immediately.`,
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

    setWorkstreams((prev) => [newWorkStream, ...prev]);
    setTransactions((prev) => [newTx, ...prev]);
    setActiveWorkStreamId(newWsId);
    setActiveTab('workstream');
    setSelectedOfferDetail(null);
    notify(`Offer purchased! $${offer.price.toFixed(2)} secured in Escrow. WorkStream opened.`);
    return newWsId;
  };

  return (
    <AppContext.Provider
      value={{
        currentPersona,
        switchPersona,
        activeTab,
        setActiveTab,
        workstreams,
        activeWorkStreamId,
        setActiveWorkStreamId,
        activeWorkStream,
        projects,
        offers,
        freelancers,
        transactions,
        buyerWallet,
        sellerWallet,
        sendWorkStreamMessage,
        simulateCounterpartyReply,
        depositToEscrow,
        raiseInvoice,
        releaseEscrowPayment,
        submitDeliverable,
        approveDeliverable,
        submitReview,
        createProject,
        createOffer,
        sendProposal,
        buyOffer,
        selectedProjectDetail,
        setSelectedProjectDetail,
        selectedOfferDetail,
        setSelectedOfferDetail,
        selectedFreelancerDetail,
        setSelectedFreelancerDetail,
        isPostProjectOpen,
        setIsPostProjectOpen,
        isPostOfferOpen,
        setIsPostOfferOpen,
        notificationMessage,
        dismissNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
