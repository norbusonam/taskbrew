import { IconLoading } from "@taskbrew/components/icons";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <IconLoading className="h-8 w-8 animate-spin" />
    </div>
  );
}
