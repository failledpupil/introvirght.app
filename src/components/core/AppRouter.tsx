import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { MainLayout } from '../layout/MainLayout';
import WriteView from '../pages/WriteView';
import MyEntriesView from '../pages/MyEntriesView';
import SearchView from '../pages/SearchView';
import AIAssistantView from '../pages/AIAssistantView';
import EntryDetailView from '../pages/EntryDetailView';
import { Onboarding } from './Onboarding';
import { LogoLoader } from '../branding/LogoLoader';
import { AnimatedLogo } from '../branding/AnimatedLogo';
import { initializeUnifiedTheme } from '../../stores/unifiedThemeStore';
import { initializeDiaryStore } from '../../stores/diaryStore';
import { initializeDefaultData } from '../../utils/database';

interface UserPreferences {
  name: string;
}

export function AppRouter() {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);

  useEffect(() => {
    async function initialize() {
      try {
        // Initialize database with default data
        await initializeDefaultData();

        // Initialize unified theme system
        initializeUnifiedTheme();

        // Initialize diary store
        await initializeDiaryStore();

        // Check if user has completed onboarding
        const savedPreferences = localStorage.getItem('userPreferences');
        if (savedPreferences) {
          setUserPreferences(JSON.parse(savedPreferences));
        } else {
          setShowOnboarding(true);
        }
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setIsLoading(false);
      }
    }

    initialize();
  }, []);

  const handleOnboardingComplete = (name: string) => {
    const preferences = { name };
    setUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    setShowOnboarding(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-paper flex items-center justify-center">
        <div className="text-center">
          <LogoLoader
            message="Preparing Your Diary"
            showMessage={true}
            pulseAnimation={true}
            size="xl"
            variant="full"
          />
          <p className="text-pencil-graphite/70 font-serif mt-4">Setting up your personal writing space...</p>
        </div>
      </div>
    );
  }

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-cream-paper flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <AnimatedLogo
            variant="full"
            size="xl"
            animation="entrance"
            className="mx-auto mb-8"
          />
          <Onboarding onComplete={handleOnboardingComplete} />
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <MainLayout userPreferences={userPreferences}>
          <Routes>
            <Route path="/" element={<WriteView />} />
            <Route path="/entries" element={<MyEntriesView />} />
            <Route path="/entries/:id" element={<EntryDetailView />} />
            <Route path="/search" element={<SearchView />} />
            <Route path="/assistant" element={<AIAssistantView />} />
          </Routes>
        </MainLayout>
      </Router>
    </ErrorBoundary>
  );
}