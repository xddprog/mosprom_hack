import asyncio
import random
import re
from tabnanny import check
import aiohttp
from typing import List, Dict

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.infrastructure.database.models.company import Company
from backend.infrastructure.database.models.university import University

# from backend.infrastructure.database.models.university import University

UNIVERSITY_API_URL = "https://api.gigdata.ru/api/v2/suggest/educations"
API_KEY = "gayispt9yitlnzu9irwbbwvokd6t6jcfh6mmoybm"

LETTERS = [chr(c) for c in range(ord("а"), ord("я") + 1)]


def clean_whitespace(text: str) -> str:
    return re.sub(r'\s+', ' ', text).strip()


async def fetch_suggestions(session: aiohttp.ClientSession, letter: str) -> List[Dict]:
    payload = {
        "query": letter,
        "count": 2000
    }
    headers = {
        "authorization": API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    async with session.post(UNIVERSITY_API_URL, json=payload, headers=headers) as response:
        data = await response.json()
        print(data)
        return data.get("suggestions", [])
    

async def load_universities(db_session: AsyncSession):
    # check_exist = (await db_session.execute(select(University).limit(1))).scalar_one_or_none()
    # if check_exist:
    check_exist = False
    if check_exist:
        return
    
    seen_names = set()

    async with aiohttp.ClientSession() as session:
        for letter in LETTERS:
            print(letter)
            suggestions = await fetch_suggestions(session, letter)
            for item in suggestions:
                name = item.get("value")
                if name and name not in seen_names:
                    seen_names.add(name)
    print(set(clean_whitespace(name) for name in seen_names))
    for university in set(clean_whitespace(name) for name in seen_names):
        db_session.add(University(name=university))
    await db_session.commit()



# --- ДАННЫЕ ДЛЯ ГЕНЕРАЦИИ ---
COMPANY_NAMES = [
    "Квантовые Системы", "Нейро-Инновации", "БиоТех Решения",
    "Аэрокосмические Технологии", "ФинТех Стандарт", "ЭкоЭнерго Пром",
    "Роботикс Лаб", "Цифровой Горизонт", "МедТех Прогресс", "НаноКомпозит"
]

INDUSTRIES = [
    "IT, Разработка ПО", "Биотехнологии", "Финансы", "Аэрокосмическая промышленность",
    "Энергетика", "Робототехника", "Медицинское оборудование", "Материаловедение"
]

async def seed_data(session: AsyncSession = None):
    companies_to_insert = []
    
    # Генерируем данные для 10 компаний
    for i in range(10):
        name = COMPANY_NAMES[i]
        domain = name.lower().replace(" ", "").replace("-", "") + ".dev"
        
        company_data = {
            "name": name,
            "icon_url": f"/static/icons/company_{i+1}.png",
            "industry": random.choice(INDUSTRIES),
            "site_url": f"https://{domain}"
        }
        companies_to_insert.append(company_data)
        
        session.add(Company(**company_data))
        print("Данные успешно добавлены!")