import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
    CalendarState,
    CalendarDate,
    DateRange,
    RangeColor,
    DayNote,
    MonthNote,
    HeroImageEntry,
    SpecialDayImage,
} from "@/types";
import { generateId, isSameDate, isDateBefore } from "@/lib/utils";

const today = new Date();

const initialState: CalendarState = {
    currentMonth: today.getMonth(),
    currentYear: today.getFullYear(),
    ranges: [],
    activeRangeColor: "blue",
    selectionStart: null,
    hoverDate: null,
    dayNotes: [],
    monthNotes: [],
    heroImages: [],
    specialDayImages: [],
    selectedDay: null,
    notesPanelTab: "month",
    isImageUploaderOpen: false,
};

interface CalendarActions {
    // Navigation
    goToPrevMonth: () => void;
    goToNextMonth: () => void;
    goToToday: () => void;

    // Range selection
    startSelection: (date: CalendarDate) => void;
    endSelection: (date: CalendarDate) => void;
    setHoverDate: (date: CalendarDate | null) => void;
    removeRange: (id: string) => void;
    setActiveRangeColor: (color: RangeColor) => void;
    updateRangeLabel: (id: string, label: string) => void;
    updateRangeNote: (id: string, note: string) => void;

    // Notes
    upsertDayNote: (date: CalendarDate, content: string) => void;
    deleteDayNote: (date: CalendarDate) => void;
    upsertMonthNote: (month: number, year: number, content: string) => void;

    // Hero images
    setHeroImage: (month: number, year: number, url: string, isCustom: boolean) => void;
    resetHeroImage: (month: number, year: number) => void;
    setSpecialDayImage: (date: CalendarDate, url: string, label?: string) => void;
    removeSpecialDayImage: (date: CalendarDate) => void;

    // UI
    setSelectedDay: (date: CalendarDate | null) => void;
    setNotesPanelTab: (tab: CalendarState["notesPanelTab"]) => void;
    setImageUploaderOpen: (open: boolean) => void;
}

export const useCalendarStore = create<CalendarState & CalendarActions>()(
    persist(
        (set, get) => ({
            ...initialState,

            // ── Navigation ──────────────────────────────────────────────────────────

            goToPrevMonth: () =>
                set(({ currentMonth, currentYear }) =>
                    currentMonth === 0
                        ? { currentMonth: 11, currentYear: currentYear - 1 }
                        : { currentMonth: currentMonth - 1 }
                ),

            goToNextMonth: () =>
                set(({ currentMonth, currentYear }) =>
                    currentMonth === 11
                        ? { currentMonth: 0, currentYear: currentYear + 1 }
                        : { currentMonth: currentMonth + 1 }
                ),

            goToToday: () =>
                set({
                    currentMonth: today.getMonth(),
                    currentYear: today.getFullYear(),
                }),

            // ── Range Selection ──────────────────────────────────────────────────────

            startSelection: (date) =>
                set({ selectionStart: date, hoverDate: date }),

            endSelection: (date) => {
                const { selectionStart, ranges, activeRangeColor } = get();
                if (!selectionStart) return;

                // same day click = deselect
                if (isSameDate(selectionStart, date)) {
                    set({ selectionStart: null, hoverDate: null });
                    return;
                }

                const [start, end] = isDateBefore(selectionStart, date)
                    ? [selectionStart, date]
                    : [date, selectionStart];

                const newRange: DateRange = {
                    id: generateId(),
                    start,
                    end,
                    label: `Range ${ranges.length + 1}`,
                    color: activeRangeColor,
                };

                set({
                    ranges: [...ranges, newRange],
                    selectionStart: null,
                    hoverDate: null,
                });
            },

            setHoverDate: (date) => set({ hoverDate: date }),

            removeRange: (id) =>
                set(({ ranges }) => ({ ranges: ranges.filter((r) => r.id !== id) })),

            setActiveRangeColor: (color) => set({ activeRangeColor: color }),

            updateRangeLabel: (id, label) =>
                set(({ ranges }) => ({
                    ranges: ranges.map((r) => (r.id === id ? { ...r, label } : r)),
                })),

            updateRangeNote: (id, note) =>
                set(({ ranges }) => ({
                    ranges: ranges.map((r) => (r.id === id ? { ...r, note } : r)),
                })),

            // ── Notes ────────────────────────────────────────────────────────────────

            upsertDayNote: (date, content) =>
                set(({ dayNotes }) => {
                    const existing = dayNotes.find((n) => isSameDate(n.date, date));
                    if (existing) {
                        return {
                            dayNotes: dayNotes.map((n) =>
                                isSameDate(n.date, date) ? { ...n, content } : n
                            ),
                        };
                    }
                    const newNote: DayNote = {
                        id: generateId(),
                        date,
                        content,
                        createdAt: new Date().toISOString(),
                    };
                    return { dayNotes: [...dayNotes, newNote] };
                }),

            deleteDayNote: (date) =>
                set(({ dayNotes }) => ({
                    dayNotes: dayNotes.filter((n) => !isSameDate(n.date, date)),
                })),

            upsertMonthNote: (month, year, content) =>
                set(({ monthNotes }) => {
                    const exists = monthNotes.find(
                        (n) => n.month === month && n.year === year
                    );
                    if (exists) {
                        return {
                            monthNotes: monthNotes.map((n) =>
                                n.month === month && n.year === year ? { ...n, content } : n
                            ),
                        };
                    }
                    const newNote: MonthNote = { id: generateId(), month, year, content };
                    return { monthNotes: [...monthNotes, newNote] };
                }),

            // ── Hero Images ──────────────────────────────────────────────────────────

            setHeroImage: (month, year, imageUrl, isCustom) =>
                set(({ heroImages }) => {
                    const filtered = heroImages.filter(
                        (h) => !(h.month === month && h.year === year)
                    );
                    return {
                        heroImages: [...filtered, { month, year, imageUrl, isCustom }],
                    };
                }),

            resetHeroImage: (month, year) =>
                set(({ heroImages }) => ({
                    heroImages: heroImages.filter(
                        (h) => !(h.month === month && h.year === year)
                    ),
                })),

            setSpecialDayImage: (date, url, label) =>
                set(({ specialDayImages }) => {
                    const filtered = specialDayImages.filter(
                        (s) => !isSameDate(s.date, date)
                    );
                    return {
                        specialDayImages: [...filtered, { date, imageUrl: url, label }],
                    };
                }),

            removeSpecialDayImage: (date) =>
                set(({ specialDayImages }) => ({
                    specialDayImages: specialDayImages.filter(
                        (s) => !isSameDate(s.date, date)
                    ),
                })),

            // ── UI ───────────────────────────────────────────────────────────────────

            setSelectedDay: (date) => set({ selectedDay: date }),

            setNotesPanelTab: (tab) => set({ notesPanelTab: tab }),

            setImageUploaderOpen: (open) => set({ isImageUploaderOpen: open }),
        }),
        {
            name: "wall-calendar-storage",
            // only persist data, not transient UI state
            partialize: (state) => ({
                ranges: state.ranges,
                dayNotes: state.dayNotes,
                monthNotes: state.monthNotes,
                heroImages: state.heroImages,
                specialDayImages: state.specialDayImages,
                activeRangeColor: state.activeRangeColor,
                currentMonth: state.currentMonth,
                currentYear: state.currentYear,
            }),
        }
    )
);