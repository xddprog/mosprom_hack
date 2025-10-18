import { vacancySelectors } from "@/entities/vacancy/model/store/vacancySlice";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { ChangeEvent, useCallback, useState } from "react";
import {
  ExperienceType,
  VacancyFilter,
  WorkFormat,
} from "@/entities/vacancy/types/types";
import { cn } from "@/shared/lib/utils/twMerge";

interface FilterOptionButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

const FilterOptionButton: React.FC<FilterOptionButtonProps> = ({
  label,
  isSelected,
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-3xl text-sm transition-colors duration-200",
        isSelected ? "bg-[#D00E46] text-white" : "bg-[#f0f3f7] text-gray-700 ",
        className
      )}
    >
      {label}
    </button>
  );
};

const EXPERIENCE_OPTIONS = [
  { label: "Не имеет значения", value: null },
  { label: "Без опыта", value: "no-experience" },
  { label: "От 1 до 3", value: "1-3" },
  { label: "От 3 до 6", value: "3-6" },
  { label: "Более 6", value: "more-6" },
];

const WORK_FORMAT_OPTIONS = [
  { label: "Офис", value: "office" },
  { label: "Удаленно", value: "remote" },
  { label: "Гибрид", value: "hybrid" },
];

export const VacancyFilterContent = () => {
  const vacancyFiltersFromStore = useAppSelector(
    vacancySelectors.vacancyFIlters
  );
  const { resetFilters } = useActions();

  const [vacancyLocalFilters, setVacancyLocalFilters] = useState<
    Partial<VacancyFilter>
  >(() => ({
    salaryMin: vacancyFiltersFromStore?.salaryMin ?? "",
    salaryMax: vacancyFiltersFromStore?.salaryMax ?? "",
    experience: vacancyFiltersFromStore?.experience ?? null,
    workFormat: vacancyFiltersFromStore?.workFormat ?? null,
    region: vacancyFiltersFromStore?.region ?? "",
  }));

  const handleChangeInputFilter = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setVacancyLocalFilters((prev) => ({
        ...prev,
        [name]: name.startsWith("salary")
          ? value === ""
            ? ""
            : Number(value)
          : value,
      }));
    },
    []
  );

  const handleExperienceChange = useCallback(
    (value: VacancyFilter["experience"]) => {
      setVacancyLocalFilters((prev) => ({
        ...prev,
        experience: prev.experience === value ? null : value,
      }));
    },
    []
  );

  const handleWorkFormatChange = useCallback(
    (value: VacancyFilter["workFormat"]) => {
      setVacancyLocalFilters((prev) => ({
        ...prev,
        workFormat: prev.workFormat === value ? null : value,
      }));
    },
    []
  );

  const handleResetFilter = () => {
    setVacancyLocalFilters({
      salaryMin: "",
      salaryMax: "",
      experience: null,
      workFormat: null,
      region: "",
    });

    resetFilters();
  };

  return (
    <div
      className="w-full max-w-[318px] max-h-[543px] mx-auto p-6 space-y-6 rounded-3xl shadow-xl bg-white"
      style={{
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        borderRadius: "20px",
      }}
    >
      <h2 className="text-lg text-gray-800">Фильтры</h2>

      <div>
        <label
          htmlFor="salaryMin"
          className="block text-zinc-500 text-[15px] mb-2"
        >
          Зарплата
        </label>
        <div className="flex">
          <Input
            id="salaryMin"
            name="salaryMin"
            type="number"
            placeholder="От"
            value={vacancyLocalFilters.salaryMin ?? ""}
            onChange={handleChangeInputFilter}
            className="flex-1 px-4 py-2 rounded-3xl bg-[#f0f3f7] border border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          />
          <Input
            id="salaryMax"
            name="salaryMax"
            type="number"
            placeholder="До"
            value={vacancyLocalFilters.salaryMax ?? ""}
            onChange={handleChangeInputFilter}
            className="flex-1 px-4 py-2 rounded-3xl bg-[#f0f3f7] border border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          />
        </div>
      </div>

      <div>
        <span className="block text-zinc-500 text-[15px] mb-2">Опыт</span>
        <div className="flex flex-wrap">
          {EXPERIENCE_OPTIONS.map((option) => (
            <FilterOptionButton
              key={option.value === null ? "null-experience" : option.value}
              label={option.label}
              isSelected={vacancyLocalFilters.experience === option.value}
              onClick={() =>
                handleExperienceChange(option.value as ExperienceType)
              }
            />
          ))}
        </div>
      </div>

      <div>
        <span className="block text-zinc-500 text-[15px] mb-2">
          Формат работы
        </span>
        <div className="flex flex-wrap">
          {WORK_FORMAT_OPTIONS.map((option) => (
            <FilterOptionButton
              key={option.value}
              label={option.label}
              isSelected={vacancyLocalFilters.workFormat === option.value}
              onClick={() => handleWorkFormatChange(option.value as WorkFormat)}
            />
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="region"
          className="block text-zinc-500 text-[15px] mb-2"
        >
          Регион
        </label>
        <Input
          id="region"
          name="region"
          placeholder="Название региона"
          value={vacancyLocalFilters.region ?? ""}
          onChange={handleChangeInputFilter}
          className="w-full px-4 py-2 rounded-3xl bg-[#f0f3f7] border border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
        />
      </div>

      <Button
        variant={"outline"}
        onClick={handleResetFilter}
        className="px-6 py-5 w-full bg-[#D00E46] rounded-3xl text-white hover:bg-[#D00E46] hover:text-white"
      >
        Очистить
      </Button>
    </div>
  );
};
