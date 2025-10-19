import asyncio
import random
from datetime import datetime, timedelta
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from passlib.context import CryptContext

from backend.infrastructure.database.models import (
    Company, University, User, Student, Tag, Vacancy, Application
)
from backend.utils.enums import Role, WorkFormat, ApplicationStatus, ExperienceLevel
from backend.utils.loaders import load_universities

UNIVERSITIES_DATA = [{"name": n} for n in ["МГТУ им. Н.Э. Баумана", "НИУ «МЭИ»", "НИУ «МИЭТ»"]]
COMPANIES_DATA = [
    {"name": "НПО «Орион»", "industry": "Оптоэлектроника", "site_url": "https://orion-ir.ru/"},
    {"name": "НПП «Цифровые решения»", "industry": "Микроэлектроника", "site_url": "https://ds--solutions.ru/"},
    {"name": "Яндекс", "industry": "IT, Разработка ПО", "site_url": "https://yandex.ru/"},
    {"name": "СберТех", "industry": "FinTech", "site_url": "https://sber.tech/"},
    {"name": "VK", "industry": "IT, Социальные сети", "site_url": "https://vk.com/"},
    {"name": "Тинькофф", "industry": "FinTech", "site_url": "https://tinkoff.ru/"},
    {"name": "МТС", "industry": "Телеком", "site_url": "https://mts.ru/"},
    {"name": "Ростех", "industry": "Промышленность", "site_url": "https://rostec.ru/"},
]
TAGS_DATA = [{"name": n} for n in ["Python", "FastAPI", "SQL", "React", "Docker", "Git", "C++", "Altium Designer", "CAD", "JavaScript", "TypeScript", "Vue.js", "Angular", "Node.js", "PostgreSQL", "MongoDB", "Redis", "Kubernetes", "AWS", "Linux"]]

