// ─── Date & Range ────────────────────────────────────────────────────────────

export interface CalendarDate {
    day: number;
    month: number; // 0-indexed (0 = January)
    year: number;
}

export interface DateRange {
    id: string;
    start: CalendarDate;
    end: CalendarDate;
    label: string;
    color: RangeColor;
    note?: string;
}

export type RangeColor =
    | "blue"
    | "green"
    | "orange"
    | "purple"
    | "rose"
    | "amber";

// ─── Notes ───────────────────────────────────────────────────────────────────

export interface DayNote {
    id: string;
    date: CalendarDate;
    content: string;
    createdAt: string;
}

export interface MonthNote {
    id: string;
    month: number; // 0-indexed
    year: number;
    content: string;
}

// ─── Hero Image ──────────────────────────────────────────────────────────────

export interface HeroImageEntry {
    month: number; // 0-indexed
    year: number;
    imageUrl: string;      // default or uploaded
    isCustom: boolean;
}

export interface SpecialDayImage {
    date: CalendarDate;
    imageUrl: string;
    label?: string;
}

// ─── Month Theme ─────────────────────────────────────────────────────────────

export interface MonthTheme {
    primary: string;       // tailwind bg class e.g. "bg-blue-600"
    accent: string;        // tailwind text class e.g. "text-blue-600"
    light: string;         // tailwind light bg e.g. "bg-blue-50"
    gradient: string;      // tailwind gradient e.g. "from-blue-400 to-blue-700"
    label: string;         // color name for display
}

// ─── Calendar Day Cell ───────────────────────────────────────────────────────

export interface DayCell {
    date: CalendarDate;
    isCurrentMonth: boolean;
    isToday: boolean;
    isWeekend: boolean;
    holiday?: string;      // holiday name if applicable
    hasNote: boolean;
    specialImage?: string; // url if day has a special image
}

// ─── Store State ─────────────────────────────────────────────────────────────

export interface CalendarState {
    // Navigation
    currentMonth: number;  // 0-indexed
    currentYear: number;

    // Range selection
    ranges: DateRange[];
    activeRangeColor: RangeColor;
    selectionStart: CalendarDate | null;
    hoverDate: CalendarDate | null;

    // Notes
    dayNotes: DayNote[];
    monthNotes: MonthNote[];

    // Hero images
    heroImages: HeroImageEntry[];
    specialDayImages: SpecialDayImage[];

    // UI state
    selectedDay: CalendarDate | null;
    notesPanelTab: "month" | "range" | "day";
    isImageUploaderOpen: boolean;
}