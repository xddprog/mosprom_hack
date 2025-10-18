import { ERouteNames } from "@/shared";
import { BannerCard } from "@/widgets/bannerCard";
import { InfoCard } from "@/widgets/infoCard";
import { Award, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const UniversityWidget = () => {
  const navigate = useNavigate();

  const handleToProfile = () => navigate(ERouteNames.PROFILE_ROUTE);

  return (
    <section className="flex space-x-2">
      <BannerCard
        imageSrc="/images/blue-holo-gradient.png"
        title="Посмотрите лучшие группы вашего учебного заведения"
        highlight="НИТУ МИСИС"
        buttonText="Посмотреть"
        onClick={() => {}}
      />

      <div className="flex flex-col w-full space-y-2">
        <InfoCard
          icon={<GraduationCap className="w-5 h-5 text-gray-300" />}
          title={
            <>
              Профиль <br /> университета
            </>
          }
          onClick={handleToProfile}
        />
        <InfoCard
          icon={<Award className="w-5 h-5 text-gray-300" />}
          title={
            <>
              Набор на <br /> стажировки
            </>
          }
          onClick={() => navigate(ERouteNames.UNIVERSITY_INTERNSHIP_ROUTE)}
        />
      </div>
    </section>
  );
};
