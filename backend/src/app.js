import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();
app.disable("x-powered-by"); // Express sürüm bilgisini yanıtlarda gösterme
app.use(cors());
app.use(express.json()); // body → req.body

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2416501043",
  });
});

app.use("/events", eventRoutes);

app.use((req, res) => { // eşleşme yoksa
  res.status(404).json({ error: { message: "Route not found" } });
});

// Hata yakalayıcı: 4 parametre görünce Express bunu hata middleware'i sayar.
// next(err) buraya gelir; ayrıntı terminalde kalır, kullanıcıya sadece "Server error".
app.use((err, req, res, next) => {
  // Body geçerli JSON değilse istemci hatası: 400
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: { message: "Invalid JSON body" } });
  }
  console.error(err.message);
  res.status(500).json({ error: { message: "Server error" } });
});

export default app;
