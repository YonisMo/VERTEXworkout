export default function RecentActivity() {
  const activities = [
    {
      title: "Ahmed Hassan joined the Academy",
      time: "10 min ago",
    },
    {
      title: "New Store Order #4582",
      time: "25 min ago",
    },
    {
      title: "Membership renewed",
      time: "1 hour ago",
    },
    {
      title: "Swimming course booked",
      time: "Today",
    },
  ];

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-2xl font-bold text-[#022859]">
        Recent Activity
      </h2>

      <div className="space-y-5">
        {activities.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-2xl border border-slate-200 p-5"
          >
            <div>
              <h3 className="font-semibold text-[#022859]">
                {item.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {item.time}
              </p>
            </div>

            <div className="h-3 w-3 rounded-full bg-[#F2EA79]" />
          </div>
        ))}
      </div>
    </section>
  );
}