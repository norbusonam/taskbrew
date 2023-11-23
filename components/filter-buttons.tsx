"use client";

import {
  TaskCounts,
  getTaskCountsByFilter,
} from "@taskbrew/server-actions/get-tasks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  baseRoute: string;
  className?: string;
};

export function FilterButtons(props: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const [counts, setCounts] = useState<TaskCounts>();

  useEffect(() => {
    getTaskCountsByFilter().then((c) => {
      setCounts(c);
    });
  }, []);

  return (
    <div className={`space-x-2 space-y-2 ${props.className}`}>
      <FilterButton
        filter="Overdue"
        isActiveFilter={filter === "overdue"}
        count={counts?.overdue || 0}
        onFilterSelected={() =>
          router.push(`${props.baseRoute}?filter=overdue`)
        }
      />
      <FilterButton
        filter="Today"
        isActiveFilter={!filter}
        count={counts?.today || 0}
        onFilterSelected={() => router.push(`${props.baseRoute}`)}
      />
      <FilterButton
        filter="Upcoming"
        isActiveFilter={filter === "upcoming"}
        count={counts?.upcoming || 0}
        onFilterSelected={() =>
          router.push(`${props.baseRoute}?filter=upcoming`)
        }
      />
      <FilterButton
        filter="No due date"
        isActiveFilter={filter === "noDueDate"}
        count={counts?.noDueDate || 0}
        onFilterSelected={() =>
          router.push(`${props.baseRoute}?filter=noDueDate`)
        }
      />
      <FilterButton
        filter="Completed"
        isActiveFilter={filter === "completed"}
        count={counts?.completed || 0}
        onFilterSelected={() =>
          router.push(`${props.baseRoute}?filter=completed`)
        }
      />
    </div>
  );
}

type FilterButtonProps = {
  filter: String;
  isActiveFilter: boolean;
  count: number;
  onFilterSelected: () => void;
};

function FilterButton(props: FilterButtonProps) {
  return (
    <button
      className={`rounded-md bg-neutral-200 px-2 transition-colors hover:bg-neutral-300 active:bg-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-600 ${
        props.isActiveFilter
          ? "bg-neutral-300 dark:bg-neutral-700"
          : "bg-neutral-200 dark:bg-neutral-800"
      }`}
      onClick={props.onFilterSelected}
    >
      {props.filter}
      <span className="ml-1 text-sm text-neutral-500 dark:text-neutral-400">
        {props.count}
      </span>
    </button>
  );
}
