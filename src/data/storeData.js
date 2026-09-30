export const PRESETS = [
  {
    id: 'cyber',
    name: 'SΨGIL GOLD (#ffd312)',
    subtitle: 'Occult Black #010000 + Runic Gold #ffd312',
    badge: 'Main Pre-Order',
    bg: '#010000',
    cardBg: '#0b0b0e',
    accent: '#ffd312',
    crimson: '#dc143c',
    text: '#ffffff',
    textMuted: '#8c8c9e',
    border: '#ffd312'
  },
  {
    id: 'crimson',
    name: 'CRIMSON OCCULT (#dc143c)',
    subtitle: 'Hot Crimson + Pitch Black',
    badge: 'Night Drop',
    bg: '#050102',
    cardBg: '#0f0508',
    accent: '#dc143c',
    crimson: '#ffd312',
    text: '#ffffff',
    textMuted: '#9e8c90',
    border: '#dc143c'
  },
  {
    id: 'raw',
    name: 'RAW SIGIL (WHITE/BLACK)',
    subtitle: 'High Contrast Sacred Mono',
    badge: 'Monochrome',
    bg: '#000000',
    cardBg: '#0a0a0a',
    accent: '#ffffff',
    crimson: '#ffd312',
    text: '#ffffff',
    textMuted: '#a0a0a0',
    border: '#ffffff'
  }
];

export const CURRENCIES = {
  EGP: { symbol: 'EGP ', rate: 1, label: 'EGP (E£)', country: 'EG' },
  USD: { symbol: '$', rate: 0.021, label: 'USD ($)', country: 'US' },
  EUR: { symbol: '€', rate: 0.019, label: 'EUR (€)', country: 'EU' },
  GBP: { symbol: '£', rate: 0.016, label: 'GBP (£)', country: 'GB' },
  SAR: { symbol: 'SAR ', rate: 0.078, label: 'SAR (ر.س)', country: 'SA' },
  AED: { symbol: 'AED ', rate: 0.076, label: 'AED (د.إ)', country: 'AE' }
};

