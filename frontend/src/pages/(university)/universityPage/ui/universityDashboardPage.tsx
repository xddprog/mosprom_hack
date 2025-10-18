import { UniversityStudentsContent } from "@/entities/university/ui/universityStudentsContent";
import { ProfileUniversityContent } from "@/features/profile/ui/profileUniversityContent";
import { cn } from "@/shared/lib/utils/twMerge";
import { Button } from "@/shared/ui";
import { Container } from "@/widgets/container/container";
import { useState } from "react";

type TabsType = "students" | "profile";

const UniversityDashboardPage = () => {
  const [activeTab, setActiveTab] = useState<TabsType>("profile");

  const handleToggleTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(event.currentTarget.value as TabsType);
  };

  return (
    <Container className="text-black space-y-8 pb-4">
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
                  activeTab === "students" &&
                    "bg-[#D00E46] hover:bg-[#D00E46] text-white hover:text-white"
                )}
                value={"students"}
                onClick={handleToggleTab}
              >
                Студенты
              </Button>
            </div>
          </div>
          <div className="w-full">
            {activeTab === "profile" && <ProfileUniversityContent />}
            {activeTab === "students" && <UniversityStudentsContent />}
          </div>
        </section>
      </div>
    </Container>
  );
};

export default UniversityDashboardPage;
