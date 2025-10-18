import * as z from "zod";

export const WorkFormatEnum = z.enum(["Office", "Remote", "Hybrid"], {
  message: "Выберите формат работы",
});
export type WorkFormatType = z.infer<typeof WorkFormatEnum>;

export const ExperienceLevelEnum = z.enum(
  [
    "no_experience",
    "1_to_3_years",
    "3_to_6_years",
    "more_than_6_years",
    "not_important",
  ],
  {
    message: "Выберите уровень опыта",
  }
);
export type ExperienceLevelType = z.infer<typeof ExperienceLevelEnum>;

export const VacancyFormSchema = z
  .object({
    post: z.string().min(1, "Название должности обязательно"),
    salaryFrom: z.number(),
    salaryTo: z.number(),
    workFormat: WorkFormatEnum,
    region: z.string().min(1, "Регион обязателен"),
    experience: ExperienceLevelEnum,
    keywords: z.array(z.string().min(1, "Ключевое слово не может быть пустым")),
    responsibilities: z
      .array(z.string().min(1, "Обязанность не может быть пустой"))
      .min(1, "Необходимо указать хотя бы одну обязанность"),
    requirements: z
      .array(z.string().min(1, "Требование не может быть пустой"))
      .min(1, "Необходимо указать хотя бы одно требование"),
  })
  .refine(
    (data) => {
      if (data.salaryFrom !== undefined && data.salaryTo !== undefined) {
        return data.salaryFrom <= data.salaryTo;
      }
      return true;
    },
    {
      message: "ЗП от не может быть больше ЗП до",
      path: ["salaryTo"],
    }
  );

export type VacancyFormData = z.infer<typeof VacancyFormSchema>;
