import { useForm } from "react-hook-form";
import {
  RegisterSchema,
  TypeRegisterSchema,
} from "../lib/schemes/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/shared/ui/form/form";
import { FloatingLabelInput } from "@/shared/ui/input/floatingInputLabel";
import { cn } from "@/shared/lib/utils/twMerge";
import { CircleAlert, X } from "lucide-react";
import { Button } from "@/shared/ui";
import { Link } from "react-router-dom";
import { ERouteNames } from "@/shared";
import { useRegisterMutation } from "../hooks/useRegister";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { selectAuthRole } from "../model/store/authSlice";
import { Combobox } from "@/shared/ui/combobox/combobox";
import { EProfileRoles } from "@/entities/profile/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select/select";
import { useGetCompanyList } from "@/entities/profile/hooks/useCurrentProfile";

export const RegisterForm = () => {
  const selectRole = useAppSelector(selectAuthRole);

  const { data: companyList } = useGetCompanyList();

  const form = useForm<TypeRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      full_name: "",
      company_id: undefined,
      university_id: undefined,
    },
  });

  const { mutate } = useRegisterMutation();

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;
  console.log(errors);
  const onSubmit = (authForm: TypeRegisterSchema) => {
    if (!selectRole) return;
    mutate({ ...authForm, role: selectRole });
    reset();
  };

  return (
    <div className="space-y-2 flex flex-col w-full justify-center h-full bg-white p-6 md:p-10 rounded-3xl">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 flex flex-col w-full h-full justify-between"
        >
          <section className="space-y-3">
            <h2 className="font-medium text-black text-lg text-center">
              Давай познакомимся!
            </h2>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative gap-1">
                  <FloatingLabelInput
                    {...field}
                    label="Почта"
                    className={cn(
                      "py-1.5 text-black bg-[#f0f3f7] rounded-3xl shadow-sm border-[#f0f3f7]",
                      errors.email && "border-red-700"
                    )}
                  />
                  {errors.email && (
                    <span className="text-red-800 text-xs px-3">
                      {errors.email.message}
                    </span>
                  )}
                  {field.value && !errors.email && (
                    <button
                      className="absolute right-4 top-4.5 text-blue-800 cursor-pointer"
                      onClick={() => field.onChange("")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {errors.email && (
                    <button className="absolute right-4 top-4.5 text-red-800 cursor-pointer">
                      <CircleAlert className="w-4 h-4" />
                    </button>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem className="relative gap-1">
                  <FloatingLabelInput
                    {...field}
                    label={"ФИО"}
                    className={cn(
                      "py-1.5 text-black bg-[#f0f3f7] rounded-3xl shadow-sm border-[#f0f3f7]",
                      errors.full_name && "border-red-700"
                    )}
                  />
                  {errors.full_name && (
                    <span className="text-red-800 text-xs px-3">
                      {errors.full_name.message}
                    </span>
                  )}
                  {field.value && !errors.full_name && (
                    <button
                      className="absolute right-4 top-4.5 text-blue-800 cursor-pointer"
                      onClick={() => field.onChange("")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {errors.full_name && (
                    <button className="absolute right-4 top-4.5 text-red-800 cursor-pointer">
                      <CircleAlert className="w-4 h-4" />
                    </button>
                  )}
                </FormItem>
              )}
            />
            {selectRole === EProfileRoles.COMPANY && (
              <FormField
                control={form.control}
                name="company_id"
                render={({ field }) => (
                  <FormItem className="relative gap-1">
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger className="w-full rounded-3xl bg-[#f0f3f7] border-zinc-200 text-black text-[13px] focus:ring-1 focus:ring-zinc-400 py-6 px-3">
                        <SelectValue placeholder="Выбрать компанию" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#f0f3f7] border-zinc-200 text-black rounded-3xl">
                        {companyList &&
                          companyList.map((company) => (
                            <SelectItem
                              key={company.id}
                              value={String(company.id)}
                              className="p-3 rounded-3xl"
                            >
                              {company.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}

            {selectRole === EProfileRoles.UNIVERSITY && (
              <FormField
                control={form.control}
                name="university_id"
                render={({ field }) => (
                  <FormItem className="relative gap-1">
                    <Combobox
                      {...field}
                      options={[]}
                      onChangeValue={field.onChange}
                      onChangeSearchValue={() => {}}
                    />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative gap-1">
                  <FloatingLabelInput
                    {...field}
                    label="Пароль"
                    type="password"
                    className={cn(
                      "py-1.5 text-black bg-[#f0f3f7] rounded-3xl shadow-sm border-[#f0f3f7]",
                      errors.password && "border-red-700"
                    )}
                  />
                  {errors.password && (
                    <span className="text-red-800 text-xs px-3">
                      {errors.password.message}
                    </span>
                  )}
                  {field.value && !errors.password && (
                    <button
                      className="absolute right-4 top-4.5 text-blue-800 cursor-pointer"
                      onClick={() => field.onChange("")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {errors.password && (
                    <button className="absolute right-4 top-4.5 text-red-800 cursor-pointer">
                      <CircleAlert className="w-4 h-4" />
                    </button>
                  )}
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant={"outline"}
              className="px-6 py-5 w-full rounded-3xl bg-[#D00E46] text-white hover:bg-[#D00E46] hover:text-white"
            >
              Зарегестрироваться
            </Button>
          </section>
          <p className="text-black text-center text-sm">
            У меня есть аккаунт,{" "}
            <Link
              to={`/${ERouteNames.AUTH_ROUTE}/${ERouteNames.LOGIN_ROUTE}`}
              className="text-blue-600 cursor-pointer"
            >
              войти
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};
