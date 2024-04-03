import { NewTaskButton } from "@/components/new-task-button";

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl">Tasks</h1>
      <p>This is the tasks page.</p>
      <NewTaskButton />
    </div>
  );
}
