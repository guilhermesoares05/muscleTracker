import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

interface ProgressCardProps {
  currentWeek: number;
  progressPercentage: number;
  isCompleted: boolean;
}

export default function ProgressCard({
  currentWeek,
  progressPercentage,
  isCompleted,
}: ProgressCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progresso do Acompanhamento</CardTitle>
        <CardDescription>
          Você está na semana {currentWeek - 1} de 12.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Progresso</span>
            <span className="text-lg font-bold text-primary">
              {currentWeek - 1}/12
            </span>
          </div>

          <Progress value={progressPercentage} />

          {isCompleted && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Parabéns!</AlertTitle>
              <AlertDescription>
                Você completou as 12 semanas!
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
