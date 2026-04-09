import { useCalendarStore } from "@/store/calendarStore";
import { CalendarDate } from "@/types";
import { isSameDate, isDateInRange, isRangeStart, isRangeEnd } from "@/lib/utils";

export function useRangeSelection() {
    const {
        ranges,
        selectionStart,
        hoverDate,
        activeRangeColor,
        startSelection,
        endSelection,
        setHoverDate,
        removeRange,
        setActiveRangeColor,
        updateRangeLabel,
        updateRangeNote,
    } = useCalendarStore();

    const isSelecting = !!selectionStart;

    const handleDayClick = (date: CalendarDate) => {
        if (!selectionStart) {
            startSelection(date);
        } else {
            endSelection(date);
        }
    };

    const handleDayHover = (date: CalendarDate) => {
        if (isSelecting) setHoverDate(date);
    };

    // returns styling info for a given day
    const getDayRangeState = (date: CalendarDate) => {
        // check preview (active selection in progress)
        if (isSelecting && hoverDate) {
            const previewStart = selectionStart!;
            const previewEnd = hoverDate;
            if (isDateInRange(date, previewStart, previewEnd)) {
                return {
                    inRange: true,
                    isStart: isRangeStart(date, previewStart, previewEnd),
                    isEnd: isRangeEnd(date, previewStart, previewEnd),
                    color: activeRangeColor,
                    isPreview: true,
                    rangeId: null,
                };
            }
        }

        // check committed ranges (last one wins for overlap)
        for (let i = ranges.length - 1; i >= 0; i--) {
            const r = ranges[i];
            if (isDateInRange(date, r.start, r.end)) {
                return {
                    inRange: true,
                    isStart: isRangeStart(date, r.start, r.end),
                    isEnd: isRangeEnd(date, r.start, r.end),
                    color: r.color,
                    isPreview: false,
                    rangeId: r.id,
                };
            }
        }

        return {
            inRange: false,
            isStart: false,
            isEnd: false,
            color: null,
            isPreview: false,
            rangeId: null,
        };
    };

    return {
        ranges,
        isSelecting,
        selectionStart,
        activeRangeColor,
        handleDayClick,
        handleDayHover,
        getDayRangeState,
        removeRange,
        setActiveRangeColor,
        updateRangeLabel,
        updateRangeNote,
    };
}