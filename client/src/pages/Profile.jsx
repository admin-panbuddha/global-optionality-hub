import { useApi } from "../hooks/useApi";
import { api } from "../lib/api";

export default function Profile() {
  const { data: profiles, loading } = useApi(() => api.getProfiles());
  const profile = profiles?.[0]; // Default to first profile

  if (loading) return <div className="p-6 text-gray-500">Loading profile...</div>;
  if (!profile) return <div className="p-6 text-gray-400">No profile found. Create one to get started.</div>;

  const Field = ({ label, value }) => (
    <div className="bg-navy-900/50 rounded-lg p-3">
      <span className="text-gray-500 text-xs">{label}</span>
      <p className="text-white text-sm font-medium mt-0.5">
        {Array.isArray(value) ? value.join(", ") || "—" : value || "—"}
      </p>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Your Profile</h2>
        <p className="text-sm text-gray-400 mt-1">
          These variables drive all agent scoring and research ranking
        </p>
      </div>

      <div className="bg-navy-700 rounded-xl p-6 border border-navy-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">{profile.name}</h3>
            <p className="text-sm text-gray-400">{profile.email}</p>
          </div>
          <span className="text-xs text-gray-500">
            Updated: {new Date(profile.updatedAt).toLocaleDateString()}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Investment Style" value={profile.investmentStyle} />
          <Field label="Risk Tolerance" value={profile.riskTolerance} />
          <Field label="Home Currency" value={profile.currencyHome} />
          <Field label="Currency Targets" value={profile.currencyTargets} />
          <Field label="Preferred Regions" value={profile.preferredRegions} />
          <Field label="Preferred Sectors" value={profile.sectors} />
          <Field label="Retirement Horizon" value={profile.retirementHorizon ? `${profile.retirementHorizon} years` : null} />
          <Field label="Tax Sensitivity" value={profile.taxSensitivity} />
          <Field label="Residency Goals" value={profile.residencyGoals} />
          <Field label="Passport Goals" value={profile.passportGoals} />
        </div>

        <div>
          <span className="text-gray-500 text-xs">Lifestyle Priorities (ranked)</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {(profile.lifestylePriorities || []).map((p, i) => (
              <span key={p} className="px-2 py-1 bg-navy-900/50 rounded text-sm text-gray-300">
                <span className="text-teal-400 mr-1">#{i + 1}</span>
                {p.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
