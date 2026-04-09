"use client";

import { useEffect, useRef, useState } from "react";
import { NotebookPen, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotes } from "@/hooks/useNotes";
import { MonthTheme } from "@/types";
import { MONTH_NAMES } from "@/lib/calendarUtils";
import { cn } from "@/lib/utils";
import { useCalendarStore } from "@/store/calendarStore";

interface Props {
    theme: MonthTheme;
}

export function MonthNote({ theme }: Props) {
    const { currentMonth, currentYear } = useCalendarStore();
    const { currentMonthNote, saveMonthNote } = useNotes();

    const [draft, setDraft] = useState(currentMonthNote?.content ?? "");
    const [saved, setSaved] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // sync draft when month changes
    useEffect(() => {
        setDraft(currentMonthNote?.content ?? "");
        setSaved(false);
    }, [currentMonth, currentYear, currentMonthNote?.content]);

    const isDirty = draft !== (currentMonthNote?.content ?? "");

    const handleSave = () => {
        saveMonthNote(draft);
        setSaved(true);
        setTimeout(() => setSaved(false), 1800);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // ctrl/cmd + enter to save
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault();
            handleSave();
        }
    };

    const handleDelete = () => {
        setDraft("");
        saveMonthNote("");
        setSaved(true);
        setTimeout(() => setSaved(false), 1800);
    };

    return (
        <div className="flex flex-col h-full gap-3 min-h-0">
            {/* header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <NotebookPen size={15} className={cn(theme.accent)} />
                    <span className="text-sm font-semibold text-gray-700">
                        {MONTH_NAMES[currentMonth]} {currentYear}
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    {currentMonthNote?.content && (
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs text-red-400 hover:text-red-600"
                            onClick={handleDelete}
                            title="Delete note"
                        >
                            <Trash2 size={13} />
                        </Button>
                    )}
                    <Button
                        size="sm"
                        variant={isDirty ? "default" : "ghost"}
                        className={cn(
                            "h-7 text-xs gap-1 transition-all",
                            isDirty && theme.primary,
                            saved && "bg-green-500 text-white"
                        )}
                        onClick={handleSave}
                        disabled={!isDirty && !saved}
                    >
                        <Save size={12} />
                        {saved ? "Saved!" : "Save"}
                    </Button>
                </div>
            </div>

            {/* textarea — lined notepad feel */}
            <div className="relative flex-1 min-h-[140px]">
                <textarea
                    ref={textareaRef}
                    value={draft}
                    onChange={(e) => { setDraft(e.target.value); setSaved(false); }}
                    onKeyDown={handleKeyDown}
                    placeholder={`Jot down your ${MONTH_NAMES[currentMonth]} goals, reminders…`}
                    className={cn(
                        "w-full h-full min-h-[140px] resize-none bg-transparent",
                        "text-sm text-gray-700 placeholder:text-gray-300",
                        "leading-7 focus:outline-none",
                        // lined background via repeating gradient
                        "bg-[repeating-linear-gradient(transparent,transparent_27px,#e5e7eb_27px,#e5e7eb_28px)]",
                    )}
                    style={{ lineHeight: "28px" }}
                />
            </div>

            <p className="text-[10px] text-gray-400">⌘ + Enter to save</p>
        </div>
    );
}