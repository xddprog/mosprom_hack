import { UniversityStudentFilter } from "@/entities/university/ui/universityStudentFilter";
import { UniversityStudents } from "@/entities/university/ui/universityStudents";
import { UniversityWidget } from "@/widgets/universityWidget/ui/universityWidget";

const UniversityDashboardPage = () => {
  return (
    <div className="text-white space-y-8 pb-4">
      <UniversityWidget />
      <UniversityStudentFilter />
      <UniversityStudents />
    </div>
  );
};

export default UniversityDashboardPage;
