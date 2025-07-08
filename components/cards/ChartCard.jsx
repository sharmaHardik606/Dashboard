import { ArrowUp, ArrowDown, Info } from "lucide-react";
import SlopeChart from "@/components/charts/SlopeChart";

export default function ChartCard({
  title,
  value,
  change,
  isPositive = true,
}) {
  const changeValue = parseFloat(change.replace("%", "").replace("+", "").replace("-", ""));
  const endValue = isPositive
    ? 100 + changeValue
    : 100 - changeValue;

  const chartData = [
    { value: 100 },
    { value: endValue },
  ];

  return (
    <div className="rounded-xl bg-neutral-100 text-card-foreground p-6">
      
        <h3 className="text-sm font-medium flex gap-1 items-center">
          {title}
          <Info size={16} strokeWidth={2} />
        </h3>
        
        <div className="flex items-center justify-between space-y-0 pb-2">
      <div className="text-3xl font-bold mb-1">{value}</div>
        <div className="w-20">
          <SlopeChart data={chartData} isPositive={isPositive} />
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


