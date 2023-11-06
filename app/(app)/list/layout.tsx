"use client";

import { FilterButtons } from "@taskbrew/components/filter-buttons";
import { useSearchParams } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  return (
    <div className="flex h-screen w-full flex-col">
      {/* header */}
      <div className="px-4 pt-4">
        <h1 className="text-4xl font-bold">List</h1>
        <p className="text-sm text-neutral-500">
          {filter === "completed"
            ? "Completed tasks"
            : filter === "all"
            ? "All tasks"
            : filter === "overdue"
            ? "Overdue tasks"
            : filter === "upcoming"
            ? "Upcoming tasks"
            : "Today's tasks"}
        </p>
      </div>

      <FilterButtons baseRoute="/list" className="pb-2 pl-4" />
      {children}
    </div>
  );
}
