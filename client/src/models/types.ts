export interface UserProfile {
  id: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  createdAt: string;
}

export interface Measurements {
  chest: number;
  biceps: number;
  waist: number;
  hip: number;
  thigh: number;
}

export interface WeeklyEvolution {
  id: string;
  userId: string;
  week: number;
  date: string;
  weight: number;
  measurements: Measurements;
}

export interface UserData {
  profile: UserProfile;
  evolutions: WeeklyEvolution[];
}
