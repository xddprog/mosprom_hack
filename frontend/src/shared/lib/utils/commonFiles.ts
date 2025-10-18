export type DownloadOptions = {
  fileName?: string;
  fileType?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export type FileTypeInfo = {
  extension: string;
  mimeType: string;
};

export const COMMON_FILE_TYPES: Record<string, FileTypeInfo> = {
  // Images
  png: { extension: "png", mimeType: "image/png" },
  jpg: { extension: "jpg", mimeType: "image/jpeg" },
  jpeg: { extension: "jpeg", mimeType: "image/jpeg" },
  webp: { extension: "webp", mimeType: "image/webp" },
  gif: { extension: "gif", mimeType: "image/gif" },
  svg: { extension: "svg", mimeType: "image/svg+xml" },

  // Documents
  pdf: { extension: "pdf", mimeType: "application/pdf" },
  doc: { extension: "doc", mimeType: "application/msword" },
  docx: {
    extension: "docx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  xls: { extension: "xls", mimeType: "application/vnd.ms-excel" },
  xlsx: {
    extension: "xlsx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  ppt: { extension: "ppt", mimeType: "application/vnd.ms-powerpoint" },
  pptx: {
    extension: "pptx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  },
  txt: { extension: "txt", mimeType: "text/plain" },

  // Archives
  zip: { extension: "zip", mimeType: "application/zip" },
  rar: { extension: "rar", mimeType: "application/x-rar-compressed" },
  "7z": { extension: "7z", mimeType: "application/x-7z-compressed" },

  // Audio/Video
  mp3: { extension: "mp3", mimeType: "audio/mpeg" },
  mp4: { extension: "mp4", mimeType: "video/mp4" },
  mov: { extension: "mov", mimeType: "video/quicktime" },
  avi: { extension: "avi", mimeType: "video/x-msvideo" },
  wav: { extension: "wav", mimeType: "audio/wav" },
};

export const FILE_SIGNATURES: Record<string, string> = {
  "89504E47": "png", // PNG
  FFD8FF: "jpg", // JPEG
  "47494638": "gif", // GIF
  "52494646": "webp", // WEBP
  "25504446": "pdf", // PDF
  "504B0304": "zip", // ZIP
  "52617221": "rar", // RAR
  "377ABCAF": "7z", // 7-Zip
  "494433": "mp3", // MP3
  "000000": "mp4", // MP4
};
