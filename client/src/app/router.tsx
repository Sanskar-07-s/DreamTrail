import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { useAuth } from '../hooks/useAuth';

import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { OnboardingPage } from '../pages/OnboardingPage';
import { DashboardPage } from '../pages/DashboardPage';
import { DreamsPage } from '../pages/DreamsPage';
import { CreateDreamPage } from '../pages/CreateDreamPage';
import { DreamDetailPage } from '../pages/DreamDetailPage';
import { EditDreamPage } from '../pages/EditDreamPage';
import { LifeMapPage } from '../pages/LifeMapPage';
import { AIPlannerPage } from '../pages/AIPlannerPage';
import { MemoriesPage } from '../pages/MemoriesPage';
import { AchievementsPage } from '../pages/AchievementsPage';
import { StatisticsPage } from '../pages/StatisticsPage';
import { ExplorePage } from '../pages/ExplorePage';
import { FriendsPage } from '../pages/FriendsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { SettingsPage } from '../pages/SettingsPage';
import { NotFoundPage } from '../pages/NotFoundPage';

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-emerald-400 font-semibold text-sm">
        Loading DreamTrail...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <AppShell>{children}</AppShell>;
};

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },

  // Protected Application Routes
  { path: '/onboarding', element: <ProtectedRoute><OnboardingPage /></ProtectedRoute> },
  { path: '/dashboard', element: <ProtectedRoute><DashboardPage /></ProtectedRoute> },
  { path: '/dreams', element: <ProtectedRoute><DreamsPage /></ProtectedRoute> },
  { path: '/dreams/new', element: <ProtectedRoute><CreateDreamPage /></ProtectedRoute> },
  { path: '/dreams/:id', element: <ProtectedRoute><DreamDetailPage /></ProtectedRoute> },
  { path: '/dreams/:id/edit', element: <ProtectedRoute><EditDreamPage /></ProtectedRoute> },
  { path: '/map', element: <ProtectedRoute><LifeMapPage /></ProtectedRoute> },
  { path: '/ai-planner', element: <ProtectedRoute><AIPlannerPage /></ProtectedRoute> },
  { path: '/memories', element: <ProtectedRoute><MemoriesPage /></ProtectedRoute> },
  { path: '/achievements', element: <ProtectedRoute><AchievementsPage /></ProtectedRoute> },
  { path: '/statistics', element: <ProtectedRoute><StatisticsPage /></ProtectedRoute> },
  { path: '/explore', element: <ProtectedRoute><ExplorePage /></ProtectedRoute> },
  { path: '/friends', element: <ProtectedRoute><FriendsPage /></ProtectedRoute> },
  { path: '/profile', element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
  { path: '/settings', element: <ProtectedRoute><SettingsPage /></ProtectedRoute> },

  { path: '*', element: <NotFoundPage /> }
]);
