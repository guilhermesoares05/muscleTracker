import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserData } from '@/models/types';
import ProgressCard from './ProgressCard';
import EvolutionHistory from './EvolutionHistory';
import EvolutionChart from './EvolutionChart';
import WeeklyEvolutionForm from './WeeklyEvolutionForm';

interface DashboardProps {
  userData: UserData;
  currentWeek: number;
  progressPercentage: number;
  isCompleted: boolean;
  onAddEvolution: (measurements: any) => void;
  onGenerateCertificate: () => void;
}

export default function Dashboard({
  userData,
  currentWeek,
  progressPercentage,
  isCompleted,
  onAddEvolution,
  onGenerateCertificate,
}: DashboardProps) {
  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = (measurements: any) => {
    onAddEvolution(measurements);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground" style={{ fontFamily: 'Poppins' }}>
            Muscle Tracker
          </h1>
          <p className="text-muted-foreground">
            Bem-vindo, <span className="font-semibold text-foreground">{userData.profile.name}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border-l-4 border-l-primary">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Dados Pessoais</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Idade:</span>
                <span className="font-semibold text-foreground">{userData.profile.age} anos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Peso:</span>
                <span className="font-semibold text-foreground">{userData.profile.weight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Altura:</span>
                <span className="font-semibold text-foreground">{userData.profile.height} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">IMC:</span>
                <span className="font-semibold text-foreground">
                  {(userData.profile.weight / ((userData.profile.height / 100) ** 2)).toFixed(1)}
                </span>
              </div>
            </div>
          </Card>

          <ProgressCard
            currentWeek={currentWeek}
            progressPercentage={progressPercentage}
            isCompleted={isCompleted}
          />
        </div>

        {showForm ? (
          <WeeklyEvolutionForm
            week={currentWeek}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <div className="flex gap-3">
            {!isCompleted && (
              <Button
                onClick={() => setShowForm(true)}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6"
              >
                Registrar Evolução Semana {currentWeek}
              </Button>
            )}
            {isCompleted && (
              <Button
                onClick={onGenerateCertificate}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
              >
                📜 Baixar Certificado
              </Button>
            )}
          </div>
        )}

        {userData.evolutions.length > 0 && <EvolutionChart evolutions={userData.evolutions} />}

        <EvolutionHistory evolutions={userData.evolutions} />
      </div>
    </div>
  );
}
