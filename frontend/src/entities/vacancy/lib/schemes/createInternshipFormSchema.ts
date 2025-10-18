import z from "zod";

export const InternshipFormSchema = z.object({
  position: z.string().min(1, { message: "Должность обязательна" }),
  requiredSkills: z
    .array(z.string())
    .min(1, { message: "Добавьте хотя бы один необходимый навык" }),
  availableSlots: z
    .number()
    .min(1, { message: "Количество мест должно быть не менее 1" }),
  deadline: z.string().min(1, { message: "Дедлайн обязателен" }),
  university: z.string().min(1, { message: "Университет обязателен" }),
});

export type InternshipFormData = z.infer<typeof InternshipFormSchema>;
