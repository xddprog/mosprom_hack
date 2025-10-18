from fastapi import HTTPException


class ApplicationNotFoundError(HTTPException):
    def __init__(self):
        super().__init__(status_code=404, detail="Отклик не найден")