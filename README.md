# Kampüs Etkinlik

**Web Teknolojileri ve Programlama** · Eyüp Başelçin · 2416501043

Kampüsteki seminer, atölye, söyleşi ve yarışmaları listeleyen web uygulaması. Aynı repoda iki uygulama var: biri gösterir, biri veri verir.

| Klasör | Ne | Adres |
| --- | --- | --- |
| [`frontend/`](frontend) | React + Vite arayüzü (Sprint 6, bu sprintte değişmedi) | http://localhost:5173 |
| [`backend/`](backend) | Node + Express REST API (Sprint 7-8), MongoDB bağlantılı | http://localhost:3000 |

## Çalıştırma

```bash
# Backend
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run dev

# Frontend (ayrı terminalde)
cd frontend
npm install
npm run dev
```

REST sözleşmesi ve Postman collection için: [`backend/README.md`](backend/README.md), [`backend/requests/kampus-api.json`](backend/requests/kampus-api.json).

## Repo yapısı

```
frontend/          React + Vite (Sprint 6)
backend/           Express REST API (Sprint 7)
arsiv/             Önceki sprint repoları
README.md
```

## Arşiv

Önceki sprintlerde ayrı repolarda yapılan çalışmalar `arsiv/` altında toplandı:

| Klasör | Sprint | Kaynak repo |
| --- | --- | --- |
| `arsiv/sprint-01` | Sprint 1 · HTML prototip | [eyupbaselcin/sprint-01](https://github.com/eyupbaselcin/sprint-01) |
| `arsiv/sprint-02` | Sprint 2 · CSS | [eyupbaselcin/sprint-02](https://github.com/eyupbaselcin/sprint-02) |
| `arsiv/ders2` | Sprint 2 · CSS (ikinci sürüm) | [eyupbaselcin/ders2](https://github.com/eyupbaselcin/ders2) |
| `arsiv/ders` | Sprint 3 · JavaScript | [eyupbaselcin/ders](https://github.com/eyupbaselcin/ders) |
| `arsiv/sprint-04` | Sprint 4 · React + Vite | [eyupbaselcin/sprint-04](https://github.com/eyupbaselcin/sprint-04) |
| `arsiv/sprint-05` | Sprint 5 · React bileşenleri | [eyupbaselcin/web-tech-preflight-main-frontend-](https://github.com/eyupbaselcin/web-tech-preflight-main-frontend-) |
| `frontend/` | Sprint 6 + Vize · Router, Context | [eyupbaselcin/sprint-06](https://github.com/eyupbaselcin/sprint-06) |
