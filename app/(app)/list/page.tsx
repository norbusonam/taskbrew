import { authOptions } from "@taskbrew/app/api/auth/auth-options";
import { TaskList } from "@taskbrew/components/task-list";
import { getTasksByFilter } from "@taskbrew/server-actions/get-tasks";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Taskbrew | List",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    redirect("/auth");
  }

  const tasks = await getTasksByFilter(searchParams?.filter);

  return (
    <TaskList
      tasks={tasks}
      canCreateNewTask={
        searchParams?.filter === "noDueDate" ||
        searchParams?.filter === "upcoming" ||
        searchParams?.filter === undefined
      }
      noTasksMessage={
        searchParams?.filter === "completed"
          ? "No completed tasks 😢"
          : searchParams?.filter === "overdue"
          ? "No overdue tasks 😎"
          : searchParams?.filter === "upcoming"
          ? "No upcoming tasks 🏝️"
          : searchParams?.filter === "noDueDate"
          ? "No tasks 😢"
          : "No tasks due today 👍"
      }
      defaultValuesForNewTask={
        searchParams?.filter === "upcoming"
          ? {
              // next day
              dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
            }
          : searchParams?.filter === undefined
          ? { dueDate: new Date() }
          : undefined
      }
      className="overflow-y-scroll px-4 pb-4"
    />
  );
}
