import { drawerSelectors } from "@/entities/drawer/model/store/drawerSlice";
import { EDrawerVariables } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { motion } from "framer-motion";

import { Drawer, DrawerContent, DrawerTitle } from "@/shared/ui/drawer";
import { Combobox } from "@/shared/ui/combobox/combobox";
import { Button } from "@/shared/ui";
import { GraduationCap } from "lucide-react";

export const ProfileUniversityDrawer = () => {
  const isOpen = useAppSelector(drawerSelectors.isOpen);
  const type = useAppSelector(drawerSelectors.selectType);

  const { toggleDrawer } = useActions();

  const isDrawerOpen =
    isOpen && type === EDrawerVariables.PROFILE_UNIVERSITY_DRAWER;

  const handleClose = () => {
    toggleDrawer(false);
  };

  return (
    <Drawer open={isDrawerOpen} onClose={handleClose}>
      <DrawerContent className="border border-zinc-800 bg-black text-white p-6">
        <div className="max-w-7xl mx-auto w-full">
          <DrawerTitle className="hidden text-xl text-white font-semibold text-center">
            Учебное заведение
          </DrawerTitle>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex w-full flex-col items-center gap-4 mt-2"
          >
            <div className="rounded-2xl p-6 w-full flex flex-col items-center border-zinc-700 shadow-md space-y-4">
              <GraduationCap
                className="h-12 w-12 text-blue-500"
                strokeWidth={1.5}
              />
              <section>
                <h2 className="text-lg md:text-3xl font-bold text-neutral-100 text-center tracking-tight">
                  Выберите учебное заведение
                </h2>
                <p className="text-xs md:text-sm text-neutral-400 text-center max-w-sm">
                  Выбор учебного заведения можно совершить только один раз.
                  Пожалуйста, будьте внимательны.
                </p>
              </section>

              <div className="w-full mb-6">
                <Combobox
                  options={[]}
                  onChangeValue={() => {}}
                  onChangeSearchValue={() => {}}
                />
              </div>

              <div className="w-full">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Сохранить
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
