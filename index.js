import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data (temporary – OK for Week 10)
let cards = [
  { id: 1, name: "Sample Card", imageUrl: "https://via.placeholder.com/150" }
];

// Health check
app.get("/", (req, res) => {
  res.send("Card App API is running");
});

// Get all cards
app.get("/cards", (req, res) => {
  res.json(cards);
});

// Add a card
app.post("/cards", (req, res) => {
  const { name, imageUrl } = req.body;

  if (!name || !imageUrl) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const newCard = {
    id: Date.now(),
    name,
    imageUrl,
  };

  cards.push(newCard);
  res.status(201).json(newCard);
});

// Update a card
app.put("/cards/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, imageUrl } = req.body;

  const card = cards.find(c => c.id === id);
  if (!card) return res.status(404).json({ error: "Card not found" });

  card.name = name;
  card.imageUrl = imageUrl;

  res.json(card);
});

// Delete a card
app.delete("/cards/:id", (req, res) => {
  const id = Number(req.params.id);
  cards = cards.filter(c => c.id !== id);
  res.status(204).end();
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
