import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-sm text-primary font-semibold">{payload[0].value} locations</p>
      </div>
    );
  }
  return null;
};

export default function StateDistributionChart({ locations }) {
  const stateCounts = locations.reduce((acc, loc) => {
    if (loc.state) acc[loc.state] = (acc[loc.state] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(stateCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([state, count]) => ({
      state: state.length > 12 ? state.slice(0, 12) + "…" : state,
      count,
    }));

  if (data.length === 0) return null;

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Locations by State</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} barSize={28} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
            <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis type="category" dataKey="state" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" width={90} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}