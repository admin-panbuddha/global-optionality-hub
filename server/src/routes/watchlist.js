const router = require("express").Router();
const prisma = require("../db/prisma");

// GET watchlist for a profile
router.get("/:profileId", async (req, res) => {
  const items = await prisma.watchlistItem.findMany({
    where: { profileId: req.params.profileId },
    include: { equity: true, country: true },
    orderBy: { scoreComposite: "desc" },
  });
  res.json(items);
});

// POST add to watchlist
router.post("/", async (req, res) => {
  try {
    const item = await prisma.watchlistItem.create({
      data: req.body,
      include: { equity: true, country: true },
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update watchlist item scores
router.put("/:id", async (req, res) => {
  try {
    const item = await prisma.watchlistItem.update({
      where: { id: req.params.id },
      data: req.body,
      include: { equity: true, country: true },
    });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE remove from watchlist
router.delete("/:id", async (req, res) => {
  try {
    await prisma.watchlistItem.delete({ where: { id: req.params.id } });
    res.json({ deleted: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
