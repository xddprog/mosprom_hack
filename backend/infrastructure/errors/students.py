from fastapi import HTTPException


class StudentNotFoundError(HTTPException):
    def __init__(self):
        super().__init__(status_code=404, detail="Студент не найден")