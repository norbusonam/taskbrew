import { TaskbrewSessionProvider } from "@taskbrew/components/session-provider";
import { Theming } from "@taskbrew/components/theming";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/auth-options";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taskbrew",
  description: "Taskbrew is a task management app.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="bg-neutral-50 dark:bg-neutral-950 dark:text-white">
        <TaskbrewSessionProvider session={session}>
          {children}
        </TaskbrewSessionProvider>
        <Analytics />
        <Theming />
      </body>
    </html>
  );
}
