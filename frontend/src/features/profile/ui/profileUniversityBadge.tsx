import { motion } from "framer-motion";
import { UniversityData } from "@/entities/university/types/types";
import { Pen } from "lucide-react";

interface ProfileUniversityBadgeProps {
  onClick: VoidFunction;
  universityData?: UniversityData;
}

export const ProfileUniversityBadge = ({
  onClick,
  universityData,
}: ProfileUniversityBadgeProps) => {
  return (
    <motion.div
      className="bg-neutral-900 rounded-3xl p-4 flex justify-between items-start h-[124px] shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col space-y-1">
        {universityData ? (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-zinc-200">
              {universityData.universityName}
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full text-xs">
                {universityData.groupName}
              </span>
              <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                {universityData.course} курс
              </span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">
            Университет не привязан. Нажмите для редактирования.
          </p>
        )}
      </div>
      {!universityData && (
        <button
          className="text-gray-400 hover:text-white border-zinc-600 border cursor-pointer bg-zinc-800 flex items-center rounded-full p-2"
          onClick={onClick}
        >
          <Pen className="h-4 w-4 ml-0.5" />
        </button>
      )}
    </motion.div>
  );
};
