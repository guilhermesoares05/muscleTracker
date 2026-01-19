import React, { useState } from 'react';
import AvatarViewer from '@/components/avatar/AvatarViewer';
import AvatarInput from '@/components/avatar/AvatarInput';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

const AvatarPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [measurements, setMeasurements] = useState({
    chest: 100,
    waist: 80,
    hips: 100,
    biceps: 35,
    thighs: 60,
  });

  const handleMeasurementChange = (key: string, value: number) => {
    setMeasurements((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Button
        variant="ghost"
        className="mb-4 pl-0 hover:pl-2 transition-all"
        onClick={() => setLocation("/")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para o Dashboard
      </Button>

      <h1 className="text-3xl font-bold mb-4">Avatar de Progresso Corporal</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
        Visualize suas medidas corporais com este avatar 3D interativo. Atualize suas medidas para ver como a forma do seu corpo muda.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <AvatarInput measurements={measurements} onChange={handleMeasurementChange} />
        </div>
        <div className="lg:col-span-2 min-h-[500px]">
          <AvatarViewer measurements={measurements} />
        </div>
      </div>
    </div>
  );
};

export default AvatarPage;
