import { modalSelectors } from "@/entities/modal/model/store/modalSlice";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { EModalVariables } from "@/shared/lib/utils/modalVariables";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog/dialog";
import { useActions } from "@/shared/hooks/useActions";

export const VacancyManagementModal = () => {
  const isOpen = useAppSelector(modalSelectors.isOpen);
  const type = useAppSelector(modalSelectors.selectType);

  const { toggleModal } = useActions();

  const isModalOpen =
    isOpen && type === EModalVariables.VACANCY_MANAGEMENT_MODAL;

  const handleClose = () => {
    toggleModal(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-neutral-900 text-white border-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl text-center">
            Отклик на вакансию
          </DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2 pr-2"></div>
      </DialogContent>
    </Dialog>
  );
};
