import { UniversityStudentList } from "./universityStudentList";

export const UniversityVacancyForm = () => {
  return (
    <UniversityStudentList
      cardClassName="bg-zinc-100"
      students={[
        {
          id: 1,
          full_name: "Иванов Иван Иванович",
          email: "ivanov.i.i@example.com",
          age: 20,
          phone_number: "+79011234567",
          tags: [
            { id: 101, name: "JavaScript" },
            { id: 102, name: "React" },
          ],
          resume_link: "https://example.com/resumes/ivanov",
          course_number: 3,
          faculty: "Факультет вычислительной математики и кибернетики",
          university_id: 1,
        },
        {
          id: 2,
          full_name: "Петрова Анна Сергеевна",
          email: "petrova.a.s@example.com",
          age: 21,
          phone_number: "+79022345678",
          tags: [
            { id: 201, name: "Python" },
            { id: 202, name: "Machine Learning" },
            { id: 203, name: "Data Science" },
          ],
          resume_link: "https://example.com/resumes/petrova",
          course_number: 4,
          faculty: "Факультет информационных технологий",
          university_id: 2,
        },
        {
          id: 3,
          full_name: "Сидоров Денис Александрович",
          email: "sidorov.d.a@example.com",
          age: 19,
          phone_number: "+79033456789",
          tags: [
            { id: 302, name: "Бухгалтерия" },
            { id: 303, name: "Excel" },
          ],
          resume_link: "https://example.com/resumes/sidorov",
          course_number: 2,
          faculty: "Институт экономики и управления",
          university_id: 3,
        },
        {
          id: 4,
          full_name: "Козлова Мария Игоревна",
          email: "kozlova.m.i@example.com",
          age: 22,
          phone_number: "+79044567890",
          tags: [
            { id: 401, name: "Английский C1" },
            { id: 404, name: "Французский B2" },
          ],
          resume_link: "https://example.com/resumes/kozlova",
          course_number: 5,
          faculty: "Факультет лингвистики и межкультурной коммуникации",
          university_id: 1,
        },
        {
          id: 5,
          full_name: "Смирнов Евгений Владимирович",
          email: "smirnov.e.v@example.com",
          age: 20,
          phone_number: "+79055678901",
          tags: [
            { id: 501, name: "C++" },
            { id: 502, name: "Алгоритмы" },
            { id: 504, name: "Linux" },
            { id: 505, name: "Unity" },
          ],
          resume_link: "https://example.com/resumes/smirnov",
          course_number: 3,
          faculty: "Институт компьютерных наук и технологий",
          university_id: 4,
        },
      ]}
      onCreateStudent={() => {}}
    />
  );
};
