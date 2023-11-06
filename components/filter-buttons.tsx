"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  baseRoute: string;
  className?: string;
};

export function FilterButtons(props: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  return (
    <div className={`space-x-2 space-y-2 ${props.className}`}>
      <FilterButton
        filter="Overdue"
        isActiveFilter={filter === "overdue"}
        onFilterSelected={() =>
          router.push(`${props.baseRoute}?filter=overdue`)
        }
      />
      <FilterButton
        filter="Today"
        isActiveFilter={!filter}
        onFilterSelected={() => router.push(`${props.baseRoute}`)}
      />
      <FilterButton
        filter="Upcoming"
        isActiveFilter={filter === "upcoming"}
        onFilterSelected={() =>
          router.push(`${props.baseRoute}?filter=upcoming`)
        }
      />
      <FilterButton
        filter="All"
        isActiveFilter={filter === "all"}
        onFilterSelected={() => router.push(`${props.baseRoute}?filter=all`)}
      />
      <FilterButton
        filter="Completed"
        isActiveFilter={filter === "completed"}
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
    </button>
  );
}
