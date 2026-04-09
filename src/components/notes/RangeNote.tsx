"use client";

import { useState } from "react";
import { Tag, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRangeSelection } from "@/hooks/useRangeSelection";
import { DateRange, MonthTheme, RangeColor } from "@/types";
import { MONTH_NAMES } from "@/lib/calendarUtils";
import { cn, toJsDate } from "@/lib/utils";
import { useCalendarStore } from "@/store/calendarStore";

const COLOR_OPTIONS: RangeColor[] = ["blue", "green", "orange", "purple", "rose", "amber"];

const BADGE_CLASSES: Record<RangeColor, string> = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    green: "bg-green-100 text-green-700 border-green-200",
    orange: "bg-orange-100 text-orange-700 border-orange-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    rose: "bg-rose-100 text-rose-700 border-rose-200",
    amber: "bg-amber-100 text-amber-700 border-amber-200",
};

const DOT_CLASSES: Record<RangeColor, string> = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    orange: "bg-orange-500",
    purple: "bg-purple-500",
    rose: "bg-rose-500",
    amber: "bg-amber-500",
};

interface RangeCardProps {
    range: DateRange;
    theme: MonthTheme;
    onRemove: (id: string) => void;
    onLabelChange: (id: string, label: string) => void;
    onNoteChange: (id: string, note: string) => void;
}

function RangeCard({ range, theme, onRemove, onLabelChange, onNoteChange }: RangeCardProps) {
    const [expanded, setExpanded] = useState(false);
    const [noteDraft, setNoteDraft] = useState(range.note ?? "");

    const { start, end } = range;
    const startLabel = `${MONTH_NAMES[start.month].slice(0, 3)} ${start.day}`;
    const endLabel = `${MONTH_NAMES[end.month].slice(0, 3)} ${end.day}`;

    return (
        <div className={cn("rounded-xl border bg-white shadow-sm overflow-hidden flex-shrink-0")}>
            {/* colored top strip */}
            <div className={cn("h-1 w-full", DOT_CLASSES[range.color])} />

            <div className="px-3 py-2">
                {/* top row */}
                <div className="flex items-center gap-2">
                    <span className={cn("w-2 h-2 rounded-full flex-shrink-0", DOT_CLASSES[range.color])} />

                    {/* editable label */}
                    <input
                        value={range.label}
                        onChange={(e) => onLabelChange(range.id, e.target.value)}
                        className="flex-1 min-w-0 text-sm font-semibold text-gray-700 bg-transparent focus:outline-none truncate"
                    />

                    <Badge className={cn("text-[10px] border", BADGE_CLASSES[range.color])}>
                        {startLabel} → {endLabel}
                    </Badge>

                    <button
                        onClick={() => setExpanded((p) => !p)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    <button
                        onClick={() => onRemove(range.id)}
                        className="text-gray-300 hover:text-red-400 transition-colors"
                    >
                        <Trash2 size={13} />
                    </button>
                </div>

                {/* expanded note */}
                {expanded && (
                    <textarea
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                        onBlur={() => onNoteChange(range.id, noteDraft)}
                        placeholder="Add a note for this range…"
                        rows={2}
                        className={cn(
                            "w-full mt-2 resize-none rounded-lg border border-gray-100 bg-gray-50",
                            "px-2 py-1.5 text-xs text-gray-600 placeholder:text-gray-300",
                            "focus:outline-none focus:ring-2 focus:ring-blue-100"
                        )}
                    />
                )}
            </div>
        </div>
    );
}

// ─── Color Picker ─────────────────────────────────────────────────────────────

interface ColorPickerProps {
    active: RangeColor;
    onChange: (c: RangeColor) => void;
}

function ColorPicker({ active, onChange }: ColorPickerProps) {
    return (
        <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">
                Next range:
            </span>
            {COLOR_OPTIONS.map((c) => (
                <button
                    key={c}
                    onClick={() => onChange(c)}
                    className={cn(
                        "w-5 h-5 rounded-full transition-all",
                        DOT_CLASSES[c],
                        active === c
                            ? "ring-2 ring-offset-1 ring-gray-400 scale-110"
                            : "opacity-60 hover:opacity-100"
                    )}
                    title={c}
                />
            ))}
        </div>
    );
}

// ─── Main export ─────────────────────────────────────────────────────────────

interface Props {
    theme: MonthTheme;
}

export function RangeNote({ theme }: Props) {
    const { currentMonth, currentYear } = useCalendarStore();
    const {
        ranges,
        activeRangeColor,
        isSelecting,
        removeRange,
        updateRangeLabel,
        updateRangeNote,
        setActiveRangeColor,
    } = useRangeSelection();

    const monthStart = new Date(currentYear, currentMonth, 1);
    const monthEnd = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);

    const relevantRanges = ranges.filter((r) => {
        const s = toJsDate(r.start);
        const e = toJsDate(r.end);
        const rStart = s <= e ? s : e;
        const rEnd = s <= e ? e : s;
        return rStart <= monthEnd && rEnd >= monthStart;
    });

    return (
        <div className="flex flex-col gap-3 h-full min-h-0">
            {/* color picker + selecting hint */}
            <div className="flex items-center justify-between">
                <ColorPicker active={activeRangeColor} onChange={setActiveRangeColor} />
                {isSelecting && (
                    <span className="text-[10px] text-blue-500 font-medium animate-pulse">
                        Click end date…
                    </span>
                )}
            </div>

            {/* range cards */}
            <div className="flex flex-col gap-2 overflow-y-scroll flex-1 pr-2 min-h-0">
                {relevantRanges.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 gap-2 text-gray-300">
                        <Tag size={28} />
                        <p className="text-xs text-center px-4">No ranges for this month. Click two dates to create one.</p>
                    </div>
                ) : (
                    relevantRanges.map((r) => (
                        <RangeCard
                            key={r.id}
                            range={r}
                            theme={theme}
                            onRemove={removeRange}
                            onLabelChange={updateRangeLabel}
                            onNoteChange={updateRangeNote}
                        />
                    ))
                )}
            </div>
        </div>
    );
}