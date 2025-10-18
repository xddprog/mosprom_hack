import { useNavigate } from "react-router-dom";
import { useGetVacancy } from "../hooks/useGetVacancy";
import { useCallback } from "react";
import { ERouteNames } from "@/shared";
import { LoadingCard } from "@/widgets/loadingCard/ui/loadingCard";
import { VacancyItem } from "./vacancyItem";
import { Image } from "@/shared/ui";
import { IconButton } from "@/shared/ui/button/iconButton";
import { ChevronRight } from "lucide-react";

export const InternshipList = () => {
  // TODO: Получаем стажировки по тому же эндпоинту, что и вакансии. Прокидываем query vacancy_type=internship
  const { data: vacancies, isLoading } = useGetVacancy();
  const navigate = useNavigate();

  const handleNavigateToDetail = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const vacancyId = event.currentTarget.value;
      if (vacancyId) {
        navigate(`${ERouteNames.VACANCY_DETAIL_ROUTE}/${vacancyId}`);
      }
    },
    [navigate]
  );

  return (
    <div className="space-y-3">
      {isLoading ? (
        <LoadingCard className="h-[460px]" />
      ) : vacancies && vacancies.length > 0 ? (
        vacancies.map((vacancy) => (
          <VacancyItem
            key={vacancy.id}
            vacancy={vacancy}
            action={
              <IconButton
                value={vacancy.id}
                ariaLabel="Перейти к вакансии"
                className="bg-zinc-800 hover:bg-neutral-700"
                onClick={handleNavigateToDetail}
              >
                <ChevronRight className="w-5 h-5 text-zinc-500" />
              </IconButton>
            }
          />
        ))
      ) : (
        <div className="flex justify-center flex-col items-center space-y-1 mt-10">
          <Image
            alt="empty-hack"
            src="/public/images/asking-question.png"
            width={200}
            height={200}
          />
          <p className="text-sm text-zinc-400">Нет подходящих стажировок</p>
        </div>
      )}
    </div>
  );
};
