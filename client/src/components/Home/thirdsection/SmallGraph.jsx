import React from "react";
import { AreaChart, Area, LineChart, Line } from "recharts";

export default function SmallGraph({ data, color }) {
  const chartData = data?.map((value, index) => ({ index, value }));
  return (
    <LineChart width={120} height={60} data={chartData}>
      <Line
        type="monotone"
        dataKey="value"
        stroke={color}
        strokeWidth={2} // Line thickness
        dot={false} // Disable dots on the line
      />
    </LineChart>
  );
}
