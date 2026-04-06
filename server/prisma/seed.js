const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Global Optionality Hub...");

  // ── Currencies ──
  const jpy = await prisma.currency.upsert({
    where: { code: "JPY" },
    update: {},
    create: { code: "JPY", name: "Japanese Yen", centralBankRate: 0.50, carryYield: -2.1, volatility30d: 8.2, policyDirection: "hawkish", outlook: "BOJ tightening cycle underway. Yen strengthening from historic lows. Carry trade unwind risk elevated.", riskScenario: "Rapid yen appreciation could squeeze leveraged carry positions globally." },
  });
  const sgd = await prisma.currency.upsert({
    where: { code: "SGD" },
    update: {},
    create: { code: "SGD", name: "Singapore Dollar", centralBankRate: 3.5, carryYield: 1.2, volatility30d: 3.1, policyDirection: "neutral", outlook: "MAS maintains tight band. SGD stable with mild appreciation bias.", riskScenario: "Regional contagion from China slowdown." },
  });
  const thb = await prisma.currency.upsert({
    where: { code: "THB" },
    update: {},
    create: { code: "THB", name: "Thai Baht", centralBankRate: 2.25, carryYield: 0.5, volatility30d: 5.8, policyDirection: "dovish", outlook: "Tourism recovery supports THB. Political uncertainty caps upside.", riskScenario: "Political instability triggers capital outflows." },
  });

  // ── Countries ──
  const japan = await prisma.country.upsert({
    where: { code: "JP" },
    update: {},
    create: {
      code: "JP", name: "Japan", region: "East Asia", gdpGrowth: 1.2, inflationRate: 2.8,
      politicalStability: 82, taxBurden: 31.4, costOfLivingIndex: 72, healthcareIndex: 91,
      safetyIndex: 88, passportStrength: 1, hasResidencyProgram: true,
      residencyDetails: '{"type":"Investor/Business Manager Visa","minInvestment":"¥5M (~$35K)","path":"5 years to permanent residency","notes":"One of the most accessible developed-country residency paths"}',
      hasCitizenshipProgram: false, citizenshipDetails: "Naturalization after 5 years continuous residency",
      bankingAccess: "moderate", primaryCurrency: "JPY",
    },
  });
  const singapore = await prisma.country.upsert({
    where: { code: "SG" },
    update: {},
    create: {
      code: "SG", name: "Singapore", region: "Southeast Asia", gdpGrowth: 3.1, inflationRate: 3.4,
      politicalStability: 91, taxBurden: 18.5, costOfLivingIndex: 88, healthcareIndex: 86,
      safetyIndex: 95, passportStrength: 2, hasResidencyProgram: true,
      residencyDetails: '{"type":"Global Investor Programme","minInvestment":"SGD 10M","path":"PR then citizenship after 2 years","notes":"High bar but excellent tax regime and passport"}',
      hasCitizenshipProgram: true, citizenshipDetails: "Via GIP or employment-based PR pathway",
      bankingAccess: "easy", primaryCurrency: "SGD",
    },
  });
  const thailand = await prisma.country.upsert({
    where: { code: "TH" },
    update: {},
    create: {
      code: "TH", name: "Thailand", region: "Southeast Asia", gdpGrowth: 3.5, inflationRate: 1.2,
      politicalStability: 52, taxBurden: 17.0, costOfLivingIndex: 38, healthcareIndex: 72,
      safetyIndex: 62, passportStrength: 65, hasResidencyProgram: true,
      residencyDetails: '{"type":"Thailand Elite Visa / LTR Visa","minInvestment":"$250K (LTR) or $16K (Elite 5yr)","path":"Long-term stay, no citizenship path","notes":"Excellent lifestyle visa. Low cost of living. No path to citizenship."}',
      hasCitizenshipProgram: false, citizenshipDetails: "Naturalization extremely rare for foreigners",
      bankingAccess: "moderate", primaryCurrency: "THB",
    },
  });
  const portugal = await prisma.country.upsert({
    where: { code: "PT" },
    update: {},
    create: {
      code: "PT", name: "Portugal", region: "Europe", gdpGrowth: 2.0, inflationRate: 2.5,
      politicalStability: 78, taxBurden: 34.0, costOfLivingIndex: 48, healthcareIndex: 74,
      safetyIndex: 84, passportStrength: 5, hasResidencyProgram: true,
      residencyDetails: '{"type":"D7 Visa / Golden Visa (fund-based)","minInvestment":"€500K (fund) or passive income (D7)","path":"5 years to citizenship","notes":"EU passport pathway. NHR tax regime for 10 years."}',
      hasCitizenshipProgram: true, citizenshipDetails: "5 years residency + basic Portuguese",
      bankingAccess: "easy", primaryCurrency: "EUR",
    },
  });

  // ── Equities (Japan Research Lane) ──
  const equities = [
    { ticker: "8058", exchange: "TSE", name: "Mitsubishi Corporation", sector: "Trading House", marketCapUsd: 62000, dividendYield: 3.1, revenueGrowthPct: 12.5, currencyDenom: "JPY", revenueGeography: '{"Japan":35,"Asia":25,"Americas":20,"Europe":15,"Other":5}', thesisSummary: "Japan\u2019s largest sogo shosha. Deep commodity + infrastructure exposure globally. Buffett-endorsed. Benefits from yen weakness on foreign earnings, but rising yen could compress margins.", recentChange: "Announced $2B share buyback program. LNG portfolio expansion in Southeast Asia.", countryId: japan.id },
    { ticker: "8031", exchange: "TSE", name: "Mitsui & Co", sector: "Trading House", marketCapUsd: 55000, dividendYield: 2.8, revenueGrowthPct: 8.2, currencyDenom: "JPY", revenueGeography: '{"Japan":30,"Asia":25,"Americas":25,"Europe":15,"Other":5}', thesisSummary: "Strong LNG and iron ore exposure. Healthcare and next-gen energy investments growing. Well-positioned for energy transition theme.", recentChange: "New partnership with Australian green hydrogen project.", countryId: japan.id },
    { ticker: "8001", exchange: "TSE", name: "Itochu Corporation", sector: "Trading House", marketCapUsd: 70000, dividendYield: 2.5, revenueGrowthPct: 14.0, currencyDenom: "JPY", revenueGeography: '{"Japan":40,"Asia":30,"Americas":15,"Europe":10,"Other":5}', thesisSummary: "Consumer-facing sogo shosha with FamilyMart convenience stores. Highest ROE among peers. Less commodity-dependent, more consumer/retail exposure.", recentChange: "Record earnings forecast. Expanding Southeast Asia retail footprint.", countryId: japan.id },
    { ticker: "8002", exchange: "TSE", name: "Marubeni Corporation", sector: "Trading House", marketCapUsd: 28000, dividendYield: 3.8, revenueGrowthPct: 6.1, currencyDenom: "JPY", revenueGeography: '{"Japan":35,"Asia":30,"Americas":20,"Europe":10,"Other":5}', thesisSummary: "Agri-foods and power generation focus. Smaller but higher dividend yield. Grain trading expertise positions it well for food security theme.", recentChange: "Expanded grain sourcing operations in Brazil and Australia.", countryId: japan.id },
    { ticker: "8053", exchange: "TSE", name: "Sumitomo Corporation", sector: "Trading House", marketCapUsd: 30000, dividendYield: 3.5, revenueGrowthPct: 5.8, currencyDenom: "JPY", revenueGeography: '{"Japan":35,"Asia":25,"Americas":20,"Europe":15,"Other":5}', thesisSummary: "Nickel and copper mining exposure gives battery metals leverage. Real estate and media diversification. Solid but less differentiated than peers.", recentChange: "Nickel prices recovering. New EV battery materials JV announced.", countryId: japan.id },
    { ticker: "D05", exchange: "SGX", name: "DBS Group Holdings", sector: "Banking", marketCapUsd: 85000, dividendYield: 5.2, revenueGrowthPct: 9.0, currencyDenom: "SGD", revenueGeography: '{"Singapore":55,"Hong Kong":15,"China":10,"Southeast Asia":15,"Other":5}', thesisSummary: "Southeast Asia\u2019s largest bank. Best-in-class digital banking. High dividend yield funded by NIM expansion. Gateway to ASEAN growth.", recentChange: "Record FY2025 profits. Expanding wealth management in India.", countryId: singapore.id },
  ];

  for (const eq of equities) {
    await prisma.equity.upsert({
      where: { ticker_exchange: { ticker: eq.ticker, exchange: eq.exchange } },
      update: {},
      create: eq,
    });
  }

  // ── Themes ──
  const themes = [
    { name: "Japan Yen Carry Unwind", description: "BOJ rate hikes unwinding decades of yen carry trade. Yen strengthening creates both risk and opportunity for Japan-exposed assets.", status: "active" },
    { name: "Southeast Asia Digital Banking", description: "Digital-first banks and super-apps capturing unbanked populations across ASEAN.", status: "active" },
    { name: "Global Energy Transition", description: "Shift from fossil fuels to renewables. Trading houses with LNG bridging + green hydrogen exposure.", status: "active" },
    { name: "Food Security & Agri-Trade", description: "Climate disruption and geopolitics driving food supply chain restructuring.", status: "emerging" },
    { name: "Golden Visa Restructuring", description: "EU countries tightening or reshaping investor visa programs. Window of opportunity shifting.", status: "active" },
  ];

  for (const t of themes) {
    await prisma.theme.upsert({
      where: { name: t.name },
      update: {},
      create: t,
    });
  }

  // ── Default User Profile ──
  await prisma.userProfile.upsert({
    where: { email: "admin@panbuddha.ca" },
    update: {},
    create: {
      name: "PanBuddha",
      email: "admin@panbuddha.ca",
      preferredRegions: ["East Asia", "Southeast Asia", "Europe"],
      sectors: ["Trading House", "Banking", "Energy", "Technology"],
      investmentStyle: "BALANCED",
      currencyHome: "CAD",
      currencyTargets: ["JPY", "SGD", "EUR", "THB"],
      riskTolerance: "MODERATE",
      retirementHorizon: 15,
      residencyGoals: ["JP", "PT", "TH", "SG"],
      passportGoals: ["PT", "SG"],
      taxSensitivity: "HIGH",
      lifestylePriorities: ["healthcare", "safety", "cost_of_living", "climate", "food", "culture"],
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
