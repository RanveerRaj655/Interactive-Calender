import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CalendarDate } from "@/types";

// ─── Tailwind class merger ────────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// ─── Date comparison helpers ─────────────────────────────────────────────────

export function isSameDate(a: CalendarDate, b: CalendarDate): boolean {
    return a.day === b.day && a.month === b.month && a.year === b.year;
}

export function toJsDate(d: CalendarDate): Date {
    return new Date(d.year, d.month, d.day);
}

export function fromJsDate(date: Date): CalendarDate {
    return {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
    };
}

export function isDateBefore(a: CalendarDate, b: CalendarDate): boolean {
    return toJsDate(a) < toJsDate(b);
}

export function isDateAfter(a: CalendarDate, b: CalendarDate): boolean {
    return toJsDate(a) > toJsDate(b);
}

export function isDateInRange(
    date: CalendarDate,
    start: CalendarDate,
    end: CalendarDate
): boolean {
    const d = toJsDate(date);
    const s = toJsDate(start);
    const e = toJsDate(end);
    const [rangeStart, rangeEnd] = s <= e ? [s, e] : [e, s];
    return d >= rangeStart && d <= rangeEnd;
}

export function isRangeStart(date: CalendarDate, start: CalendarDate, end: CalendarDate): boolean {
    const s = toJsDate(start);
    const e = toJsDate(end);
    return s <= e ? isSameDate(date, start) : isSameDate(date, end);
}

export function isRangeEnd(date: CalendarDate, start: CalendarDate, end: CalendarDate): boolean {
    const s = toJsDate(start);
    const e = toJsDate(end);
    return s <= e ? isSameDate(date, end) : isSameDate(date, start);
}

// ─── ID generator ────────────────────────────────────────────────────────────

export function generateId(): string {
    return Math.random().toString(36).substring(2, 10);
}

// ─── Date key for maps ───────────────────────────────────────────────────────

export function dateKey(date: CalendarDate): string {
    return `${date.year}-${date.month}-${date.day}`;
}

export function monthKey(month: number, year: number): string {
    return `${year}-${month}`;
}