import React from 'react';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface AvatarInputProps {
  measurements: {
    chest: number;
    waist: number;
    hips: number;
    biceps: number;
    thighs: number;
  };
  onChange: (key: string, value: number) => void;
}

const AvatarInput: React.FC<AvatarInputProps> = ({ measurements, onChange }) => {
  const measurementConfigs = [
    { key: 'chest', label: 'Peitoral (cm)', min: 60, max: 150 },
    { key: 'waist', label: 'Cintura (cm)', min: 50, max: 150 },
    { key: 'hips', label: 'Quadril (cm)', min: 60, max: 160 },
    { key: 'biceps', label: 'Bíceps (cm)', min: 20, max: 60 },
    { key: 'thighs', label: 'Coxas (cm)', min: 30, max: 90 },
  ];

  return (
    <div className="space-y-6 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Medidas Corporais</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Insira suas medidas abaixo para atualizar seu avatar.
      </p>

      {measurementConfigs.map((config) => (
        <div key={config.key} className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor={config.key} className="text-sm font-medium">
              {config.label}
            </Label>
            <Input
                id={`${config.key}-input`}
                type="number"
                value={measurements[config.key as keyof typeof measurements]}
                onChange={(e) => onChange(config.key, parseFloat(e.target.value) || config.min)}
                className="w-20 h-8 text-right"
            />
          </div>
          <Slider
            id={config.key}
            min={config.min}
            max={config.max}
            step={1}
            value={[measurements[config.key as keyof typeof measurements]]}
            onValueChange={(vals) => onChange(config.key, vals[0])}
            className="w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarInput;
