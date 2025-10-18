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
import { VacancyCreateForm } from "@/entities/vacancy/ui/vacancyCreateForm";

type TabsType = "vacancy" | "internship";

const parseTitleByType = {
  vacancy: "вакансии",
  internship: "стажировки",
};

export const VacancyCreateModal = () => {
  const isOpen = useAppSelector(modalSelectors.isOpen);
  const type = useAppSelector(modalSelectors.selectType);
  const { vacancyType } = useAppSelector(modalSelectors.data) as {
    vacancyType: TabsType;
  };

  const { toggleModal } = useActions();

  const isModalOpen = isOpen && type === EModalVariables.VACANCY_CREATE_MODAL;

  const handleClose = () => {
    toggleModal(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black border-zinc-300">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl text-start">
            Создание {parseTitleByType[vacancyType]}
          </DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2 pr-2">
          <VacancyCreateForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
