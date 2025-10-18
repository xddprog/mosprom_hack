import { cn } from "@/shared/lib/utils/twMerge";
import { Button } from "@/shared/ui";
import { FloatingLabelInput } from "@/shared/ui/input/floatingInputLabel";
import { ProfileLogoUploader } from "./profileLogoUploader";
import { useState } from "react";

export const ProfileUniversityContent = () => {
  const [currentLogoUrl, setCurrentLogoUrl] = useState<string | null>(
    "/images/company/vtb.png"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [uploadError, setUploadError] = useState<string | undefined>(undefined);

  const handleSaveLogo = async (file: File | null) => {
    setIsUploading(true);
    setUploadError(undefined);
    try {
      if (file) {
        const newLogoUrl = URL.createObjectURL(file);
        setCurrentLogoUrl(newLogoUrl);
        alert("Логотип успешно сохранен!");
      } else {
        console.log("Нет нового файла для сохранения.");
      }
    } catch (err) {
      console.error("Ошибка при сохранении логотипа:", err);
      setUploadError("Не удалось сохранить логотип. Попробуйте еще раз.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteLogo = async () => {
    setIsRemoving(true);
    setUploadError(undefined);
    try {
      console.log("Удаление логотипа");
      setCurrentLogoUrl(null);
      alert("Логотип успешно удален!");
    } catch (err) {
      console.error("Ошибка при удалении логотипа:", err);
      setUploadError("Не удалось удалить логотип. Попробуйте еще раз.");
    } finally {
      setIsRemoving(false);
    }
  };
  return (
    <section className="flex flex-col w-full space-y-4">
      <div className="flex w-full">
        <FloatingLabelInput
          label="Название университета*"
          className={cn(
            "py-1.5 text-black w-full bg-white rounded-3xl shadow-sm border-[#f0f3f7]"
          )}
        />
        <div>
          <Button
            variant={"outline"}
            className={cn(
              "p-6 rounded-3xl w-full bg-[#D00E46] hover:bg-[#D00E46] text-white hover:text-white"
            )}
          >
            Сохранить
          </Button>
        </div>
      </div>
      <ProfileLogoUploader
        initialLogoUrl={currentLogoUrl}
        onSave={handleSaveLogo}
        onDelete={handleDeleteLogo}
        isSaving={isUploading}
        isDeleting={isRemoving}
        error={uploadError}
      />
    </section>
  );
};
