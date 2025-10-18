import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import {
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/shared/ui/form/form";
import { X, CircleAlert, Plus } from "lucide-react";
import { FloatingLabelInput } from "@/shared/ui/input/floatingInputLabel";
import { cn } from "@/shared/lib/utils/twMerge";
import {
  VacancyFormData,
  VacancyFormSchema,
  WorkFormatEnum,
  ExperienceLevelEnum,
} from "../lib/schemes/createFormSchema";
import { useCreateVacancy } from "../hooks/useCreateVacancy";
import { useGetTags } from "../hooks/useGetVacancy";
import { TagGroup } from "@/shared/ui/badge/ui/badgeGroup";
import { CreateVacancyDto } from "../types/types";

const ToggleButtonGroup: React.FC<{
  options: { value: string; label: string }[];
  value: string | undefined;
  onChange: (value: string) => void;
  name: string;
  error?: string;
}> = ({ options, value, onChange, error }) => (
  <div className="flex flex-wrap gap-2 mt-2">
    {options.map((option) => (
      <Button
        key={option.value}
        type="button"
        variant={value === option.value ? "default" : "outline"}
        onClick={() => onChange(option.value)}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-medium",
          value === option.value
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
        )}
      >
        {option.label}
      </Button>
    ))}
    {error && <p className="text-red-800 text-xs px-3 mt-1 w-full">{error}</p>}
  </div>
);

