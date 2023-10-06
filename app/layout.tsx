import { authOptions } from "./api/auth/[...nextauth]/route";
import "./globals.css";
import { TaskbrewSessionProvider } from "@taskbrew/components/session-provider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";

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
      <body>
        <TaskbrewSessionProvider session={session}>
          {children}
        </TaskbrewSessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
