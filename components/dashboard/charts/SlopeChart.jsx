"use client";

import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function SlopeChart({ data, isPositive }) {
  return (
    <div className="h-12 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={isPositive ? "#16a34a" : "#dc2626"}
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
