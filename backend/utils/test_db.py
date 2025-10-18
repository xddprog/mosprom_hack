import asyncio
import random
from sqlalchemy import insert, select, text
from sqlalchemy.ext.asyncio import AsyncSession
from passlib.context import CryptContext

from backend.infrastructure.database.models import (
    Company, University, User, Student, Tag, Vacancy
)
from backend.utils.enums import Role, WorkFormat, ApplicationStatus
from backend.utils.loaders import load_universities
UNIVERSITIES_DATA = [{"name": n} for n in ["МГТУ им. Н.Э. Баумана", "НИУ «МЭИ»", "НИУ «МИЭТ»"]]
COMPANIES_DATA = [
    {"name": "НПО «Орион»", "industry": "Оптоэлектроника", "site_url": "https://orion-ir.ru/"},
    {"name": "НПП «Цифровые решения»", "industry": "Микроэлектроника", "site_url": "https://ds--solutions.ru/"},
    {"name": "Яндекс", "industry": "IT, Разработка ПО", "site_url": "https://yandex.ru/"},
    {"name": "СберТех", "industry": "FinTech", "site_url": "https://sber.tech/"},
]
TAGS_DATA = [{"name": n} for n in ["Python", "FastAPI", "SQL", "React", "Docker", "Git", "C++", "Altium Designer", "CAD"]]


async def init_tables(session: AsyncSession):
    check_exist = (await session.execute(select(Company))).scalars().all()
    if check_exist:
        return
    # for university in UNIVERSITIES_DATA:
    #     await session.execute(insert(University).values(**university))
    for company in COMPANIES_DATA:
        await session.execute(insert(Company).values(**company))
    for tag in TAGS_DATA:
        await session.execute(insert(Tag).values(**tag))
    await load_universities(session)
    await session.commit()