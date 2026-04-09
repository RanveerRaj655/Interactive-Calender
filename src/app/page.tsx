import { CalendarRoot } from "@/components/calendar/CalendarRoot";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl">
        {/* page title */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">
            Wall Calendar
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Click a date to select · Drag across dates for a range · Notes auto-save
          </p>
        </div>

        <CalendarRoot />
      </div>
    </main>
  );
}