# Kampüs Etkinlik · Backend

**Sprint 7 · Express ile REST API** · Eyüp Başelçin · 2416501043

Etkinlikleri JSON olarak veren Node + Express sunucusu. Veri şimdilik bellekte (`src/data/events.js`); sunucu yeniden başlayınca POST ile eklenenler kaybolur.

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run dev            # node --watch src/server.js
```

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | Dosya değişince yeniden başlayan geliştirme sunucusu |
| `npm start` | Sunucuyu bir kez başlatır |

Sunucu `http://localhost:3000` adresinde açılır.

## Ortam değişkenleri

| Değişken | Örnek | Açıklama |
| --- | --- | --- |
| `PORT` | `3000` | Sunucunun dinlediği port (yoksa 3000) |

`.env` GitHub'a gönderilmez; gerekli değişkenler `.env.example` içinde.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| --- | --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu ayakta mı | 200 | — | Bu sprint |
| GET | `/events` | Listeyi getir (`?category=Atölye` isteğe bağlı) | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

POST `/events` için `title`, `category` ve `date` zorunludur; `capacity`, `time`, `location`, `description` isteğe bağlıdır.

## Klasör yapısı

```
backend/
  src/
    app.js                         Express uygulaması, middleware, route'ları bağlar
    server.js                      .env'i okur, portu dinler
    routes/event-routes.js         Hangi adres hangi fonksiyona gider
    controllers/event-controller.js İsteği işler, yanıtı döndürür
    data/events.js                 Bellek içi etkinlik dizisi
  requests/kampus-api.json         Postman collection (6 istek)
  .env.example
  package.json
```

## Test

`requests/kampus-api.json` dosyasını Postman'de **Import** ile açıp 6 isteği sırayla gönder:

| # | İstek | Beklenen |
| --- | --- | --- |
| 1 | GET `/health` | 200 · ok + student |
| 2 | GET `/events` | 200 · 6 kayıt |
| 3 | GET `/events/event-2` | 200 · event-2 |
| 4 | GET `/events/yok` | 404 · error |
| 5 | POST `/events` (tam body) | 201 · yeni id |
| 6 | POST `/events` (sadece title) | 400 · error |
