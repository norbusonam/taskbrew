import { IconCoffee } from "@taskbrew/components/icons";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session && session.user && session.user.id) {
    redirect("/home");
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <Link
        href="/"
        className="transition-opacity hover:opacity-50"
        aria-label="Taskbrew home page"
      >
        <IconCoffee className="h-12 w-12" />
      </Link>
      <h1 className="text-lg font-medium">Welcome to Taskbrew</h1>
      <Link
        className="flex w-64 items-center justify-center gap-2 rounded-md bg-neutral-300 px-4 py-2 font-light transition-colors hover:bg-neutral-400 active:bg-neutral-500"
        href="/auth"
      >
        Get Started
      </Link>
    </div>
  );
}
