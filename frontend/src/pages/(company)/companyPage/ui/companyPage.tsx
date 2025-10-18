import { ChartConfig } from "@/shared/ui/chart/chart";
import { useAnalytics } from "@/entities/analytic/hooks/useAnalytics";
import { useEffect, useState } from "react";
import { Button } from "@/shared/ui";
import { Container } from "@/widgets/container/container";
import { cn } from "@/shared/lib/utils/twMerge";
import { CompanyVacancyContent } from "@/entities/vacancy/ui/companyVacancyContent";
import { ProfileCompanyContent } from "@/features/profile/ui/profileCompanyContent";
import { useGetCompanyProfile } from "@/entities/profile/hooks/useCurrentProfile";

type TabsType = "vacancy" | "profile";

const AnalyticsPage: React.FC = () => {
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    candidates: { label: "Кандидаты" },
  });
  const [activeTab, setActiveTab] = useState<TabsType>("profile");

  const { data: company } = useGetCompanyProfile();

  const {
    data: analyticsData,
    isFetching,
    isPending,
    isSuccess,
  } = useAnalytics();

  const handleToggleTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(event.currentTarget.value as TabsType);
  };

  useEffect(() => {
    if (!analyticsData) return;
    setChartConfig({
      candidates: { label: "Кандидаты" },
      ...analyticsData.statusDistribution.reduce(
        (acc, { name, fill }) => ({
          ...acc,
          [name]: { label: name, color: fill },
        }),
        {}
      ),
      ...analyticsData.topVacancies.reduce(
        (acc, { name, fill }) => ({
          ...acc,
          [name]: { label: name, color: fill },
        }),
        {}
      ),
    });
  }, [analyticsData]);

  if (isFetching || isPending || !isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="text-black flex-col space-y-6 pb-4">
      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl">Параметры профиля</h1>
        <section className="flex space-x-4">
          <div className="w-[288px] space-y-2">
            <div>
              <Button
                variant={"outline"}
                className={cn(
                  "p-6 rounded-3xl w-full bg-white hover:bg-white text-black",
                  activeTab === "profile" &&
                    "bg-[#D00E46] hover:bg-[#D00E46] text-white hover:text-white"
                )}
                value={"profile"}
                onClick={handleToggleTab}
              >
                Параметры
              </Button>
            </div>
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
          </div>
          <div className="w-full">
            {activeTab === "profile" && company && (
              <ProfileCompanyContent company={company} />
            )}
            {activeTab === "vacancy" && company && (
              <CompanyVacancyContent companyId={company?.id} />
            )}
          </div>
        </section>
      </div>
    </Container>
  );
};

export default AnalyticsPage;
