import { useState, useEffect } from 'react';
import { UserData, UserProfile, WeeklyEvolution, Measurements } from '@/models/types';
import { storageService } from '@/services/storageService';
import { nanoid } from 'nanoid';

export const useMuscleTracker = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = storageService.getUserData();
    setUserData(data);
    if (data) {
      setCurrentWeek(data.evolutions.length + 1);
    }
    setIsLoading(false);
  }, []);

  const initializeUser = (profile: Omit<UserProfile, 'id' | 'createdAt'>) => {
    const newProfile: UserProfile = {
      ...profile,
      id: nanoid(),
      createdAt: new Date().toISOString(),
    };
    const data = storageService.initializeUser(newProfile);
    setUserData(data);
    setCurrentWeek(1);
  };

  const addWeeklyEvolution = (measurements: Measurements) => {
    if (!userData) throw new Error('User not initialized');

    const evolution: WeeklyEvolution = {
      id: nanoid(),
      userId: userData.profile.id,
      week: currentWeek,
      date: new Date().toISOString(),
      weight: userData.profile.weight,
      measurements,
    };

    storageService.addEvolution(evolution);
    const updatedData = storageService.getUserData();
    setUserData(updatedData);
    setCurrentWeek(currentWeek + 1);
  };

  const updateUserWeight = (weight: number) => {
    if (!userData) throw new Error('User not initialized');
    const updatedProfile = { ...userData.profile, weight };
    storageService.updateProfile(updatedProfile);
    const updatedData = storageService.getUserData();
    setUserData(updatedData);
  };

  const isCompleted = currentWeek > 12;

  const progressPercentage = Math.min((currentWeek - 1) / 12 * 100, 100);

  return {
    userData,
    currentWeek,
    isLoading,
    isCompleted,
    progressPercentage,
    initializeUser,
    addWeeklyEvolution,
    updateUserWeight,
  };
};
