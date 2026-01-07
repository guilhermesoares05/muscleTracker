import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface InitialProfileFormProps {
  onSubmit: (data: {
    name: string;
    age: number;
    weight: number;
    height: number;
  }) => void;
}

export default function InitialProfileForm({ onSubmit }: InitialProfileFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.age || parseInt(formData.age) < 13) newErrors.age = 'Idade deve ser maior que 13 anos';
    if (!formData.weight || parseFloat(formData.weight) <= 0) newErrors.weight = 'Peso deve ser maior que 0';
    if (!formData.height || parseFloat(formData.height) <= 0) newErrors.height = 'Altura deve ser maior que 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        name: formData.name,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 border-l-4 border-l-primary">
      <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: 'Poppins' }}>
        Seus Dados Iniciais
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Nome
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome completo"
            className="mt-1"
          />
          {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age" className="text-sm font-medium text-foreground">
              Idade
            </Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              placeholder="Ex: 25"
              className="mt-1"
            />
            {errors.age && <p className="text-destructive text-sm mt-1">{errors.age}</p>}
          </div>

          <div>
            <Label htmlFor="weight" className="text-sm font-medium text-foreground">
              Peso (kg)
            </Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Ex: 75.5"
              className="mt-1"
            />
            {errors.weight && <p className="text-destructive text-sm mt-1">{errors.weight}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="height" className="text-sm font-medium text-foreground">
            Altura (cm)
          </Label>
          <Input
            id="height"
            name="height"
            type="number"
            step="0.1"
            value={formData.height}
            onChange={handleChange}
            placeholder="Ex: 180"
            className="mt-1"
          />
          {errors.height && <p className="text-destructive text-sm mt-1">{errors.height}</p>}
        </div>

        <Button
          type="submit"
          className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          Iniciar Acompanhamento
        </Button>
      </form>
    </Card>
  );
}
