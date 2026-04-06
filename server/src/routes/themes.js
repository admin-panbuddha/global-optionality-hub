const router = require("express").Router();
const prisma = require("../db/prisma");

// GET all themes
router.get("/", async (req, res) => {
  const themes = await prisma.theme.findMany({
    include: {
      countries: { include: { country: true } },
      equities: { include: { equity: true } },
    },
    orderBy: { name: "asc" },
  });
  res.json(themes);
});

// GET single theme
router.get("/:id", async (req, res) => {
  const theme = await prisma.theme.findUnique({
    where: { id: req.params.id },
    include: {
      countries: { include: { country: true } },
      equities: { include: { equity: true } },
    },
  });
  if (!theme) return res.status(404).json({ error: "Theme not found" });
  res.json(theme);
});

// POST create theme
router.post("/", async (req, res) => {
  try {
    const theme = await prisma.theme.create({ data: req.body });
    res.status(201).json(theme);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
