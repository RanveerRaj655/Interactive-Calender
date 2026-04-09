"use client";

import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCalendarStore } from "@/store/calendarStore";
import { cn } from "@/lib/utils";

interface Props {
    open: boolean;
    onClose: () => void;
    /** if provided, sets image for a specific day instead of the month */
    targetDate?: { day: number; month: number; year: number };
}

export function ImageUploader({ open, onClose, targetDate }: Props) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);

    const { currentMonth, currentYear, setHeroImage, setSpecialDayImage } =
        useCalendarStore();

    const handleFile = (file: File) => {
        if (!file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleConfirm = () => {
        if (!preview) return;
        if (targetDate) {
            setSpecialDayImage(targetDate, preview);
        } else {
            setHeroImage(currentMonth, currentYear, preview, true);
        }
        setPreview(null);
        onClose();
    };

    const handleClose = () => {
        setPreview(null);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {targetDate ? "Set Day Image" : "Upload Month Cover"}
                    </DialogTitle>
                </DialogHeader>

                {/* Drop zone */}
                <div
                    className={cn(
                        "relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors",
                        dragging
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                    )}
                    onClick={() => fileRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                >
                    {preview ? (
                        <div className="relative">
                            <img
                                src={preview}
                                alt="preview"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <button
                                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
                                onClick={(e) => { e.stopPropagation(); setPreview(null); }}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-400 py-6">
                            <Upload size={32} />
                            <p className="text-sm font-medium">
                                Drop an image or click to browse
                            </p>
                            <p className="text-xs">PNG, JPG, WEBP up to 10MB</p>
                        </div>
                    )}

                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFile(file);
                        }}
                    />
                </div>

                <div className="flex justify-end gap-2 mt-2">
                    <Button variant="outline" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} disabled={!preview}>
                        Apply
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}