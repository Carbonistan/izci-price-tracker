const express = require('express');
const cors = require('cors');
const { db, initDB } = require('./database');
const { startCronJob, runScraperNow } = require('./scraper');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Veritabanını başlat
initDB();

// 8 saatte bir çalışacak cron job'ı başlat
startCronJob();

app.get('/api/products', (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM products").all();
    // isTracking, isInternational gibi 0/1 değerlerini true/false'a dönüştür
    const products = rows.map(r => ({
      ...r,
      isTracking: r.isTracking === 1,
      isInternational: r.isInternational === 1
    }));
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/scrape', async (req, res) => {
  try {
    await runScraperNow();
    res.json({ message: 'Scraper başarıyla manuel tetiklendi.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`İzci Backend API çalışıyor: http://localhost:${PORT}`);
});
