import { Sidebar } from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      {children}
    </div>
  );
}
