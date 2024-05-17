import { Sidebar } from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-muted/40 h-dvh w-screen">
      <Sidebar />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
