"use client";

import { useCalendarStore } from "@/store/calendarStore";
import { useRangeSelection } from "@/hooks/useRangeSelection";
import { CalendarDay } from "./CalendarDay";
import { DayCell, MonthTheme } from "@/types";
import { isSameDate } from "@/lib/utils";
import { DAY_LABELS } from "@/lib/calendarUtils";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

interface Props {
    weeks: DayCell[][];
    theme: MonthTheme;
}

export function CalendarGrid({ weeks, theme }: Props) {
    const { selectedDay, setSelectedDay, setNotesPanelTab } = useCalendarStore();
    const { isSelecting, handleDayClick, handleDayHover, getDayRangeState } =
        useRangeSelection();

    const handleClick = (cell: DayCell) => {
        // single day select for notes
        if (!isSelecting) {
            setSelectedDay(
                selectedDay && isSameDate(selectedDay, cell.date) ? null : cell.date
            );
            setNotesPanelTab("day");
        }
        handleDayClick(cell.date);
    };

    return (
        <TooltipProvider delayDuration={300}>
            <div className="px-4 pb-4 select-none">
                {/* Day labels */}
                <div className="grid grid-cols-7 mb-1">
                    {DAY_LABELS.map((label) => (
                        <div
                            key={label}
                            className={cn(
                                "text-center text-[10px] font-bold tracking-widest py-2",
                                label === "SAT" || label === "SUN"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                            )}
                        >
                            {label}
                        </div>
                    ))}
                </div>

                {/* Weeks */}
                <div className="flex flex-col gap-0.5">
                    {weeks.map((week, wi) => (
                        <div key={wi} className="grid grid-cols-7">
                            {week.map((cell) => {
                                const rangeState = getDayRangeState(cell.date);
                                const isSelected = !!selectedDay && isSameDate(selectedDay, cell.date);

                                return (
                                    <CalendarDay
                                        key={`${cell.date.year}-${cell.date.month}-${cell.date.day}`}
                                        cell={cell}
                                        theme={theme}
                                        rangeState={rangeState}
                                        isSelected={isSelected}
                                        isSelecting={isSelecting}
                                        onClick={() => handleClick(cell)}
                                        onHover={() => handleDayHover(cell.date)}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </TooltipProvider>
    );
}