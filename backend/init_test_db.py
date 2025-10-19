#!/usr/bin/env python3
"""
Скрипт для инициализации тестовой базы данных
Использование:
    python init_test_db.py          # Создать тестовые данные
    python init_test_db.py --reset  # Полностью сбросить и создать заново
    python init_test_db.py --clear  # Только очистить базу данных
"""

import asyncio
import argparse
import sys
from pathlib import Path

# Добавляем путь к проекту
sys.path.append(str(Path(__file__).parent))

from backend.infrastructure.database.connection import get_async_session
from backend.utils.test_db import init_tables, clear_database, reset_database


async def main():
    parser = argparse.ArgumentParser(description="Инициализация тестовой базы данных")
    parser.add_argument("--reset", action="store_true", help="Полностью сбросить и создать заново")
    parser.add_argument("--clear", action="store_true", help="Только очистить базу данных")
    
    args = parser.parse_args()
    
    async with get_async_session() as session:
        try:
            if args.clear:
                await clear_database(session)
                print("✅ База данных очищена")
            elif args.reset:
                await reset_database(session)
                print("✅ База данных сброшена и создана заново")
            else:
                await init_tables(session)
                print("✅ Тестовая база данных инициализирована")
        except Exception as e:
            print(f"❌ Ошибка: {e}")
            sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())

