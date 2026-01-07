import { useState, useEffect } from "react";
import InitialProfileForm from "@/components/InitialProfileForm";
import Dashboard from "@/components/Dashboard";
import { useMuscleTracker } from "@/hooks/useMuscleTracker";
import { certificateService } from "@/services/certificateService";
import { Measurements } from "@/models/types";
import { Loader } from "lucide-react";

export default function Home() {
  const {
    userData,
    currentWeek,
    isLoading,
    isCompleted,
    progressPercentage,
    initializeUser,
    addWeeklyEvolution,
  } = useMuscleTracker();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!isLoading && !userData) {
      setShowForm(true);
    }
  }, [isLoading, userData]);

  const handleInitializeUser = (data: any) => {
    initializeUser(data);
    setShowForm(false);
  };

  const handleAddEvolution = (measurements: Measurements) => {
    addWeeklyEvolution(measurements);
  };

  const handleGenerateCertificate = () => {
    if (userData) {
      certificateService.generateCertificate(userData);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (showForm || !userData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Muscle Tracker
          </h1>
          <p className="text-muted-foreground">
            Acompanhe sua evolução na musculação semana a semana
          </p>
        </div>
        <InitialProfileForm onSubmit={handleInitializeUser} />
      </div>
    );
  }

  return (
    <Dashboard
      userData={userData}
      currentWeek={currentWeek}
      progressPercentage={progressPercentage}
      isCompleted={isCompleted}
      onAddEvolution={handleAddEvolution}
      onGenerateCertificate={handleGenerateCertificate}
    />
  );
}
