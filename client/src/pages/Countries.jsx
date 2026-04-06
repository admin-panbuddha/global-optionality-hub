import { useState } from "react";
import { Globe, Plane, Building2, Heart } from "lucide-react";
import { useApi } from "../hooks/useApi";
import { api } from "../lib/api";

export default function Countries() {
  const { data: countries, loading } = useApi(() => api.getCountries());
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Countries</h2>
        <p className="text-sm text-gray-400 mt-1">Investment climate, residency pathways, and lifestyle metrics</p>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading countries...</div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {(countries || []).map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(selected?.id === c.id ? null : c)}
              className={`text-left rounded-xl p-5 border transition-all ${
                selected?.id === c.id
                  ? "bg-teal-500/10 border-teal-500/40"
                  : "bg-navy-700 border-navy-500/30 hover:border-navy-500/60"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{c.name}</h3>
                  <span className="text-xs text-gray-500">{c.region} — {c.code}</span>
                </div>
                <span className="text-xs px-2 py-1 bg-navy-900/50 rounded text-gray-400">{c.primaryCurrency}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="text-gray-500 text-xs">GDP Growth</span>
                  <p className="text-white font-medium">{c.gdpGrowth}%</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Stability</span>
                  <p className="text-white font-medium">{c.politicalStability}/100</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Passport Rank</span>
                  <p className="text-white font-medium">#{c.passportStrength || "—"}</p>
                </div>
              </div>

              {c.hasResidencyProgram && (
                <div className="mt-3 flex items-center gap-1.5 text-teal-400 text-xs">
                  <Plane size={12} />
                  Residency program available
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="bg-navy-700 rounded-xl p-6 border border-teal-500/30 space-y-4">
          <h3 className="text-lg font-bold text-white">{selected.name} — Detail View</h3>

          <div className="grid grid-cols-4 gap-4 text-sm">
            <div className="bg-navy-900/50 rounded-lg p-3">
              <span className="text-gray-500 text-xs">Healthcare</span>
              <p className="text-white font-semibold">{selected.healthcareIndex}/100</p>
            </div>
            <div className="bg-navy-900/50 rounded-lg p-3">
              <span className="text-gray-500 text-xs">Safety</span>
              <p className="text-white font-semibold">{selected.safetyIndex}/100</p>
            </div>
            <div className="bg-navy-900/50 rounded-lg p-3">
              <span className="text-gray-500 text-xs">Cost of Living</span>
              <p className="text-white font-semibold">{selected.costOfLivingIndex}/100</p>
            </div>
            <div className="bg-navy-900/50 rounded-lg p-3">
              <span className="text-gray-500 text-xs">Tax Burden</span>
              <p className="text-white font-semibold">{selected.taxBurden}%</p>
            </div>
          </div>

          {selected.residencyDetails && (
            <div>
              <h4 className="text-xs font-semibold text-teal-400 uppercase tracking-wide mb-2">Residency Pathway</h4>
              <pre className="text-xs text-gray-300 bg-navy-900/50 rounded-lg p-3 overflow-x-auto">
                {JSON.stringify(JSON.parse(selected.residencyDetails), null, 2)}
              </pre>
            </div>
          )}

          <div className="text-xs text-gray-500">
            Banking access: <span className="text-gray-300 capitalize">{selected.bankingAccess}</span>
          </div>
        </div>
      )}
    </div>
  );
}
