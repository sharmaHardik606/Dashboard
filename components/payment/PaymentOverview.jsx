import { ArrowUp, ArrowDown, Info } from "lucide-react";

export default function PaymentOverview({
  title,
  value,
  change,
  isPositive = true,
}) {
  return (
    <div className="rounded-xl bg-white text-card-foreground p-6">
      <h3 className="text-lg font-medium flex gap-1 text-neutral-600">
        {title}
      </h3>

      <div className="flex items-center justify-between space-y-0 pb-2">
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className="w-20"></div>
      </div>
      <div className="flex items-center gap-1">
        <div
          className={`flex items-center text-xs font-semibold ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          {change}&nbsp;
          {isPositive ? <p> Up</p> : <p> Down</p>}
        </div>
        <span className="text-gray-500 text-xs font-semibold">
          from last hour
        </span>
      </div>
    </div>
  );
}
