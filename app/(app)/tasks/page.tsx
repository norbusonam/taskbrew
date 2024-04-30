import { getTasks } from "@/actions/crud/task";
import { NewTaskButton } from "@/components/new-task-button";

export default async function Page() {
  const tasks = await getTasks();

  return (
    <div>
      <h1 className="text-2xl">Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h2>{task.name}</h2>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
      <NewTaskButton />
    </div>
  );
}
