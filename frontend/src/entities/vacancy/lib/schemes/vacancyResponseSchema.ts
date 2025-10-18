import * as z from "zod";

export const VacancyResponseSchema = z
  .object({
    lastName: z.string().min(1, { message: "Фамилия обязательна" }),
    firstName: z.string().min(1, { message: "Имя обязательно" }),
    middleName: z.string().optional(),
    phone: z.string().min(1, { message: "Телефон обязателен" }),
    email: z.string().email({ message: "Некорректный email" }),
    resumeLink: z.string().url({ message: "Некорректная ссылка" }).optional(),
    resumeFile: z.any().optional(),
    agreeToDataProcessing: z.boolean().refine((val) => val === true, {
      message: "Вы должны согласиться на обработку персональных данных",
    }),
    agreeToNewsletter: z.boolean().optional(),
    agreeToSmsAds: z.boolean().optional(),
  })
  .refine(
    (data) => {
      return (
        (!!data.resumeLink && !data.resumeFile) ||
        (!data.resumeLink && !!data.resumeFile)
      );
    },
    {
      message: "Необходимо прикрепить резюме: либо ссылкой, либо файлом",
      path: ["resumeLink"],
    }
  );

export type TypeVacancyResponseSchema = z.infer<typeof VacancyResponseSchema>;
