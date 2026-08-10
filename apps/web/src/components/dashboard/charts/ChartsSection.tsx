import RevenueChart from "./RevenueChart";
import MembersChart from "./MembersChart";

export default function ChartsSection() {
  return (
    <section className="grid gap-8 xl:grid-cols-2">
      <RevenueChart />
      <MembersChart />
    </section>
  );
}