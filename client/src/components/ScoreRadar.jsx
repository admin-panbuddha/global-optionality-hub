import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

export default function ScoreRadar({ equity }) {
  // Use placeholder scores until real agent scoring is wired up
  const data = [
    { dimension: "Financial", score: equity.revenueGrowthPct ? Math.min(equity.revenueGrowthPct * 5, 100) : 60 },
    { dimension: "Currency", score: 55 },
    { dimension: "Optionality", score: 70 },
    { dimension: "Macro", score: 65 },
    { dimension: "Risk", score: equity.dividendYield ? Math.min(equity.dividendYield * 20, 100) : 50 },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="#2c3e6b" />
        <PolarAngleAxis
          dataKey="dimension"
          tick={{ fill: "#9ca3af", fontSize: 11 }}
        />
        <Radar
          dataKey="score"
          stroke="#2A9D8F"
          fill="#2A9D8F"
          fillOpacity={0.25}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
