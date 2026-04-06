import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Until a real map component is added, render a scored bar chart of countries
export default function CountryHeatmap({ countries }) {
  const data = countries.map((c) => ({
    name: c.name,
    code: c.code,
    score: Math.round(
      ((c.politicalStability || 50) * 0.25 +
        (c.healthcareIndex || 50) * 0.2 +
        (c.safetyIndex || 50) * 0.2 +
        (100 - (c.costOfLivingIndex || 50)) * 0.15 +
        (c.gdpGrowth || 0) * 10 * 0.2)
    ),
  }));

  const getColor = (score) => {
    if (score >= 75) return "#2A9D8F";
    if (score >= 55) return "#E9C46A";
    return "#e76f51";
  };

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical" margin={{ left: 60, right: 20 }}>
        <XAxis type="number" domain={[0, 100]} tick={{ fill: "#9ca3af", fontSize: 11 }} />
        <YAxis type="category" dataKey="name" tick={{ fill: "#d1d5db", fontSize: 12 }} width={80} />
        <Tooltip
          contentStyle={{ backgroundColor: "#1B2A4A", border: "1px solid #2c3e6b", borderRadius: 8, color: "#fff", fontSize: 12 }}
          formatter={(val) => [`${val}/100`, "Composite Score"]}
        />
        <Bar dataKey="score" radius={[0, 4, 4, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={getColor(entry.score)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
