"use client";

import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MonthTheme } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
    monthName: string;
    year: number;
    theme: MonthTheme;
    onPrev: () => void;
    onNext: () => void;
    onToday: () => void;
}

export function CalendarHeader({
    monthName,
    year,
    theme,
    onPrev,
    onNext,
    onToday,
}: Props) {
    return (
        <div
            className={cn(
                "flex items-center justify-between px-6 py-4",
                theme.light
            )}
        >
            {/* Month + Year */}
            <div className="flex flex-col leading-none">
                <span className={cn("text-3xl font-black tracking-tight uppercase", theme.accent)}>
                    {monthName}
                </span>
                <span className="text-sm font-medium text-gray-400 mt-0.5">{year}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToday}
                    className={cn("text-xs font-semibold gap-1", theme.accent)}
                    title="Go to today"
                >
                    <CalendarDays size={16} />
                </Button>

                <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onPrev}
                        className="rounded-none border-r border-gray-200 h-8 w-8"
                    >
                        <ChevronLeft size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onNext}
                        className="rounded-none h-8 w-8"
                    >
                        <ChevronRight size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}