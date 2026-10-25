import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { CreateScreen } from './components/CreateScreen';
import { StoryboardScreen } from './components/StoryboardScreen';
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

const pathToTab = (pathname) => {
  const cleanPath = (pathname || '').toLowerCase().replace(/\/+$/, '');
  switch (cleanPath) {
    case '/imagestudio':
    case '/create':
      return 'create';
    case '/storyboard':
      return 'storyboard';
    case '/ads':
      return 'ads';
    case '/characters':
      return 'characters';
    case '/editor':
    case '/edit':
      return 'edit';
    case '/mcp':
      return 'mcp';
    case '/prompts':
      return 'prompts';
    case '/library':
      return 'library';
    case '/projects':
      return 'projects';
    case '/account':
      return 'account';
    case '/settings':
      return 'settings';
    case '/explore':
    case '':
    case '/':
    default:
      return 'home';
  }
};

const tabToPath = {
  home: '/explore',
  create: '/imagestudio',
  storyboard: '/storyboard',
  ads: '/ads',
  characters: '/characters',
  edit: '/editor',
  mcp: '/mcp',
  prompts: '/prompts',
  library: '/library',
  projects: '/projects',
  account: '/account',
  settings: '/settings'
};

export default function App() {
  const [currentTab, setCurrentTab] = useState(() => {
    if (typeof window !== 'undefined') {
      return pathToTab(window.location.pathname);
    }
    return 'home';
  });
  const [editorTool, setEditorTool] = useState('prompt-edit');
  const [credits, setCredits] = useState(1250);
  const [isUnlimitedPlan, setIsUnlimitedPlan] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nanofield_unlimited_plan') === 'true';
    }
    return false;
  });
  const [initialPrompt, setInitialPrompt] = useState('');
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  const handleActivateUnlimited = () => {
    setIsUnlimitedPlan(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nanofield_unlimited_plan', 'true');
    }
  };

  useEffect(() => {
    const initialPath = window.location.pathname;
    const initialTab = pathToTab(initialPath);
    setCurrentTab(initialTab);

    // If query string has ?tool=xxx, set initial tool for editor
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const toolParam = searchParams.get('tool');
      if (toolParam) {
        setEditorTool(toolParam);
      }
    }

    // If user lands on root '/', update address bar to '/explore' cleanly
    if (initialPath === '/' || initialPath === '') {
      window.history.replaceState({ tab: 'home' }, '', '/explore');
    }

    const handlePopState = () => {
      const tabFromPath = pathToTab(window.location.pathname);
      setCurrentTab(tabFromPath);
      const searchParams = new URLSearchParams(window.location.search);
      const toolParam = searchParams.get('tool');
      if (toolParam) {
        setEditorTool(toolParam);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (tabId, toolId = null) => {
    setCurrentTab(tabId);
    let targetPath = tabToPath[tabId] || '/explore';
    if (tabId === 'edit' && toolId) {
      setEditorTool(toolId);
      targetPath = `/editor?tool=${toolId}`;
    }
    if (typeof window !== 'undefined' && window.location.pathname + window.location.search !== targetPath) {
      window.history.pushState({ tab: tabId, tool: toolId }, '', targetPath);
    }
  };

  const handleSelectStudioTool = (tool) => {
    if (tool.tab === 'storyboard') {
      handleNavigate('storyboard');
    } else if (tool.tab === 'create') {
      handleNavigate('create');
    } else {
      handleNavigate('edit', tool.tool || 'prompt-edit');
    }
  };

  const deductCredits = (amount) => {
    if (isUnlimitedPlan) return; // 30-Day Unlimited Nano Banana Pro Plan active!
    setCredits((prev) => Math.max(0, prev - amount));
  };

  return (
    <div className="flex min-h-screen bg-[#08080c] text-slate-100 font-sans antialiased selection:bg-purple-600 selection:text-white">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar 
          currentTab={currentTab} 
          setTab={handleNavigate} 
          isUnlimitedPlan={isUnlimitedPlan}
          onUpgradeClick={() => setIsUpgradeOpen(true)} 
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <Header 
          credits={credits} 
          isUnlimitedPlan={isUnlimitedPlan}
          onUpgradeClick={() => setIsUpgradeOpen(true)}
          onNewCreate={() => handleNavigate('create')}
          onSelectTool={handleSelectStudioTool}
        />

        <main className="flex-1 overflow-y-auto">
          {currentTab === 'home' && (
            <HomeScreen 
              setTab={handleNavigate} 
              setInitialPrompt={setInitialPrompt} 
              isUnlimitedPlan={isUnlimitedPlan}
              onActivateUnlimited={handleActivateUnlimited}
            />
          )}

          {currentTab === 'create' && (
            <CreateScreen 
              initialPrompt={initialPrompt} 
              deductCredits={deductCredits} 
              onSelectTool={handleSelectStudioTool}
              onNavigate={handleNavigate}
            />
          )}

          {currentTab === 'storyboard' && (
            <StoryboardScreen 
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
              initialTool={editorTool}
            />
          )}

          {currentTab === 'mcp' && (
            <McpDashboardScreen />
          )}

          {currentTab === 'prompts' && (
            <PromptLibraryScreen 
              setTab={handleNavigate} 
              setInitialPrompt={setInitialPrompt} 
            />
          )}

          {currentTab === 'library' && (
            <LibraryScreen 
              setTab={handleNavigate} 
              setInitialPrompt={setInitialPrompt} 
            />
          )}

          {currentTab === 'projects' && (
            <ProjectsScreen 
              setTab={handleNavigate} 
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
        setTab={handleNavigate} 
      />

      {/* Upgrade & Monetization Modal */}
      <UpgradeModal 
        isOpen={isUpgradeOpen} 
        onClose={() => setIsUpgradeOpen(false)} 
        isUnlimitedPlan={isUnlimitedPlan}
        onActivateUnlimited={handleActivateUnlimited}
      />
    </div>
  );
}
