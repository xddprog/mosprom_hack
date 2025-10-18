import { Student } from "../types/types";
import { FileText, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/shared/lib/utils/twMerge";

interface UniversityStudentCvCardProps {
  student: Student;
}

const totalStars = 5;

export const UniversityStudentCvCard = ({
  student,
}: UniversityStudentCvCardProps) => {
  const [rating, setRating] = useState(student.initialRating || 0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
    console.log(`Оценка CV для ${student.name}: ${selectedRating} звезд`);
  };

  return (
    <div className="bg-neutral-900 text-white rounded-3xl p-5 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-800">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-zinc-200">Резюме студента</h4>
        {student.cv_file && (
          <motion.a
            href={student.cv_file}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText className="w-5 h-5" />
          </motion.a>
        )}
      </div>

      {student.cv_file ? (
        <div className="flex flex-col gap-2">
          <p className="text-zinc-400 text-sm">Оценка резюме:</p>
          <div className="flex items-center gap-1">
            {[...Array(totalStars)].map((_, index) => {
              const starValue = index + 1;
              return (
                <motion.div
                  key={starValue}
                  className="cursor-pointer"
                  onClick={() => handleRatingClick(starValue)}
                  onMouseEnter={() => setHoverRating(starValue)}
                  onMouseLeave={() => setHoverRating(0)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Star
                    className={cn(
                      `w-7 h-7 transition-colors duration-200`,
                      (hoverRating || rating) >= starValue
                        ? "text-blue-500 fill-blue-500"
                        : "text-zinc-600 fill-zinc-800"
                    )}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        <motion.p
          className="text-zinc-500 text-center text-sm p-2 bg-neutral-800 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          CV для этого студента не загружено.
        </motion.p>
      )}
    </div>
  );
};
