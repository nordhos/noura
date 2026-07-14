"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { formatIDR } from "@/lib/format-currency";

interface CashFlowItem {
  label: string;
  income: number;
  expense: number;
}

interface CashFlowChartProps {
  data: CashFlowItem[];
}

export function CashFlowChart({
  data,
}: CashFlowChartProps) {
  return (
    <div className="mt-6 h-64">

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="label"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            hide
          />

          <Tooltip
            formatter={(value: number) =>
              formatIDR(Number(value))
            }
          />

          <Line
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{
              r: 4,
            }}
            activeDot={{
              r: 6,
            }}
          />

          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{
              r: 4,
            }}
            activeDot={{
              r: 6,
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}