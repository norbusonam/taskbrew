import { authOptions } from "@taskbrew/app/api/auth/auth-options";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Taskbrew | Calendar",
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    redirect("/auth");
  }

  return <p>Calendar is coming soon! 🚧</p>;
}
