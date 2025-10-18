import React from "react";
import { Vacancy } from "../types/types";
import { CreateVacancyCard } from "@/widgets/vacancyCard/vacancyCard";
import { VacancyItem } from "./vacancyItem";
import { IconButton } from "@/shared/ui/button/iconButton";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ERouteNames } from "@/shared";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils/twMerge";

interface CompanyVacanciesListProps {
  vacancies: Vacancy[];
  onCreateVacancy: () => void;
}

export const CompanyVacanciesList: React.FC<CompanyVacanciesListProps> = ({
  vacancies,
  onCreateVacancy,
}) => {
  const navigate = useNavigate();

  const handleToManagement = (vacancyId: number) =>
    navigate(
      `/${ERouteNames.DASHBOARD_COMPANY_ROUTE}/vacancy-management/${vacancyId}`
    );

  return (
    <div className="p-8 bg-gray-50 rounded-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CreateVacancyCard onClick={onCreateVacancy} />
        {vacancies.map((vacancy) => (
          <VacancyItem
            key={vacancy.id}
            isTag={false}
            isFavoriteIcon={false}
            vacancy={vacancy}
            footerAction={
              <Button
                variant={"outline"}
                className={cn(
                  "p-4 rounded-3xl bg-[#D00E46] hover:bg-[#D00E46] text-white hover:text-white"
                )}
                onClick={() => handleToManagement(vacancy.id)}
              >
                Отклики
              </Button>
            }
            action={
              <IconButton
                value={vacancy.id}
                ariaLabel="Перейти к вакансии"
                className="bg-rose-400"
              >
                <Trash2 className="w-5 h-5 text-zinc-100" />
              </IconButton>
            }
          />
        ))}
      </div>
    </div>
  );
};
