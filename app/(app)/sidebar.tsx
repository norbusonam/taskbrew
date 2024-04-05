import { MeDropdown } from "@/components/me-dropdown";
import { ThemeButton } from "@/components/theme-button";
import { buttonVariants } from "@/components/ui/button";
import { Coffee, Home, List } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  return (
    <div>
      <div className="flex flex-col p-2 gap-2">
        <Link
          className={buttonVariants({ variant: "ghost", size: "icon" })}
          href="/home"
        >
          <Coffee />
        </Link>
        <Link
          className={buttonVariants({ variant: "ghost", size: "icon" })}
          href="/home"
        >
          <Home />
        </Link>
        <Link
          className={buttonVariants({ variant: "ghost", size: "icon" })}
          href="/tasks"
        >
          <List />
        </Link>
        <ThemeButton />
        <MeDropdown />
      </div>
    </div>
  );
}
