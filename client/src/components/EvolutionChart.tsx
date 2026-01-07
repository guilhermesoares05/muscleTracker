import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { WeeklyEvolution } from '@/models/types';

interface EvolutionChartProps {
  evolutions: WeeklyEvolution[];
}

export default function EvolutionChart({ evolutions }: EvolutionChartProps) {
  if (evolutions.length < 2) {
    return (
      <Card className="w-full p-6 border-l-4 border-l-primary">
        <h3 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'Poppins' }}>
          Gráfico de Evolução
        </h3>
        <p className="text-center text-muted-foreground py-8">
          Registre pelo menos 2 evoluções para visualizar o gráfico
        </p>
      </Card>
    );
  }

  const chartData = evolutions.map(evolution => ({
    week: `S${evolution.week}`,
    peito: evolution.measurements.chest,
    biceps: evolution.measurements.biceps,
    cintura: evolution.measurements.waist,
    quadril: evolution.measurements.hip,
    coxa: evolution.measurements.thigh,
  }));

  return (
    <Card className="w-full p-6 border-l-4 border-l-primary">
      <h3 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'Poppins' }}>
        Gráfico de Evolução das Medidas
      </h3>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="week" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: '#1f2937' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="peito"
              stroke="#1e40af"
              dot={{ fill: '#1e40af', r: 4 }}
              activeDot={{ r: 6 }}
              name="Peito"
            />
            <Line
              type="monotone"
              dataKey="biceps"
              stroke="#16a34a"
              dot={{ fill: '#16a34a', r: 4 }}
              activeDot={{ r: 6 }}
              name="Bíceps"
            />
            <Line
              type="monotone"
              dataKey="cintura"
              stroke="#dc2626"
              dot={{ fill: '#dc2626', r: 4 }}
              activeDot={{ r: 6 }}
              name="Cintura"
            />
            <Line
              type="monotone"
              dataKey="quadril"
              stroke="#f59e0b"
              dot={{ fill: '#f59e0b', r: 4 }}
              activeDot={{ r: 6 }}
              name="Quadril"
            />
            <Line
              type="monotone"
              dataKey="coxa"
              stroke="#8b5cf6"
              dot={{ fill: '#8b5cf6', r: 4 }}
              activeDot={{ r: 6 }}
              name="Coxa"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
