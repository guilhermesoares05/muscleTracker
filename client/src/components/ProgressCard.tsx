import { Card } from '@/components/ui/card';

interface ProgressCardProps {
  currentWeek: number;
  progressPercentage: number;
  isCompleted: boolean;
}

export default function ProgressCard({ currentWeek, progressPercentage, isCompleted }: ProgressCardProps) {
  return (
    <Card className="w-full p-6 border-l-4 border-l-primary bg-gradient-to-r from-background to-secondary/20">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'Poppins' }}>
            Progresso do Acompanhamento
          </h3>
          <span className="text-2xl font-bold text-primary" style={{ fontFamily: 'Poppins' }}>
            {currentWeek - 1}/12
          </span>
        </div>

        <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Semana 1</span>
          <span>Semana 12</span>
        </div>

        {isCompleted && (
          <div className="mt-4 p-3 bg-accent/10 border border-accent rounded-lg">
            <p className="text-sm font-medium text-accent text-center">
              🎉 Parabéns! Você completou as 12 semanas!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
