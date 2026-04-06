import { useApi } from "../hooks/useApi";
import { api } from "../lib/api";
import { Layers } from "lucide-react";

const statusBadge = {
  active: "bg-teal-500/15 text-teal-400",
  emerging: "bg-yellow-500/15 text-yellow-400",
  fading: "bg-gray-500/15 text-gray-400",
};

export default function Themes() {
  const { data: themes, loading } = useApi(() => api.getThemes());

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Themes</h2>
        <p className="text-sm text-gray-400 mt-1">Global macro themes linking countries, equities, and opportunities</p>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading themes...</div>
      ) : (
        <div className="space-y-4">
          {(themes || []).map((theme) => (
            <div key={theme.id} className="bg-navy-700 rounded-xl p-5 border border-navy-500/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Layers size={18} className="text-teal-400" />
                  <h3 className="text-lg font-semibold text-white">{theme.name}</h3>
                </div>
                <span className={`px-2 py-1 text-xs rounded capitalize ${statusBadge[theme.status] || statusBadge.active}`}>
                  {theme.status}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-4">{theme.description}</p>

              <div className="flex gap-6 text-xs">
                <div>
                  <span className="text-gray-500 uppercase tracking-wide">Countries</span>
                  <div className="flex gap-2 mt-1">
                    {theme.countries?.length ? (
                      theme.countries.map((tc) => (
                        <span key={tc.country.id} className="px-2 py-1 bg-navy-900/50 rounded text-gray-300">
                          {tc.country.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-600">None linked yet</span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 uppercase tracking-wide">Equities</span>
                  <div className="flex gap-2 mt-1">
                    {theme.equities?.length ? (
                      theme.equities.map((te) => (
                        <span key={te.equity.id} className="px-2 py-1 bg-navy-900/50 rounded text-gray-300">
                          {te.equity.ticker}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-600">None linked yet</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
