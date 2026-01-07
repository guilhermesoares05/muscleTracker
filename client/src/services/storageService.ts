import { UserData, UserProfile, WeeklyEvolution, Measurements } from '@/models/types';

const STORAGE_KEY = 'muscle_tracker_data';

export const storageService = {
  getUserData: (): UserData | null => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  setUserData: (data: UserData): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  initializeUser: (profile: UserProfile): UserData => {
    const userData: UserData = {
      profile,
      evolutions: [],
    };
    storageService.setUserData(userData);
    return userData;
  },

  addEvolution: (evolution: WeeklyEvolution): void => {
    const userData = storageService.getUserData();
    if (!userData) throw new Error('User data not found');
    userData.evolutions.push(evolution);
    storageService.setUserData(userData);
  },

  updateProfile: (profile: UserProfile): void => {
    const userData = storageService.getUserData();
    if (!userData) throw new Error('User data not found');
    userData.profile = profile;
    storageService.setUserData(userData);
  },

  getEvolutionsByWeek: (week: number): WeeklyEvolution | undefined => {
    const userData = storageService.getUserData();
    return userData?.evolutions.find(e => e.week === week);
  },

  getAllEvolutions: (): WeeklyEvolution[] => {
    const userData = storageService.getUserData();
    return userData?.evolutions || [];
  },

  clearAllData: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },
};
