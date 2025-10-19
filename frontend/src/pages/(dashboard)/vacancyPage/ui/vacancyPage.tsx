import { useCurrentProfile } from "@/entities/profile/hooks/useCurrentProfile";
import { EProfileRoles } from "@/entities/profile/types/types";
import { UniversityVacancyForm } from "@/entities/university/ui/universityVacancyForm";
import { Vacancy } from "@/entities/vacancy/types/types";
import { VacancyResponseForm } from "@/entities/vacancy/ui/vacancyResponseForm";
import { Image } from "@/shared/ui";
import { TagChip } from "@/shared/ui/badge/ui/badgeChip";
import { TagGroup } from "@/shared/ui/badge/ui/badgeGroup";
import { IconButton } from "@/shared/ui/button/iconButton";
import { Container } from "@/widgets/container/container";
import { ChevronLeft } from "lucide-react";
import { useLoaderData, useNavigate } from "react-router-dom";

const VacancyPage = () => {
  const vacancy = useLoaderData<Vacancy>();
  const { data: profile } = useCurrentProfile();
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  return (
    <Container className="text-black flex-col space-y-10 pb-4">
      <section className="flex space-y-4 flex-col items-center">
        <section className="flex space-y-4 justify-start flex-col w-full p-5 rounded-3xl bg-white">
          <div className="flex space-x-4">
            <IconButton
              ariaLabel="Перейти к профилю студента"
              className="bg-red-600 hover:bg-red-600 rounded-full p-2 shadow-md"
              onClick={handleBack}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </IconButton>
            <h1 className="text-3xl text-[#D00E46]">{vacancy.title}</h1>
          </div>
          <div className="space-y-1">
            <TagChip variant={"glassLight"} size={"md"} className="space-x-2">
              <Image
                src={vacancy.company.icon_url}
                alt={vacancy.company.name}
                width={20}
                height={20}
                className="rounded-md object-cover"
              />
              <p className="font-semibold text-sm text-zinc-500">
                {vacancy.company.name}
              </p>
            </TagChip>
            <TagGroup tags={vacancy.tags} variant="glassLight" size="md" />
          </div>
        </section>

        <section className="flex flex-col space-y-6 w-full">
          <div className="space-y-6 w-full bg-white rounded-3xl p-5">
            {vacancy.responsibilities &&
              vacancy.responsibilities.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-6 bg-[#D00E46] rounded-full"></span>{" "}
                    <h3 className="text-black text-xl font-semibold">
                      Обязанности
                    </h3>
                  </div>
                  <ul className="list-disc px-2 list-inside space-y-2 text-black">
                    {vacancy.responsibilities.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

            {vacancy.requirements && vacancy.requirements.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#D00E46] rounded-full"></span>{" "}
                  <h3 className="text-black text-xl font-semibold">
                    Требования
                  </h3>
                </div>
                <ul className="list-disc px-2 list-inside space-y-2 text-black">
                  {vacancy.requirements.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {!profile && (
            <div className="p-5 rounded-3xl bg-white space-y-3">
              <h1 className="text-2xl">Анкета соискателя</h1>
              <VacancyResponseForm vacancyId={vacancy.id} />
            </div>
          )}
          {profile &&
            (profile.role === EProfileRoles.UNIVERSITY ||
              profile.role === EProfileRoles.COMPANY) && (
              <div className="p-5 rounded-3xl bg-white space-y-3">
                <UniversityVacancyForm />
              </div>
            )}
        </section>
      </section>
    </Container>
  );
};

export default VacancyPage;