export const PRODUCTS = [
  // ==========================================
  // TOPS (Featured & Hero Spotlights)
  // ==========================================
  {
    id: 'rad-07',
    title: 'SΨGIL LAMBSKIN BOX-CUT MOTO TOP',
    subtitle: 'Matte Italian nappa, asymmetric Excella zip, structured ghost collar',
    category: 'tops',
    categoryLabel: 'TOPS',
    price: 4200,
    compareAtPrice: 4900,
    isSale: true,
    isFeatured: true,
    isHeroSpotlight: true,
    stockLeft: 3,
    badge: 'HERO PRE-ORDER (BATCH 01)',
    badgeType: 'yellow',
    images: [
      '/assets/radian_cropped_jacket.jpg',
      '/assets/genz_hero_yellow.jpg',
      '/assets/leather_tee.jpg'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#010000', img: '/assets/radian_cropped_jacket.jpg' },
      { name: 'Crimson Occult', hex: '#dc143c', img: '/assets/genz_hero_crimson.jpg' }
    ],
    sizes: ['EU 44', 'EU 46', 'EU 48', 'EU 50', 'EU 52'],
    description: 'The iconic matte Italian lambskin moto top that defines the SΨGIL occult runway. Cut with structured drop shoulders, asymmetric Excella two-way gunmetal zipper, and ghost-mannequin tailored paneling. Handcrafted upon pre-order.',
    details: [
      'Pre-order Batch 01 • Allocation limited to 50 pieces',
      '100% Full-Grain Italian Lambskin with Matte Velvet Temper',
      'Asymmetric two-way Excella front zipper closure',
      'Breathable cupro silk lining with engraved gold SΨGIL label',
      'Zero upfront payment required — Pay Cash on Delivery (EGP)'
    ],
    fit: 'Structured boxy fit. Fits true to European chest size.',
    care: 'Specialist leather clean only. Store on wide wooden hanger.'
  },
  {
    id: 'rad-08',
    title: 'STAND-COLLAR TAILORED LEATHER SHIRT TOP',
    subtitle: 'Full-grain Italian nappa with hidden placket and mandarin collar',
    category: 'tops',
    categoryLabel: 'TOPS',
    price: 3800,
    compareAtPrice: 4400,
    isSale: false,
    isFeatured: true,
    isHeroSpotlight: false,
    stockLeft: 4,
    badge: 'BATCH 01 PRE-ORDER',
    badgeType: 'yellow',
    images: [
      '/assets/radian_leather_top.jpg',
      '/assets/radian_cropped_jacket.jpg',
      '/assets/genz_hero_yellow.jpg'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#010000', img: '/assets/radian_leather_top.jpg' }
    ],
    sizes: ['EU 44', 'EU 46', 'EU 48', 'EU 50', 'EU 52'],
    description: 'Minimalist luxury leather button top sculpted with a clean mandarin stand collar and concealed magnetic front placket. Architectural curved hem and extended tailored cuffs.',
    details: [
      '100% Grade-A Italian Calfskin Nappa',
      'Concealed front snap placket with stand collar',
      'Curved sculptural hemline engineered for layering',
      'Pre-order batch dispatch in 2 weeks',
      '100% Cash on Delivery'
    ],
    fit: 'Clean tailored box silhouette.',
    care: 'Specialist leather dry clean only.'
  },
  {
    id: 'rad-09',
    title: 'SCULPTED ARCHITECTURAL BUCKLE CORSET TOP',
    subtitle: 'Heavy bonded twill with industrial hardware and structured boning',
    category: 'tops',
    categoryLabel: 'TOPS',
    price: 3200,
    compareAtPrice: 3700,
    isSale: true,
    isFeatured: false,
    isHeroSpotlight: false,
    stockLeft: 5,
    badge: 'LIMITED ALLOCATION',
    badgeType: 'crimson',
    images: [
      '/assets/radian_corset_top.jpg',
      '/assets/radian_cropped_jacket.jpg'
    ],
    colors: [
      { name: 'Matte Onyx', hex: '#0a0a0c', img: '/assets/radian_corset_top.jpg' }
    ],
    sizes: ['EU 44', 'EU 46', 'EU 48', 'EU 50', 'EU 52'],
    description: 'A striking crossover of brutalist tailoring and modern streetwear. Features front industrial buckle closures, square neckline, and internal flex boning for a dramatic silhouette.',
    details: [
      'Heavyweight 480gsm bonded cotton twill & lambskin trims',
      'Custom gunmetal buckle hardware with SΨGIL laser engraving',
      'Ergonomic internal boning for structured comfort',
      'Zero card required • Pay cash in EGP on courier arrival'
    ],
    fit: 'Sculpted form-fitting cut with curved hem.',
    care: 'Dry clean only.'
  },
  {
    id: 'rad-10',
    title: 'SΨGIL MATTE LAMBSKIN BOX-CUT TEE',
    subtitle: 'Heavyweight Italian nappa drop-shoulder top with bonded seams',
    category: 'tops',
    categoryLabel: 'TOPS',
    price: 3400,
    compareAtPrice: 3900,
    isSale: false,
    isFeatured: true,
    isHeroSpotlight: false,
    stockLeft: 6,
    badge: 'CORE GRAIL',
    badgeType: 'yellow',
    images: [
      '/assets/leather_tee.jpg',
      '/assets/genz_hero_yellow.jpg'
    ],
    colors: [
      { name: 'Sygil Onyx', hex: '#010000', img: '/assets/leather_tee.jpg' },
      { name: 'Crimson Occult', hex: '#dc143c', img: '/assets/genz_hero_crimson.jpg' }
    ],
    sizes: ['EU 44', 'EU 46', 'EU 48', 'EU 50', 'EU 52'],
    description: 'The benchmark luxury leather tee. Cut from ultra-supple Italian lambskin with laser-cut edges and relaxed drop shoulders. An essential year-round layering foundation.',
    details: [
      'Full-grain Italian lambskin nappa',
      'Seamless laser-bonded sleeve cuffs and hem',
      'Pure silk cupro breathable interior back lining',
      'Pay Cash in EGP to courier upon inspection'
    ],
    fit: 'Relaxed oversized box fit. Take true EU size.',
    care: 'Specialist leather cleaning.'
  },

  // ==========================================
  // HOODIES
  // ==========================================
  {
    id: 'rad-01',
    title: 'SΨGIL 650GSM OCCULT HEAVYWEIGHT ZIP HOODIE',
    subtitle: 'Ultra-dense loopback French terry with double hood & two-way zipper',
    category: 'hoodies',
    categoryLabel: 'HOODIES',
    price: 3600,
    compareAtPrice: 4200,
    isSale: true,
    isFeatured: true,
    isHeroSpotlight: false,
    stockLeft: 3,
    badge: 'PRE-ORDER (BATCH 01)',
    badgeType: 'yellow',
    images: [
      '/assets/genz_hero_yellow.jpg',
      '/assets/genz_hero_crimson.jpg',
      '/assets/craftsmanship.jpg'
    ],
    colors: [
      { name: 'Pitch Black / Cyber Gold', hex: '#010000', img: '/assets/genz_hero_yellow.jpg' },
      { name: 'Crimson Shadow', hex: '#dc143c', img: '/assets/genz_hero_crimson.jpg' }
    ],
    sizes: ['EU 44', 'EU 46', 'EU 48', 'EU 50', 'EU 52'],
    description: 'Engineered from ultra-heavy 650gsm Italian loopback cotton. Features an architectural double-layered hood that holds its shape, oversized two-way gunmetal zipper, and cyber-gold runic embroidery.',
    details: [
      '650gsm 100% Organic Italian Combed Cotton',
      'Double-ply structured hood with custom brass aglet drawstrings',
      'Two-way Excella matte front zipper',
      'Heavy 2x2 ribbing at cuffs and hem band',
      'Cash on Delivery payment upon courier arrival'
    ],
    fit: 'Exaggerated boxy streetwear silhouette with drop shoulders.',
    care: 'Machine wash cold inside out, hang to dry in shade.'
  },
  {
    id: 'rad-02',
    title: 'RUNIC OVERSIZED BOX-FIT PULLOVER HOODIE',
    subtitle: '700gsm dense brushed fleece with concealed kangaroo pocket',
    category: 'hoodies',
    categoryLabel: 'HOODIES',
    price: 3400,
    compareAtPrice: 3900,
    isSale: false,
    isFeatured: true,
    isHeroSpotlight: false,
    stockLeft: 2,
    badge: 'ATELIER EXCLUSIVE',
    badgeType: 'crimson',
    images: [
      '/assets/genz_hero_crimson.jpg',
      '/assets/genz_hero_yellow.jpg'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0c', img: '/assets/genz_hero_crimson.jpg' },
      { name: 'Cyber Gold Accent', hex: '#ffd312', img: '/assets/genz_hero_yellow.jpg' }
    ],
    sizes: ['EU 44', 'EU 46', 'EU 48', 'EU 50', 'EU 52'],
    description: 'Constructed from a custom-developed 700gsm brushed fleece with substantial hand feel. Minimalist front with high-density SΨGIL occult tonal back print and seamless kangaroo pocket.',
    details: [
      '700gsm ultra-dense fleece with brushed peach finish interior',
      'Concealed side-entry zip kangaroo pocket',
      'Double-stitched reinforced shoulder and armhole seams',
      'Pay Cash to courier upon inspection',
      'Includes archival dust cover & presentation box'
    ],
    fit: 'Heavy drape, oversized box cut.',
    care: 'Cold wash, do not tumble dry.'
  },
  {
    id: 'rad-03',
    title: 'ACID-WASHED DISTRESSED THERMAL HOODIE',
    subtitle: 'Thermal waffle-lined loopback cotton with hand-distressed raw hems',
    category: 'hoodies',
    categoryLabel: 'HOODIES',
    price: 3800,
    compareAtPrice: 4500,
    isSale: true,
    isFeatured: false,
    isHeroSpotlight: false,
    stockLeft: 2,
    badge: '2 PRE-ORDERS LEFT',
    badgeType: 'crimson',
    images: [
      '/assets/hero_runway.jpg',
      '/assets/genz_hero_crimson.jpg'
    ],
    colors: [
      { name: 'Faded Charcoal', hex: '#1a1a1f', img: '/assets/hero_runway.jpg' },
      { name: 'Crimson Wash', hex: '#dc143c', img: '/assets/genz_hero_crimson.jpg' }
    ],
    sizes: ['EU 44', 'EU 46', 'EU 48', 'EU 50', 'EU 52'],
    description: 'Each piece undergoes a 12-hour mineral acid wash and individual hand-distressing in Florence. Fully lined with heavy 350gsm thermal waffle knit for maximum insulation.',
    details: [
      'Outer: 550gsm loopback cotton • Lining: 350gsm thermal waffle',
      'Individual artisan hand-distressing (each piece is unique)',
      'Subtle crimson undertones exposed through abrasive wash',
      '100% Cash On Delivery in EGP'
    ],
    fit: 'Relaxed oversized silhouette.',
    care: 'Hand wash cold or gentle cycle.'
  },

  // ==========================================
  // SWEATSHIRTS
  // ==========================================
  {
    id: 'rad-04',
    title: 'BOX-CUT HEAVY FRENCH TERRY CREWNECK',
    subtitle: '580gsm organic Peruvian cotton with embossed tonal sigil',
    category: 'sweatshirts',
    categoryLabel: 'SWEATSHIRTS',
    price: 2900,
    compareAtPrice: 3400,
    isSale: true,
    isFeatured: true,
    isHeroSpotlight: false,
    stockLeft: 5,
    badge: 'PRE-ORDER FAVORITE',
    badgeType: 'yellow',
    images: [
      '/assets/knit_sweater.jpg',
      '/assets/genz_hero_yellow.jpg'
    ],
    colors: [
      { name: 'Pure Onyx', hex: '#010000', img: '/assets/knit_sweater.jpg' },
      { name: 'Oatmeal Stone', hex: '#d9cfbe', img: '/assets/knit_sweater.jpg' }
    ],
    sizes: ['EU 44', 'EU 46', 'EU 48', 'EU 50', 'EU 52'],
    description: 'The quintessential luxury streetwear crewneck sweatshirt. 580gsm long-staple combed cotton terry with chunky 3-inch ribbed collar, vintage V-insert, and tonal high-density embossed sigil on the chest.',
    details: [
      '580gsm 100% Organic Peruvian Combed Cotton',
      'Wide architectural 3-inch neck ribbing with V-stitch notch',
      'Articulated raglan armhole construction',
      'Doorstep Cash on Delivery handover in EGP'
    ],
    fit: 'Boxy drop-shoulder cut with fitted waist rib.',
    care: 'Machine wash cold inside out.'
  },
  {
    id: 'rad-05',
    title: 'CHUNKY BRUSHED ALPACA FLEECE SWEATSHIRT',
    subtitle: 'Heavy 5-gauge Peruvian baby alpaca fleece knit in undyed stone',
    category: 'sweatshirts',
    categoryLabel: 'SWEATSHIRTS',
    price: 3600,
    compareAtPrice: 4200,
    isSale: false,
    isFeatured: true,
    isHeroSpotlight: false,
    stockLeft: 4,
    badge: 'PRE-ORDER',
    badgeType: 'yellow',
    images: [
      '/assets/knit_sweater.jpg',
      '/assets/lookbook_hotspot.jpg'
    ],
    colors: [
      { name: 'Oatmeal Stone', hex: '#d9cfbe', img: '/assets/knit_sweater.jpg' },
      { name: 'Anthracite Dark', hex: '#1c1c20', img: '/assets/hero_runway.jpg' }
    ],
    sizes: ['EU 44', 'EU 46', 'EU 48', 'EU 50', 'EU 52'],
    description: 'Spun from sustainably sheared Peruvian baby alpaca and organic merino wool fleece. Oversized brioche rib stitch with extended knuckle cuffs and seamless mock crewneck.',
    details: [
      '70% Peruvian Baby Alpaca Fleece, 30% Organic Merino Wool',
      '5-gauge heavy brioche rib knit sweatshirt silhouette',
      'Pre-order batch dispatch in 2 weeks',
      'Zero upfront payment • 100% Cash on Delivery',
      'Knitted in Arequipa, Peru'
    ],
    fit: 'Relaxed slouchy streetwear drape.',
    care: 'Hand wash cold, dry flat.'
  },
  {
    id: 'rad-06',
    title: 'ARCHITECTURAL RAW-EDGE RAGLAN SWEATSHIRT',
    subtitle: '600gsm scuba-fleece hybrid with articulated elbow darts & raw hem',
    category: 'sweatshirts',
    categoryLabel: 'SWEATSHIRTS',
    price: 3100,
    compareAtPrice: 3600,
    isSale: false,
    isFeatured: true,
    isHeroSpotlight: false,
    stockLeft: 3,
    badge: 'LIMITED (50 PIECES)',
    badgeType: 'crimson',
    images: [
      '/assets/hero_oxblood.jpg',
      '/assets/knit_sweater.jpg'
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#0f0f12', img: '/assets/hero_oxblood.jpg' },
      { name: 'Crimson Shadow', hex: '#dc143c', img: '/assets/genz_hero_crimson.jpg' }
    ],
    sizes: ['EU 44', 'EU 46', 'EU 48', 'EU 50', 'EU 52'],
    description: 'A structural hybrid combining heavyweight cotton fleece with bonded scuba jersey for crisp sculptural drape. Articulated sleeve darting and laser-cut raw bottom hem.',
    details: [
      '600gsm scuba-fleece bonded technical textile',
      'Articulated curved elbow darting for natural arm posture',
      'Laser-cut raw edge hem that will not unravel',
      'Cash on Delivery payment upon doorstep inspection'
    ],
    fit: 'Sculptural boxy fit with clean lines.',
    care: 'Dry clean recommended.'
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'ALL PRE-ORDERS', count: PRODUCTS.length },
  { id: 'hoodies', name: 'HOODIES', count: 3, image: '/assets/genz_hero_yellow.jpg' },
  { id: 'sweatshirts', name: 'SWEATSHIRTS', count: 3, image: '/assets/knit_sweater.jpg' },
  { id: 'tops', name: 'TOPS', count: 4, image: '/assets/radian_cropped_jacket.jpg' }
];

