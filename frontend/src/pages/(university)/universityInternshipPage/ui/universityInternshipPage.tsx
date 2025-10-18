import { useState } from "react";
import { motion } from "framer-motion";
import { internshipListingsMock } from "@/entities/university/lib/constants";
import { InternshipListing } from "@/entities/vacancy/types/types";
import { InternshipCard } from "@/entities/university/ui/universityInternshipCard";
import { Button, Image } from "@/shared/ui";
import { useActions } from "@/shared/hooks/useActions";
import { EModalVariables } from "@/shared/lib/utils/modalVariables";
import { IconButton } from "@/shared/ui/button/iconButton";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/shared/lib/utils/twMerge";

const UniversityInternshipPage = () => {
  const { setOpenModal } = useActions();
  const navigate = useNavigate();
  const [internshipListings] = useState<InternshipListing[]>(
    internshipListingsMock
  );

  const handleBackNavigate = () => navigate(-1);

  const handleAttachStudents = (listingId: string) => {
    const listing = internshipListings.find((l) => l.id === listingId);
    if (listing) {
      setOpenModal({
        isOpen: true,
        type: EModalVariables.ATTACH_STUDENT_ON_INTERNSHIP,
        data: {
          listing: listing,
        },
      });
    }
  };

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center">
        <IconButton ariaLabel="Назад" onClick={handleBackNavigate}>
          <ChevronLeft className="w-5 h-5 text-zinc-500" />
        </IconButton>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="relative"
      >
        <Image
          src="/images/vacancy_main.png"
          alt="vacancy-banner"
          className="rounded-3xl w-full max-h-[350px]"
        />

        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-lg font-medium text-white">
                Прикрепляйте студентов к открытым вакансиям компаний-партнеров.
              </h1>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {internshipListings.map((listing) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.1 * internshipListings.indexOf(listing),
            }}
          >
            <InternshipCard
              listing={listing}
              footerCard={({ isClosed, isFull }) => (
                <Button
                  onClick={() => handleAttachStudents(listing.id)}
                  disabled={isFull || isClosed}
                  className={cn(
                    "w-full py-4",
                    "bg-blue-600 hover:bg-blue-600 text-white",
                    (isFull || isClosed) &&
                      "bg-gray-700 cursor-not-allowed hover:bg-gray-700"
                  )}
                >
                  Прикрепить студентов
                </Button>
              )}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UniversityInternshipPage;
