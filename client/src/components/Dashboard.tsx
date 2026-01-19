import { useState } from "react";
import { useLocation } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { UserData } from "@/models/types";
import ProgressCard from "./ProgressCard";
import EvolutionHistory from "./EvolutionHistory";
import EvolutionChart from "./EvolutionChart";
import WeeklyEvolutionForm from "./WeeklyEvolutionForm";
import { FileText, Menu, PlusCircle } from "lucide-react";

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
  const [, setLocation] = useLocation();

  const handleFormSubmit = (measurements: any) => {
    onAddEvolution(measurements);
    setShowForm(false);
  };

  const imc = (
    userData.profile.weight /
    (userData.profile.height / 100) ** 2
  ).toFixed(1);

  return (
    <div className="min-h-screen w-full bg-muted/40">
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-background lg:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
              <h1 className="text-2xl font-bold text-foreground">
                Muscle Tracker
              </h1>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                {!isCompleted && (
                  <>
                    <Button
                      onClick={() => setShowForm(true)}
                      variant={showForm ? "secondary" : "ghost"}
                      className="justify-start gap-2"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Registrar Evolução
                    </Button>
                  </>
                )}
                {isCompleted && (
                  <Button
                    onClick={onGenerateCertificate}
                    variant="ghost"
                    className="justify-start gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Baixar Certificado
                  </Button>
                )}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-background px-6">
            <div className="lg:hidden">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button size="icon" variant="outline">
                    <Menu className="h-6 w-6" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Menu</DrawerTitle>
                    <DrawerDescription>
                      Selecione uma ação
                    </DrawerDescription>
                  </DrawerHeader>
                  <nav className="grid items-start px-4 text-sm font-medium">
                    {!isCompleted && (
                      <DrawerClose asChild>
                        <Button
                          onClick={() => setShowForm(true)}
                          variant={showForm ? "secondary" : "ghost"}
                          className="justify-start gap-2"
                        >
                          <PlusCircle className="h-4 w-4" />
                          Registrar Evolução
                        </Button>
                      </DrawerClose>
                    )}
                    {isCompleted && (
                      <DrawerClose asChild>
                        <Button
                          onClick={onGenerateCertificate}
                          variant="ghost"
                          className="justify-start gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          Baixar Certificado
                        </Button>
                      </DrawerClose>
                    )}
                  </nav>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
            <div className="flex-1">
              <p className="text-muted-foreground text-sm sm:text-base">
                Bem-vindo,{" "}
                <span className="font-semibold text-foreground">
                  {userData.profile.name}
                </span>
              </p>
            </div>
          </header>
          <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dados Pessoais</CardTitle>
                    <CardDescription>
                      Suas informações corporais atuais.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Idade:</span>
                      <span className="font-semibold text-foreground">
                        {userData.profile.age} anos
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Peso:</span>
                      <span className="font-semibold text-foreground">
                        {userData.profile.weight} kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Altura:</span>
                      <span className="font-semibold text-foreground">
                        {userData.profile.height} cm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IMC:</span>
                      <span className="font-semibold text-foreground">
                        {imc}
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <ProgressCard
                  currentWeek={currentWeek}
                  progressPercentage={progressPercentage}
                  isCompleted={isCompleted}
                />
              </div>

              {showForm && (
                <WeeklyEvolutionForm
                  week={currentWeek}
                  onSubmit={handleFormSubmit}
                  onCancel={() => setShowForm(false)}
                />
              )}

              {userData.evolutions.length > 0 && (
                <EvolutionChart evolutions={userData.evolutions} />
              )}
              <EvolutionHistory evolutions={userData.evolutions} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
