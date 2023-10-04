"use client";

import { signOut } from "next-auth/react";
import { IconLogout } from "./icons";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/auth" })}
      className="flex w-full flex-row items-center gap-2 rounded-md p-2 font-light transition-colors hover:bg-gray-300 active:bg-gray-400"
    >
      <IconLogout className="h-6 w-6" />
      <p>Sign out</p>
    </button>
  );
}
