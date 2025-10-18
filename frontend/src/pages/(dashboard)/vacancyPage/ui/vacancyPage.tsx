import { mockVacanciesByCompany } from "@/entities/vacancy/lib/constants";
import { VacancyResponseForm } from "@/entities/vacancy/ui/vacancyResponseForm";
import { cn } from "@/shared/lib/utils/twMerge";
import { Button, Image } from "@/shared/ui";
import { TagChip } from "@/shared/ui/badge/ui/badgeChip";
import { TagGroup } from "@/shared/ui/badge/ui/badgeGroup";
import { IconButton } from "@/shared/ui/button/iconButton";
import { Container } from "@/widgets/container/container";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VacancyPage = () => {
  // const vacancy = useLoaderData<Vacancy>();
  const vacancy = mockVacanciesByCompany[0];
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  return (
    <Container className="text-black flex-col space-y-10 min-h-[calc(100vh-4rem)] pb-4">
      <section className="flex space-x-4 items-center">
        <IconButton
          ariaLabel="Перейти к профилю студента"
          className="bg-white hover:bg-white rounded-full p-2 shadow-md"
          onClick={handleBack}
        >
          <ChevronLeft className="w-5 h-5 text-zinc-600" />
        </IconButton>

        <h1 className="text-3xl">{vacancy.post}</h1>
      </section>
      <section className="flex space-x-4">
        <div className="w-[288px] space-y-2">
          <TagChip variant={"outline"} size={"md"} className="space-x-2">
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
          <TagGroup tags={vacancy.tags} variant="outline" size="md" />
        </div>
        <section className="flex flex-col space-y-6">
          <div className="space-y-6 w-full">
            {[vacancy.responsibilities, vacancy.requirements].map(
              (section, idx) => (
                <div key={idx} className="space-y-2">
                  <div>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "p-6 rounded-3xl bg-[#D00E46] hover:bg-[#D00E46] text-white hover:text-white"
                      )}
                      value={"vacancy"}
                    >
                      {section.title}
                    </Button>
                  </div>

                  <ul className="list-disc px-2 list-inside space-y-2 text-black">
                    {section.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
          <div className="p-5 rounded-3xl bg-white space-y-3">
            <h1 className="text-2xl">Анкета соискателя</h1>
            <VacancyResponseForm />
          </div>
        </section>
      </section>
    </Container>
  );
};

export default VacancyPage;
