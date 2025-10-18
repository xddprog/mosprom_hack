// components/vacancy-response-form.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CircleAlert, X, Link as LinkIcon, Upload } from "lucide-react"; // иконки
import React, { useState, useRef } from "react"; // Импортируем useState и useRef
import {
  TypeVacancyResponseSchema,
  VacancyResponseSchema,
} from "../lib/schemes/vacancyResponseSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form/form";
import { FloatingLabelInput } from "@/shared/ui/input/floatingInputLabel";
import { cn } from "@/shared/lib/utils/twMerge";
import { Button } from "@/shared/ui";
import { Input } from "@/shared/ui/input";
import { Checkbox } from "@/shared/ui/checkbox/checkbox";

type ResumeMode = "link" | "file" | null;

export const VacancyResponseForm = () => {
  const [resumeMode, setResumeMode] = useState<ResumeMode>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<TypeVacancyResponseSchema>({
    resolver: zodResolver(VacancyResponseSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      middleName: "",
      phone: "",
      email: "",
      resumeLink: "",
      resumeFile: undefined,
      agreeToDataProcessing: false,
      agreeToNewsletter: false,
      agreeToSmsAds: false,
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue,
    watch,
  } = form;

  const watchedResumeFile = watch("resumeFile");

  const onSubmit = (data: TypeVacancyResponseSchema) => {
    console.log("Форма отправлена:", data);
    // Здесь отправка данных на бэкенд
    // Если resumeFile - это File объект, его нужно будет отправить через FormData
    // Пример:
    // const formData = new FormData();
    // Object.entries(data).forEach(([key, value]) => {
    //   if (key === "resumeFile" && value instanceof File) {
    //     formData.append(key, value, value.name);
    //   } else if (value !== undefined && value !== null) {
    //     formData.append(key, String(value));
    //   }
    // });
    // axios.post('/api/apply', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

    reset();
    setResumeMode(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setValue("resumeFile", file);
      setValue("resumeLink", "");
      setResumeMode("file");
    } else {
      setValue("resumeFile", undefined);
    }
  };

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleLinkModeClick = () => {
    setResumeMode("link");
    setValue("resumeFile", undefined);
  };

  const handleFileModeClick = () => {
    setResumeMode("file");
    setValue("resumeLink", "");
  };

  return (
    <div className="flex flex-col w-full justify-center">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="relative">
                  <FloatingLabelInput
                    {...field}
                    label="Фамилия*"
                    className={cn(
                      "py-1 text-black bg-[#f0f3f7] rounded-3xl shadow-sm border-[#f0f3f7]",
                      errors.lastName && "border-red-700"
                    )}
                  />
                  {errors.lastName && (
                    <span className="text-red-800 text-xs px-3 absolute -bottom-5 left-0">
                      {errors.lastName.message}
                    </span>
                  )}
                  {field.value && !errors.lastName && (
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-800 cursor-pointer"
                      onClick={() => field.onChange("")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {errors.lastName && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-800">
                      <CircleAlert className="w-4 h-4" />
                    </div>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="relative">
                  <FloatingLabelInput
                    {...field}
                    label="Имя*"
                    className={cn(
                      "py-1 text-black bg-[#f0f3f7] rounded-3xl shadow-sm border-[#f0f3f7]",
                      errors.firstName && "border-red-700"
                    )}
                  />
                  {errors.firstName && (
                    <span className="text-red-800 text-xs px-3 absolute -bottom-5 left-0">
                      {errors.firstName.message}
                    </span>
                  )}
                  {field.value && !errors.firstName && (
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-800 cursor-pointer"
                      onClick={() => field.onChange("")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {errors.firstName && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-800">
                      <CircleAlert className="w-4 h-4" />
                    </div>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem className="relative">
                  <FloatingLabelInput
                    {...field}
                    label="Отчество"
                    className={cn(
                      "py-1 text-black bg-[#f0f3f7] rounded-3xl shadow-sm border-[#f0f3f7]",
                      errors.middleName && "border-red-700"
                    )}
                  />
                  {errors.middleName && (
                    <span className="text-red-800 text-xs px-3 absolute -bottom-5 left-0">
                      {errors.middleName.message}
                    </span>
                  )}
                  {field.value && !errors.middleName && (
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-800 cursor-pointer"
                      onClick={() => field.onChange("")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="relative">
                  <FloatingLabelInput
                    {...field}
                    label="Телефон*"
                    type="tel"
                    className={cn(
                      "py-1 text-black bg-[#f0f3f7] rounded-3xl shadow-sm border-[#f0f3f7]",
                      errors.phone && "border-red-700"
                    )}
                  />
                  {errors.phone && (
                    <span className="text-red-800 text-xs px-3 absolute -bottom-5 left-0">
                      {errors.phone.message}
                    </span>
                  )}
                  {field.value && !errors.phone && (
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-800 cursor-pointer"
                      onClick={() => field.onChange("")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {errors.phone && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-800">
                      <CircleAlert className="w-4 h-4" />
                    </div>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FloatingLabelInput
                    {...field}
                    label="Почта*"
                    type="email"
                    className={cn(
                      "py-1 text-black bg-[#f0f3f7] rounded-3xl shadow-sm border-[#f0f3f7]",
                      errors.email && "border-red-700"
                    )}
                  />
                  {errors.email && (
                    <span className="text-red-800 text-xs px-3 absolute -bottom-5 left-0">
                      {errors.email.message}
                    </span>
                  )}
                  {field.value && !errors.email && (
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-800 cursor-pointer"
                      onClick={() => field.onChange("")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {errors.email && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-800">
                      <CircleAlert className="w-4 h-4" />
                    </div>
                  )}
                </FormItem>
              )}
            />
          </div>

          <FormItem className="relative">
            <FormLabel className="sr-only">Резюме*</FormLabel>
            <div className="flex items-center">
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "flex-1 py-3 px-4 rounded-3xl text-sm font-medium",
                  resumeMode === "link"
                    ? "bg-[#D00E46]/60 hover:bg-[#D00E46]/60 text-white hover:text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
                onClick={handleLinkModeClick}
              >
                <LinkIcon className="mr-2 h-4 w-4" /> Ссылка
              </Button>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "flex-1 py-3 px-4 rounded-3xl text-sm font-medium",
                  resumeMode === "file"
                    ? "bg-[#D00E46]/60 hover:bg-[#D00E46]/60 text-white hover:text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
                onClick={handleFileModeClick}
              >
                <Upload className="mr-2 h-4 w-4" /> Файл
              </Button>
            </div>

            {resumeMode === "link" && (
              <FormField
                control={form.control}
                name="resumeLink"
                render={({ field }) => (
                  <FormItem className="relative mt-2">
                    <FloatingLabelInput
                      {...field}
                      label="Ссылка на резюме*"
                      className={cn(
                        "py-1 text-black bg-[#f0f3f7] rounded-3xl shadow-sm border-[#f0f3f7]",
                        errors.resumeLink && "border-red-700"
                      )}
                    />
                    {errors.resumeLink && (
                      <span className="text-red-800 text-xs px-3 absolute -bottom-5 left-0">
                        {errors.resumeLink.message}
                      </span>
                    )}
                    {field.value && !errors.resumeLink && (
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-800 cursor-pointer"
                        onClick={() => field.onChange("")}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    {errors.resumeLink && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-800">
                        <CircleAlert className="w-4 h-4" />
                      </div>
                    )}
                  </FormItem>
                )}
              />
            )}

            {resumeMode === "file" && (
              <FormField
                control={form.control}
                name="resumeFile"
                render={({ field }) => (
                  <FormItem className="relative mt-2">
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
                        errors.resumeFile && "border-red-700",
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
                            setValue("resumeFile", undefined);
                            if (fileInputRef.current)
                              fileInputRef.current.value = "";
                          }}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    {errors.resumeFile && (
                      <span className="text-red-800 text-xs px-3 absolute -bottom-5 left-0">
                        Резюме обязательно
                      </span>
                    )}
                    {errors.root?.message &&
                      !errors.resumeFile &&
                      !errors.resumeLink && (
                        <span className="text-red-800 text-xs px-3 mt-1 block">
                          {errors.root.message}
                        </span>
                      )}
                  </FormItem>
                )}
              />
            )}
            {errors.root?.message && !resumeMode && (
              <span className="text-red-800 text-xs px-3 mt-1 block">
                {errors.root.message}
              </span>
            )}
          </FormItem>

          <Button
            disabled={!isValid}
            type="submit"
            className="w-full py-6 rounded-3xl bg-[#D00E46] text-white text-lg font-medium hover:bg-[#B00C3B] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Отправить
          </Button>

          <div className="space-y-3 pt-4">
            <FormField
              control={form.control}
              name="agreeToDataProcessing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="rounded-full border-gray-300 data-[state=checked]:bg-red-600 data-[state=checked]:text-white"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal text-gray-700 cursor-pointer">
                      Я согласен на обработку персональных данных
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="agreeToNewsletter"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="rounded-full border-gray-300 data-[state=checked]:bg-red-600 data-[state=checked]:text-white"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal text-gray-700 cursor-pointer">
                      Даю согласие на получение рассылок
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="agreeToSmsAds"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="rounded-full border-gray-300 data-[state=checked]:bg-red-600 data-[state=checked]:text-white"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal text-gray-700 cursor-pointer">
                      Даю согласие на получение SMS-сообщений рекламного
                      характера
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};
