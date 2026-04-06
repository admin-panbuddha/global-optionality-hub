import { Layers } from "lucide-react";

const statusColors = {
  active: "bg-teal-500/15 text-teal-400 border-teal-500/30",
  emerging: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  fading: "bg-gray-500/15 text-gray-400 border-gray-500/30",
};

export default function ThemeLane({ theme }) {
  const colorClass = statusColors[theme.status] || statusColors.active;
  const countryCount = theme.countries?.length || 0;
  const equityCount = theme.equities?.length || 0;

  return (
    <div className={`flex-shrink-0 w-72 rounded-lg border p-4 ${colorClass}`}>
      <div className="flex items-center gap-2 mb-2">
        <Layers size={14} />
        <span className="text-sm font-semibold">{theme.name}</span>
      </div>
      <p className="text-xs opacity-80 line-clamp-2 mb-3">{theme.description}</p>
      <div className="flex items-center gap-3 text-[10px] uppercase tracking-wide opacity-60">
        <span>{countryCount} countries</span>
        <span>{equityCount} equities</span>
        <span className="ml-auto capitalize">{theme.status}</span>
      </div>
    </div>
  );
}
