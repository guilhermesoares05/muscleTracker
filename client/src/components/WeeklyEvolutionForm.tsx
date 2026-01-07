"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Measurements } from "@/models/types";

const positiveNumberSchema = z.coerce
  .number()
  .positive({ message: "Deve ser maior que 0." });

const formSchema = z.object({
  chest: positiveNumberSchema,
  biceps: positiveNumberSchema,
  waist: positiveNumberSchema,
  hip: positiveNumberSchema,
  thigh: positiveNumberSchema,
});

interface WeeklyEvolutionFormProps {
  week: number;
  onSubmit: (measurements: Measurements) => void;
  onCancel?: () => void;
}

export default function WeeklyEvolutionForm({
  week,
  onSubmit,
  onCancel,
}: WeeklyEvolutionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chest: undefined,
      biceps: undefined,
      waist: undefined,
      hip: undefined,
      thigh: undefined,
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
  }

  const measurementFields = [
    { name: "chest" as const, label: "Peito (cm)", placeholder: "Ex: 100" },
    { name: "biceps" as const, label: "Bíceps (cm)", placeholder: "Ex: 35" },
    { name: "waist" as const, label: "Cintura (cm)", placeholder: "Ex: 85" },
    { name: "hip" as const, label: "Quadril (cm)", placeholder: "Ex: 95" },
    { name: "thigh" as const, label: "Coxa (cm)", placeholder: "Ex: 55" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Semana {week}</CardTitle>
        <CardDescription>Registre suas medidas desta semana</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {measurementFields.map(({ name, label, placeholder }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder={placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
          <CardFooter className="flex justify-end gap-3">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
            <Button type="submit">
              Registrar Evolução
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