# Тестовые данные для дашборда - намного больше данных
VACANCIES_DATA = [
    # Python разработчики
    {"title": "Python Developer", "region": "Москва", "experience": ExperienceLevel.FROM_1_TO_3, "min_salary": 80000, "max_salary": 120000, "work_format": WorkFormat.REMOTE, "responsibilities": ["Разработка API", "Оптимизация кода"], "requirements": ["Python 3.8+", "FastAPI"], "conditions": ["Удаленная работа", "Гибкий график"]},
    {"title": "Senior Python Developer", "region": "Москва", "experience": ExperienceLevel.MORE_THAN_6, "min_salary": 150000, "max_salary": 200000, "work_format": WorkFormat.HYBRID, "responsibilities": ["Архитектура", "Менторство"], "requirements": ["Python", "Django", "PostgreSQL"], "conditions": ["Офис + удаленка", "Премии"]},
    {"title": "Python Backend Developer", "region": "Санкт-Петербург", "experience": ExperienceLevel.FROM_3_TO_6, "min_salary": 120000, "max_salary": 160000, "work_format": WorkFormat.REMOTE, "responsibilities": ["Микросервисы", "Базы данных"], "requirements": ["Python", "FastAPI", "Redis"], "conditions": ["Удаленная работа", "Обучение"]},
    
    # Frontend разработчики
    {"title": "Frontend Developer", "region": "Санкт-Петербург", "experience": ExperienceLevel.FROM_3_TO_6, "min_salary": 100000, "max_salary": 150000, "work_format": WorkFormat.HYBRID, "responsibilities": ["Разработка UI", "Оптимизация производительности"], "requirements": ["React", "TypeScript"], "conditions": ["Офис + удаленка", "Медицинская страховка"]},
    {"title": "React Developer", "region": "Екатеринбург", "experience": ExperienceLevel.NOT_MATTER, "min_salary": 60000, "max_salary": 90000, "work_format": WorkFormat.REMOTE, "responsibilities": ["Разработка компонентов", "Тестирование"], "requirements": ["React", "Redux"], "conditions": ["Стажировка", "Менторство"]},
    {"title": "Vue.js Developer", "region": "Новосибирск", "experience": ExperienceLevel.FROM_1_TO_3, "min_salary": 80000, "max_salary": 110000, "work_format": WorkFormat.REMOTE, "responsibilities": ["SPA разработка", "Компоненты"], "requirements": ["Vue.js", "JavaScript"], "conditions": ["Удаленная работа", "Гибкий график"]},
    {"title": "Angular Developer", "region": "Москва", "experience": ExperienceLevel.FROM_3_TO_6, "min_salary": 110000, "max_salary": 150000, "work_format": WorkFormat.OFFICE, "responsibilities": ["Enterprise приложения", "Архитектура"], "requirements": ["Angular", "TypeScript"], "conditions": ["Офис", "Спортзал"]},
    
    # DevOps и инфраструктура
    {"title": "DevOps Engineer", "region": "Москва", "experience": ExperienceLevel.MORE_THAN_6, "min_salary": 150000, "max_salary": 200000, "work_format": WorkFormat.OFFICE, "responsibilities": ["Настройка CI/CD", "Мониторинг"], "requirements": ["Docker", "Kubernetes"], "conditions": ["Офис", "Спортзал"]},
    {"title": "Cloud Engineer", "region": "Санкт-Петербург", "experience": ExperienceLevel.FROM_3_TO_6, "min_salary": 130000, "max_salary": 180000, "work_format": WorkFormat.HYBRID, "responsibilities": ["AWS", "Инфраструктура"], "requirements": ["AWS", "Terraform"], "conditions": ["Офис + удаленка", "Конференции"]},
    {"title": "Site Reliability Engineer", "region": "Москва", "experience": ExperienceLevel.MORE_THAN_6, "min_salary": 160000, "max_salary": 220000, "work_format": WorkFormat.REMOTE, "responsibilities": ["Надежность", "Мониторинг"], "requirements": ["Linux", "Kubernetes"], "conditions": ["Удаленная работа", "Премии"]},
    
    # C++ и системное программирование
    {"title": "C++ Developer", "region": "Москва", "experience": ExperienceLevel.FROM_1_TO_3, "min_salary": 90000, "max_salary": 130000, "work_format": WorkFormat.HYBRID, "responsibilities": ["Разработка систем", "Оптимизация"], "requirements": ["C++17", "STL"], "conditions": ["Гибкий график", "Обучение"]},
    {"title": "Senior C++ Developer", "region": "Санкт-Петербург", "experience": ExperienceLevel.MORE_THAN_6, "min_salary": 140000, "max_salary": 190000, "work_format": WorkFormat.OFFICE, "responsibilities": ["Высокопроизводительные системы", "Архитектура"], "requirements": ["C++20", "Boost"], "conditions": ["Офис", "Исследования"]},
    
    # Full Stack разработчики
    {"title": "Full Stack Developer", "region": "Москва", "experience": ExperienceLevel.FROM_1_TO_3, "min_salary": 100000, "max_salary": 140000, "work_format": WorkFormat.HYBRID, "responsibilities": ["Full-stack разработка", "Архитектура"], "requirements": ["React", "Node.js"], "conditions": ["Офис + удаленка", "Премии"]},
    {"title": "Full Stack Engineer", "region": "Екатеринбург", "experience": ExperienceLevel.FROM_3_TO_6, "min_salary": 120000, "max_salary": 170000, "work_format": WorkFormat.REMOTE, "responsibilities": ["Полный цикл разработки", "Менторство"], "requirements": ["Vue.js", "Python"], "conditions": ["Удаленная работа", "Обучение"]},
    
    # Mobile разработчики
    {"title": "Mobile Developer", "region": "Санкт-Петербург", "experience": ExperienceLevel.FROM_3_TO_6, "min_salary": 110000, "max_salary": 160000, "work_format": WorkFormat.OFFICE, "responsibilities": ["iOS/Android разработка", "UI/UX"], "requirements": ["Swift", "Kotlin"], "conditions": ["Офис", "Медицинская страховка"]},
    {"title": "React Native Developer", "region": "Москва", "experience": ExperienceLevel.FROM_1_TO_3, "min_salary": 90000, "max_salary": 130000, "work_format": WorkFormat.HYBRID, "responsibilities": ["Кроссплатформенная разработка", "UI компоненты"], "requirements": ["React Native", "JavaScript"], "conditions": ["Офис + удаленка", "Гибкий график"]},
    
    # Data Science и ML
    {"title": "Data Scientist", "region": "Москва", "experience": ExperienceLevel.MORE_THAN_6, "min_salary": 180000, "max_salary": 250000, "work_format": WorkFormat.HYBRID, "responsibilities": ["ML модели", "Анализ данных"], "requirements": ["Python", "TensorFlow"], "conditions": ["Исследования", "Конференции"]},
    {"title": "Machine Learning Engineer", "region": "Санкт-Петербург", "experience": ExperienceLevel.FROM_3_TO_6, "min_salary": 140000, "max_salary": 190000, "work_format": WorkFormat.REMOTE, "responsibilities": ["ML пайплайны", "Модели"], "requirements": ["Python", "PyTorch"], "conditions": ["Удаленная работа", "Исследования"]},
    
    # QA и тестирование
    {"title": "QA Engineer", "region": "Москва", "experience": ExperienceLevel.FROM_1_TO_3, "min_salary": 70000, "max_salary": 100000, "work_format": WorkFormat.REMOTE, "responsibilities": ["Тестирование", "Автоматизация"], "requirements": ["Selenium", "Python"], "conditions": ["Удаленная работа", "Обучение"]},
    {"title": "Senior QA Engineer", "region": "Санкт-Петербург", "experience": ExperienceLevel.FROM_3_TO_6, "min_salary": 100000, "max_salary": 140000, "work_format": WorkFormat.HYBRID, "responsibilities": ["Автотесты", "Процессы"], "requirements": ["Cypress", "JavaScript"], "conditions": ["Офис + удаленка", "Менторство"]},
    
    # Дополнительные вакансии для разнообразия
    {"title": "Backend Developer", "region": "Новосибирск", "experience": ExperienceLevel.FROM_3_TO_6, "min_salary": 120000, "max_salary": 180000, "work_format": WorkFormat.REMOTE, "responsibilities": ["Разработка API", "Базы данных"], "requirements": ["Python", "PostgreSQL"], "conditions": ["Удаленная работа", "Гибкий график"]},
    {"title": "Node.js Developer", "region": "Москва", "experience": ExperienceLevel.FROM_1_TO_3, "min_salary": 85000, "max_salary": 125000, "work_format": WorkFormat.HYBRID, "responsibilities": ["API разработка", "Микросервисы"], "requirements": ["Node.js", "Express"], "conditions": ["Офис + удаленка", "Обучение"]},
    {"title": "Java Developer", "region": "Санкт-Петербург", "experience": ExperienceLevel.FROM_3_TO_6, "min_salary": 110000, "max_salary": 160000, "work_format": WorkFormat.OFFICE, "responsibilities": ["Enterprise разработка", "Spring"], "requirements": ["Java", "Spring Boot"], "conditions": ["Офис", "Медицинская страховка"]},
    {"title": "Go Developer", "region": "Москва", "experience": ExperienceLevel.FROM_1_TO_3, "min_salary": 95000, "max_salary": 135000, "work_format": WorkFormat.REMOTE, "responsibilities": ["Высокопроизводительные сервисы", "Микросервисы"], "requirements": ["Go", "Docker"], "conditions": ["Удаленная работа", "Гибкий график"]},
    {"title": "PHP Developer", "region": "Екатеринбург", "experience": ExperienceLevel.FROM_1_TO_3, "min_salary": 70000, "max_salary": 100000, "work_format": WorkFormat.REMOTE, "responsibilities": ["Веб-разработка", "Laravel"], "requirements": ["PHP", "Laravel"], "conditions": ["Удаленная работа", "Обучение"]},
    {"title": "Ruby Developer", "region": "Новосибирск", "experience": ExperienceLevel.FROM_3_TO_6, "min_salary": 100000, "max_salary": 140000, "work_format": WorkFormat.HYBRID, "responsibilities": ["Rails разработка", "API"], "requirements": ["Ruby", "Rails"], "conditions": ["Офис + удаленка", "Гибкий график"]},
]

