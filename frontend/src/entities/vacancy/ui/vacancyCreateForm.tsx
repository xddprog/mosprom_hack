import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { FormField, FormItem } from "@/shared/ui/form/form";
import {
  X,
  CircleAlert,
  Plus,
  Tags,
  CheckSquare,
  ClipboardList,
  Briefcase,
} from "lucide-react";
import { FloatingLabelInput } from "@/shared/ui/input/floatingInputLabel";
import { cn } from "@/shared/lib/utils/twMerge";
import {
  VacancyFormData,
  VacancyFormSchema,
} from "../lib/schemes/createFormSchema";
import { useCreateVacancy } from "../hooks/useCreateVacancy";
import { FormCard } from "@/widgets/formCard/ui/formCard";

export const VacancyCreateForm = () => {
  const { mutate: createVacancy } = useCreateVacancy();
  const form = useForm<VacancyFormData>({
    resolver: zodResolver(VacancyFormSchema),
    defaultValues: {
      region: "",
      post: "",
      salary: "",
      tags: [],
      responsibilities: { title: "Обязанности", description: [] },
      requirements: { title: "Требования", description: [] },
    },
  });
  const [currentTag, setCurrentTag] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const tags = watch("tags");

  const addTag = () => {
    if (currentTag.trim()) {
      setValue("tags", [...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (index: number) => {
    setValue(
      "tags",
      tags.filter((_, i) => i !== index)
    );
  };

  const addDescription = (event: React.MouseEvent<HTMLButtonElement>) => {
    const section = event.currentTarget.value as
      | "responsibilities"
      | "requirements";
    if (!section) return;
    const currentDescriptions = watch(`${section}.description`);
    setValue(`${section}.description`, [...currentDescriptions, ""]);
  };

  const removeDescription = (
    section: "responsibilities" | "requirements",
    index: number
  ) => {
    const currentDescriptions = watch(`${section}.description`);
    setValue(
      `${section}.description`,
      currentDescriptions.filter((_, i) => i !== index)
    );
  };

  const onSubmit = (data: VacancyFormData) => {
    createVacancy({
      company_id: "vtb-company",
      is_favorite: false,
      post: data.post,
      salary: data.salary,
      tags: data.tags,
      region: data.region,
      requirements: {
        description: data.requirements.description.filter(Boolean) as string[],
        title: data.requirements.title ?? "Требования",
      },
      responsibilities: {
        description: data.responsibilities.description.filter(
          Boolean
        ) as string[],
        title: data.responsibilities.title ?? "Обязанности",
      },
    });
    form.reset();
  };

  return (
    <div className="rounded-lg">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <FormCard
              title="Основная информация"
              icon={<Briefcase className="w-6 h-6" />}
              description="Заполните основные детали о вакансии."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="post"
                  render={({ field }) => (
                    <FormItem className="relative gap-1">
                      <FloatingLabelInput
                        {...field}
                        label="Название должности"
                        className={cn(
                          "py-1.5 text-white bg-neutral-900 rounded-xl shadow-sm border-neutral-800 focus:border-blue-500",
                          errors.post && "border-red-700"
                        )}
                      />
                      {errors.post && (
                        <span className="text-red-800 text-xs px-3 mt-1 block">
                          {errors.post.message}
                        </span>
                      )}
                      {field.value && !errors.post && (
                        <button
                          type="button"
                          className="absolute right-4 top-4.5 text-blue-500 cursor-pointer"
                          onClick={() => field.onChange("")}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      {errors.post && (
                        <CircleAlert className="absolute right-4 top-4.5 text-red-700 w-4 h-4" />
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="region"
                  render={({ field }) => (
                    <FormItem className="relative gap-1">
                      <FloatingLabelInput
                        {...field}
                        label="Регион"
                        className={cn(
                          "py-1.5 text-white bg-neutral-900 rounded-xl shadow-sm border-neutral-800 focus:border-blue-500",
                          errors.region && "border-red-700"
                        )}
                      />
                      {errors.region && (
                        <span className="text-red-800 text-xs px-3 mt-1 block">
                          {errors.region.message}
                        </span>
                      )}
                      {field.value && !errors.region && (
                        <button
                          type="button"
                          className="absolute right-4 top-4.5 text-blue-500 cursor-pointer"
                          onClick={() => field.onChange("")}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      {errors.region && (
                        <CircleAlert className="absolute right-4 top-4.5 text-red-700 w-4 h-4" />
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem className="relative gap-1 md:col-span-2">
                      <FloatingLabelInput
                        {...field}
                        label="Зарплата (пример: 100000 - 150000 руб)"
                        className={cn(
                          "py-1.5 text-white bg-neutral-900 rounded-xl shadow-sm border-neutral-800 focus:border-blue-500",
                          errors.salary && "border-red-700"
                        )}
                      />
                      {errors.salary && (
                        <span className="text-red-800 text-xs px-3 mt-1 block">
                          {errors.salary.message}
                        </span>
                      )}
                      {field.value && !errors.salary && (
                        <button
                          type="button"
                          className="absolute right-4 top-4.5 text-blue-500 cursor-pointer"
                          onClick={() => field.onChange("")}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      {errors.salary && (
                        <CircleAlert className="absolute right-4 top-4.5 text-red-700 w-4 h-4" />
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </FormCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FormCard
              title="Ключевые слова"
              icon={<Tags className="w-6 h-6" />}
              description="Добавьте ключевые слова для лучшего поиска вакансии."
            >
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Например: React, JavaScript"
                  className="py-6 text-white bg-neutral-900 border border-neutral-800 placeholder:text-zinc-400 rounded-xl shadow-sm focus:border-blue-500 flex-grow"
                />
              </div>
              {errors.tags && (
                <p className="text-red-800 text-sm mt-2 px-1">
                  {errors.tags.message}
                </p>
              )}
              <div
                className={cn(
                  "flex flex-wrap gap-2 my-4",
                  tags.length === 0 && "my-2"
                )}
              >
                <AnimatePresence>
                  {tags.map((tag, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                    >
                      {tag}
                      <X
                        className="w-4 h-4 ml-2 cursor-pointer"
                        onClick={() => removeTag(index)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <Button
                type="button"
                onClick={addTag}
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" /> Добавить
              </Button>
            </FormCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FormCard
              title="Обязанности"
              icon={<CheckSquare className="w-6 h-6" />}
              description="Что будет входить в круг обязанностей сотрудника."
            >
              <div className="space-y-3 mb-4">
                {watch("responsibilities.description").map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-2 items-start"
                  >
                    <FormField
                      control={control}
                      name={`responsibilities.description.${index}`}
                      render={({ field }) => (
                        <FormItem className="relative gap-1 flex-1">
                          <textarea
                            {...field}
                            placeholder="Введите обязанность"
                            className={cn(
                              "p-3 text-white resize-none outline-none text-sm placeholder:text-zinc-500 bg-neutral-900 rounded-xl shadow-sm border border-neutral-800 focus:border-blue-500 w-full",
                              errors.responsibilities?.description?.[index] &&
                                "border-red-700"
                            )}
                            rows={2}
                          />
                          {errors.responsibilities?.description?.[index] && (
                            <span className="text-red-800 text-xs px-3 mt-1 block">
                              {
                                errors.responsibilities.description[index]
                                  ?.message
                              }
                            </span>
                          )}
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      onClick={() =>
                        removeDescription("responsibilities", index)
                      }
                      variant="ghost"
                      className="text-zinc-400 hover:text-red-500 p-2"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </motion.div>
                ))}
              </div>
              <Button
                type="button"
                className="text-blue-500 w-full sm:w-auto"
                value={"responsibilities"}
                onClick={addDescription}
                variant="outline"
              >
                <Plus className="w-4 h-4" /> Добавить обязанность
              </Button>
            </FormCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <FormCard
              title="Требования"
              icon={<ClipboardList className="w-6 h-6" />}
              description="Какими навыками и опытом должен обладать кандидат."
            >
              <div className="space-y-3 mb-4">
                {watch("requirements.description").map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-2 items-start"
                  >
                    <FormField
                      control={control}
                      name={`requirements.description.${index}`}
                      render={({ field }) => (
                        <FormItem className="relative gap-1 flex-1">
                          <textarea
                            {...field}
                            placeholder="Введите требование"
                            className={cn(
                              "p-3 resize-none text-white bg-neutral-900 text-sm placeholder:text-zinc-500 outline-none rounded-xl shadow-sm border border-neutral-800 focus:border-blue-500 w-full",
                              errors.requirements?.description?.[index] &&
                                "border-red-700"
                            )}
                            rows={2}
                          />
                          {errors.requirements?.description?.[index] && (
                            <span className="text-red-800 text-xs px-3 mt-1 block">
                              {errors.requirements.description[index]?.message}
                            </span>
                          )}
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      onClick={() => removeDescription("requirements", index)}
                      variant="ghost"
                      className="text-zinc-400 hover:text-red-500 p-2"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </motion.div>
                ))}
              </div>
              <Button
                type="button"
                className="text-blue-500 w-full sm:w-auto"
                value={"requirements"}
                onClick={addDescription}
                variant="outline"
              >
                <Plus className="w-4 h-4" /> Добавить требование
              </Button>
            </FormCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Создать вакансию
            </Button>
          </motion.div>
        </form>
      </FormProvider>
    </div>
  );
};
