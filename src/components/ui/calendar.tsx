import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-2 text-[#1A1412]", className)}
      classNames={{
        root: "relative",
        months: "flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-3",
        month_caption: "flex justify-center pt-1 relative items-center mb-2",
        caption_label: "text-sm font-serif font-semibold text-[#4A1521]",
        nav: "flex items-center gap-1",
        button_previous: cn(
          "absolute left-1 h-7 w-7 bg-transparent p-0 text-[#4A1521] opacity-70 hover:opacity-100 hover:bg-[#8B3A2B]/10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
        ),
        button_next: cn(
          "absolute right-1 h-7 w-7 bg-transparent p-0 text-[#4A1521] opacity-70 hover:opacity-100 hover:bg-[#8B3A2B]/10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex justify-between mb-1",
        weekday: "text-[#8B3A2B] w-8 font-medium text-[0.75rem] uppercase text-center",
        week: "flex justify-between w-full mt-1",
        day: cn(
          "h-8 w-8 p-0 font-normal text-xs rounded-full transition-all duration-150 flex items-center justify-center cursor-pointer hover:bg-[#8B3A2B]/15 hover:text-[#4A1521]"
        ),
        day_button: "w-full h-full flex items-center justify-center rounded-full",
        selected: "bg-[#4A1521] text-[#FAF7F2] font-semibold hover:bg-[#631828] shadow-sm",
        today: "bg-[#D4AF37]/20 text-[#8B3A2B] font-semibold border border-[#D4AF37]",
        outside: "text-neutral-400 opacity-40",
        disabled: "text-neutral-300 opacity-30 cursor-not-allowed",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"
