export default function StatCard({ icon: Icon, label, value, color = "teal" }) {
  const colorMap = {
    teal: "text-teal-400 bg-teal-500/10",
    gold: "text-yellow-400 bg-yellow-500/10",
    red: "text-red-400 bg-red-500/10",
  };

  return (
    <div className="bg-navy-700 rounded-xl p-4 border border-navy-500/30">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorMap[color]}`}>
          <Icon size={18} />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-xs text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  );
}
