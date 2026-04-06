import { Plane, FileText, Building2, Heart, Shield, DollarSign, Clock, CheckCircle, AlertTriangle, Globe } from "lucide-react";

const Section = ({ icon: Icon, title, children, color = "teal" }) => (
  <div className="bg-navy-700 rounded-xl p-4 sm:p-6 border border-navy-500/30">
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 rounded-lg ${color === "teal" ? "bg-teal-500/10 text-teal-400" : color === "gold" ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-400"}`}>
        <Icon size={18} />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    {children}
  </div>
);

const Step = ({ number, title, description, status = "pending" }) => (
  <div className="flex gap-3">
    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
      status === "done" ? "bg-teal-500/20 text-teal-400" :
      status === "active" ? "bg-yellow-500/20 text-yellow-400" :
      "bg-navy-900/50 text-gray-500"
    }`}>
      {status === "done" ? <CheckCircle size={16} /> : number}
    </div>
    <div className="flex-1 pb-4">
      <h4 className="text-sm font-medium text-white">{title}</h4>
      <p className="text-xs text-gray-400 mt-1">{description}</p>
    </div>
  </div>
);

export default function ItalyPassport() {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Italy — Citizenship by Descent</h2>
        <p className="text-sm text-gray-400 mt-1">
          Jure sanguinis pathway, benefits, asset management, and progress tracker
        </p>
      </div>

      {/* Status Banner */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-center gap-3">
        <Clock size={18} className="text-yellow-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-yellow-300">Application In Progress</p>
          <p className="text-xs text-gray-400">Italian citizenship by descent (jure sanguinis) — processing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

        {/* How Italy Works */}
        <Section icon={Globe} title="How Italian Citizenship Works">
          <div className="space-y-3 text-sm text-gray-300">
            <p>
              Italy grants citizenship by descent (<span className="text-teal-400">jure sanguinis</span>) to anyone who can prove an unbroken
              line of Italian ancestry. There is no generational limit — if your ancestor emigrated from Italy and never
              renounced citizenship before their child was born, the line is preserved.
            </p>
            <div className="bg-navy-900/50 rounded-lg p-3">
              <h4 className="text-xs font-semibold text-teal-400 uppercase tracking-wide mb-2">Key Requirements</h4>
              <ul className="space-y-1.5 text-xs text-gray-400">
                <li className="flex gap-2"><span className="text-teal-400">•</span>Prove unbroken lineage from Italian-born ancestor</li>
                <li className="flex gap-2"><span className="text-teal-400">•</span>Ancestor must not have naturalized before next generation's birth</li>
                <li className="flex gap-2"><span className="text-teal-400">•</span>Gather vital records (birth, marriage, death, naturalization) for each person in the line</li>
                <li className="flex gap-2"><span className="text-teal-400">•</span>All documents must be apostilled and translated into Italian</li>
                <li className="flex gap-2"><span className="text-teal-400">•</span>Apply at Italian consulate (in your country) or directly at a comune in Italy</li>
              </ul>
            </div>
            <div className="bg-navy-900/50 rounded-lg p-3">
              <h4 className="text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-2">Two Application Paths</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-400">
                <div>
                  <p className="text-white font-medium mb-1">Consulate (home country)</p>
                  <p>Wait times vary: 1–5+ years depending on consulate. Free or low cost. No relocation needed.</p>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Comune (in Italy)</p>
                  <p>Faster: 2–6 months. Requires establishing residency in an Italian municipality. Must be physically present.</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Benefits */}
        <Section icon={Heart} title="Why It Matters — Benefits">
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: Plane, label: "EU Freedom of Movement", desc: "Live, work, and retire in any of 27 EU member states without a visa" },
                { icon: Shield, label: "Passport Power", desc: "Italian passport ranked top 5 globally — visa-free access to 190+ countries" },
                { icon: Building2, label: "EU Banking Access", desc: "Open bank and brokerage accounts across the EU as a citizen — no restrictions" },
                { icon: DollarSign, label: "Tax Optimization", desc: "Access Italy's flat tax regime for new residents (€100K/yr) or Portugal's NHR via EU mobility" },
                { icon: Globe, label: "Property Rights", desc: "Buy property anywhere in the EU as a citizen. Access EU mortgage rates." },
                { icon: FileText, label: "Pass to Children", desc: "Italian citizenship passes to your children automatically — generational asset" },
              ].map(({ icon: Ic, label, desc }) => (
                <div key={label} className="bg-navy-900/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Ic size={14} className="text-teal-400" />
                    <span className="text-xs font-medium text-white">{label}</span>
                  </div>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Process Steps */}
        <Section icon={FileText} title="The Process — Step by Step">
          <div className="space-y-1">
            <Step number={1} title="Research Your Lineage" description="Identify the Italian-born ancestor and trace the line of descent. Confirm no one in the line naturalized before the next generation was born." status="done" />
            <Step number={2} title="Gather Vital Records" description="Obtain birth, marriage, death, and naturalization certificates for every person in the chain — from ancestor to you." status="done" />
            <Step number={3} title="Apostille & Translate" description="All non-Italian documents must be apostilled by the issuing state/country and translated into Italian by a certified translator." status="active" />
            <Step number={4} title="Request Italian Records" description="Order the ancestor's birth certificate from the Italian comune where they were born. Also get a certificate of non-renunciation from the Italian consulate." status="pending" />
            <Step number={5} title="Submit Application" description="File the application at your local Italian consulate or establish residency at an Italian comune and apply directly." status="pending" />
            <Step number={6} title="Await Processing" description="Consulate route: 1–5 years. Comune route: 2–6 months. May require an interview." status="pending" />
            <Step number={7} title="Receive Recognition" description="Once approved, you are recognized as an Italian citizen from birth. Register in AIRE (registry of Italians abroad). Apply for passport." status="pending" />
          </div>
        </Section>

        {/* Asset & Economy Management */}
        <Section icon={DollarSign} title="Managing Assets & Economy in Italy" color="gold">
          <div className="space-y-3 text-sm text-gray-300">
            <div className="bg-navy-900/50 rounded-lg p-3">
              <h4 className="text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-2">Tax Regime Options</h4>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-0.5">•</span>
                  <div><span className="text-white font-medium">Flat Tax for New Residents:</span> €100,000/year on all foreign income (no itemization). Additional €25K per family member. Available for 15 years.</div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-0.5">•</span>
                  <div><span className="text-white font-medium">7% Flat Tax (South Italy):</span> Pensioners relocating to southern regions pay only 7% on foreign pension income for 10 years.</div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-0.5">•</span>
                  <div><span className="text-white font-medium">Standard Regime:</span> Progressive rates 23%–43%. Italian-sourced income always taxed at standard rates.</div>
                </div>
              </div>
            </div>

            <div className="bg-navy-900/50 rounded-lg p-3">
              <h4 className="text-xs font-semibold text-teal-400 uppercase tracking-wide mb-2">Banking & Investment</h4>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-start gap-2"><span className="text-teal-400 mt-0.5">•</span><div>Open Italian bank accounts at Intesa Sanpaolo, UniCredit, Fineco, etc.</div></div>
                <div className="flex items-start gap-2"><span className="text-teal-400 mt-0.5">•</span><div>Access EU-wide brokerage platforms (Degiro, Interactive Brokers EU, Fineco)</div></div>
                <div className="flex items-start gap-2"><span className="text-teal-400 mt-0.5">•</span><div>Invest in Italian government bonds (BTP) — favorable tax treatment at 12.5%</div></div>
                <div className="flex items-start gap-2"><span className="text-teal-400 mt-0.5">•</span><div>Capital gains on investments taxed at 26% (standard) or lower for government bonds</div></div>
              </div>
            </div>

            <div className="bg-navy-900/50 rounded-lg p-3">
              <h4 className="text-xs font-semibold text-teal-400 uppercase tracking-wide mb-2">Property & Real Estate</h4>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-start gap-2"><span className="text-teal-400 mt-0.5">•</span><div>€1 houses program in depopulating villages (renovation required)</div></div>
                <div className="flex items-start gap-2"><span className="text-teal-400 mt-0.5">•</span><div>First-home purchase tax benefits (2% vs 9% registro tax)</div></div>
                <div className="flex items-start gap-2"><span className="text-teal-400 mt-0.5">•</span><div>EU mortgage rates accessible as a citizen (2–4%)</div></div>
                <div className="flex items-start gap-2"><span className="text-teal-400 mt-0.5">•</span><div>Rental income taxed at 21% flat (cedolare secca) or progressive rates</div></div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Risk Alerts */}
      <Section icon={AlertTriangle} title="Risks & Considerations" color="red">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { title: "1948 Rule", desc: "If the line passes through a woman who had a child before Jan 1, 1948, a court case in Italy may be required. This is common and winnable but adds time and cost (~€3K–5K)." },
            { title: "Processing Delays", desc: "Consulate wait times can exceed 3–5 years. Some consulates have a booking backlog just to submit. Consider the comune route if timing matters." },
            { title: "AIRE Registration", desc: "Once recognized, you must register in AIRE. This may create Italian tax filing obligations if you have Italian-sourced income." },
            { title: "Worldwide Tax Risk", desc: "If you establish tax residency in Italy (183+ days), all worldwide income becomes taxable under Italian rules unless you elect the flat tax regime." },
            { title: "Dual Citizenship", desc: "Canada and Italy both allow dual citizenship. No renunciation required from either side. However, consult a cross-border tax advisor." },
            { title: "Document Expiry", desc: "Some vital records have expiration dates for Italian applications (usually 6 months). Time your document gathering carefully." },
          ].map((r) => (
            <div key={r.title} className="bg-navy-900/50 rounded-lg p-3">
              <h4 className="text-xs font-medium text-red-400 mb-1">{r.title}</h4>
              <p className="text-xs text-gray-400">{r.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
