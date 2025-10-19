import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog/dialog";
import { modalSelectors } from "@/entities/modal/model/store/modalSlice";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { EModalVariables } from "@/shared/lib/utils/modalVariables";
import { UniversityStudentCreateForm } from "./universityStudentCreateForm";

export const UniversityCreateStudentModal = () => {
  const isOpen = useAppSelector(modalSelectors.isOpen);
  const type = useAppSelector(modalSelectors.selectType);

  const { toggleModal } = useActions();

  const isModalOpen =
    isOpen && type === EModalVariables.UNIVERSITY_CREATE_MODAL;

  const handleClose = () => {
    toggleModal(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black border-zinc-300">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl text-start">
            Создание cтудента
          </DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2 pr-2">
          <UniversityStudentCreateForm onSuccess={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
