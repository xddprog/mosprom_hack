import { useState } from "react";
import { MessageSquare, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Student } from "../types/types";
import { cn } from "@/shared/lib/utils/twMerge";
import { Button } from "@/shared/ui";

interface UniversityStudentRecommendedCardProps {
  student: Student;
}

export const UniversityStudentRecommendedCard = ({
  student,
}: UniversityStudentRecommendedCardProps) => {
  const [comment, setComment] = useState(student.recommendedComment || "");
  const [isRecommended, setIsRecommended] = useState(student.recommended);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecommend = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRecommended(!isRecommended);
    setIsLoading(false);
    console.log(
      `Студент ${student.name} ${
        !isRecommended ? "рекомендован" : "отменена рекомендация"
      }. Комментарий: "${comment}"`
    );
  };

  return (
    <div
      className={cn(
        "bg-neutral-900 text-white rounded-3xl p-6 flex flex-col gap-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-800",
        isRecommended && "border-emerald-600"
      )}
    >
      <motion.div
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label
          htmlFor={`comment-${student.id}`}
          className="text-zinc-300 text-base text-center font-medium"
        >
          Комментарий для рекомендации:
        </label>
        <textarea
          id={`comment-${student.id}`}
          className="w-full h-24 bg-neutral-800 border border-neutral-700 rounded-2xl p-3 text-white text-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all resize-none"
          placeholder="Напишите комментарий для рекомендации студента..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </motion.div>
      <div className="w-full">
        <Button
          className={cn(
            "py-5 w-full sm:w-auto",
            isRecommended
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-indigo-600 hover:bg-indigo-700",
            isLoading && "opacity-70 cursor-not-allowed"
          )}
          onClick={handleRecommend}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : isRecommended ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <MessageSquare className="w-5 h-5" />
          )}
          {isLoading
            ? "Сохранение..."
            : isRecommended
            ? "Рекомендовано"
            : "Рекомендовать студента"}
        </Button>
      </div>
    </div>
  );
};
