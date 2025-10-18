import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Tags, Plus, X, CircleAlert } from "lucide-react";
import {
  InternshipFormData,
  InternshipFormSchema,
} from "../lib/schemes/createInternshipFormSchema";
import { FormCard } from "@/widgets/formCard/ui/formCard";
import { FormField, FormItem } from "@/shared/ui/form/form";
import { FloatingLabelInput } from "@/shared/ui/input/floatingInputLabel";
import { cn } from "@/shared/lib/utils/twMerge";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui";
import { DatePicker } from "@/shared/ui/calendar/datePicker";

export const InternshipCreateForm = () => {
  const useCreateInternship = () => ({
    mutate: (data: InternshipFormData) => {
      console.log("Creating internship:", data);
    },
  });

  const { mutate: createInternship } = useCreateInternship();
  const form = useForm<InternshipFormData>({
    resolver: zodResolver(InternshipFormSchema),
    defaultValues: {
      position: "",
      requiredSkills: [],
      availableSlots: 1,
      deadline: new Date().toISOString(),
      university: "",
    },
  });
  const [currentSkill, setCurrentSkill] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const requiredSkills = watch("requiredSkills");

  const addSkill = () => {
    if (currentSkill.trim()) {
      setValue("requiredSkills", [...requiredSkills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setValue(
      "requiredSkills",
      requiredSkills.filter((_, i) => i !== index)
    );
  };

  const onSubmit = (data: InternshipFormData) => {
    createInternship(data);
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
              title="Основная информация о стажировке"
              icon={<Briefcase className="w-6 h-6" />}
              description="Заполните основные детали о стажировке."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="position"
                  render={({ field }) => (
                    <FormItem className="relative gap-1">
                      <FloatingLabelInput
                        {...field}
                        label="Должность"
                        className={cn(
                          "py-1.5 text-white bg-neutral-900 rounded-xl shadow-sm border-neutral-800 focus:border-blue-500",
                          errors.position && "border-red-700"
                        )}
                      />
                      {errors.position && (
                        <span className="text-red-800 text-xs px-3 mt-1 block">
                          {errors.position.message}
                        </span>
                      )}
                      {field.value && !errors.position && (
                        <button
                          type="button"
                          className="absolute right-4 top-4.5 text-blue-500 cursor-pointer"
                          onClick={() => field.onChange("")}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      {errors.position && (
                        <CircleAlert className="absolute right-4 top-4.5 text-red-700 w-4 h-4" />
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="university"
                  render={({ field }) => (
                    <FormItem className="relative gap-1">
                      <FloatingLabelInput
                        {...field}
                        label="Университет"
                        className={cn(
                          "py-1.5 text-white bg-neutral-900 rounded-xl shadow-sm border-neutral-800 focus:border-blue-500",
                          errors.university && "border-red-700"
                        )}
                      />
                      {errors.university && (
                        <span className="text-red-800 text-xs px-3 mt-1 block">
                          {errors.university.message}
                        </span>
                      )}
                      {field.value && !errors.university && (
                        <button
                          type="button"
                          className="absolute right-4 top-4.5 text-blue-500 cursor-pointer"
                          onClick={() => field.onChange("")}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      {errors.university && (
                        <CircleAlert className="absolute right-4 top-4.5 text-red-700 w-4 h-4" />
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="availableSlots"
                  render={({ field }) => (
                    <FormItem className="relative gap-1">
                      <FloatingLabelInput
                        {...field}
                        type="number"
                        label="Доступные места"
                        className={cn(
                          "py-1.5 text-white bg-neutral-900 rounded-xl shadow-sm border-neutral-800 focus:border-blue-500",
                          errors.availableSlots && "border-red-700"
                        )}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                      {errors.availableSlots && (
                        <span className="text-red-800 text-xs px-3 mt-1 block">
                          {errors.availableSlots.message}
                        </span>
                      )}
                      {errors.availableSlots && (
                        <CircleAlert className="absolute right-4 top-4.5 text-red-700 w-4 h-4" />
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="relative gap-1">
                      <DatePicker
                        {...field}
                        date={field.value ? new Date(field.value) : undefined}
                        onChangeDate={(date) =>
                          field.onChange(date?.toISOString() || "")
                        }
                        // label="Дедлайн подачи заявок"
                        className={cn(errors.deadline && "border-red-700")}
                      />
                      {errors.deadline && (
                        <span className="text-red-800 text-xs px-3 mt-1 block">
                          {errors.deadline.message}
                        </span>
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
              title="Необходимые навыки"
              icon={<Tags className="w-6 h-6" />}
              description="Добавьте ключевые навыки, необходимые для стажировки."
            >
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  placeholder="Например: Python, Machine Learning"
                  className="py-6 text-white bg-neutral-900 border border-neutral-800 placeholder:text-zinc-400 rounded-xl shadow-sm focus:border-blue-500 flex-grow"
                />
              </div>
              {errors.requiredSkills && (
                <p className="text-red-800 text-sm mt-2 px-1">
                  {errors.requiredSkills.message}
                </p>
              )}
              <div
                className={cn(
                  "flex flex-wrap gap-2 my-4",
                  requiredSkills.length === 0 && "my-2"
                )}
              >
                <AnimatePresence>
                  {requiredSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                    >
                      {skill}
                      <X
                        className="w-4 h-4 ml-2 cursor-pointer"
                        onClick={() => removeSkill(index)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <Button
                type="button"
                onClick={addSkill}
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" /> Добавить навык
              </Button>
            </FormCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Создать набор
            </Button>
          </motion.div>
        </form>
      </FormProvider>
    </div>
  );
};
