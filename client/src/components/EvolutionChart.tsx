import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WeeklyEvolution } from "@/models/types";
import { RotateCw, TrendingUp } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface EvolutionChartProps {
  evolutions: WeeklyEvolution[];
}

export default function EvolutionChart({ evolutions }: EvolutionChartProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (evolutions.length < 2) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gráfico de Evolução</CardTitle>
          <CardDescription>
            Acompanhe a sua evolução ao longo das semanas.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <TrendingUp className="w-16 h-16 text-muted-foreground mb-4" />
          <p className="text-center text-muted-foreground">
            Registre pelo menos 2 evoluções para visualizar o gráfico.
          </p>
        </CardContent>
      </Card>
    );
  }

  const chartData = evolutions.map((evolution) => ({
    week: `S${evolution.week}`,
    peito: evolution.measurements.chest,
    biceps: evolution.measurements.biceps,
    cintura: evolution.measurements.waist,
    quadril: evolution.measurements.hip,
    coxa: evolution.measurements.thigh,
  }));

  const lineData = [
    { dataKey: "peito", name: "Peito", color: "hsl(var(--color-chart-1))" },
    { dataKey: "biceps", name: "Bíceps", color: "hsl(var(--color-chart-2))" },
    { dataKey: "cintura", name: "Cintura", color: "hsl(var(--color-chart-3))" },
    { dataKey: "quadril", name: "Quadril", color: "hsl(var(--color-chart-4))" },
    { dataKey: "coxa", name: "Coxa", color: "hsl(var(--color-chart-5))" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico de Evolução das Medidas</CardTitle>
        <CardDescription>
          Acompanhe a sua evolução ao longo das semanas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isMobile && (
          <div className="flex items-center justify-center text-sm text-muted-foreground mb-4">
            <RotateCw className="w-4 h-4 mr-2" />
            <span>Gire a tela para uma melhor visualização</span>
          </div>
        )}
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: isMobile ? 0 : 30, left: isMobile ? -30 : 0, bottom: isMobile ? 20 : 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={isMobile ? 10 : 12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={isMobile ? 10 : 12}/>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Legend verticalAlign={isMobile ? "bottom" : "top"} wrapperStyle={{bottom: 0, left: 20}} height={isMobile ? 50 : 36} />
              {lineData.map((line) => (
                <Line
                  key={line.dataKey}
                  type="monotone"
                  dataKey={line.dataKey}
                  stroke={line.color}
                  dot={{ fill: line.color, r: 4 }}
                  activeDot={{ r: 6 }}
                  name={line.name}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
