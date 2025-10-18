import { VacancyFilterContent } from "@/features/vacancy/ui/vacancyFilterContent";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui";
import { useState } from "react";
import { cn } from "@/shared/lib/utils/twMerge";
import { VacancyList } from "@/entities/vacancy/ui/vacancyList";
import { InternshipList } from "@/entities/vacancy/ui/internshipList";
import { Container } from "@/widgets/container/container";

type TabsType = "vacancy" | "internship";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<TabsType>("vacancy");

  const handleToggleTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(event.currentTarget.value as TabsType);
  };

  return (
    <Container className="text-black space-y-8 pb-4">
      <h1 className="text-3xl text-[#383649]">Вакансии и стажировки</h1>
      <div className="flex gap-4">
        <VacancyFilterContent />
        <div className="flex w-full flex-col space-y-4">
          <div className="flex w-full space-x-2">
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
          </div>
          <div>
            {activeTab === "vacancy" && <VacancyList />}
            {activeTab === "internship" && <InternshipList />}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DashboardPage;