export const LOOKBOOK_HOTSPOTS = [
  {
    id: 'hs-1',
    x: 48,
    y: 19,
    title: 'SΨGIL Lambskin Moto Top',
    price: 4200,
    productId: 'rad-07',
    desc: 'Pre-order Batch 01 • Matte Italian lambskin with asymmetric Excella zip'
  },
  {
    id: 'hs-2',
    x: 52,
    y: 36,
    title: 'SΨGIL 650GSM Occult Zip Hoodie',
    price: 3600,
    productId: 'rad-01',
    desc: 'Double-ply structured hood with loopback French terry'
  },
  {
    id: 'hs-3',
    x: 45,
    y: 70,
    title: 'Stand-Collar Tailored Leather Top',
    price: 3800,
    productId: 'rad-08',
    desc: 'Mandarin stand collar with concealed magnetic front closure'
  },
  {
    id: 'hs-4',
    x: 56,
    y: 91,
    title: 'Box-Cut Heavy French Terry Crewneck',
    price: 2900,
    productId: 'rad-04',
    desc: '580gsm organic Peruvian cotton with wide ribbed collar'
  }
];

export const CAPSULE_BUNDLE = {
  id: 'capsule-vol9',
  title: 'PRE-ORDER 3-PIECE RUNWAY DRIP',
  subtitle: 'Select 1 Heavyweight Hoodie + 1 Crewneck Sweatshirt + 1 Layering Top to unlock 20% bundle privilege (Cash On Delivery in EGP)',
  discountPercent: 20,
  defaultItems: ['rad-01', 'rad-04', 'rad-07'],
  code: 'SYGIL20'
};

