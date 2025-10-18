import { useNavigate } from "react-router-dom";
import { useGetVacancy } from "../hooks/useGetVacancy";
import { useCallback } from "react";
import { ERouteNames } from "@/shared";
import { LoadingCard } from "@/widgets/loadingCard/ui/loadingCard";
import { VacancyItem } from "./vacancyItem";
import { Image } from "@/shared/ui";
import { IconButton } from "@/shared/ui/button/iconButton";

export const InternshipList = () => {
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
                className="bg-[#D00E46] text-white text-sm hover:bg-[#D00E46] px-4"
                onClick={handleNavigateToDetail}
              >
                Откликнуться
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
