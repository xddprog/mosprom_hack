import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CircleAlert, X } from "lucide-react";
import React, { useRef } from "react";
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
import { useResponseByVacancy } from "../hooks/useCreateVacancy";

export const VacancyResponseForm = ({ vacancyId }: { vacancyId: number }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: responseVacancy } = useResponseByVacancy();

  const form = useForm<TypeVacancyResponseSchema>({
    resolver: zodResolver(VacancyResponseSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
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
    const payload = {
      email: data.email,
      full_name: data.fullName,
      vacancy_id: vacancyId,
    };

    const formData = new FormData();
    formData.append("resume", data.resumeFile);

    responseVacancy({ ...payload, resume: formData });

    reset();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setValue("resumeFile", file);
    } else {
      setValue("resumeFile", undefined);
    }
  };

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col w-full justify-center">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="w-full">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="relative">
                  <FloatingLabelInput
                    {...field}
                    label="ФИО*"
                    className={cn(
                      "py-1 text-black bg-[#f0f3f7] rounded-3xl shadow-sm border-[#f0f3f7]",
                      errors.fullName && "border-red-700"
                    )}
                  />
                  {errors.fullName && (
                    <span className="text-red-800 text-xs px-3 absolute -bottom-5 left-0">
                      {errors.fullName.message}
                    </span>
                  )}
                  {field.value && !errors.fullName && (
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-800 cursor-pointer"
                      onClick={() => field.onChange("")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {errors.fullName && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-800">
                      <CircleAlert className="w-4 h-4" />
                    </div>
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                  {errors.root?.message && !errors.resumeFile && (
                    <span className="text-red-800 text-xs px-3 mt-1 block">
                      {errors.root.message}
                    </span>
                  )}
                </FormItem>
              )}
            />
            {errors.root?.message && (
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
