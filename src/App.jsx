import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { CreateScreen } from './components/CreateScreen';
import { AdsStudioScreen } from './components/AdsStudioScreen';
import { EditScreen } from './components/EditScreen';
import { CharactersScreen } from './components/CharactersScreen';
import { McpDashboardScreen } from './components/McpDashboardScreen';
import { PromptLibraryScreen } from './components/PromptLibraryScreen';
import { LibraryScreen } from './components/LibraryScreen';
import { ProjectsScreen } from './components/ProjectsScreen';
import { AccountScreen } from './components/AccountScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { MobileNav } from './components/MobileNav';
import { UpgradeModal } from './components/UpgradeModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [credits, setCredits] = useState(1250);
  const [initialPrompt, setInitialPrompt] = useState('');
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  const deductCredits = (amount) => {
    setCredits((prev) => Math.max(0, prev - amount));
  };

  return (
    <div className="flex min-h-screen bg-[#08080c] text-slate-100 font-sans antialiased selection:bg-purple-600 selection:text-white">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar 
          currentTab={currentTab} 
          setTab={setCurrentTab} 
          onUpgradeClick={() => setIsUpgradeOpen(true)} 
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <Header 
          credits={credits} 
          onUpgradeClick={() => setIsUpgradeOpen(true)}
          onNewCreate={() => setCurrentTab('create')}
        />

        <main className="flex-1 overflow-y-auto">
          {currentTab === 'home' && (
            <HomeScreen 
              setTab={setCurrentTab} 
              setInitialPrompt={setInitialPrompt} 
            />
          )}

          {currentTab === 'create' && (
            <CreateScreen 
              initialPrompt={initialPrompt} 
              deductCredits={deductCredits} 
            />
          )}

          {currentTab === 'ads' && (
            <AdsStudioScreen 
              deductCredits={deductCredits} 
            />
          )}

          {currentTab === 'characters' && (
            <CharactersScreen 
              deductCredits={deductCredits} 
            />
          )}

          {currentTab === 'edit' && (
            <EditScreen 
              deductCredits={deductCredits} 
            />
          )}

          {currentTab === 'mcp' && (
            <McpDashboardScreen />
          )}

          {currentTab === 'prompts' && (
            <PromptLibraryScreen 
              setTab={setCurrentTab} 
              setInitialPrompt={setInitialPrompt} 
            />
          )}

          {currentTab === 'library' && (
            <LibraryScreen 
              setTab={setCurrentTab} 
              setInitialPrompt={setInitialPrompt} 
            />
          )}

          {currentTab === 'projects' && (
            <ProjectsScreen 
              setTab={setCurrentTab} 
            />
          )}

          {currentTab === 'account' && (
            <AccountScreen 
              credits={credits} 
              onUpgradeClick={() => setIsUpgradeOpen(true)} 
            />
          )}

          {currentTab === 'settings' && (
            <SettingsScreen />
          )}
        </main>
      </div>

      {/* Mobile Floating Bottom Bar */}
      <MobileNav 
        currentTab={currentTab} 
        setTab={setCurrentTab} 
      />

      {/* Upgrade & Monetization Modal */}
      <UpgradeModal 
        isOpen={isUpgradeOpen} 
        onClose={() => setIsUpgradeOpen(false)} 
      />
    </div>
  );
}
