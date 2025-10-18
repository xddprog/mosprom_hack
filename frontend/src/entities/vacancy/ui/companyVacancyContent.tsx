import { cn } from "@/shared/lib/utils/twMerge";
import { Button } from "@/shared/ui";
import { Input } from "@/shared/ui/input";
import { useState } from "react";
import { CompanyVacanciesList } from "./vacancyCompanyList";
import { mockVacanciesByCompany } from "../lib/constants";
import { useActions } from "@/shared/hooks/useActions";
import { EModalVariables } from "@/shared/lib/utils/modalVariables";

type TabsType = "vacancy" | "internship";

export const CompanyVacancyContent = () => {
  const { setOpenModal } = useActions();
  const [activeTab, setActiveTab] = useState<TabsType>("vacancy");

  const handleToggleTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(event.currentTarget.value as TabsType);
  };

  const handleVacancyCreateModal = () => {
    setOpenModal({
      isOpen: true,
      type: EModalVariables.VACANCY_CREATE_MODAL,
      data: { vacancyType: activeTab },
    });
  };

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex w-full">
        <div>
          <Button
            variant={"outline"}
            className={cn(
              "p-6 rounded-3xl w-full bg-white text-black hover:bg-white",
              activeTab === "vacancy" &&
                "bg-[#D00E46] hover:bg-[#D00E46] text-white hover:text-white"
            )}
            value={"vacancy"}
            onClick={handleToggleTab}
          >
            Вакансии
          </Button>
        </div>

        <div>
          <Button
            variant={"outline"}
            className={cn(
              "p-6 rounded-3xl w-full bg-white hover:bg-white text-black",
              activeTab === "internship" &&
                "bg-[#D00E46] hover:bg-[#D00E46] text-white hover:text-white"
            )}
            value={"internship"}
            onClick={handleToggleTab}
          >
            Стажировки
          </Button>
        </div>

        <Input
          placeholder="Ключевые слова"
          className="w-full p-6 rounded-3xl bg-white border focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
        />
        <div>
          <Button
            variant={"outline"}
            className={cn(
              "p-6 rounded-3xl w-full bg-[#D00E46] hover:bg-[#D00E46] text-white hover:text-white"
            )}
          >
            Фильтры
          </Button>
        </div>
      </div>
      <div>
        {activeTab === "vacancy" && (
          <CompanyVacanciesList
            vacancies={mockVacanciesByCompany}
            onCreateVacancy={handleVacancyCreateModal}
          />
        )}
        {activeTab === "internship" && (
          <CompanyVacanciesList
            vacancies={mockVacanciesByCompany}
            onCreateVacancy={handleVacancyCreateModal}
          />
        )}
      </div>
    </div>
  );
};
