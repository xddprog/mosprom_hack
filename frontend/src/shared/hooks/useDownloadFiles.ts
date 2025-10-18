import { useState } from "react";
import {
  COMMON_FILE_TYPES,
  DownloadOptions,
  FILE_SIGNATURES,
  FileTypeInfo,
} from "../lib/utils/commonFiles";

export const useDownloadFile = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getFileExtension = (url: string): string | null => {
    const match = url.match(/\.([a-z0-9]+)(?:[?#]|$)/i);
    return match ? match[1].toLowerCase() : null;
  };

  const detectFileTypeFromBuffer = (buffer: ArrayBuffer): string | null => {
    const uintArr = new Uint8Array(buffer).subarray(0, 8);
    const hex = Array.from(uintArr)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();

    for (const [signature, type] of Object.entries(FILE_SIGNATURES)) {
      if (hex.startsWith(signature)) {
        return type;
      }
    }
    return null;
  };

  const generateFileName = (extension: string): string => {
    return `blimfy_${Date.now() * 222}.${extension}`;
  };

  const determineFileType = async (
    url: string,
    response: Response,
    options?: DownloadOptions
  ): Promise<FileTypeInfo> => {
    if (options?.fileType && COMMON_FILE_TYPES[options.fileType]) {
      return COMMON_FILE_TYPES[options.fileType];
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType) {
      for (const [_, info] of Object.entries(COMMON_FILE_TYPES)) {
        if (contentType.includes(info.mimeType)) {
          return info;
        }
      }
    }

    const extensionFromUrl = getFileExtension(url);
    if (extensionFromUrl && COMMON_FILE_TYPES[extensionFromUrl]) {
      return COMMON_FILE_TYPES[extensionFromUrl];
    }

    try {
      const buffer = await response.clone().arrayBuffer();
      const detectedType = detectFileTypeFromBuffer(buffer);

      if (detectedType && COMMON_FILE_TYPES[detectedType]) {
        return COMMON_FILE_TYPES[detectedType];
      }
    } catch (e) {
      console.warn("Failed to analyze file signature:", e);
    }

    return {
      extension: extensionFromUrl || "bin",
      mimeType: contentType || "application/octet-stream",
    };
  };

  const downloadFile = async (fileUrl: string, options?: DownloadOptions) => {
    setIsDownloading(true);
    setError(null);

    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const fileTypeInfo = await determineFileType(fileUrl, response, options);
      const blob = await response.blob();

      const correctBlob = new Blob([blob], { type: fileTypeInfo.mimeType });
      const blobUrl = URL.createObjectURL(correctBlob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = generateFileName(fileTypeInfo.extension);

      link.target = "_blank";
      link.rel = "noopener noreferrer";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 100);

      options?.onSuccess?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Download failed");
      setError(error);
      options?.onError?.(error);
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    downloadFile,
    isDownloading,
    error,
    resetError: () => setError(null),
  };
};
