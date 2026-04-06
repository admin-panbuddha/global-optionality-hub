import { useApi } from "../hooks/useApi";
import { api } from "../lib/api";
import ScoreRadar from "../components/ScoreRadar";
import { useState } from "react";

export default function Equities() {
  const { data: equities, loading } = useApi(() => api.getEquities());
  const [filter, setFilter] = useState("");

  const filtered = (equities || []).filter(
    (eq) =>
      eq.name.toLowerCase().includes(filter.toLowerCase()) ||
      eq.ticker.toLowerCase().includes(filter.toLowerCase()) ||
      eq.sector.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Equities</h2>
          <p className="text-sm text-gray-400 mt-1">Global stocks tracked by the research engine</p>
        </div>
        <input
          type="text"
          placeholder="Filter by name, ticker, sector..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 bg-navy-700 border border-navy-500/30 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 w-72"
        />
      </div>

      {loading ? (
        <div className="text-gray-500">Loading equities...</div>
      ) : (
        <div className="bg-navy-700 rounded-xl border border-navy-500/30 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy-900/50 text-gray-400 text-xs uppercase tracking-wide">
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Ticker</th>
                <th className="text-left p-3">Sector</th>
                <th className="text-left p-3">Country</th>
                <th className="text-right p-3">Mkt Cap</th>
                <th className="text-right p-3">Div Yield</th>
                <th className="text-right p-3">Rev Growth</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((eq, i) => (
                <tr
                  key={eq.id}
                  className={`border-t border-navy-500/20 hover:bg-navy-500/10 transition-colors ${
                    i % 2 === 0 ? "bg-navy-700" : "bg-navy-700/50"
                  }`}
                >
                  <td className="p-3 text-white font-medium">{eq.name}</td>
                  <td className="p-3 text-gray-400">{eq.ticker}:{eq.exchange}</td>
                  <td className="p-3 text-gray-400">{eq.sector}</td>
                  <td className="p-3 text-gray-400">{eq.country?.name || "—"}</td>
                  <td className="p-3 text-right text-white">
                    {eq.marketCapUsd ? `$${(eq.marketCapUsd / 1000).toFixed(0)}B` : "—"}
                  </td>
                  <td className="p-3 text-right text-teal-400">
                    {eq.dividendYield ? `${eq.dividendYield}%` : "—"}
                  </td>
                  <td className="p-3 text-right text-green-400">
                    {eq.revenueGrowthPct ? `+${eq.revenueGrowthPct}%` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
