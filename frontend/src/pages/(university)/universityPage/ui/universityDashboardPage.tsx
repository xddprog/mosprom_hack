import { UniversityStudentFilter } from "@/entities/university/ui/universityStudentFilter";
import { UniversityStudents } from "@/entities/university/ui/universityStudents";
import { Container } from "@/widgets/container/container";
import { UniversityWidget } from "@/widgets/universityWidget/ui/universityWidget";

const UniversityDashboardPage = () => {
  return (
    <Container className="text-white space-y-8 pb-4">
      <UniversityWidget />
      <UniversityStudentFilter />
      <UniversityStudents />
    </Container>
  );
};

export default UniversityDashboardPage;
