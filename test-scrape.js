const axios = require('axios');
const cheerio = require('cheerio');

async function test() {
  try {
    const { data } = await axios.get('https://www.vatanbilgisayar.com/iphone-13-128-gb-akilli-telefon-yildiz-isigi.html', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const $ = cheerio.load(data);
    // Vatan Bilgisayar single product page price class usually .product-list__price or .product-list__content .product-price
    // or we can use regex
    const match = data.match(/"price":\s*"([^"]+)"/);
    if(match) console.log("Regex Price:", match[1]);
  } catch (error) {
    console.error('Hata:', error.message);
  }
}
test();
