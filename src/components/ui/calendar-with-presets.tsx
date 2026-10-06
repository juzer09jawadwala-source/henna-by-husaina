"use client"

import * as React from "react"
import { addDays } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface CalendarWithPresetsProps {
  selected?: Date | undefined;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
}

export function CalendarWithPresets({
  selected,
  onSelect,
  className,
}: CalendarWithPresetsProps = {}) {
  // Use today as realistic initial selected date if none provided
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    selected || addDays(new Date(), 7)
  )
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  )

  const activeDate = selected !== undefined ? selected : internalDate;

  const handleDateSelect = (newDate: Date | undefined) => {
    setInternalDate(newDate);
    if (onSelect) {
      onSelect(newDate);
    }
  };

  return (
    <Card className={`mx-auto w-fit max-w-[320px] bg-white/95 border-[#8B3A2B]/15 shadow-xl ${className || ""}`} size="sm">
      <CardContent className="p-1">
        <Calendar
          mode="single"
          selected={activeDate}
          onSelect={handleDateSelect}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          fixedWeeks
          className="p-0"
        />
      </CardContent>
      <CardFooter className="flex flex-wrap gap-1.5 border-t border-[#8B3A2B]/10 p-2.5 bg-[#FAF7F2]/50 rounded-b-2xl">
        {[
          { label: "Today", value: 0 },
          { label: "Tomorrow", value: 1 },
          { label: "In 3 days", value: 3 },
          { label: "In 1 week", value: 7 },
          { label: "In 2 weeks", value: 14 },
          { label: "In 1 month", value: 30 },
        ].map((preset) => (
          <Button
            key={preset.value}
            variant="outline"
            size="sm"
            className="flex-1 text-[10px] h-7 px-2 border-[#8B3A2B]/20 hover:border-[#4A1521] hover:bg-[#4A1521] hover:text-[#FAF7F2] transition-colors"
            onClick={() => {
              const newDate = addDays(new Date(), preset.value)
              handleDateSelect(newDate)
              setCurrentMonth(
                new Date(newDate.getFullYear(), newDate.getMonth(), 1)
              )
            }}
          >
            {preset.label}
          </Button>
        ))}
      </CardFooter>
    </Card>
  )
}

export default CalendarWithPresets

