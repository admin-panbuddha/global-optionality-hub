import { TrendingUp, AlertTriangle } from "lucide-react";

export default function WatchlistCard({ equity, onClick, isSelected }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg transition-all ${
        isSelected
          ? "bg-teal-500/15 border border-teal-500/40"
          : "bg-navy-900/40 border border-transparent hover:border-navy-500/40"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white truncate">{equity.name}</span>
            {equity.recentChange && (
              <span className="flex-shrink-0 px-1.5 py-0.5 text-[10px] font-medium bg-gold-400/20 text-yellow-300 rounded">
                NEW
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            {equity.ticker}:{equity.exchange} — {equity.sector}
          </p>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
            {equity.thesisSummary}
          </p>
        </div>
        <div className="flex-shrink-0 ml-3 text-right">
          {equity.dividendYield && (
            <p className="text-sm font-medium text-teal-400">{equity.dividendYield}%</p>
          )}
          <p className="text-[10px] text-gray-500">div yield</p>
        </div>
      </div>
    </button>
  );
}
