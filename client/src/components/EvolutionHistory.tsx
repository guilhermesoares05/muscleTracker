import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WeeklyEvolution } from "@/models/types";
import { History } from "lucide-react";

interface EvolutionHistoryProps {
  evolutions: WeeklyEvolution[];
}

export default function EvolutionHistory({ evolutions }: EvolutionHistoryProps) {
  if (evolutions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Evoluções</CardTitle>
          <CardDescription>
            Consulte o seu histórico de evoluções semanais.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <History className="w-16 h-16 text-muted-foreground mb-4" />
          <p className="text-center text-muted-foreground">
            Nenhuma evolução registrada ainda.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Evoluções</CardTitle>
        <CardDescription>
          Consulte o seu histórico de evoluções semanais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Semana</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Peito</TableHead>
              <TableHead>Bíceps</TableHead>
              <TableHead>Cintura</TableHead>
              <TableHead>Quadril</TableHead>
              <TableHead>Coxa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {evolutions.map((evolution) => (
              <TableRow key={evolution.id}>
                <TableCell className="font-semibold">
                  Semana {evolution.week}
                </TableCell>
                <TableCell>
                  {new Date(evolution.date).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>{evolution.measurements.chest} cm</TableCell>
                <TableCell>{evolution.measurements.biceps} cm</TableCell>
                <TableCell>{evolution.measurements.waist} cm</TableCell>
                <TableCell>{evolution.measurements.hip} cm</TableCell>
                <TableCell>{evolution.measurements.thigh} cm</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
