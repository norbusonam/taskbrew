"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";

export function TaskbrewSessionProvider({
  children,
  session,
}: SessionProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
