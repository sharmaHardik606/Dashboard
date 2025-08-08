import { ArrowUp, ArrowDown, Info } from "lucide-react";
import SlopeChart from "@/components/dashboard/charts/SlopeChart";

export default function ChartCard({
  title,
  value,
  change,
  isPositive = true,
  chartData = [],  // new prop for weekly data
}) {
  // transform chartData into {value: number} objects as expected by SlopeChart
  const dataPoints = chartData.map((val) => ({ value: val }));

  return (
    <div className="rounded-xl bg-neutral-100 text-card-foreground p-3 px-4">
      <h3 className="text-sm font-medium flex gap-1 items-center">
        {title}
        <Info size={16} strokeWidth={2} />
      </h3>

      <div className="flex items-center justify-between space-y-0 pb-2">
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className="w-20">
          <SlopeChart data={dataPoints} isPositive={isPositive} />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <div
          className={`flex items-center text-xs font-semibold ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          {change}
        </div>
        <span className="text-gray-500 text-xs font-semibold">this week</span>
      </div>
    </div>
  );
}
