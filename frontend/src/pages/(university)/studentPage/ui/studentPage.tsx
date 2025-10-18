import { studentsMock } from "@/entities/university/lib/constants";
import { UniversityStudentCvCard } from "@/entities/university/ui/universityStudentCvCard";
import { UniversityStudentItem } from "@/entities/university/ui/universityStudentItem";
import { UniversityStudentRecommendedCard } from "@/entities/university/ui/universityStudentRecommendedCard";
import { IconButton } from "@/shared/ui/button/iconButton";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentPage = () => {
  const navigate = useNavigate();

  const handleBackNavigate = () => navigate(-1);

  return (
    <div className="text-white space-y-4 min-h-[calc(100vh-4rem)] pb-36 overflow-hidden">
      <div className="flex items-center">
        <IconButton ariaLabel="Назад" onClick={handleBackNavigate}>
          <ChevronLeft className="w-5 h-5 text-zinc-500" />
        </IconButton>
      </div>
      <UniversityStudentItem isNavigable={false} student={studentsMock[0]} />
      <UniversityStudentCvCard student={studentsMock[0]} />
      <UniversityStudentRecommendedCard student={studentsMock[0]} />
      {/* возможно сделать последние отклики студента */}
    </div>
  );
};

export default StudentPage;
