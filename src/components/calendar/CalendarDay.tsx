"use client";

import { memo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DayCell, MonthTheme } from "@/types";
import { cn } from "@/lib/utils";

// range color map → tailwind classes
const RANGE_COLORS: Record<string, { bg: string; cap: string; preview: string }> = {
    blue: { bg: "bg-blue-100", cap: "bg-blue-500", preview: "bg-blue-200" },
    green: { bg: "bg-green-100", cap: "bg-green-500", preview: "bg-green-200" },
    orange: { bg: "bg-orange-100", cap: "bg-orange-500", preview: "bg-orange-200" },
    purple: { bg: "bg-purple-100", cap: "bg-purple-500", preview: "bg-purple-200" },
    rose: { bg: "bg-rose-100", cap: "bg-rose-500", preview: "bg-rose-200" },
    amber: { bg: "bg-amber-100", cap: "bg-amber-500", preview: "bg-amber-200" },
};

interface RangeState {
    inRange: boolean;
    isStart: boolean;
    isEnd: boolean;
    color: string | null;
    isPreview: boolean;
    rangeId: string | null;
}

interface Props {
    cell: DayCell;
    theme: MonthTheme;
    rangeState: RangeState;
    isSelected: boolean;
    isSelecting: boolean;
    onClick: () => void;
    onHover: () => void;
}

export const CalendarDay = memo(function CalendarDay({
    cell,
    theme,
    rangeState,
    isSelected,
    isSelecting,
    onClick,
    onHover,
}: Props) {
    const { date, isCurrentMonth, isToday, isWeekend, holiday, hasNote } = cell;
    const { inRange, isStart, isEnd, color, isPreview } = rangeState;

    const colors = color ? RANGE_COLORS[color] : null;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    className={cn(
                        "relative flex items-center justify-center h-10 cursor-pointer select-none transition-all duration-100",
                        // range band
                        inRange && !isStart && !isEnd && colors && (isPreview ? colors.preview : colors.bg),
                        // left/right cap rounding
                        isStart && "rounded-l-full",
                        isEnd && "rounded-r-full",
                        isStart && isEnd && "rounded-full",
                        // hover state when selecting
                        isSelecting && "hover:bg-gray-100",
                    )}
                    onClick={onClick}
                    onMouseEnter={onHover}
                >
                    {/* day number pill */}
                    <div
                        className={cn(
                            "relative z-10 flex items-center justify-center w-9 h-9 rounded-full text-sm font-medium transition-all duration-150",
                            // dimmed out-of-month days
                            !isCurrentMonth && "text-gray-300",
                            // today ring
                            isToday && !isSelected && cn("ring-2", theme.accent.replace("text-", "ring-")),
                            // selected day
                            isSelected && cn(theme.primary, "text-white shadow-md"),
                            // range cap (start/end)
                            (isStart || isEnd) && colors && !isSelected && cn(colors.cap, "text-white"),
                            // weekend color
                            isWeekend && isCurrentMonth && !isSelected && !(isStart || isEnd) && "text-gray-400",
                            // holiday highlight
                            holiday && isCurrentMonth && !isSelected && !(isStart || isEnd) && theme.accent,
                            // hover default
                            !inRange && !isSelected && "hover:bg-gray-100",
                        )}
                    >
                        {date.day}

                        {/* note dot */}
                        {hasNote && (
                            <span
                                className={cn(
                                    "absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                                    isSelected || isStart || isEnd ? "bg-white" : theme.primary
                                )}
                            />
                        )}
                    </div>
                </div>
            </TooltipTrigger>

            {/* tooltip for holiday or note indicator */}
            {(holiday || hasNote) && (
                <TooltipContent side="top" className="text-xs">
                    {holiday && <p>🎉 {holiday}</p>}
                    {hasNote && <p>📝 Has a note</p>}
                </TooltipContent>
            )}
        </Tooltip>
    );
});