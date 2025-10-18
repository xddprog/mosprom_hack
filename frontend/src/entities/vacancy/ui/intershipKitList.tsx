import {
  internshipListingsMock,
  studentsMock,
} from "@/entities/university/lib/constants";
import { InternshipCard } from "@/entities/university/ui/universityInternshipCard";
import { UniversityStudentCard } from "@/entities/university/ui/universityStudentCard";
import { Button } from "@/shared/ui";
import { Icon, IconTypes } from "@/shared/ui/icon";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export const IntershipKitList = () => {
  return (
    <div className="grid grid-cols-1  gap-6">
      {internshipListingsMock.map((listing) => (
        <motion.div
          key={listing.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.1 * internshipListingsMock.indexOf(listing),
          }}
        >
          <InternshipCard
            listing={listing}
            footerCard={({ isClosed }) => (
              <div className="space-y-3">
                {studentsMock.map((student) => (
                  <UniversityStudentCard
                    key={student.id}
                    student={student}
                    sendAction={
                      <div className="flex space-x-2 w-full sm:justify-center">
                        <div className="w-full">
                          <Button
                            size={"sm"}
                            disabled={isClosed}
                            className="w-full bg-blue-500/50 hover:bg-blue-600 rounded-xl"
                          >
                            <Icon type={IconTypes.TELEGRAM_OUTLINED} />
                            Написать
                          </Button>
                        </div>
                      </div>
                    }
                    deleteAction={
                      <button className="border rounded-full absolute -right-2 -top-2 bg-neutral-800 border-zinc-700 p-0.5 cursor-pointer hover:scale-105">
                        <X className="text-rose-500 h-5 w-5" />
                      </button>
                    }
                    requiredSkills={listing.requiredSkills}
                  />
                ))}
              </div>
            )}
          />
        </motion.div>
      ))}
    </div>
  );
};
