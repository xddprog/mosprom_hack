import z from "zod";

export const StudentFormSchema = z.object({
  full_name: z.string().min(1, { message: "Полное имя обязательно." }),
  email: z.string().email({ message: "Некорректный формат почты." }),
  age: z.string(),

  phone_number: z
    .string()
    .refine((val) => val === "" || /^\+?\d{10,15}$/.test(val), {
      message: "Некорректный формат телефона.",
    }),
  course_number: z.number(),
  faculty: z
    .string()
    .min(1, { message: "Направление (факультет) обязательно." }),

  keywords: z.array(z.string()).max(5, {
    message: "Максимум 5 навыков.",
  }),

  resume: z
    .instanceof(File, { message: "Пожалуйста, загрузите файл резюме." })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      `Максимальный размер файла 5MB.`
    )
    .refine((file) => file.type === "application/pdf", "Только PDF файлы."),
});

export type StudentFormData = z.infer<typeof StudentFormSchema>;
