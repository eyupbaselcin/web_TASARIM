import mongoose from "mongoose";
import { Event, CATEGORIES } from "../models/event-model.js";

// GET /events (?category=Atölye isteğe bağlı)
export async function getEvents(req, res, next) {
  try {
    // Kullanıcının yazdığı değer sorguya hiç girmez: sabit listeden eşleşen
    // kategori kullanılır (?category[$ne]=x gibi operatörler işlenmez).
    const { category } = req.query;
    let filter = {};
    if (category !== undefined) {
      const match = CATEGORIES.find((c) => c === category);
      if (!match) return res.json([]); // bilinmeyen kategori: boş liste
      filter = { category: match };
    }
    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
}

// GET /events/:id
export async function getEventById(req, res, next) {
  try {
    // Biçimi yanlış id (ör. "yok") CastError → 500 olmasın, 404 dönsün
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404)
        .json({ error: { message: "Event not found" } });
    }
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404)
        .json({ error: { message: "Event not found" } });
    }
    res.json(event);
  } catch (err) {
    next(err);
  }
}

// POST /events
export async function createEvent(req, res, next) {
  try {
    // Sadece izin verilen alanlar alınır (_id, createdAt vb. istemciden gelmez).
    // Doğrulamayı schema yapar.
    const { title, category, capacity, date,
      time, location, description } = req.body ?? {};
    const event = await Event.create({ title, category, capacity, date,
      time, location, description });
    res.status(201).json(event);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400)
        .json({ error: { message: err.message } });
    }
    next(err);
  }
}
