const cron = require('node-cron');
const axios = require('axios');
const cheerio = require('cheerio');
const { db } = require('./database');

const scrapeExampleProduct = async () => {
  console.log('[BOT] Fiyatlar kontrol ediliyor...');
  try {
    // Gerçek Siteden (Vatan Bilgisayar) Fiyat Çekme İşlemi
    const vatanUrl = 'https://www.vatanbilgisayar.com/iphone-13-128-gb-akilli-telefon-yildiz-isigi.html';
    const { data } = await axios.get(vatanUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
      }
    });
    
    // Fiyatı Regex ile veya Cheerio ile parse etme
    const match = data.match(/"price":\s*"([^"]+)"/);
    if (!match) throw new Error("Fiyat sayfada bulunamadı.");
    
    const livePrice = parseFloat(match[1]);

    db.run(
      `UPDATE products SET previousPrice = currentPrice, currentPrice = ? WHERE store = 'Vatan Bilgisayar' AND url = ?`,
      [livePrice, vatanUrl],
      function(err) {
        if (err) console.error('[BOT] HATA: Fiyat güncellenemedi:', err.message);
        else console.log(`[BOT] BAŞARILI: Vatan Bilgisayar fiyatı çekildi. Güncel Fiyat: ${livePrice} TL`);
      }
    );
  } catch (error) {
    console.error('[BOT] Çökme hatası:', error.message);
  }
};

const startCronJob = () => {
  // Kullanıcının isteği: Günde 3 kez (8 saatte bir)
  // Cron syntax: '0 */8 * * *' = Her 8 saatte bir 00:00, 08:00, 16:00
  cron.schedule('0 */8 * * *', () => {
    console.log('[CRON] 8 saatlik periyot tetiklendi.');
    scrapeExampleProduct();
  });
  console.log('[CRON] Bot aktifleştirildi: Her 8 saatte bir fiyat taraması yapılacak.');
};

const runScraperNow = async () => {
  await scrapeExampleProduct();
};

module.exports = { startCronJob, runScraperNow };
