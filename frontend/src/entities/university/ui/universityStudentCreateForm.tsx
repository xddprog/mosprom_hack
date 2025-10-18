import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import {
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/shared/ui/form/form";
import { FloatingLabelInput } from "@/shared/ui/input/floatingInputLabel";
import { cn } from "@/shared/lib/utils/twMerge";
import { StudentFormData, StudentFormSchema } from "../lib/studentFormSchema";
import { Input } from "@/shared/ui/input";
import { useRef } from "react";
import { X } from "lucide-react";
import { useGetTags } from "@/entities/vacancy/hooks/useGetVacancy";
import { TagGroup } from "@/shared/ui/badge/ui/badgeGroup";
import { useCreateStudent } from "../hooks/useUniversitySuggestions";

const ToggleButtonGroup: React.FC<{
  options: { value: string | number; label: string | number }[];
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  name: string;
  error?: string;
}> = ({ options, value, onChange, error }) => (
  <div className="flex">
    {options.map((option) => (
      <Button
        key={option.value}
        type="button"
        variant={value === option.value ? "default" : "outline"}
        onClick={() => onChange(option.value)}
        className={cn(
          "rounded-full p-6 text-sm font-medium",
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

export const UniversityStudentCreateForm = () => {
  const { data: vacancyTags } = useGetTags();
  const { mutate: createStudent } = useCreateStudent();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<StudentFormData>({
    resolver: zodResolver(StudentFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      age: "",
      phone_number: "",
      course_number: 0,
      faculty: "",
      keywords: [],
      resume: undefined,
    },
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = form;

  const currentKeywords = watch("keywords");
  const watchedResumeFile = watch("resume");

  const courseOptions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "Магистратура" },
    { value: 6, label: "Аспирантура" },
  ];

  const handleTagClick = (tagText: string) => {
    if (!currentKeywords?.includes(tagText)) {
      setValue("keywords", [...currentKeywords, tagText], {
        shouldValidate: true,
      });
    } else {
      setValue(
        "keywords",
        currentKeywords?.filter((k) => k !== tagText),
        { shouldValidate: true }
      );
    }
  };

  const onSubmit = async (data: StudentFormData) => {
    const selectTags =
      vacancyTags?.filter((tag) => data.keywords.includes(tag.name)) ?? [];

    const formData = new FormData();

    formData.append("full_name", data.full_name);
    formData.append("email", data.email);
    formData.append("age", data.age.toString());

    if (data.phone_number) {
      formData.append("phone_number", data.phone_number);
    }

    formData.append("course_number", data.course_number.toString());
    formData.append("faculty", data.faculty);

    selectTags.forEach((tag) => formData.append("tags", tag.id.toString()));

    formData.append("resume", data.resume);

    createStudent({ studentFormData: formData });

    reset();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setValue("resume", file);
    }
  };

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex">
            <FormField
              control={control}
              name="full_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FloatingLabelInput
                    {...field}
                    label="Полное имя*"
                    className={cn(
                      "py-1.5 text-black bg-[#f0f3f7] rounded-3xl shadow-sm border-[#f0f3f7] focus:border-red-500",
                      errors.full_name && "border-red-700"
                    )}
                  />
                  <FormMessage className="text-red-800 text-xs px-3">
                    {errors.full_name?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="phone_number"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FloatingLabelInput
                    {...field}
                    label="Телефон"
                    type="tel"
                    className={cn(
                      "py-1.5 text-black bg-[#f0f3f7] rounded-3xl shadow-sm border-[#f0f3f7] focus:border-red-500",
                      errors.phone_number && "border-red-700"
                    )}
                  />
                  <FormMessage className="text-red-800 text-xs px-3">
                    {errors.phone_number?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FloatingLabelInput
                    {...field}
                    label="Почта*"
                    type="email"
                    className={cn(
                      "py-1.5 text-black bg-[#f0f3f7] rounded-3xl shadow-sm border-[#f0f3f7] focus:border-red-500",
                      errors.email && "border-red-700"
                    )}
                  />
                  <FormMessage className="text-red-800 text-xs px-3">
                    {errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex">
            <FormField
              control={control}
              name="resume"
              render={({ field }) => (
                <FormItem className="relative w-full">
                  <Input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    name={field.name}
                  />
                  <div
                    className={cn(
                      "relative w-full px-3 py-2 bg-[#f0f3f7] rounded-3xl shadow-sm border border-[#f0f3f7] text-black cursor-pointer flex items-center justify-between",
                      errors.resume && "border-red-700",
                      !watchedResumeFile && "text-gray-500"
                    )}
                    onClick={handleFileUploadClick}
                  >
                    <span>
                      {watchedResumeFile instanceof File
                        ? watchedResumeFile.name
                        : "Выберите файл резюме*"}
                    </span>
                    {watchedResumeFile instanceof File && (
                      <button
                        type="button"
                        className="text-blue-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (fileInputRef.current)
                            fileInputRef.current.value = "";
                        }}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="age"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FloatingLabelInput
                    {...field}
                    label="Возраст*"
                    type="number"
                    className={cn(
                      "py-1.5 text-black bg-[#f0f3f7] rounded-3xl shadow-sm border-[#f0f3f7] focus:border-red-500",
                      errors.age && "border-red-700"
                    )}
                  />
                  <FormMessage className="text-red-800 text-xs px-3">
                    {errors.age?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-end">
            <FormField
              control={control}
              name="faculty"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FloatingLabelInput
                    {...field}
                    label="Направление (Факультет)*"
                    className={cn(
                      "py-1.5 text-black bg-[#f0f3f7] rounded-3xl shadow-sm border-[#f0f3f7] focus:border-red-500",
                      errors.faculty && "border-red-700"
                    )}
                  />
                  <FormMessage className="text-red-800 text-xs px-3">
                    {errors.faculty?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="course_number"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-gray-700 text-sm font-medium">
                    Курс*
                  </FormLabel>
                  <ToggleButtonGroup
                    options={courseOptions}
                    value={field.value}
                    onChange={(val) => field.onChange(Number(val))}
                    name="course_number"
                    error={errors.course_number?.message}
                  />
                  <FormMessage className="text-red-800 text-xs px-3">
                    {errors.course_number?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

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
                    getClassName={(tagName) =>
                      cn(
                        currentKeywords.includes(tagName) &&
                          "bg-red-600 text-white"
                      )
                    }
                  />
                )}
              </FormItem>
            )}
          />
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
              onClick={() => reset()}
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
