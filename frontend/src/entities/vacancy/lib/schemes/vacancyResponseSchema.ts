import * as z from "zod";

export const VacancyResponseSchema = z.object({
  fullName: z.string().min(1, { message: "ФИО обязательно" }),
  phone: z.string().min(1, { message: "Телефон обязателен" }),
  email: z.string().email({ message: "Некорректный email" }),
  resumeFile: z.any().optional(),
  agreeToDataProcessing: z.boolean().refine((val) => val === true, {
    message: "Вы должны согласиться на обработку персональных данных",
  }),
  agreeToNewsletter: z.boolean().optional(),
  agreeToSmsAds: z.boolean().optional(),
});

export type TypeVacancyResponseSchema = z.infer<typeof VacancyResponseSchema>;