export const VacancyCreateForm = ({
  vacancyType,
}: {
  vacancyType: "internship" | "vacancy";
}) => {
  const { data: vacancyTags } = useGetTags();

  const { mutate: createVacancy } = useCreateVacancy();
  const form = useForm<VacancyFormData>({
    resolver: zodResolver(VacancyFormSchema),
    defaultValues: {
      region: "",
      post: "",
      salaryFrom: undefined,
      salaryTo: undefined,
      workFormat: undefined,
      experience: undefined,
      keywords: undefined,
      responsibilities: [""],
      requirements: [""],
    },
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const responsibilities = watch("responsibilities");
  const requirements = watch("requirements");
  const currentKeywords = watch("keywords");

  const workFormatOptions = [
    { value: WorkFormatEnum.enum.Office, label: "Офис" },
    { value: WorkFormatEnum.enum.Remote, label: "Удаленно" },
    { value: WorkFormatEnum.enum.Hybrid, label: "Гибрид" },
  ];

  const experienceOptions = [
    {
      value: ExperienceLevelEnum.enum.not_important,
      label: "Не имеет значения",
    },
    { value: ExperienceLevelEnum.enum.no_experience, label: "Без опыта" },
    { value: ExperienceLevelEnum.enum["1_to_3_years"], label: "От 1 до 3" },
    { value: ExperienceLevelEnum.enum["3_to_6_years"], label: "От 3 до 6" },
    { value: ExperienceLevelEnum.enum.more_than_6_years, label: "Более 6" },
  ];

  const addDescriptionField = (
    section: "responsibilities" | "requirements"
  ) => {
    const currentDescriptions = watch(section);
    setValue(section, [...currentDescriptions, ""]);
  };

  const removeDescriptionField = (
    section: "responsibilities" | "requirements",
    index: number
  ) => {
    const currentDescriptions = watch(section);
    setValue(
      section,
      currentDescriptions.filter((_, i) => i !== index)
    );
  };

  const handleTagClick = (tagText: string) => {
    if (!currentKeywords.includes(tagText)) {
      setValue("keywords", [...currentKeywords, tagText], {
        shouldValidate: true,
      });
    } else {
      setValue(
        "keywords",
        currentKeywords.filter((k) => k !== tagText),
        { shouldValidate: true }
      );
    }
  };

  const onSubmit = (data: VacancyFormData) => {
    const selectTags =
      vacancyTags?.filter((tag) => data.keywords.includes(tag.name)) ?? [];

    const payload: CreateVacancyDto = {
      title: data.post,
      max_salary: data.salaryTo,
      min_salary: data.salaryFrom,
      work_format: data.workFormat,
      region: data.region,
      experience: data.experience,
      tags: selectTags,
      responsibilities: data.responsibilities.filter(Boolean),
      requirements: data.requirements.filter(Boolean),
      is_internship: vacancyType === "internship",
      conditions: [],
    };
    createVacancy(payload);

    form.reset();
  };

  return (
    <div>
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-h-[630px] overflow-auto"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormField
                control={control}
                name="post"
                render={({ field }) => (
                  <FormItem className="relative md:col-span-2">
                    <FloatingLabelInput
                      {...field}
                      label="Название должности*"
                      className={cn(
                        "py-1.5 text-black bg-[#f0f3f7] rounded-xl shadow-sm border-[#f0f3f7] focus:border-red-500",
                        errors.post && "border-red-700"
                      )}
                    />
                    {errors.post && (
                      <span className="text-red-800 text-xs px-3 absolute -bottom-5 left-0">
                        {errors.post.message}
                      </span>
                    )}
                    {field.value && !errors.post && (
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={() => field.onChange("")}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    {errors.post && (
                      <CircleAlert className="absolute right-4 top-1/2 -translate-y-1/2 text-red-700 w-4 h-4" />
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="salaryFrom"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FloatingLabelInput
                      {...field}
                      type="number"
                      label="ЗП от:"
                      className={cn(
                        "py-1.5 text-black bg-[#f0f3f7] rounded-xl shadow-sm border-[#f0f3f7] focus:border-red-500",
                        errors.salaryFrom && "border-red-700"
                      )}
                    />
                    {errors.salaryFrom && (
                      <span className="text-red-800 text-xs px-3 absolute -bottom-5 left-0">
                        {errors.salaryFrom.message}
                      </span>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="salaryTo"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FloatingLabelInput
                      {...field}
                      type="number"
                      label="ЗП до:"
                      className={cn(
                        "py-1.5 text-black bg-[#f0f3f7] rounded-xl shadow-sm border-[#f0f3f7] focus:border-red-500",
                        errors.salaryTo && "border-red-700"
                      )}
                    />
                    {errors.salaryTo && (
                      <span className="text-red-800 text-xs px-3 absolute -bottom-5 left-0">
                        {errors.salaryTo.message}
                      </span>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-end w-full">
              <FormField
                control={control}
                name="workFormat"
                render={({ field }) => (
                  <FormItem className="relative w-full">
                    <FormLabel className="text-gray-700 text-sm font-medium">
                      Формат работы*
                    </FormLabel>
                    <ToggleButtonGroup
                      options={workFormatOptions}
                      value={field.value}
                      onChange={field.onChange}
                      name="workFormat"
                      error={errors.workFormat?.message}
                    />
                    {errors.workFormat && (
                      <FormMessage className="text-red-800 text-xs mt-1">
                        {errors.workFormat.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="region"
                render={({ field }) => (
                  <FormItem className="relative w-full">
                    <FloatingLabelInput
                      {...field}
                      label="Регион*"
                      className={cn(
                        "py-1.5  text-black bg-[#f0f3f7] rounded-xl shadow-sm border-[#f0f3f7] focus:border-red-500",
                        errors.region && "border-red-700"
                      )}
                    />
                    {errors.region && (
                      <span className="text-red-800 text-xs px-3 absolute -bottom-5 left-0">
                        {errors.region.message}
                      </span>
                    )}
                    {field.value && !errors.region && (
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={() => field.onChange("")}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    {errors.region && (
                      <CircleAlert className="absolute right-4 top-1/2 -translate-y-1/2 text-red-700 w-4 h-4" />
                    )}
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="experience"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-gray-700 text-sm font-medium">
                    Опыт*
                  </FormLabel>
                  <ToggleButtonGroup
                    options={experienceOptions}
                    value={field.value}
                    onChange={field.onChange}
                    name="experience"
                    error={errors.experience?.message}
                  />
                  {errors.experience && (
                    <FormMessage className="text-red-800 text-xs mt-1">
                      {errors.experience.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="keywords"
              render={() => (
                <FormItem className="relative">
                  <FormLabel className="text-gray-700 text-sm font-medium">
                    Ключевые слова*
                  </FormLabel>
                  {vacancyTags && (
                    <TagGroup
                      tags={vacancyTags}
                      variant="glassLight"
                      size="md"
                      onTagClick={handleTagClick}
                    />
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-gray-700 text-sm font-medium">Обязанности*</h3>
            <section className="flex">
              <Button
                type="button"
                className="bg-gray-200 text-red-600 hover:bg-gray-300 rounded-full px-5 py-3 flex items-center justify-center font-medium"
                onClick={() => addDescriptionField("responsibilities")}
              >
                <Plus className="w-5 h-5" />
              </Button>
              <div className="space-y-3  w-full">
                {responsibilities.map((_, index) => (
                  <div key={index} className="flex gap-2 items-start  w-full">
                    <FormField
                      control={control}
                      name={`responsibilities.${index}`}
                      render={({ field }) => (
                        <FormItem className="relative flex-1">
                          <textarea
                            {...field}
                            placeholder="Введите обязанность"
                            className={cn(
                              "p-2 resize-none text-black bg-[#f0f3f7] text-sm placeholder:text-gray-500 outline-none rounded-xl shadow-sm border border-[#f0f3f7] focus:border-red-500 w-full",
                              errors.responsibilities?.[index] &&
                                "border-red-700"
                            )}
                            rows={2}
                          />
                          {errors.responsibilities?.[index] && (
                            <span className="text-red-800 text-xs px-3 mt-1 block">
                              {errors.responsibilities[index]?.message}
                            </span>
                          )}
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      onClick={() =>
                        removeDescriptionField("responsibilities", index)
                      }
                      variant="ghost"
                      className="text-gray-400 hover:text-red-500 p-2"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
                {errors.responsibilities &&
                  typeof errors.responsibilities.message === "string" && (
                    <p className="text-red-800 text-xs px-3 mt-1 block">
                      {errors.responsibilities.message}
                    </p>
                  )}
              </div>
            </section>
          </div>

          <div className="space-y-4">
            <h3 className="text-gray-700 text-sm font-medium">Требования*</h3>
            <section className="flex">
              <Button
                type="button"
                className="bg-gray-200 text-red-600 hover:bg-gray-300 rounded-full px-5 py-3 flex items-center justify-center font-medium"
                onClick={() => addDescriptionField("requirements")}
              >
                <Plus className="w-5 h-5" />
              </Button>
              <div className="space-y-3 w-full">
                {requirements.map((_, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <FormField
                      control={control}
                      name={`requirements.${index}`}
                      render={({ field }) => (
                        <FormItem className="relative flex-1">
                          <textarea
                            {...field}
                            placeholder="Введите требование"
                            className={cn(
                              "p-2 resize-none text-black bg-[#f0f3f7] text-sm placeholder:text-gray-500 outline-none rounded-xl shadow-sm border border-[#f0f3f7] focus:border-red-500 w-full",
                              errors.requirements?.[index] && "border-red-700"
                            )}
                            rows={2}
                          />
                          {errors.requirements?.[index] && (
                            <span className="text-red-800 text-xs px-3 mt-1 block">
                              {errors.requirements[index]?.message}
                            </span>
                          )}
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      onClick={() =>
                        removeDescriptionField("requirements", index)
                      }
                      variant="ghost"
                      className="text-gray-400 hover:text-red-500 p-2"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
                {errors.requirements &&
                  typeof errors.requirements.message === "string" && (
                    <p className="text-red-800 text-xs px-3 mt-1 block">
                      {errors.requirements.message}
                    </p>
                  )}
              </div>
            </section>
          </div>

          {/* Кнопки Создать и Отменить */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="submit"
              className="px-8 py-3 rounded-full bg-[#D00E46] text-white hover:bg-[#B00C3B] transition-colors font-semibold"
            >
              Создать
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()} // Просто сбрасываем форму
              className="px-8 py-3 rounded-full border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors font-semibold"
            >
              Отменить
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
