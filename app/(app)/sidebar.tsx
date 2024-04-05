import { MeDropdown } from "@/components/me-dropdown";
import { ThemeButton } from "@/components/theme-button";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Coffee, Home, List } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  return (
    <div>
      <div className="flex flex-col justify-between p-2 h-screen border-r bg-background">
        <div className="flex flex-col gap-2">
          <Link
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "mb-6",
            )}
            href="/home"
          >
            <Coffee />
          </Link>
          <Tooltip>
            <TooltipTrigger>
              <Link
                className={buttonVariants({ variant: "ghost", size: "icon" })}
                href="/home"
              >
                <Home />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Home</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Link
                className={buttonVariants({ variant: "ghost", size: "icon" })}
                href="/tasks"
              >
                <List />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Tasks</TooltipContent>
          </Tooltip>
        </div>
        <div className="flex flex-col gap-2">
          <ThemeButton />
          <MeDropdown />
        </div>
      </div>
    </div>
  );
}
