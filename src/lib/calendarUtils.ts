import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isToday,
    getDay,
} from "date-fns";
import { CalendarDate, DayCell } from "@/types";
import { fromJsDate } from "@/lib/utils";
import { HOLIDAYS } from "@/lib/holidays";

// ─── Build the full 6-week grid for a month ──────────────────────────────────

export function buildMonthGrid(
    month: number,  // 0-indexed
    year: number,
    dayNoteKeys: Set<string>,
    specialImageKeys: Set<string>
): DayCell[][] {
    const firstDay = startOfMonth(new Date(year, month));
    const lastDay = endOfMonth(new Date(year, month));

    // Week starts Monday
    const gridStart = startOfWeek(firstDay, { weekStartsOn: 1 });
    const gridEnd = endOfWeek(lastDay, { weekStartsOn: 1 });

    const allDays = eachDayOfInterval({ start: gridStart, end: gridEnd });

    const cells: DayCell[] = allDays.map((jsDate) => {
        const date = fromJsDate(jsDate);
        const key = `${date.year}-${date.month}-${date.day}`;
        const dayOfWeek = getDay(jsDate); // 0=Sun, 6=Sat
        const holidayKey = `${date.month + 1}-${date.day}`; // holidays use 1-indexed month

        return {
            date,
            isCurrentMonth: jsDate.getMonth() === month,
            isToday: isToday(jsDate),
            isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
            holiday: HOLIDAYS[holidayKey],
            hasNote: dayNoteKeys.has(key),
            specialImage: specialImageKeys.has(key) ? key : undefined,
        };
    });

    // Chunk into weeks (rows of 7)
    const weeks: DayCell[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
        weeks.push(cells.slice(i, i + 7));
    }

    return weeks;
}

// ─── Month navigation ────────────────────────────────────────────────────────

export function getPrevMonth(month: number, year: number) {
    if (month === 0) return { month: 11, year: year - 1 };
    return { month: month - 1, year };
}

export function getNextMonth(month: number, year: number) {
    if (month === 11) return { month: 0, year: year + 1 };
    return { month: month + 1, year };
}

// ─── Day labels ──────────────────────────────────────────────────────────────

export const DAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const MONTH_NAMES = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December",
];