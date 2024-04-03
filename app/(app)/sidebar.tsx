import { MeDropdown } from "@/components/me-dropdown";
import { ThemeButton } from "@/components/theme-button";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function Sidebar() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Taskbrew</h1>
      <div className="flex flex-col">
        <Link className={buttonVariants({ variant: "ghost" })} href="/home">
          Home
        </Link>
        <Link className={buttonVariants({ variant: "ghost" })} href="/tasks">
          Tasks
        </Link>
        <ThemeButton />
        <MeDropdown />
      </div>
    </div>
  );
}
