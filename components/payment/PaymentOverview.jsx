import { ArrowUp, ArrowDown, } from "lucide-react";

export default function PaymentOverview({
  title,
  value,
  subvalue,
  change,
  isPositive = true,
}) {
  return (
    <div className="rounded-xl bg-white text-card-foreground p-5">
      <h3 className="text-lg font-medium flex gap-1 text-neutral-600 leading-snug mb-2">
        {title}
      </h3>

      <div className="flex items-center justify-between space-y-0 mb-1">
        <div className="text-3xl tracking-wider font-bold">
          {value}
          <span className="text-2xl font-semibold "> {subvalue} </span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <div
          className={`flex items-center text-sm font-semibold ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          {change}&nbsp;
          {isPositive ? <p> Up</p> : <p> Down</p>}
        </div>
        <span className="text-gray-500 text-sm font-semibold">
          from last hour
        </span>
      </div>
    </div>
  );
}
