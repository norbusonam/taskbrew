import { authOptions } from "@taskbrew/app/api/auth/[...nextauth]/route";
import { CalendarDayView } from "@taskbrew/components/calendar-day-view";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    redirect("/auth");
  }

  return (
    <CalendarDayView
      startDay={new Date()}
      endDay={new Date(new Date().setDate(new Date().getDate() + 7))}
      tasks={[]}
      className="overflow-y-scroll"
    />
  );
}
