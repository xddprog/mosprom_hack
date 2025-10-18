from uuid import uuid4

from fastapi import UploadFile
from aiobotocore.session import AioSession
from aiobotocore.client import AioBaseClient
from urllib.parse import urljoin
from backend.infrastructure.config.loads import AWS_STORAGE_CONFIG



class AWSClient:
    def __init__(self):
        self.client: AioBaseClient = None
        
    async def get_client(self):
        session = AioSession()
        async with session.create_client(
            "s3",
            aws_access_key_id=AWS_STORAGE_CONFIG.AWS_ACCESS_KEY,
            aws_secret_access_key=AWS_STORAGE_CONFIG.AWS_SECRET_ACCESS_KEY,
            endpoint_url=AWS_STORAGE_CONFIG.AWS_ENDPOINT_URL,
            region_name=AWS_STORAGE_CONFIG.AWS_REGION,
        ) as client:
            return client
    
    async def upload_one_file(self, file: UploadFile, path: str) -> str:
        session = AioSession()
        async with session.create_client(
            "s3",
            aws_access_key_id=AWS_STORAGE_CONFIG.AWS_ACCESS_KEY,
            aws_secret_access_key=AWS_STORAGE_CONFIG.AWS_SECRET_ACCESS_KEY,
            endpoint_url=AWS_STORAGE_CONFIG.AWS_ENDPOINT_URL,
            region_name=AWS_STORAGE_CONFIG.AWS_REGION,
        ) as client:
            await client.put_object(
                Key=path,
                Body=await file.read(),
                Bucket=AWS_STORAGE_CONFIG.AWS_BUCKET_NAME,
            )
    
        file_url = urljoin(
            f"{AWS_STORAGE_CONFIG.AWS_ENDPOINT_URL}/{AWS_STORAGE_CONFIG.AWS_BUCKET_NAME}/",
            path
        )
        return file_url

    async def delete_one_file(self, path: str):
        await self.client.delete_object(Bucket=AWS_STORAGE_CONFIG.AWS_BUCKET_NAME, Key=path)

    async def upload_many_files(self, files: list[UploadFile], paths: list[str]) -> list[str]:
        return [await self.upload_one_file(file, path) for file, path in zip(files, paths)]

    async def delete_many_files(self, paths: list[str]) -> None:
        return [await self.delete_one_file(path) for path in paths]

    async def __call__(self):
        self.client = await self.get_client()
        return self