export const PRESS_QUOTES = [
  {
    publication: 'DAZED & CONFUSED',
    quote: 'SΨGIL is ushering in a dark mystic cyber era. Occult brutalism meets ultra-heavyweight Italian fleece and leather craft.',
    author: 'Fashion & Culture Editor'
  },
  {
    publication: 'HYPEBEAST GLOBAL',
    quote: 'The SΨGIL 650gsm hoodies and lambskin moto tops are selling out within minutes. The definitive streetwear grails.',
    author: 'Streetwear Lead'
  },
  {
    publication: 'COMPLEX STYLE',
    quote: 'No skips in the SΨGIL archive. The cash on delivery model gives collectors absolute assurance on doorstep inspection.',
    author: 'Senior Style Editor'
  },
  {
    publication: 'HIGHSNOBIETY',
    quote: 'Blurring occult sacred geometry with Florentine master tailoring. The ghost-mannequin tailoring sets a new benchmark.',
    author: 'Creative Director'
  }
];

export const CUSTOMER_REVIEWS = [];

export const BRAND_VALUES = [
  {
    icon: 'Zap',
    title: '100% CASH ON DELIVERY ONLY',
    desc: 'Zero upfront payment. Reserve your pre-order slot today and pay in cash (EGP) directly to the courier upon doorstep delivery.'
  },
  {
    icon: 'ShieldCheck',
    title: 'ATELIER BATCH PRE-ORDERS',
    desc: 'Each hoodie, sweatshirt, and top is handcrafted upon pre-order in strict allocations of 50 to 150 pieces in Florence and Biella.'
  },
  {
    icon: 'Plane',
    title: 'COMPLIMENTARY EXPRESS COURIER',
    desc: 'Tracked courier shipping on all pre-orders over 3,000 EGP. Pre-orders dispatch within 2-3 production weeks.'
  },
  {
    icon: 'RefreshCw',
    title: '30-DAY DOORSTEP RETURNS',
    desc: 'Inspect your garment with the courier. Hassle-free doorstep returns and size swaps at your residence.'
  }
];

export const FAQS = [
  {
    q: 'How does the Pre-Order & Cash on Delivery (COD) system work?',
    a: 'You can reserve any SΨGIL hoodie, sweatshirt, or top today for 0 EGP upfront. Simply select your EU size and enter your delivery address and phone number. When your batch completes production at our atelier and arrives via Express Courier, you simply pay the exact order amount in cash (EGP) to the courier upon delivery!'
  },
  {
    q: 'When will my Pre-Order batch dispatch?',
    a: 'Each piece in Volume IX is crafted in limited batches of 50 to 150 pieces. Production typically takes 2–3 weeks. You will receive SMS & WhatsApp dispatch alerts with your courier tracking number before the courier arrives.'
  },
  {
    q: 'Can I inspect the garment before paying cash?',
    a: 'Yes! Our white-glove courier partners allow you to verify the SΨGIL sealed presentation box and authentication card upon handover.'
  },
  {
    q: 'How does the 3-Piece Drip Capsule 20% discount apply to COD?',
    a: 'When you pre-order 1 Hoodie + 1 Sweatshirt + 1 Top in the interactive Capsule Builder, a 20% discount is automatically deducted from your final cash invoice due on delivery.'
  }
];
