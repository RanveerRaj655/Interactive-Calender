import { MonthTheme } from "@/types";

// ─── Default hero image per month (Unsplash free URLs) ───────────────────────

export const DEFAULT_HERO_IMAGES: Record<number, string> = {
    0: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80", // Jan - snowy mountains
    1: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80", // Feb - misty forest
    2: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80", // Mar - cherry blossom
    3: "https://picsum.photos/id/1080/800/600", // Apr - spring flowers
    4: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80", // May - green hills
    5: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", // Jun - beach
    6: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", // Jul - summer mountains
    7: "https://picsum.photos/id/1016/800/600", // Aug - ocean sunset
    8: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80", // Sep - autumn road
    9: "https://picsum.photos/id/1022/800/600", // Oct - fall leaves
    10: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=800&q=80", // Nov - foggy forest
    11: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&q=80", // Dec - snow christmas
};

// ─── Theme per month ─────────────────────────────────────────────────────────

export const MONTH_THEMES: Record<number, MonthTheme> = {
    0: { primary: "bg-blue-600", accent: "text-blue-600", light: "bg-blue-50", gradient: "from-blue-400 to-blue-700", label: "blue" },
    1: { primary: "bg-pink-500", accent: "text-pink-500", light: "bg-pink-50", gradient: "from-pink-300 to-pink-600", label: "pink" },
    2: { primary: "bg-rose-400", accent: "text-rose-500", light: "bg-rose-50", gradient: "from-rose-300 to-rose-500", label: "rose" },
    3: { primary: "bg-emerald-500", accent: "text-emerald-600", light: "bg-emerald-50", gradient: "from-emerald-300 to-emerald-600", label: "emerald" },
    4: { primary: "bg-purple-600", accent: "text-purple-600", light: "bg-purple-50", gradient: "from-purple-400 to-purple-700", label: "purple" },
    5: { primary: "bg-cyan-500", accent: "text-cyan-600", light: "bg-cyan-50", gradient: "from-cyan-300 to-cyan-600", label: "cyan" },
    6: { primary: "bg-orange-500", accent: "text-orange-500", light: "bg-orange-50", gradient: "from-orange-300 to-orange-600", label: "orange" },
    7: { primary: "bg-amber-500", accent: "text-amber-500", light: "bg-amber-50", gradient: "from-amber-300 to-amber-600", label: "amber" },
    8: { primary: "bg-yellow-500", accent: "text-yellow-600", light: "bg-yellow-50", gradient: "from-yellow-300 to-yellow-600", label: "yellow" },
    9: { primary: "bg-green-500", accent: "text-green-500", light: "bg-green-50", gradient: "from-green-400 to-green-600", label: "green" },
    10: { primary: "bg-slate-600", accent: "text-slate-600", light: "bg-slate-50", gradient: "from-slate-400 to-slate-700", label: "slate" },
    11: { primary: "bg-indigo-600", accent: "text-indigo-600", light: "bg-indigo-50", gradient: "from-indigo-400 to-indigo-700", label: "indigo" },
};