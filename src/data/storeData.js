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
  USD: { symbol: '$', rate: 0.0727, label: 'USD ($)', country: 'US' },
  EUR: { symbol: '€', rate: 0.067, label: 'EUR (€)', country: 'EU' },
  GBP: { symbol: '£', rate: 0.058, label: 'GBP (£)', country: 'GB' },
  SAR: { symbol: 'SAR ', rate: 0.27, label: 'SAR (ر.س)', country: 'SA' },
  AED: { symbol: 'AED ', rate: 0.26, label: 'AED (د.إ)', country: 'AE' }
};

export const PRODUCTS = [
  // ==========================================
  // FIGMA SHOWCASE PIECES (MORE FROM THE RITUAL)
  // ==========================================
  {
    id: 'rad-01',
    title: 'DARK RITUAL 650GSM HOODIE',
    subtitle: 'Heavyweight acid-washed fleece with raised hieroglyphic cuneiform embossing & sleeve runes',
    category: 'hoodies',
    categoryLabel: 'HOODIES',
    price: 2600,
    compareAtPrice: 3200,
    isSale: true,
    isFeatured: true,
    isHeroSpotlight: true,
    stockLeft: 12,
    badge: 'DARK RITUAL (66 PCS)',
    badgeType: 'crimson',
    images: [
      '/assets/sygil_hoodie_darkritual.jpg',
      '/assets/sygil_hero_cinematic.jpg',
      '/assets/sygil_story_portrait.jpg'
    ],
    colors: [
      { name: 'Pitch Black Acid Wash', hex: '#010000', img: '/assets/sygil_hoodie_darkritual.jpg' },
      { name: 'Occult Crimson Glow', hex: '#dc143c', img: '/assets/genz_hero_crimson.jpg' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Heavyweight acid-washed fleece. Raised Sumerian cuneiform embossing across the chest, and hot-pink SYGIL runes hand-screened on both sleeves. Numbered certificate of authenticity included with each piece. Only 66 made.',
    details: [
      'Acid-washed black fleece with 650gsm Italian combed loopback cotton',
      'Raised hieroglyphic cuneiform embossing across chest & hood contour',
      'Hot-pink and silver rune sigils hand-applied on both sleeves',
      'Strict runway allocation • Limited to 66 hand-numbered pieces worldwide',
      '100% Cash On Delivery • 0 EGP Due Today — Inspect with courier'
    ],
    fit: 'Signature oversized drop-shoulder box cut. True to size.',
    care: 'Cold wash inside out, dry flat in shade. Do not tumble dry.'
  },
  {
    id: 'rad-06',
    title: 'SACRED GEOMETRY BOX-CUT T-SHIRT',
    subtitle: 'Heavyweight 320gsm combed cotton with silver occult sacred geometry rune star mandala',
    category: 't-shirts',
    categoryLabel: 'T-SHIRTS',
    price: 2600,
    compareAtPrice: 3000,
    isSale: false,
    isFeatured: true,
    isHeroSpotlight: false,
    stockLeft: 18,
    badge: 'DARK RITUAL BATCH',
    badgeType: 'yellow',
    images: [
      '/assets/sygil_tshirt_sigil.jpg',
      '/assets/sygil_hoodie_darkritual.jpg',
      '/assets/sygil_hero_cinematic.jpg'
    ],
    colors: [
      { name: 'Vintage Acid Black', hex: '#0a0a0c', img: '/assets/sygil_tshirt_sigil.jpg' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Constructed from a bespoke 320gsm vintage acid-washed cotton. Centered with an intricate silver-metallic sacred geometry star mandala and tonal elder runes along sleeve cuffs.',
    details: [
      '320gsm high-density vintage wash combed cotton jersey',
      'Discharge printed silver occult geometry mandala',
      'Thick 1.25 inch bound collar rib with reinforced shoulder tape',
      'Cash on Delivery pre-order • 0 EGP due at reservation',
      'Handcrafted batch of 66 pieces'
    ],
    fit: 'Wide-box silhouette with extended elbow-length sleeves.',
    care: 'Machine wash cold inside out with like colors.'
  },
  {
    id: 'rad-07',
    title: 'SΨGIL TACTICAL MOTO JACKET',
    subtitle: 'Distressed washed denim & matte lambskin with utility buckles and D-ring straps',
    category: 'jackets',
    categoryLabel: 'JACKETS',
    price: 2600,
    compareAtPrice: 3400,
    isSale: true,
    isFeatured: true,
    isHeroSpotlight: false,
    stockLeft: 8,
    badge: 'HERO ALLOCATION',
    badgeType: 'crimson',
    images: [
      '/assets/sygil_jacket_moto.jpg',
      '/assets/radian_cropped_jacket.jpg',
      '/assets/sygil_story_portrait.jpg'
    ],
    colors: [
      { name: 'Obsidian Washed', hex: '#010000', img: '/assets/sygil_jacket_moto.jpg' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A brutalist convergence of Florentine leather craft and cyber-tactical architecture. Multi-compartment exterior chest & sleeve pockets with custom gunmetal release buckles and D-ring harnesses.',
    details: [
      '14oz washed black denim bonded with full-grain Italian lambskin',
      'Excella two-way gunmetal front zipper and ergonomic moto panels',
      'Adjustable waist cinch straps with engraved SΨGIL hardware',
      'Full breathable silk cupro interior lining',
      '100% Cash On Delivery • Pay courier upon physical inspection'
    ],
    fit: 'Cropped waist with relaxed chest and articulated sleeves.',
    care: 'Specialist dry clean only.'
  },
  {
    id: 'rad-10',
    title: 'INDUSTRIAL MULTI-STRAP CARGO PANTS',
    subtitle: 'Heavyweight wide-leg cargo pants with tactical straps, metal hardware & D-rings',
    category: 'pants',
    categoryLabel: 'PANTS',
    price: 2600,
    compareAtPrice: 3100,
    isSale: false,
    isFeatured: true,
    isHeroSpotlight: false,
    stockLeft: 14,
    badge: 'CORE SILHOUETTE',
    badgeType: 'yellow',
    images: [
      '/assets/sygil_pants_cargo.jpg',
      '/assets/sygil_hero_cinematic.jpg'
    ],
    colors: [
      { name: 'Washed Charcoal Black', hex: '#08080a', img: '/assets/sygil_pants_cargo.jpg' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Engineered for commanding street presence. 12-pocket tactical wide-leg silhouette with dual suspender straps, metal D-rings, modular zip compartments, and adjustable toggle ankles.',
    details: [
      'Heavyweight 380gsm washed twill with distress wash',
      '12 functional utility pockets with reinforced gusset seams',
      'Dual adjustable industrial harness straps with alloy clips',
      'Cinch toggle cords at ankles for flared or jogger profile',
      'Pay cash in EGP directly to courier upon arrival'
    ],
    fit: 'Exaggerated wide-leg drape with high-rise waist.',
    care: 'Machine wash cold, air dry.'
  },

  // ==========================================
  // ATELIER PRE-ORDERS & COMPLEMENTARY GRAILS
  // ==========================================
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
      '/assets/sygil_hero_cinematic.jpg'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0c', img: '/assets/genz_hero_crimson.jpg' },
      { name: 'Cyber Gold Accent', hex: '#ffd312', img: '/assets/sygil_hero_cinematic.jpg' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
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
    badge: '2 ALLOCATIONS LEFT',
    badgeType: 'crimson',
    images: [
      '/assets/hero_runway.jpg',
      '/assets/sygil_story_portrait.jpg'
    ],
    colors: [
      { name: 'Faded Charcoal', hex: '#1a1a1f', img: '/assets/hero_runway.jpg' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
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
  {
    id: 'rad-08',
    title: 'STAND-COLLAR TAILORED LEATHER JACKET',
    subtitle: 'Full-grain Italian nappa with hidden placket and mandarin collar',
    category: 'jackets',
    categoryLabel: 'JACKETS',
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
      '/assets/radian_cropped_jacket.jpg'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#010000', img: '/assets/radian_leather_top.jpg' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Minimalist luxury leather jacket sculpted with a clean mandarin stand collar and concealed magnetic front placket. Architectural curved hem and extended tailored cuffs.',
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
    id: 'rad-04',
    title: 'BOX-CUT HEAVY FRENCH TERRY CREWNECK',
    subtitle: '580gsm organic Peruvian cotton with embossed tonal sigil',
    category: 'hoodies',
    categoryLabel: 'HOODIES',
    price: 2900,
    compareAtPrice: 3400,
    isSale: true,
    isFeatured: false,
    isHeroSpotlight: false,
    stockLeft: 5,
    badge: 'PRE-ORDER FAVORITE',
    badgeType: 'yellow',
    images: [
      '/assets/knit_sweater.jpg',
      '/assets/sygil_tshirt_sigil.jpg'
    ],
    colors: [
      { name: 'Pure Onyx', hex: '#010000', img: '/assets/knit_sweater.jpg' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'The quintessential luxury streetwear crewneck sweatshirt. 580gsm long-staple combed cotton terry with chunky 3-inch ribbed collar, vintage V-insert, and tonal high-density embossed sigil on the chest.',
    details: [
      '580gsm 100% Organic Peruvian Combed Cotton',
      'Wide architectural 3-inch neck ribbing with V-stitch notch',
      'Articulated raglan armhole construction',
      'Doorstep Cash on Delivery handover in EGP'
    ],
    fit: 'Boxy drop-shoulder cut with fitted waist rib.',
    care: 'Machine wash cold inside out.'
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'ALL GRAILS', count: 8 },
  { id: 'hoodies', name: 'HOODIES', count: 3, image: '/assets/sygil_hoodie_darkritual.jpg' },
  { id: 't-shirts', name: 'T-SHIRTS', count: 2, image: '/assets/sygil_tshirt_sigil.jpg' },
  { id: 'jackets', name: 'JACKETS', count: 2, image: '/assets/sygil_jacket_moto.jpg' },
  { id: 'pants', name: 'PANTS', count: 1, image: '/assets/sygil_pants_cargo.jpg' }
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
