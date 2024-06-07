import { getTasks } from "@/actions/crud/task";
import { NewTaskButton } from "@/components/new-task-button";
import { TaskActions } from "@/components/task-actions";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Page() {
  const tasks = await getTasks();

  return (
    <div className="flex flex-col h-full w-full p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Tasks</h1>
        <NewTaskButton />
      </div>
      <Card>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} className="group">
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  <TaskActions task={task} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
