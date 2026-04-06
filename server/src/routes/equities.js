const router = require("express").Router();
const prisma = require("../db/prisma");

// GET all equities (with optional filters)
router.get("/", async (req, res) => {
  const { sector, countryId, exchange } = req.query;
  const where = {};
  if (sector) where.sector = sector;
  if (countryId) where.countryId = countryId;
  if (exchange) where.exchange = exchange;
  const equities = await prisma.equity.findMany({
    where,
    include: { country: true },
    orderBy: { name: "asc" },
  });
  res.json(equities);
});

// GET single equity with themes
router.get("/:id", async (req, res) => {
  const equity = await prisma.equity.findUnique({
    where: { id: req.params.id },
    include: { country: true, themes: { include: { theme: true } } },
  });
  if (!equity) return res.status(404).json({ error: "Equity not found" });
  res.json(equity);
});

// POST create equity
router.post("/", async (req, res) => {
  try {
    const equity = await prisma.equity.create({ data: req.body });
    res.status(201).json(equity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
