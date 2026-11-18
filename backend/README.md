# Kampüs Etkinlik · Backend

**Sprint 7 & 8 · Express REST API & MongoDB** · Eyüp Başelçin · 2416501043

Etkinlikleri MongoDB üzerinde saklayan Node + Express REST sunucusu.

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run seed           # veritabanına 6 örnek etkinlik
npm run dev            # node --watch src/server.js
```

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | Dosya değişince yeniden başlayan geliştirme sunucusu |
| `npm start` | Sunucuyu bir kez başlatır |
| `npm run seed` | Koleksiyonu temizleyip 6 örnek etkinlik ekler (kaç kez çalışırsa çalışsın 6 kayıt) |

Sunucu `http://localhost:3000` adresinde açılır.

## Ortam değişkenleri

| Değişken | Örnek | Açıklama |
| --- | --- | --- |
| `PORT` | `3000` | Sunucunun dinlediği port (varsayılan 3000) |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/kampus` | MongoDB Cloud Atlas veya yerel MongoDB bağlantı adresi |

Gerçek Atlas adresi ve şifre **sadece** `backend/.env` içinde durur; koda, README'ye veya `.env.example`'a yazılmaz.

`.env` GitHub'a gönderilmez (`.gitignore` dosyasındadır); gerekli değişkenler `.env.example` içinde tanımlıdır.

## Derse Gelmeden Önce Yapılacaklar (MongoDB Hazırlığı)

### 1. MongoDB Community Kurulumu (Yerel)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) indirilip kurulur.
- Kurulumda "Run service as Network Service user" ve "Install MongoDB Compass" seçili olmalıdır.
- Yerel bağlantı adresi: `mongodb://127.0.0.1:27017/kampus`

### 2. MongoDB Cloud Atlas Hesabı ve Cluster Kurulumu
1. [MongoDB Cloud Atlas](https://www.mongodb.com/cloud/atlas/register) hesabı açılır.
2. **Ücretsiz Cluster (M0/Free):** Bölge olarak Türkiye'ye en yakın olan **Frankfurt (eu-central-1)** seçilir.
3. **Database Access:** Sol menüden yeni bir kullanıcı adı ve güçlü bir şifre oluşturulur (*bu şifre başka hiçbir hesapta kullanılmamalıdır*). Rol olarak `Read and write to any database` verilir.
4. **Network Access:** Sol menüden `Add IP Address` seçilerek okul ağı ve her yerden erişim için `0.0.0.0/0` ("Allow Access From Anywhere") eklenir.
5. **Bağlantı Adresi (Connect -> Drivers):**
   - Atlas panelinde **Connect -> Drivers** (Node.js) seçilir.
   - Verilen `mongodb+srv://...` adresi kopyalanır.
   - Sonundaki veritabanı adı `/kampus` yapılır:
     `mongodb+srv://<kullanici>:<sifre>@<cluster>.mongodb.net/kampus?retryWrites=true&w=majority`
   - Bu adres `backend/.env` dosyasına `MONGODB_URI=` olarak eklenir.

### 3. MongoDB for VS Code Eklentisi
- VS Code Extensions sekmesinden **"MongoDB for VS Code"** eklentisi kurulur.
- Hem yerel (`mongodb://localhost:27017`) hem de Atlas bağlantı adresi eklenerek bağlantı test edilir.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| --- | --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu ve veritabanı durumu | 200 | — | Hazır |
| GET | `/events` | Listeyi getir (`?category=Atölye` isteğe bağlı) | 200 | 500 | Hazır |
| GET | `/events/:id` | Tek etkinlik (`:id` = MongoDB `_id`) | 200 | 404, 500 | Hazır |
| POST | `/events` | Yeni etkinlik oluştur | 201 | 400, 500 | Hazır |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı · 500 sunucu hatası

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

## Klasör yapısı

```
backend/
  src/
    app.js                         Express uygulaması, middleware, route'ları bağlar
    server.js                      .env'i okur, veritabanına bağlanır, portu dinler
    config/database.js             MongoDB / Mongoose bağlantısı (URI .env'den)
    models/event-model.js          Mongoose Event şeması ve modeli
    routes/event-routes.js         Hangi adres hangi fonksiyona gider
    controllers/event-controller.js Event.find / findById / create, 400 ve 404
    data/seed-events.js            6 örnek etkinlik (id yok, MongoDB _id verir)
    seed.js                        deleteMany + insertMany
  requests/kampus-api.json         Postman collection (6 istek)
  .env.example
  .env
  package.json
```

## Test

`requests/kampus-api.json` dosyasını Postman'de **Import** ile açıp 6 isteği sırayla gönderin:

| # | İstek | Beklenen |
| --- | --- | --- |
| 1 | GET `/health` | 200 · `status: "ok"`, `database: "connected"`, `student` |
| 2 | GET `/events` | 200 · 6 kayıt, her birinde `_id`, `createdAt`, `updatedAt` |
| 3 | GET `/events/{{eventId}}` | 200 · listeden kopyalanan `_id` (collection değişkeni) |
| 4 | GET `/events/yok` | 404 · error |
| 5 | POST `/events` (tam body) | 201 · yeni `_id` ve `createdAt` |
| 6 | POST `/events` (sadece title) | 400 · schema doğrulama hatası |

**Kalıcılık testi:** POST ile ekle → sunucuyu Ctrl+C ile durdur → `npm run dev` → GET `/events` yeni kaydı hâlâ gösterir.
