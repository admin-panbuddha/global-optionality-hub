const router = require("express").Router();
const prisma = require("../db/prisma");

// GET all countries
router.get("/", async (req, res) => {
  const { region } = req.query;
  const where = region ? { region } : {};
  const countries = await prisma.country.findMany({ where, orderBy: { name: "asc" } });
  res.json(countries);
});

// GET single country with equities
router.get("/:id", async (req, res) => {
  const country = await prisma.country.findUnique({
    where: { id: req.params.id },
    include: { equities: true, themes: { include: { theme: true } } },
  });
  if (!country) return res.status(404).json({ error: "Country not found" });
  res.json(country);
});

// POST create country
router.post("/", async (req, res) => {
  try {
    const country = await prisma.country.create({ data: req.body });
    res.status(201).json(country);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update country
router.put("/:id", async (req, res) => {
  try {
    const country = await prisma.country.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(country);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
