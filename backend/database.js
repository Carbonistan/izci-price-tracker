const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'izci.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Veritabanına bağlanılamadı:', err.message);
  } else {
    console.log('SQLite veritabanına bağlanıldı.');
  }
});

const initDB = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT,
      name TEXT,
      image TEXT,
      currentPrice REAL,
      previousPrice REAL,
      store TEXT,
      url TEXT,
      isTracking INTEGER DEFAULT 0,
      isInternational INTEGER DEFAULT 0,
      currency TEXT DEFAULT 'TRY'
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS price_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER,
      price REAL,
      date TEXT,
      FOREIGN KEY(product_id) REFERENCES products(id)
    )`);

    // Eğer tablo boşsa sahte (mock) verileri ekle
    db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
      if (row && row.count === 0) {
        console.log("Veritabanı boş, örnek veriler yükleniyor...");
        const insert = db.prepare(`INSERT INTO products (category, name, image, currentPrice, previousPrice, store, url, isTracking, isInternational, currency) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        
        const seedData = [
          ['Teknoloji', 'Apple MacBook Air M2', 'https://picsum.photos/seed/macbook/200/200', 31500, 34999, 'Apple TR', 'https://www.apple.com/tr/shop/buy-mac/macbook-air/13-inç-m2', 1, 0, 'TRY'],
          ['Süpermarket', 'Nutella 750g', 'https://picsum.photos/seed/nutella/200/200', 115, 145, 'Migros', 'https://www.migros.com.tr/nutella-kakaolu-findik-kremasi-750-g-p-1065759', 0, 0, 'TRY'],
          ['Kırtasiye', 'Faber-Castell 24lü Boya', 'https://picsum.photos/seed/faber/200/200', 85, 120, 'D&R', 'https://www.dr.com.tr/kirtasiye/faber-castell-eco-kuru-boya-kalemi-24-renk/okul-alisverisi/kuru-boyalar/urunno=0000000067645', 0, 0, 'TRY'],
          ['Moda', 'Nike Air Force 1', 'https://picsum.photos/seed/nike/200/200', 3200, 4500, 'Nike TR', 'https://www.nike.com/tr/t/air-force-1-07-ayakkabisi-jBrTqV/CW2288-111', 0, 0, 'TRY'],
          ['Teknoloji', 'Steam Deck OLED 512GB', 'https://picsum.photos/seed/steamdeck/200/200', 549, 649, 'Amazon ABD', 'https://www.amazon.com/Steam-Deck-OLED-512GB-Handheld/dp/B0CT1ZY7SD', 0, 1, 'USD'],
          ['Süpermarket', 'Illy Espresso 1kg', 'https://picsum.photos/seed/illy/200/200', 28.5, 35, 'Amazon Almanya', 'https://www.amazon.de/illy-Classico-Classic-Espresso-Kaffeebohnen/dp/B004PBMD76', 1, 1, 'EUR'],
          ['Teknoloji', 'iPhone 13 128 GB Yıldız Işığı', 'https://picsum.photos/seed/iphone13/200/200', 38000, 39999, 'Vatan Bilgisayar', 'https://www.vatanbilgisayar.com/iphone-13-128-gb-akilli-telefon-yildiz-isigi.html', 1, 0, 'TRY']
        ];

        seedData.forEach(item => {
          insert.run(item);
        });
        insert.finalize();
        console.log("Örnek veriler yüklendi.");
      }
    });
  });
};

module.exports = { db, initDB };
