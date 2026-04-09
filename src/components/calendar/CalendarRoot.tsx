"use client";

import { useRef, useState } from "react";
import { useCalendar } from "@/hooks/useCalendar";
import { SpiralBinding } from "./SpiralBinding";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import { MonthFlip } from "./MonthFlip";
import { HeroImage } from "@/components/hero/HeroImage";
import { NotesPanel } from "@/components/notes/NotesPanel";
import { cn } from "@/lib/utils";

export function CalendarRoot() {
    const {
        currentMonth,
        currentYear,
        monthName,
        theme,
        weeks,
        heroImageUrl,
        goToPrevMonth,
        goToNextMonth,
        goToToday,
    } = useCalendar();

    // track flip direction for animation
    const [direction, setDirection] = useState<1 | -1>(1);
    const monthKey = `${currentYear}-${currentMonth}`;

    const handlePrev = () => {
        setDirection(-1);
        goToPrevMonth();
    };

    const handleNext = () => {
        setDirection(1);
        goToNextMonth();
    };

    return (
        <div
            className={cn(
                "w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl",
                "border border-gray-200 bg-white"
            )}
        >
            {/* ── Spiral binding ─────────────────────────────────── */}
            <SpiralBinding />

            {/*
       * ── Main body
       * Desktop: hero | calendar + notes  (3-col grid)
       * Mobile:  stacked vertically
       */}
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_260px] min-h-[560px]">

                {/* ── Hero image ─────────────────────────────────────── */}
                <HeroImage
                    imageUrl={heroImageUrl}
                    monthName={monthName}
                    year={currentYear}
                    theme={theme}
                />

                {/* ── Calendar panel ─────────────────────────────────── */}
                <div className="flex flex-col bg-white">
                    <CalendarHeader
                        monthName={monthName}
                        year={currentYear}
                        theme={theme}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        onToday={goToToday}
                    />

                    {/* divider */}
                    <div className={cn("h-0.5 mx-6 rounded-full", theme.primary, "opacity-20")} />

                    {/* animated grid */}
                    <div className="flex-1 pt-2">
                        <MonthFlip monthKey={monthKey} direction={direction}>
                            <CalendarGrid weeks={weeks} theme={theme} />
                        </MonthFlip>
                    </div>
                </div>

                {/* ── Notes panel ────────────────────────────────────── */}
                <div className="relative hidden lg:block min-h-0">
                    <div className="absolute inset-0">
                        <NotesPanel theme={theme} />
                    </div>
                </div>
                <div className="lg:hidden">
                    {/* On mobile, we can limit the height explicitly so it scrolls */}
                    <div className="h-[400px]">
                        <NotesPanel theme={theme} />
                    </div>
                </div>
            </div>
        </div>
    );
}