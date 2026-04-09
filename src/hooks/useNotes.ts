import { useCalendarStore } from "@/store/calendarStore";
import { CalendarDate } from "@/types";
import { isSameDate } from "@/lib/utils";

export function useNotes() {
    const {
        dayNotes,
        monthNotes,
        ranges,
        currentMonth,
        currentYear,
        notesPanelTab,
        selectedDay,
        upsertDayNote,
        deleteDayNote,
        upsertMonthNote,
        updateRangeNote,
        setNotesPanelTab,
    } = useCalendarStore();

    const currentMonthNote = monthNotes.find(
        (n) => n.month === currentMonth && n.year === currentYear
    );

    const getDayNote = (date: CalendarDate) =>
        dayNotes.find((n) => isSameDate(n.date, date));

    const selectedDayNote = selectedDay ? getDayNote(selectedDay) : null;

    const saveMonthNote = (content: string) =>
        upsertMonthNote(currentMonth, currentYear, content);

    const saveDayNote = (date: CalendarDate, content: string) => {
        if (!content.trim()) {
            deleteDayNote(date);
        } else {
            upsertDayNote(date, content);
        }
    };

    const rangesWithNotes = ranges.filter((r) => r.note?.trim());

    return {
        currentMonthNote,
        selectedDayNote,
        selectedDay,
        rangesWithNotes,
        notesPanelTab,
        getDayNote,
        saveMonthNote,
        saveDayNote,
        updateRangeNote,
        setNotesPanelTab,
    };
}