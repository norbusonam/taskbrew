import { IconCoffee } from "@taskbrew/components/icons";
import { ThemeMenu } from "@taskbrew/components/theme-menu";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/auth-options";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session && session.user && session.user.id) {
    redirect("/list");
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <Link
        href="/"
        className="transition-opacity hover:opacity-80 active:opacity-60"
        aria-label="Taskbrew home page"
      >
        <IconCoffee className="h-12 w-12" />
      </Link>
      <h1 className="text-lg font-medium">Welcome to Taskbrew</h1>
      <Link
        className="flex w-64 items-center justify-center gap-2 rounded-md bg-neutral-200 px-4 py-2 font-light transition-colors hover:bg-neutral-300 active:bg-neutral-400 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-600"
        href="/auth"
      >
        Get Started
      </Link>
      <ThemeMenu />
    </div>
  );
}