# Генерация данных для заявок
FIRST_NAMES = ["Иван", "Анна", "Михаил", "Екатерина", "Александр", "Мария", "Сергей", "Дарья", "Николай", "Виктория", 
               "Алексей", "Ольга", "Дмитрий", "Наталья", "Артем", "Елена", "Павел", "Анна", "Игорь", "Юлия",
               "Андрей", "Людмила", "Максим", "Светлана", "Владимир", "Татьяна", "Роман", "Елена", "Владислав", "Анна"]

LAST_NAMES = ["Петров", "Соколова", "Козлов", "Волкова", "Новиков", "Сидорова", "Лебедев", "Морозова", "Федоров", "Соколова",
              "Козлов", "Новикова", "Смирнов", "Петрова", "Волков", "Волкова", "Федоров", "Медведева", "Соколов", "Лебедева",
              "Козлов", "Петрова", "Волков", "Новикова", "Соколов", "Медведева", "Федоров", "Соколова", "Морозов", "Соколова"]

STATUSES = [ApplicationStatus.ON_REVIEW, ApplicationStatus.SCREENING, ApplicationStatus.INTERVIEW, ApplicationStatus.OFFER, ApplicationStatus.REJECTED]
APPLICATIONS_DATA = [
    {"full_name": f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)}", "email": f"{random.choice(FIRST_NAMES).lower()}@{random.choice(LAST_NAMES).lower()}.com", "resume_link": f"https://example.com/resume_{i}.pdf", "status": random.choice(STATUSES)}
    for i in range(200)
]


