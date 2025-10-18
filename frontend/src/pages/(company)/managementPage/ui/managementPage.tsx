import { mockVacanciesByCompany } from "@/entities/vacancy/lib/constants";
import { VacancyItem } from "@/entities/vacancy/ui/vacancyItem";
import { ERouteNames } from "@/shared";
import { Image } from "@/shared/ui";
import { IconButton } from "@/shared/ui/button/iconButton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui/tabs/tabs";
import { motion } from "framer-motion";
import { ChevronLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManagementPage = () => {
  const navigate = useNavigate();

  const handleBackPage = () => navigate(-1);

  const handleToManagement = (vacancyId: number) =>
    navigate(
      `/${ERouteNames.DASHBOARD_COMPANY_ROUTE}/vacancy-management/${vacancyId}`
    );

  return (
    <div className="space-y-3 pb-4">
      <div className="flex justify-start items-center">
        <IconButton
          ariaLabel="вернуться назад"
          onClick={handleBackPage}
          className="bg-neutral-900"
        >
          <ChevronLeft className="h-6 w-6 text-zinc-300" />
        </IconButton>
      </div>
      <Tabs defaultValue="vacancy" className="w-full">
        <TabsList className="w-full bg-neutral-900 text-white p-1">
          <TabsTrigger value="vacancy" className="text-white p-3.5">
            Создание
          </TabsTrigger>
          <TabsTrigger value="internship" className="text-white p-3.5">
            Просмотр
          </TabsTrigger>
        </TabsList>
        <TabsContent value="vacancy" className="pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="shadow-xl space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="relative"
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
                        Удобно создавайте вакансии для вашей компании
                      </h1>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </TabsContent>
        <TabsContent value="internship" className="pt-4">
          <div className="shadow-xl space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="relative"
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
                      Просматривайте созданные вакансии
                    </h1>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-white space-y-3">
                {mockVacanciesByCompany.map((vacancy) => (
                  <VacancyItem
                    key={vacancy.id}
                    isFavoriteIcon={false}
                    vacancy={vacancy}
                    action={
                      <IconButton
                        value={vacancy.id}
                        ariaLabel="Перейти к вакансии"
                        className="bg-rose-400"
                      >
                        <Trash2 className="w-5 h-5 text-zinc-100" />
                      </IconButton>
                    }
                    onClick={handleToManagement}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManagementPage;
