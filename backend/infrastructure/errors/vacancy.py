from fastapi import HTTPException


class VacancyNotFoundError(HTTPException):
    def __init__(self):
        super().__init__(status_code=404, detail="Вакансия не найдена")