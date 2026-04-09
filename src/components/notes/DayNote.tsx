"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotes } from "@/hooks/useNotes";
import { useCalendarStore } from "@/store/calendarStore";
import { MonthTheme } from "@/types";
import { MONTH_NAMES } from "@/lib/calendarUtils";
import { ImageUploader } from "@/components/hero/ImageUploader";
import { cn } from "@/lib/utils";

interface Props {
    theme: MonthTheme;
}

export function DayNote({ theme }: Props) {
    const { selectedDay } = useCalendarStore();
    const { selectedDayNote, saveDayNote } = useNotes();

    const [draft, setDraft] = useState(selectedDayNote?.content ?? "");
    const [uploaderOpen, setUploaderOpen] = useState(false);

    // sync when selected day changes
    useEffect(() => {
        setDraft(selectedDayNote?.content ?? "");
    }, [selectedDay, selectedDayNote?.content]);

    if (!selectedDay) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-300 py-10">
                <CalendarDays size={32} />
                <p className="text-sm">Click a day to add a note</p>
            </div>
        );
    }

    const { day, month, year } = selectedDay;
    const label = `${MONTH_NAMES[month]} ${day}, ${year}`;

    const handleSave = () => {
        saveDayNote(selectedDay, draft);
    };

    const handleDelete = () => {
        setDraft("");
        saveDayNote(selectedDay, "");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault();
            handleSave();
        }
    };

    return (
        <div className="flex flex-col gap-3 h-full min-h-0">
            {/* header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CalendarDays size={15} className={cn(theme.accent)} />
                    <span className="text-sm font-semibold text-gray-700">{label}</span>
                </div>

                <div className="flex gap-1">
                    {/* set special day image */}
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs text-gray-400 hover:text-gray-600"
                        onClick={() => setUploaderOpen(true)}
                        title="Set image for this day"
                    >
                        🖼
                    </Button>

                    {selectedDayNote && (
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 text-xs text-red-400 hover:text-red-600"
                            onClick={handleDelete}
                        >
                            <Trash2 size={12} />
                        </Button>
                    )}
                </div>
            </div>

            {/* note input */}
            <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleSave}
                placeholder="What's happening on this day?"
                className={cn(
                    "flex-1 min-h-[120px] resize-none rounded-lg border border-gray-200",
                    "bg-white px-3 py-2 text-sm text-gray-700 placeholder:text-gray-300",
                    "focus:outline-none focus:ring-2",
                    theme.accent.replace("text-", "focus:ring-").replace("600", "200").replace("500", "200")
                )}
            />

            <p className="text-[10px] text-gray-400">Auto-saves on blur · ⌘ + Enter</p>

            <ImageUploader
                open={uploaderOpen}
                onClose={() => setUploaderOpen(false)}
                targetDate={selectedDay}
            />
        </div>
    );
}