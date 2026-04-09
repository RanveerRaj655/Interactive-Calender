"use client";

import { MonthTheme } from "@/types";
import { useNotes } from "@/hooks/useNotes";
import { MonthNote } from "./MonthNote";
import { DayNote } from "./DayNote";
import { RangeNote } from "./RangeNote";
import { cn } from "@/lib/utils";

interface Props {
    theme: MonthTheme;
}

const TABS = [
    { id: "month", label: "Month" },
    { id: "range", label: "Ranges" },
    { id: "day", label: "Day" },
] as const;

export function NotesPanel({ theme }: Props) {
    const { notesPanelTab, setNotesPanelTab } = useNotes();

    return (
        <div className="flex flex-col h-full bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-100 min-h-0">
            {/* panel header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Notes
                </span>

                {/* tabs */}
                <div className="flex rounded-lg bg-gray-200 p-0.5 gap-0.5">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setNotesPanelTab(tab.id)}
                            className={cn(
                                "px-3 py-1 rounded-md text-xs font-semibold transition-all duration-150",
                                notesPanelTab === tab.id
                                    ? cn("bg-white shadow-sm", theme.accent)
                                    : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* divider */}
            <div className="h-px bg-gray-200 mx-4" />

            {/* panel body */}
            <div className="flex-1 overflow-y-auto px-4 py-3 min-h-0">
                {notesPanelTab === "month" && <MonthNote theme={theme} />}
                {notesPanelTab === "range" && <RangeNote theme={theme} />}
                {notesPanelTab === "day" && <DayNote theme={theme} />}
            </div>
        </div>
    );
}