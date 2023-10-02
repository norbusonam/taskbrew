import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { TaskbrewSessionProvider } from "@taskbrew/components/session-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

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
      {/* this dark mode only really works well w/  shades, fix later */}
      <body className="dark:bg-black dark:invert">
        <TaskbrewSessionProvider session={session}>
          {children}
        </TaskbrewSessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
