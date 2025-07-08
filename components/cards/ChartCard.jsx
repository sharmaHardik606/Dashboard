import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Info } from "lucide-react";

export default function ChartCard({
  title,
  value,
  change,
  isPositive = true,
}) {
  return (
    <div className="rounded-xl bg-neutral-100 text-card-foreground p-6">
      <div className="flex items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium flex gap-1 items-center">{title} <Info size={16} strokeWidth={2} /> </h3>
        <div className={`flex items-center text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1" />
          )}
          {change} 
        </div>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className={`flex items-center text-xs font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {isPositive ? (
            <ArrowUp size={16} />
          ) : (
            <ArrowDown size={16}/>
          )}
          {change}
        </div>
    </div>
  );
}

