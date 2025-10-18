import React, { useState, useRef } from "react";
import { Upload, Save, Trash2, Loader } from "lucide-react";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils/twMerge";

interface ProfileLogoUploaderProps {
  initialLogoUrl?: string | null;
  title?: string;
  onSave: (file: File | null) => void;
  onDelete: () => void;
  isSaving?: boolean;
  isDeleting?: boolean;
  error?: string;
}

export const ProfileLogoUploader: React.FC<ProfileLogoUploaderProps> = ({
  initialLogoUrl,
  title = "Логотип университета",
  onSave,
  onDelete,
  isSaving = false,
  isDeleting = false,
  error,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialLogoUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (initialLogoUrl !== previewUrl && !selectedFile) {
      setPreviewUrl(initialLogoUrl || null);
    }
  }, [initialLogoUrl, previewUrl, selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      if (initialLogoUrl && !selectedFile) {
        setPreviewUrl(initialLogoUrl);
      } else if (!initialLogoUrl) {
        setPreviewUrl(null);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    onSave(selectedFile);
  };

  const handleDelete = () => {
    onDelete();
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const hasNewFile = selectedFile !== null;
  const hasExistingOrNewLogo = previewUrl !== null;

  return (
    <div className="flex items-start flex-col space-y-4 p-4 rounded-3xl bg-white">
      <h3 className="text-sm  flex-shrink-0 w-48">{title}</h3>

      <div className="flex items-center space-x-4">
        <div
          className={cn(
            "relative w-28 h-28 rounded-full flex items-center justify-center overflow-hidden cursor-pointer shadow-md",
            "bg-gradient-to-br from-pink-300 to-red-300",
            !hasExistingOrNewLogo && "border-2 border-dashed border-gray-300"
          )}
          onClick={handleUploadClick}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Логотип компании"
              className="w-full h-full object-cover"
            />
          ) : (
            <Upload className="w-12 h-12 text-white/70" />
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Button
            variant={"outline"}
            className={cn(
              "p-6 rounded-3xl w-full bg-white hover:g-white text-black hover:text-black"
            )}
            onClick={handleSave}
            disabled={!hasNewFile || isSaving}
          >
            {isSaving ? (
              <>
                <Loader className="animate-spin " />
                Сохранение...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" /> Сохранить
              </>
            )}
          </Button>
          <Button
            variant={"outline"}
            className={cn(
              "p-6 rounded-3xl w-full bg-[#D00E46] hover:bg-[#D00E46] text-white hover:text-white"
            )}
            onClick={handleDelete}
            disabled={!hasExistingOrNewLogo || isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader className="animate-spin " />
                Удаление...
              </>
            ) : (
              <>
                <Trash2 className="h-5 w-5" /> Удалить
              </>
            )}
          </Button>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};
