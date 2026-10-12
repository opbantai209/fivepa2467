import { Router, Request, Response } from 'express';
import { mockProjectsData, mockWorkStreamsData, mockUsersData } from '../data';
import { Project, WorkStream } from '../../src/types';

const router = Router();

// GET all projects
router.get('/', (req: Request, res: Response) => {
  res.json(mockProjectsData);
});

// POST create project
router.post('/', (req: Request, res: Response) => {
  const { title, description, category, projectType, budget, duration, experienceLevel, tags, buyerId } = req.body;
  const buyer = mockUsersData.find((u) => u.id === buyerId) || mockUsersData[0];

  const newProject: Project = {
    id: `proj_${Date.now()}`,
    title,
    description,
    category,
    projectType,
    budget: parseFloat(budget) || 500,
    duration,
    experienceLevel,
    proposalsCount: 0,
    buyerId: buyer.id,
    buyerName: buyer.name,
    buyerAvatar: buyer.avatar,
    buyerLocation: buyer.location,
    buyerSpent: buyer.totalEarnedOrSpent,
    createdAt: 'Just now',
    status: 'open',
    tags: tags || ['Web Development'],
    urgent: false,
    remote: true,
  };

  mockProjectsData.unshift(newProject);
  res.status(201).json(newProject);
});

// POST submit proposal on project (creates WorkStream)
router.post('/:id/proposals', (req: Request, res: Response) => {
  const { id } = req.params;
  const { freelancerId, amount, days, coverLetter } = req.body;

  const proj = mockProjectsData.find((p) => p.id === id);
  if (!proj) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const freelancer = mockUsersData.find((u) => u.id === freelancerId) || mockUsersData[1];

  const newWsId = `ws_${Date.now()}`;
  const newWorkStream: WorkStream = {
    id: newWsId,
    projectId: proj.id,
    title: proj.title,
    category: proj.category,
    buyerId: proj.buyerId,
    buyerName: proj.buyerName,
    buyerAvatar: proj.buyerAvatar,
    freelancerId: freelancer.id,
    freelancerName: freelancer.name,
    freelancerAvatar: freelancer.avatar,
    freelancerCert: freelancer.certLevel,
    status: 'proposal_sent',
    projectType: proj.projectType,
    agreedAmount: parseFloat(amount) || proj.budget,
    escrowBalance: 0,
    totalPaid: 0,
    unreadCount: 0,
    lastActivity: 'Just now',
    messages: [
      {
        id: `msg_prop_${Date.now()}`,
        senderId: freelancer.id,
        senderName: freelancer.name,
        senderRole: 'freelancer',
        senderAvatar: freelancer.avatar,
        content: coverLetter || 'Proposal submitted for your project review.',
        timestamp: 'Just now',
        type: 'message',
      },
    ],
    invoices: [],
    deliverables: [],
  };

  proj.proposalsCount += 1;
  mockWorkStreamsData.unshift(newWorkStream);
  res.status(201).json(newWorkStream);
});

export const projectRouter = router;
