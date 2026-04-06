import { useState } from "react";
import { Activity, RefreshCw, AlertTriangle, TrendingUp, Globe, Shield } from "lucide-react";
import { useApi } from "../hooks/useApi";
import { api } from "../lib/api";
import ScoreRadar from "../components/ScoreRadar";
import WatchlistCard from "../components/WatchlistCard";
import ThemeLane from "../components/ThemeLane";
import CountryHeatmap from "../components/CountryHeatmap";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const { data: countries, loading: cLoading } = useApi(() => api.getCountries());
  const { data: equities, loading: eLoading } = useApi(() => api.getEquities());
  const { data: themes, loading: tLoading } = useApi(() => api.getThemes());
  const [selectedEquity, setSelectedEquity] = useState(null);

  const loading = cLoading || eLoading || tLoading;

  return (
    <div className="p-6 space-y-6">
      {/* Zone A — Top Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="text-sm text-gray-400 mt-1">
            Global investment + life optionality at a glance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">
            Last scan: {new Date().toLocaleDateString()}
          </span>
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors">
            <RefreshCw size={14} />
            Run Scan
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Globe} label="Countries Tracked" value={countries?.length || 0} color="teal" />
        <StatCard icon={TrendingUp} label="Equities" value={equities?.length || 0} color="gold" />
        <StatCard icon={Activity} label="Active Themes" value={themes?.filter(t => t.status === "active").length || 0} color="teal" />
        <StatCard icon={Shield} label="Risk Alerts" value={0} color="red" />
      </div>

      {/* Zone B + C — Heatmap + Watchlist */}
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3 bg-navy-700 rounded-xl p-5 border border-navy-500/30">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Country Heatmap</h3>
          {loading ? (
            <div className="h-64 flex items-center justify-center text-gray-500">Loading...</div>
          ) : (
            <CountryHeatmap countries={countries || []} />
          )}
        </div>

        <div className="col-span-2 bg-navy-700 rounded-xl p-5 border border-navy-500/30 max-h-[500px] overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Equity Watchlist</h3>
          {loading ? (
            <div className="h-64 flex items-center justify-center text-gray-500">Loading...</div>
          ) : (
            <div className="space-y-3">
              {(equities || []).map((eq) => (
                <WatchlistCard
                  key={eq.id}
                  equity={eq}
                  onClick={() => setSelectedEquity(selectedEquity?.id === eq.id ? null : eq)}
                  isSelected={selectedEquity?.id === eq.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Zone D — Opportunity Detail (expanded) */}
      {selectedEquity && (
        <div className="bg-navy-700 rounded-xl p-6 border border-teal-500/30">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">
                {selectedEquity.name}
                <span className="ml-2 text-sm font-normal text-gray-400">
                  {selectedEquity.ticker}:{selectedEquity.exchange}
                </span>
              </h3>
              <p className="text-sm text-gray-400 mt-1">{selectedEquity.sector} — {selectedEquity.country?.name}</p>
            </div>
            <button
              onClick={() => setSelectedEquity(null)}
              className="text-gray-400 hover:text-white text-sm"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-teal-400 uppercase tracking-wide mb-1">Thesis</h4>
                <p className="text-sm text-gray-300">{selectedEquity.thesisSummary || "No thesis available yet."}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gold-400 uppercase tracking-wide mb-1">Recent Change</h4>
                <p className="text-sm text-gray-300">{selectedEquity.recentChange || "No recent updates."}</p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="bg-navy-900/50 rounded-lg p-3">
                  <span className="text-gray-500 text-xs">Dividend Yield</span>
                  <p className="text-white font-semibold">{selectedEquity.dividendYield ? `${selectedEquity.dividendYield}%` : "—"}</p>
                </div>
                <div className="bg-navy-900/50 rounded-lg p-3">
                  <span className="text-gray-500 text-xs">Revenue Growth</span>
                  <p className="text-white font-semibold">{selectedEquity.revenueGrowthPct ? `${selectedEquity.revenueGrowthPct}%` : "—"}</p>
                </div>
                <div className="bg-navy-900/50 rounded-lg p-3">
                  <span className="text-gray-500 text-xs">Market Cap</span>
                  <p className="text-white font-semibold">{selectedEquity.marketCapUsd ? `$${(selectedEquity.marketCapUsd / 1000).toFixed(0)}B` : "—"}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Score Breakdown</h4>
              <ScoreRadar equity={selectedEquity} />
            </div>
          </div>
        </div>
      )}

      {/* Zone E — Theme Lanes */}
      <div className="bg-navy-700 rounded-xl p-5 border border-navy-500/30">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Active Themes</h3>
        {loading ? (
          <div className="h-20 flex items-center justify-center text-gray-500">Loading...</div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {(themes || []).map((theme) => (
              <ThemeLane key={theme.id} theme={theme} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
