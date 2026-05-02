export const mockProducts = [
  // TEKNOLOJİ
  {
    id: 1,
    category: 'Teknoloji',
    name: 'MacBook Pro M3 Max 36GB 1TB',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop',
    currentPrice: 105000,
    previousPrice: 112000,
    store: 'Teknosa',
    url: 'https://www.teknosa.com',
    isTracking: true
  },
  {
    id: 2,
    category: 'Teknoloji',
    name: 'Sony WH-1000XM5 Kulaklık',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&h=200&fit=crop',
    currentPrice: 12500,
    previousPrice: 13500,
    store: 'Amazon TR',
    url: 'https://www.amazon.com.tr',
    isTracking: false
  },
  {
    id: 3,
    category: 'Teknoloji',
    name: 'Logitech MX Master 3S',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop',
    currentPrice: 3200,
    previousPrice: 3800,
    store: 'Kadıköy Yazıcıoğlu',
    url: '#',
    isTracking: true
  },
  {
    id: 4,
    category: 'Teknoloji',
    name: 'LG 27" UltraGear 2K 144Hz',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop',
    currentPrice: 7500,
    previousPrice: 9200,
    store: 'Hepsiburada',
    url: 'https://www.hepsiburada.com',
    isTracking: false
  },
  {
    id: 5,
    category: 'Teknoloji',
    name: 'Samsung 980 Pro 1TB NVMe',
    image: 'https://images.unsplash.com/photo-1597571063304-81f081907e86?w=200&h=200&fit=crop',
    currentPrice: 3100,
    previousPrice: 3500,
    store: 'Mecidiyeköy Bilgisayar',
    url: '#',
    isTracking: false
  },
  
  // SÜPERMARKET
  {
    id: 6,
    category: 'Süpermarket',
    name: 'Jacobs Monarch Filtre Kahve 500g',
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=200&h=200&fit=crop',
    currentPrice: 185,
    previousPrice: 260,
    store: 'Yerel Market',
    url: '#',
    isTracking: true
  },
  {
    id: 7,
    category: 'Süpermarket',
    name: 'Sızma Zeytinyağı 5L',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop',
    currentPrice: 1200,
    previousPrice: 1650,
    store: 'Migros',
    url: 'https://www.migros.com.tr',
    isTracking: false
  },
  {
    id: 8,
    category: 'Süpermarket',
    name: 'Bebek Bezi 4 Numara 120\'li',
    image: 'https://images.unsplash.com/photo-1517677129300-07b130802f46?w=200&h=200&fit=crop',
    currentPrice: 450,
    previousPrice: 520,
    store: 'E-Bebek',
    url: 'https://www.e-bebek.com',
    isTracking: false
  },

  // KIRTASİYE
  {
    id: 9,
    category: 'Kırtasiye',
    name: 'Faber-Castell 24\'lü Kuru Boya',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&h=200&fit=crop',
    currentPrice: 120,
    previousPrice: 190,
    store: 'Amazon TR',
    url: 'https://www.amazon.com.tr',
    isTracking: true
  },
  {
    id: 10,
    category: 'Kırtasiye',
    name: 'Moleskine Çizgisiz Defter',
    image: 'https://images.unsplash.com/photo-1531346878377-244cb1754d28?w=200&h=200&fit=crop',
    currentPrice: 380,
    previousPrice: 450,
    store: 'D&R',
    url: 'https://www.dr.com.tr',
    isTracking: false
  },
  {
    id: 11,
    category: 'Kırtasiye',
    name: 'A4 Fotokopi Kağıdı 500\'lü',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=200&h=200&fit=crop',
    currentPrice: 95,
    previousPrice: 135,
    store: 'Ofis Kırtasiye',
    url: '#',
    isTracking: false
  },

  // MODA
  {
    id: 12,
    category: 'Moda',
    name: 'Nike Air Force 1 \'07',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop',
    currentPrice: 3200,
    previousPrice: 4500,
    store: 'Nike TR',
    url: '#',
    isTracking: false
  },

  // KOZMETİK
  {
    id: 13,
    category: 'Kozmetik',
    name: 'Dior Sauvage Edp 100ml',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200&h=200&fit=crop',
    currentPrice: 4100,
    previousPrice: 5200,
    store: 'Sephora',
    url: '#',
    isTracking: true
  },

  // EV & YAŞAM
  {
    id: 14,
    category: 'Ev & Yaşam',
    name: 'Philips Airfryer XXL',
    image: 'https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=200&h=200&fit=crop',
    currentPrice: 4500,
    previousPrice: 6000,
    store: 'MediaMarkt',
    url: '#',
    isTracking: false
  },

  // SPOR & OUTDOOR
  {
    id: 15,
    category: 'Spor & Outdoor',
    name: 'Decathlon Arpenaz Çadır',
    image: 'https://images.unsplash.com/photo-1504280390226-e137b0d0c3be?w=200&h=200&fit=crop',
    currentPrice: 1500,
    previousPrice: 2200,
    store: 'Decathlon',
    url: '#',
    isTracking: false
  },

  // YURTDIŞI ÜRÜNLER (Karma Kategoriler)
  {
    id: 16,
    category: 'Teknoloji',
    name: 'Steam Deck OLED 512GB',
    image: 'https://picsum.photos/seed/steamdeck/200/200',
    currentPrice: 549.00,
    previousPrice: 649.00,
    store: 'Amazon ABD',
    url: 'https://amazon.com',
    isTracking: false,
    isInternational: true,
    currency: 'USD'
  },
  {
    id: 17,
    category: 'Süpermarket',
    name: 'Illy Espresso Çekirdek Kahve 1kg',
    image: 'https://picsum.photos/seed/illy/200/200',
    currentPrice: 28.50,
    previousPrice: 35.00,
    store: 'Amazon Almanya',
    url: 'https://amazon.de',
    isTracking: true,
    isInternational: true,
    currency: 'EUR'
  },
  {
    id: 18,
    category: 'Teknoloji',
    name: 'Mini PC Beelink SER5',
    image: 'https://picsum.photos/seed/minipc/200/200',
    currentPrice: 220.00,
    previousPrice: 300.00,
    store: 'AliExpress',
    url: 'https://aliexpress.com',
    isTracking: false,
    isInternational: true,
    currency: 'USD'
  }
];

export const mockAlerts = [
  {
    id: 1,
    title: 'Çok Ucuz Fiyat: MX Master 3S',
    message: 'Fiyat 3800₺\'den 3200₺\'ye düştü! Hemen incele.',
    time: '10 dk önce',
    type: 'critical'
  },
  {
    id: 2,
    title: 'Fiyat Düşüşü: MacBook Pro M3',
    message: 'Beklediğiniz üründe %6 indirim var.',
    time: '2 saat önce',
    type: 'info'
  }
];
