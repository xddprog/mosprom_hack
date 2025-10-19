#!/usr/bin/env python3
"""
Демонстрация работы с новой системой создания тестовой базы данных
"""

import asyncio
import sys
from pathlib import Path

# Добавляем путь к проекту
sys.path.append(str(Path(__file__).parent))

from backend.infrastructure.database.connection import get_async_session
from backend.utils.test_db import init_tables, clear_database, reset_database
from sqlalchemy import select, func
from backend.infrastructure.database.models import Company, University, User, Student, Tag, Vacancy, Application


async def demo_database_stats():
    """Демонстрирует статистику базы данных"""
    async with get_async_session() as session:
        print("📊 Статистика базы данных:")
        
        # Подсчитываем количество записей в каждой таблице
        companies_count = (await session.execute(select(func.count(Company.id)))).scalar()
        universities_count = (await session.execute(select(func.count(University.id)))).scalar()
        users_count = (await session.execute(select(func.count(User.id)))).scalar()
        students_count = (await session.execute(select(func.count(Student.id)))).scalar()
        tags_count = (await session.execute(select(func.count(Tag.id)))).scalar()
        vacancies_count = (await session.execute(select(func.count(Vacancy.id)))).scalar()
        applications_count = (await session.execute(select(func.count(Application.id)))).scalar()
        
        print(f"   🏢 Компаний: {companies_count}")
        print(f"   🎓 Университетов: {universities_count}")
        print(f"   👥 Пользователей: {users_count}")
        print(f"   🎓 Студентов: {students_count}")
        print(f"   🏷️ Тегов: {tags_count}")
        print(f"   💼 Вакансий: {vacancies_count}")
        print(f"   📝 Заявок: {applications_count}")


async def demo_random_data():
    """Демонстрирует создание случайных данных"""
    print("🎲 Демонстрация генерации случайных данных:")
    
    from backend.utils.test_db import (
        generate_random_company, 
        generate_random_university,
        generate_random_user,
        generate_random_student,
        generate_random_tag,
        generate_random_vacancy,
        generate_random_application
    )
    
    # Генерируем несколько примеров
    print("\n🏢 Примеры компаний:")
    for i in range(3):
        company = generate_random_company()
        print(f"   {i+1}. {company['name']} ({company['industry']})")
    
    print("\n🎓 Примеры университетов:")
    for i in range(3):
        university = generate_random_university()
        print(f"   {i+1}. {university['name']}")
    
    print("\n👥 Примеры пользователей:")
    for i in range(3):
        user = generate_random_user()
        print(f"   {i+1}. {user['full_name']} ({user['email']}) - {user['role']}")
    
    print("\n🎓 Примеры студентов:")
    for i in range(3):
        student = generate_random_student(1)  # university_id = 1
        print(f"   {i+1}. {student['full_name']} - {student['course']} курс, {student['specialization']}")
    
    print("\n🏷️ Примеры тегов:")
    for i in range(5):
        tag = generate_random_tag()
        print(f"   {i+1}. {tag['name']}")
    
    print("\n💼 Примеры вакансий:")
    for i in range(3):
        vacancy = generate_random_vacancy(1)  # company_id = 1
        print(f"   {i+1}. {vacancy['title']} - {vacancy['region']}, {vacancy['min_salary']}-{vacancy['max_salary']} руб.")


async def main():
    """Основная функция демонстрации"""
    print("🚀 Демонстрация системы создания тестовой базы данных")
    print("=" * 60)
    
    # Проверяем текущее состояние базы данных
    await demo_database_stats()
    
    print("\n" + "=" * 60)
    
    # Демонстрируем генерацию случайных данных
    await demo_random_data()
    
    print("\n" + "=" * 60)
    print("✅ Демонстрация завершена!")
    print("\nДля создания тестовых данных выполните:")
    print("   python init_test_db.py")
    print("\nДля полного сброса базы данных:")
    print("   python init_test_db.py --reset")


if __name__ == "__main__":
    asyncio.run(main())

