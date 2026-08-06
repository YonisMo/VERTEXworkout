import Container from "@/components/ui/Container";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";

import ChartsSection from "@/components/dashboard/charts/ChartsSection";

export default function DashboardPage() {
  return (
    <Container className="py-10">

      <DashboardHeader />

      <DashboardStats />

      <ChartsSection />

      <div className="mt-10 grid gap-8 xl:grid-cols-2">

        <QuickActions />

        <RecentActivity />

      </div>

    </Container>
  );
}