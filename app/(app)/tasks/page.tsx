import { getTasks } from "@/actions/crud/task";
import { NewTaskButton } from "@/components/new-task-button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
