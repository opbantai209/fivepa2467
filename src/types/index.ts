export type UserRole = 'buyer' | 'freelancer';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  title: string;
  certLevel: 1 | 2 | 3 | 4 | 5;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  jobSuccessPercent: number;
  location: string;
  completedJobs: number;
  totalEarnedOrSpent: number;
  skills: string[];
  bio: string;
  memberSince: string;
  isOnline?: boolean;
}

export type ProjectType = 'fixed' | 'hourly';
export type ProjectStatus = 'open' | 'in_progress' | 'completed' | 'closed';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  projectType: ProjectType;
  budget: number;
  duration: string;
  experienceLevel: 'Entry' | 'Intermediate' | 'Expert';
  proposalsCount: number;
  buyerId: string;
  buyerName: string;
  buyerAvatar: string;
  buyerLocation: string;
  buyerSpent: number;
  createdAt: string;
  status: ProjectStatus;
  tags: string[];
  urgent?: boolean;
  remote?: boolean;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  deliveryDays: number;
  rating: number;
  reviewCount: number;
  salesCount: number;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar: string;
  freelancerCert: 1 | 2 | 3 | 4 | 5;
  freelancerHourlyRate: number;
  imageUrl?: string;
  tags: string[];
  whatsIncluded: string[];
}

export type WorkStreamStatus =
  | 'proposal_sent'
  | 'deposit_required'
  | 'in_progress'
  | 'deliverable_submitted'
  | 'invoiced'
  | 'completed';

export interface WorkStreamAttachment {
  name: string;
  size: string;
  type?: string;
  url?: string;
}

export interface WorkStreamMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  senderAvatar: string;
  content: string;
  timestamp: string;
  type:
    | 'message'
    | 'system_event'
    | 'deposit_event'
    | 'proposal_event'
    | 'invoice_event'
    | 'deliverable_event'
    | 'review_event';
  attachments?: WorkStreamAttachment[];
  meta?: {
    amount?: number;
    invoiceId?: string;
    deliverableId?: string;
    rating?: number;
    days?: number;
  };
}

export interface Invoice {
  id: string;
  number: string;
  amount: number;
  description: string;
  status: 'pending' | 'paid' | 'cancelled';
  issuedAt: string;
  paidAt?: string;
}

export interface Deliverable {
  id: string;
  title: string;
  description: string;
  files: WorkStreamAttachment[];
  submittedAt: string;
  status: 'pending_approval' | 'accepted' | 'revision_requested';
}

export interface Review {
  rating: number;
  comment: string;
  reviewerId: string;
  reviewerName: string;
  reviewerRole: UserRole;
  createdAt: string;
}

export interface WorkStream {
  id: string;
  projectId?: string;
  offerId?: string;
  title: string;
  category: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar: string;
  freelancerCert: 1 | 2 | 3 | 4 | 5;
  status: WorkStreamStatus;
  projectType: ProjectType;
  agreedAmount: number;
  escrowBalance: number;
  totalPaid: number;
  unreadCount: number;
  lastActivity: string;
  messages: WorkStreamMessage[];
  invoices: Invoice[];
  deliverables: Deliverable[];
  review?: Review;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'release' | 'invoice_paid' | 'withdrawal';
  amount: number;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending';
  workstreamTitle?: string;
}
