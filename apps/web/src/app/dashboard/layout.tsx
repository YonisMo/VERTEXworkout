import type { ReactNode } from "react";

import Sidebar from "@/components/dashboard/Sidebar";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="flex min-h-screen bg-[#EEF2F5]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-10">
        {children}
      </main>
    </div>
  );
}