import { useMemo } from "react";
import { useCalendarStore } from "@/store/calendarStore";
import { buildMonthGrid, MONTH_NAMES } from "@/lib/calendarUtils";
import { MONTH_THEMES, DEFAULT_HERO_IMAGES } from "@/lib/monthDefaults";
import { dateKey } from "@/lib/utils";

export function useCalendar() {
    const {
        currentMonth,
        currentYear,
        dayNotes,
        specialDayImages,
        heroImages,
        goToPrevMonth,
        goToNextMonth,
        goToToday,
    } = useCalendarStore();

    const theme = MONTH_THEMES[currentMonth];
    const monthName = MONTH_NAMES[currentMonth];

    // build key sets for O(1) lookup in grid
    const dayNoteKeys = useMemo(
        () => new Set(dayNotes.map((n) => dateKey(n.date))),
        [dayNotes]
    );

    const specialImageKeys = useMemo(
        () => new Set(specialDayImages.map((s) => dateKey(s.date))),
        [specialDayImages]
    );

    const weeks = useMemo(
        () => buildMonthGrid(currentMonth, currentYear, dayNoteKeys, specialImageKeys),
        [currentMonth, currentYear, dayNoteKeys, specialImageKeys]
    );

    // resolve hero image: custom > default
    const heroImageUrl = useMemo(() => {
        const custom = heroImages.find(
            (h) => h.month === currentMonth && h.year === currentYear
        );
        return custom?.imageUrl ?? DEFAULT_HERO_IMAGES[currentMonth];
    }, [heroImages, currentMonth, currentYear]);

    return {
        currentMonth,
        currentYear,
        monthName,
        theme,
        weeks,
        heroImageUrl,
        goToPrevMonth,
        goToNextMonth,
        goToToday,
    };
}