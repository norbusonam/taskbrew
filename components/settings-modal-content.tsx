import { ThemeMenu } from "./theme-menu";

export function SettingsModalContent() {
  return (
    <div className="mt-4 flex items-center justify-between gap-8">
      <div>
        <h3 className="text-sm font-medium">Appearance</h3>
        <p className="text-sm text-neutral-500">
          Customize how Taskbrew looks on your device.
        </p>
      </div>
      <ThemeMenu />
    </div>
  );
}
