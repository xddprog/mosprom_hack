"use client";

import * as React from "react";
import { Calendar1 } from "lucide-react";
import { Button } from "../button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";
import { cn } from "@/shared/lib/utils/twMerge";
import { Calendar } from "./calendar";

interface DatePickerProps {
  date: Date | undefined;
  className?: string;
  onChangeDate: (date: Date | undefined) => void;
}

export function DatePicker({ date, className, onChangeDate }: DatePickerProps) {
  const [isVisiblePicker, setVisiblePicker] = React.useState(false);

  return (
    <div className="flex flex-col gap-3 w-full">
      <Popover open={isVisiblePicker} onOpenChange={setVisiblePicker}>
        <PopoverTrigger asChild>
          <div className="flex justify-center">
            <Button
              variant="outline"
              id="date"
              type="button"
              className={cn(
                "w-full py-6 rounded-xl bg-neutral-900 text-white hover:bg-neutral-900 hover:text-white border-neutral-800 justify-between font-normal",
                className
              )}
            >
              {date ? date.toLocaleDateString() : "Выберите дату"}
              <Calendar1 />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-full overflow-hidden p-0 rounded-xl"
          align="center"
        >
          <Calendar
            className="w-full [--cell-size:24px]"
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChangeDate(date);
              setVisiblePicker(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
