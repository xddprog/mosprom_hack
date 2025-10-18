import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card/card";
import { motion } from "framer-motion";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart/chart";
import {
  Users,
  Percent,
  Settings,
  GraduationCap,
  BriefcaseBusiness,
} from "lucide-react";
import { InfoCard } from "@/widgets/infoCard";
import { useNavigate } from "react-router-dom";
import { ERouteNames } from "@/shared";
import { useAnalytics } from "@/entities/analytic/hooks/useAnalytics";
import { useEffect, useState } from "react";
import { Image } from "@/shared/ui";

const AnalyticsPage: React.FC = () => {
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    candidates: { label: "Кандидаты" },
  });
  const navigate = useNavigate();
  const {
    data: analyticsData,
    isFetching,
    isPending,
    isSuccess,
  } = useAnalytics();

  const handleToManagement = () => {
    navigate(ERouteNames.MANAGEMENT_ROUTE);
  };

  const handleToInternship = () => {
    navigate(ERouteNames.COMPANY_INTERNSHIP_ROUTE);
  };

  const handleToProfile = () => {
    navigate(ERouteNames.COMPANY_PROFILE_ROUTE);
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
    <div className="space-y-6 pb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="relative sm:col-span-2"
        >
          <Image
            src="/images/vacancy_main.png"
            alt="vacancy-banner"
            className="rounded-3xl w-full max-h-[350px]"
          />

          <div className="absolute inset-0 flex flex-col justify-between p-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-medium text-white">
                  Удобно просматривайте аналитику ваших вакансий
                </h1>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="col-span-1 sm:col-span-1"
        >
          <InfoCard
            icon={<BriefcaseBusiness className="w-5 h-5 text-zinc-300" />}
            title={
              <>
                Профиль <br /> компании
              </>
            }
            onClick={handleToProfile}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="col-span-1 sm:col-span-1"
        >
          <InfoCard
            icon={<Settings className="w-5 h-5 text-zinc-300" />}
            title={
              <>
                Создание <br /> вакансий
              </>
            }
            onClick={handleToManagement}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="col-span-1 sm:col-span-1"
        >
          <InfoCard
            icon={<GraduationCap className="w-5 h-5 text-zinc-300" />}
            title={
              <>
                Наборы
                <br /> на стажировки
              </>
            }
            onClick={handleToInternship}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="col-span-1 sm:col-span-2"
        >
          <Card className="bg-neutral-900 border-zinc-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-300">
                Всего кандидатов
              </CardTitle>
              <Users className="h-4 w-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-zinc-300 font-bold">
                {analyticsData?.totalCandidates}
              </div>
              <p className="text-xs text-zinc-500">
                За период: {analyticsData?.candidatesThisMonth}
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="col-span-1 sm:col-span-2"
        >
          <Card className="bg-neutral-900 border-zinc-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-300">
                Распределение по статусам
              </CardTitle>
              <CardDescription className="text-xs text-zinc-500">
                Процент кандидатов по статусам
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <PieChart>
                  <Pie
                    data={analyticsData?.statusDistribution}
                    dataKey="value"
                    nameKey="name"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="col-span-1 sm:col-span-2"
        >
          <Card className="bg-neutral-900 border-zinc-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-300">
                Средний % соответствия
              </CardTitle>
              <Percent className="h-4 w-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-zinc-300 font-bold">
                {analyticsData?.averageMatch}%
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="col-span-1 sm:col-span-2"
        >
          <Card className="bg-neutral-900 border-zinc-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-300">
                Топ-вакансии
              </CardTitle>
              <CardDescription className="text-xs text-zinc-500">
                Кандидаты по вакансиям
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <PieChart>
                  <Pie
                    data={analyticsData?.topVacancies}
                    dataKey="value"
                    nameKey="name"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
