const router = require("express").Router();
const prisma = require("../db/prisma");

// GET all profiles
router.get("/", async (req, res) => {
  const profiles = await prisma.userProfile.findMany({ orderBy: { updatedAt: "desc" } });
  res.json(profiles);
});

// GET single profile
router.get("/:id", async (req, res) => {
  const profile = await prisma.userProfile.findUnique({
    where: { id: req.params.id },
    include: { watchlist: { include: { equity: true, country: true }, orderBy: { scoreComposite: "desc" } } },
  });
  if (!profile) return res.status(404).json({ error: "Profile not found" });
  res.json(profile);
});

// POST create profile
router.post("/", async (req, res) => {
  try {
    const profile = await prisma.userProfile.create({ data: req.body });
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update profile
router.put("/:id", async (req, res) => {
  try {
    const profile = await prisma.userProfile.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
