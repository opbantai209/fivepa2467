import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HomeHero } from './components/HomeHero';
import { WorkStreamView } from './components/WorkStreamView';
import { ProjectList } from './components/ProjectList';
import { OffersList } from './components/OffersList';
import { FreelancerList } from './components/FreelancerList';
import { WalletView } from './components/WalletView';
import { PostProjectModal } from './components/PostProjectModal';
import { PostOfferModal } from './components/PostOfferModal';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />

      <main className="flex-1">
        {activeTab === 'home' && <HomeHero />}
        {activeTab === 'workstream' && <WorkStreamView />}
        {activeTab === 'projects' && <ProjectList />}
        {activeTab === 'offers' && <OffersList />}
        {activeTab === 'freelancers' && <FreelancerList />}
        {activeTab === 'wallet' && <WalletView />}
      </main>

      <PostProjectModal />
      <PostOfferModal />
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
