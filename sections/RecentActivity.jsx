import RecentActivityCard from "@/components/cards/RecentActivityCard";


const dummyActivities = [
  {
    user: "Jane Doe",
    action: "checked in",
    timeAgo: "2 mins ago",
    date: "Jul 8, 2025",
  },
  {
    user: "John Smith",
    action: "made a payment",
    timeAgo: "15 mins ago",
    date: "Jul 8, 2025",
  },
  {
    user: "John Smith",
    action: "made a payment",
    timeAgo: "15 mins ago",
    date: "Jul 8, 2025",
  },
  {
    user: "John Smith",
    action: "made a payment",
    timeAgo: "15 mins ago",
    date: "Jul 8, 2025",
  },
  {
    user: "John Smith",
    action: "made a payment",
    timeAgo: "15 mins ago",
    date: "Jul 8, 2025",
  },
  {
    user: "John Smith",
    action: "made a payment",
    timeAgo: "15 mins ago",
    date: "Jul 8, 2025",
  },
];

export default function RecentActivity() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Recent Activity</h2>
      {dummyActivities.map((item, idx) => (
        <RecentActivityCard key={idx} activity={item} />
      ))}
    </div>
  );
}
