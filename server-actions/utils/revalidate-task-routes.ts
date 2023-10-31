import { revalidatePath } from "next/cache";

export function revalidateTaskRoutes() {
  revalidatePath("/list");
  revalidatePath("/board");
  revalidatePath("/calendar");
  revalidatePath("/completed");
}