async def init_tables(session: AsyncSession):
    check_exist = (await session.execute(select(Company))).scalars().all()
    if check_exist:
        return
    
    current_date = datetime.now()
    
    # Создаем компании с разными датами
    company_ids = []
    for i, company_data in enumerate(COMPANIES_DATA):
        # Полный рандом для дат компаний
        month = random.randint(1, 12)
        day = random.randint(1, 28)
        year = random.choice([current_date.year - 1, current_date.year])
        created_at = datetime(year, month, day)
        
        company = Company(
            name=company_data["name"],
            industry=company_data["industry"],
            site_url=company_data["site_url"],
            created_at=created_at,
            updated_at=created_at
        )
        session.add(company)
        await session.flush()  # Получаем ID
        company_ids.append(company.id)
    
    # Создаем теги
    tag_ids = []
    for tag_data in TAGS_DATA:
        tag = Tag(name=tag_data["name"])
        session.add(tag)
        await session.flush()  # Получаем ID
        tag_ids.append(tag.id)
    
    # Создаем университеты
    if not await session.execute(select(University)):
        await load_universities(session)
    
    # Создаем вакансии с разными датами (для тестирования месячной статистики)
    vacancy_ids = []
    
    for i, vacancy_data in enumerate(VACANCIES_DATA):
        # Полный рандом для дат вакансий
        month = random.randint(1, 12)
        day = random.randint(1, 28)
        year = random.choice([current_date.year - 1, current_date.year])
        created_at = datetime(year, month, day)
        
        vacancy = Vacancy(
            title=vacancy_data["title"],
            company_id=company_ids[i % len(company_ids)],
            region=vacancy_data["region"],
            experience=vacancy_data["experience"],
            min_salary=vacancy_data["min_salary"],
            max_salary=vacancy_data["max_salary"],
            is_internship=vacancy_data.get("is_internship", False),
            work_format=vacancy_data["work_format"],
            responsibilities=vacancy_data["responsibilities"],
            requirements=vacancy_data["requirements"],
            conditions=vacancy_data["conditions"],
            created_at=created_at,
            updated_at=created_at
        )
        
        session.add(vacancy)
        await session.flush()  # Получаем ID
        vacancy_ids.append(vacancy.id)
    
    # Создаем заявки с разными датами и статусами
    for i, application_data in enumerate(APPLICATIONS_DATA):
        # Полный рандом для дат заявок
        month = random.randint(1, 12)
        day = random.randint(1, 28)
        year = random.choice([current_date.year - 1, current_date.year])
        created_at = datetime(year, month, day)
        
        # Для некоторых заявок устанавливаем статус CLOSED и updated_at
        if application_data["status"] in [ApplicationStatus.OFFER, ApplicationStatus.REJECTED]:
            updated_at = created_at + timedelta(days=random.randint(1, 30))
        else:
            updated_at = created_at
        
        application = Application(
            vacancy_id=vacancy_ids[i % len(vacancy_ids)],
            full_name=application_data["full_name"],
            email=application_data["email"],
            resume_link=application_data["resume_link"],
            status=application_data["status"],
            created_at=created_at,
            updated_at=updated_at
        )
        
        session.add(application)
    
    # Создаем связи вакансий с тегами
    from backend.infrastructure.database.models.tag import VacancyTag
    
    for vacancy_id in vacancy_ids:
        # Каждая вакансия получает 2-4 случайных тега
        num_tags = random.randint(2, 4)
        selected_tags = random.sample(tag_ids, min(num_tags, len(tag_ids)))
        
        for tag_id in selected_tags:
            vacancy_tag = VacancyTag(
                vacancy_id=vacancy_id,
                tag_id=tag_id
            )
            session.add(vacancy_tag)
    
    await session.commit()