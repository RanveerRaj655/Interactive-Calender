import { cn } from "@/lib/utils";

interface Props {
    className?: string;
}

export function SpiralBinding({ className }: Props) {
    const rings = Array.from({ length: 18 });

    return (
        <div
            className={cn(
                "relative flex items-center justify-center gap-[14px] px-8 py-2 bg-gray-100 border-b border-gray-200",
                className
            )}
        >
            {rings.map((_, i) => (
                <div key={i} className="relative flex flex-col items-center">
                    {/* outer ring */}
                    <div className="w-5 h-5 rounded-full border-[3px] border-gray-400 bg-gray-200 shadow-inner" />
                    {/* inner shine */}
                    <div className="absolute top-[4px] left-[4px] w-2 h-2 rounded-full bg-white/60" />
                    {/* wire drop */}
                    <div className="w-[2px] h-2 bg-gray-400 rounded-b-full" />
                </div>
            ))}
        </div>
    );
}