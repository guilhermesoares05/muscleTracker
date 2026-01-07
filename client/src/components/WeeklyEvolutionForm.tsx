import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Measurements } from '@/models/types';

interface WeeklyEvolutionFormProps {
  week: number;
  onSubmit: (measurements: Measurements) => void;
  onCancel?: () => void;
}

export default function WeeklyEvolutionForm({ week, onSubmit, onCancel }: WeeklyEvolutionFormProps) {
  const [measurements, setMeasurements] = useState<Measurements>({
    chest: 0,
    biceps: 0,
    waist: 0,
    hip: 0,
    thigh: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const fields = ['chest', 'biceps', 'waist', 'hip', 'thigh'] as const;

    fields.forEach(field => {
      if (measurements[field] <= 0) {
        newErrors[field] = 'Medida deve ser maior que 0';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(measurements);
    }
  };

  const measurementFields = [
    { key: 'chest' as const, label: 'Peito (cm)', placeholder: 'Ex: 100' },
    { key: 'biceps' as const, label: 'Bíceps (cm)', placeholder: 'Ex: 35' },
    { key: 'waist' as const, label: 'Cintura (cm)', placeholder: 'Ex: 85' },
    { key: 'hip' as const, label: 'Quadril (cm)', placeholder: 'Ex: 95' },
    { key: 'thigh' as const, label: 'Coxa (cm)', placeholder: 'Ex: 55' },
  ];

  return (
    <Card className="w-full max-w-md mx-auto p-6 border-l-4 border-l-accent">
      <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'Poppins' }}>
        Semana {week}
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Registre suas medidas desta semana
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {measurementFields.map(field => (
          <div key={field.key}>
            <Label htmlFor={field.key} className="text-sm font-medium text-foreground">
              {field.label}
            </Label>
            <Input
              id={field.key}
              name={field.key}
              type="number"
              step="0.1"
              value={measurements[field.key] || ''}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="mt-1"
            />
            {errors[field.key] && (
              <p className="text-destructive text-sm mt-1">{errors[field.key]}</p>
            )}
          </div>
        ))}

        <div className="flex gap-3 mt-6">
          <Button
            type="submit"
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          >
            Registrar Evolução
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
