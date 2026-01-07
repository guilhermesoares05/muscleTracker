import { Card } from '@/components/ui/card';
import { WeeklyEvolution } from '@/models/types';

interface EvolutionHistoryProps {
  evolutions: WeeklyEvolution[];
}

export default function EvolutionHistory({ evolutions }: EvolutionHistoryProps) {
  if (evolutions.length === 0) {
    return (
      <Card className="w-full p-6 border-l-4 border-l-border">
        <h3 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'Poppins' }}>
          Histórico de Evoluções
        </h3>
        <p className="text-center text-muted-foreground py-8">
          Nenhuma evolução registrada ainda. Comece a acompanhar sua jornada!
        </p>
      </Card>
    );
  }

  return (
    <Card className="w-full p-6 border-l-4 border-l-primary">
      <h3 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'Poppins' }}>
        Histórico de Evoluções
      </h3>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {evolutions.map(evolution => (
          <div
            key={evolution.id}
            className="p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold text-primary" style={{ fontFamily: 'Poppins' }}>
                Semana {evolution.week}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(evolution.date).toLocaleDateString('pt-BR')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Peito:</span>
                <span className="ml-1 font-medium text-foreground">{evolution.measurements.chest} cm</span>
              </div>
              <div>
                <span className="text-muted-foreground">Bíceps:</span>
                <span className="ml-1 font-medium text-foreground">{evolution.measurements.biceps} cm</span>
              </div>
              <div>
                <span className="text-muted-foreground">Cintura:</span>
                <span className="ml-1 font-medium text-foreground">{evolution.measurements.waist} cm</span>
              </div>
              <div>
                <span className="text-muted-foreground">Quadril:</span>
                <span className="ml-1 font-medium text-foreground">{evolution.measurements.hip} cm</span>
              </div>
              <div>
                <span className="text-muted-foreground">Coxa:</span>
                <span className="ml-1 font-medium text-foreground">{evolution.measurements.thigh} cm</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
