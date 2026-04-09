"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCalendarStore } from "@/store/calendarStore";
import { ImageUploader } from "./ImageUploader";
import { cn } from "@/lib/utils";
import { MonthTheme } from "@/types";

interface Props {
    imageUrl: string;
    monthName: string;
    year: number;
    theme: MonthTheme;
}

export function HeroImage({ imageUrl, monthName, year, theme }: Props) {
    const [uploaderOpen, setUploaderOpen] = useState(false);
    const { resetHeroImage, currentMonth, currentYear, heroImages } =
        useCalendarStore();

    const isCustom = heroImages.some(
        (h) => h.month === currentMonth && h.year === currentYear && h.isCustom
    );

    return (
        <div className="relative w-full h-64 lg:h-full lg:min-h-[420px] overflow-hidden group">
            {/* Hero photo with crossfade */}
            <AnimatePresence mode="wait">
                <motion.img
                    key={imageUrl}
                    src={imageUrl}
                    alt={`${monthName} ${year}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </AnimatePresence>

            {/* Gradient overlay */}
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r opacity-60",
                    `from-black/70 via-black/20 to-transparent`
                )}
            />

            {/* Month label on image */}
            <div className="absolute bottom-4 left-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
                    {year}
                </p>
                <p
                    className={cn(
                        "text-2xl font-black uppercase tracking-tight",
                    )}
                >
                    {monthName}
                </p>
                {/* colored underline bar */}
                <div className={cn("h-1 w-10 rounded-full mt-1", theme.primary)} />
            </div>

            {/* Image controls — visible on hover */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {isCustom && (
                    <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 bg-white/80 hover:bg-white"
                        onClick={() => resetHeroImage(currentMonth, currentYear)}
                        title="Reset to default"
                    >
                        <RotateCcw size={14} />
                    </Button>
                )}
                <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 bg-white/80 hover:bg-white"
                    onClick={() => setUploaderOpen(true)}
                    title="Upload custom image"
                >
                    <ImagePlus size={14} />
                </Button>
            </div>

            {/* Uploader dialog */}
            <ImageUploader
                open={uploaderOpen}
                onClose={() => setUploaderOpen(false)}
            />
        </div>
    );
}