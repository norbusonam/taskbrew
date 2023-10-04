"use client";

import { signOut } from "next-auth/react";
import { IconLogout } from "./icons";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/auth" })}
      className="flex w-full flex-row items-center justify-center gap-2 rounded-md p-2 font-light transition-colors hover:bg-red-300 active:bg-red-400 md:justify-start"
    >
      <IconLogout className="h-6 w-6" />
      <p className="hidden md:block">Sign out</p>
    </button>
  );
}
