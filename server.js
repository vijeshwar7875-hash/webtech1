const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 5210;
const MONGO_URL = "mongodb://127.0.0.1:27017/practicaldb";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Demo login for a college practical only. Use real authentication for production.
const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "password";

// Four fully generic fields: first, second, third, fourth.
// Only change the labels in app.js — no need to touch this file.
const RecordSchema = new mongoose.Schema({
  id:     { type: Number, unique: true },
  first:  { type: String, required: true },
  second: { type: String, default: "" },
  third:  { type: String, default: "" },
  fourth: { type: String, default: "" }
});
const Record = mongoose.model("Record", RecordSchema);

// ── Auth ────────────────────────────────────────────────────────────────────
app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};
  if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
    return res.json({ success: true, message: "Login successful" });
  }
  return res.status(401).json({ success: false, message: "Invalid username or password" });
});

// ── GET all records ─────────────────────────────────────────────────────────
app.get("/api/records", async (req, res) => {
  try {
    res.json(await Record.find().sort({ id: 1 }));
  } catch (error) {
    res.status(500).json({ message: "Could not retrieve records" });
  }
});

// ── POST add a record ───────────────────────────────────────────────────────
app.post("/api/records", async (req, res) => {
  try {
    const latest = await Record.findOne().sort({ id: -1 });
    const record = await Record.create({
      id:     latest ? latest.id + 1 : 1,
      first:  req.body.first,
      second: req.body.second || "",
      third:  req.body.third  || "",
      fourth: req.body.fourth || ""
    });
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: "Could not add record" });
  }
});

// ── PUT update a record ─────────────────────────────────────────────────────
app.put("/api/records/:id", async (req, res) => {
  try {
    const record = await Record.findOneAndUpdate(
      { id: Number(req.params.id) },
      {
        first:  req.body.first,
        second: req.body.second || "",
        third:  req.body.third  || "",
        fourth: req.body.fourth || ""
      },
      { new: true, runValidators: true }
    );
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json(record);
  } catch (error) {
    res.status(400).json({ message: "Could not update record" });
  }
});

// ── DELETE a record ─────────────────────────────────────────────────────────
app.delete("/api/records/:id", async (req, res) => {
  try {
    const record = await Record.findOneAndDelete({ id: Number(req.params.id) });
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json({ message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete record" });
  }
});

// ── Health check ────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected" });
});

async function startServer() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  } catch (error) {
    console.error("MongoDB connection failed. Start MongoDB and run npm start again.");
    console.error(error.message);
    process.exit(1);
  }
}
startServer();
