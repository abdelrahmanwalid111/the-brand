export const PRESETS = [
  {
    id: 'cyber',
    name: 'SΨGIL RED & GOLD (OFFICIAL)',
    subtitle: 'Primary Red #dc143c + Secondary Gold #d4af37 + Pitch Black',
    badge: 'Official Signature',
    bg: '#000000',
    cardBg: '#0b0b0e',
    accent: '#dc143c',
    secondary: '#d4af37',
    gold: '#d4af37',
    crimson: '#dc143c',
    text: '#ffffff',
    textMuted: '#9a9aa8',
    border: '#dc143c'
  },
  {
    id: 'crimson',
    name: 'CRIMSON OCCULT (RED/GOLD)',
    subtitle: 'Hot Crimson + Liquid Gold + Pitch Black',
    badge: 'Night Drop',
    bg: '#000000',
    cardBg: '#0f0508',
    accent: '#dc143c',
    secondary: '#ffd312',
    gold: '#ffd312',
    crimson: '#dc143c',
    text: '#ffffff',
    textMuted: '#9e8c90',
    border: '#dc143c'
  },
  {
    id: 'raw',
    name: 'RAW SIGIL (HIGH CONTRAST)',
    subtitle: 'Deep Black + Crisp White + Crimson Red',
    badge: 'Monochrome',
    bg: '#000000',
    cardBg: '#0a0a0a',
    accent: '#dc143c',
    secondary: '#d4af37',
    gold: '#d4af37',
    crimson: '#dc143c',
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
  // SHOP PAGE MOCKUP PRODUCTS
  // ==========================================
  {
    id: 'prod-fallen-angel-tee',
    title: 'FALLEN ANGEL TEE',
    subtitle: 'Heavyweight vintage combed cotton with intricate Renaissance winged fallen angel statue engraving',
    category: 't-shirts',
    categoryLabel: 'T-SHIRTS',
    price: 950,
    compareAtPrice: 1300,
    isSale: true,
    isFeatured: true,
    isNew: true,
    stockLeft: 16,
    badge: 'NEW',
    badgeType: 'crimson',
    images: [
      '/assets/fallen_angel_tee.jpg',
      '/assets/sygil_tshirt_sigil.jpg',
      '/assets/sygil_story_portrait.jpg'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#000000', img: '/assets/fallen_angel_tee.jpg' },
      { name: 'Crisp White', hex: '#ffffff', img: '/assets/fallen_angel_tee.jpg' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Constructed from bespoke 340gsm vintage acid-washed combed jersey. The chest features an intricate Renaissance winged fallen angel statue copperplate engraving print. Thick bound collar rib and reinforced shoulder drape.',
    details: [
      '340gsm high-density vintage-washed combed cotton jersey',
      'Intricate discharge engraved fallen angel artwork across front',
      'Double-ply bound 1.25" rib collar with reinforced interior shoulder tape',
      '100% Cash On Delivery • 0 EGP Due Today — Inspect with courier',
      'Archival presentation box & numbered certificate included'
    ],
    fit: 'Drop-shoulder wide box silhouette. True to size.',
    care: 'Machine wash cold inside out. Hang dry in shade.'
  },
  {
    id: 'prod-ritual-hoodie',
    title: 'RITUAL HOODIE',
    subtitle: '650gsm loopback fleece with intricate silver & crimson thorny star sigil embroidery',
    category: 'hoodies',
    categoryLabel: 'HOODIES',
    price: 1650,
    compareAtPrice: 2100,
    isSale: true,
    isFeatured: true,
    isNew: true,
    stockLeft: 12,
    badge: 'NEW',
    badgeType: 'crimson',
    images: [
      '/assets/ritual_hoodie.jpg',
      '/assets/sygil_hoodie_darkritual.jpg',
      '/assets/blood_ritual_hoodie.jpg'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#000000', img: '/assets/ritual_hoodie.jpg' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'A masterpiece of dark brutalist streetwear. 650gsm Italian combed loopback cotton fleece, centered on back with an ornate thorny occult star sigil and ancient elder runes embroidered in distressed silver metallic and blood red threads.',
    details: [
      '650gsm heavy brushed loopback Italian fleece',
      'Over 90,000 stitches of high-density metallic and crimson embroidery on back',
      'Double-layered structured hood that holds its sculptural contour without drawstrings',
      'Cash on Delivery pre-order • Pay courier upon physical arrival',
      'Strict run limited to 66 allocated pieces'
    ],
    fit: 'Exaggerated boxy oversized silhouette with dropped shoulders.',
    care: 'Cold delicate wash inside out. Dry flat.'
  },
  {
    id: 'prod-shadow-cargo-pants',
    title: 'SHADOW CARGO PANTS',
    subtitle: 'Heavyweight wide-leg tactical pants with 12 3D flap pockets and hanging harness webbing',
    category: 'pants',
    categoryLabel: 'PANTS',
    price: 1450,
    compareAtPrice: 1900,
    isSale: true,
    isFeatured: true,
    isNew: true,
    stockLeft: 9,
    badge: 'NEW',
    badgeType: 'crimson',
    images: [
      '/assets/shadow_cargo_pants.jpg',
      '/assets/sygil_pants_cargo.jpg'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#000000', img: '/assets/shadow_cargo_pants.jpg' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Engineered for maximum street impact. Constructed from durable 380gsm acid-washed twill. Features 12 three-dimensional bellow cargo pockets, gunmetal D-ring attachments, adjustable harness webbing, and ankle cinch toggles.',
    details: [
      '380gsm reinforced tactical twill with enzyme stone wash',
      '12 functional utility pockets with heavy snap button flaps',
      'Dual adjustable industrial harness straps with alloy D-rings',
      'Elasticated drawcord toggles at ankles for variable taper',
      '100% Cash On Delivery • Inspect before payment'
    ],
    fit: 'Voluminous wide-leg drape with relaxed high-rise waist.',
    care: 'Cold wash, air dry.'
  },
  {
    id: 'prod-obsidian-jacket',
    title: 'OBSIDIAN JACKET',
    subtitle: 'Distressed washed black denim moto jacket with 3D cargo pockets & silver metal buckles',
    category: 'jackets',
    categoryLabel: 'JACKETS',
    price: 2250,
    compareAtPrice: 2900,
    isSale: true,
    isFeatured: true,
    isNew: true,
    stockLeft: 7,
    badge: 'NEW',
    badgeType: 'crimson',
    images: [
      '/assets/obsidian_jacket.jpg',
      '/assets/sygil_jacket_moto.jpg'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#000000', img: '/assets/obsidian_jacket.jpg' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'A heavyweight convergence of Florentine leather craftsmanship and brutalist tactical denim. Features 14oz black washed denim bonded with matte lambskin shoulder panels, four 3D front utility flap compartments with dual silver release buckles, and a high moto collar.',
    details: [
      '14oz washed black bull denim bonded with full-grain Italian lambskin',
      'Quad front cargo pockets with custom quick-release gunmetal buckles',
      'Two-way heavy industrial front zipper with ergonomic leather pull',
      'Full breathable silk cupro interior lining',
      '100% Cash On Delivery • Pay courier upon delivery'
    ],
    fit: 'Structured cropped moto profile with articulated sleeve drape.',
    care: 'Specialist dry clean only.'
  },
  {
    id: 'prod-crimson-cross-tee',
    title: 'CRIMSON CROSS TEE',
    subtitle: 'Heavyweight black combed tee with glowing crimson red thorny gothic cross graphic print',
    category: 't-shirts',
    categoryLabel: 'T-SHIRTS',
    price: 1100,
    compareAtPrice: 1500,
    isSale: true,
    isFeatured: true,
    isNew: true,
    stockLeft: 15,
    badge: 'NEW',
    badgeType: 'crimson',
    images: [
      '/assets/crimson_cross_tee.jpg',
      '/assets/fallen_angel_tee.jpg'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#000000', img: '/assets/crimson_cross_tee.jpg' },
      { name: 'Crimson Red', hex: '#dc143c', img: '/assets/crimson_cross_tee.jpg' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Intense gothic occultism realized in pure cotton. 320gsm vintage combed jersey centered with a magnificent medieval thorny gothic cross rendered in layered blood red and oxidized silver metallic discharge inks.',
    details: [
      '320gsm premium dense combed cotton with vintage mineral wash',
      'Discharge printed crimson cross with soft-hand textural finish',
      'Reinforced twin-needle stitching on hem and cuffs',
      '100% Cash On Delivery • Inspect with courier',
      'Strict run limited to 80 pieces'
    ],
    fit: 'Boxy drop-shoulder cut with elbow-length sleeves.',
    care: 'Machine wash cold inside out.'
  },
  {
    id: 'prod-blood-ritual-hoodie',
    title: 'BLOOD RITUAL HOODIE',
    subtitle: '700gsm loopback hoodie with celestial occult compass star mandala in crimson ink',
    category: 'hoodies',
    categoryLabel: 'HOODIES',
    price: 1850,
    compareAtPrice: 2400,
    isSale: true,
    isFeatured: true,
    isNew: true,
    stockLeft: 11,
    badge: 'NEW',
    badgeType: 'crimson',
    images: [
      '/assets/blood_ritual_hoodie.jpg',
      '/assets/ritual_hoodie.jpg'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#000000', img: '/assets/blood_ritual_hoodie.jpg' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Crafted from custom 700gsm loopback fleece with a brushed peach interior. Centered on back with an extensive celestial occult compass sigil and astrological glyphs in vivid crimson screen ink.',
    details: [
      '700gsm ultra-dense brushed loopback cotton',
      'Oversized back discharge celestial compass and planetary glyphs',
      'Seamless concealed kangaroo pocket with hidden headphone pass',
      'Pay Cash to courier upon inspection',
      'Archival presentation box included'
    ],
    fit: 'Heavy drape, oversized box cut.',
    care: 'Cold wash, do not tumble dry.'
  },
  {
    id: 'prod-signature-t-shirt',
    title: 'SIGNATURE T-SHIRT',
    subtitle: '320gsm acid-washed cotton with silver sacred geometry star mandala print',
    category: 't-shirts',
    categoryLabel: 'T-SHIRTS',
    price: 1350,
    compareAtPrice: 1700,
    isSale: false,
    isFeatured: true,
    isNew: false,
    stockLeft: 20,
    badge: 'ICONIC',
    badgeType: 'crimson',
    images: [
      '/assets/sygil_tshirt_sigil.jpg',
      '/assets/fallen_angel_tee.jpg'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#000000', img: '/assets/sygil_tshirt_sigil.jpg' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'The foundation piece of the SΨGIL occult archive. Heavyweight 320gsm cotton with discharge printed silver sacred geometry emblem.',
    details: [
      '320gsm high-density vintage wash combed cotton jersey',
      'Discharge printed silver occult geometry mandala',
      'Thick 1.25 inch bound collar rib with reinforced shoulder tape',
      'Cash on Delivery pre-order • 0 EGP due at reservation'
    ],
    fit: 'Wide-box silhouette with extended elbow-length sleeves.',
    care: 'Machine wash cold inside out with like colors.'
  },
  {
    id: 'prod-shadow-hoodie',
    title: 'SHADOW HOODIE',
    subtitle: '650gsm acid-washed fleece with raised cuneiform embossing & sleeve runes',
    category: 'hoodies',
    categoryLabel: 'HOODIES',
    price: 1950,
    compareAtPrice: 2500,
    isSale: false,
    isFeatured: true,
    isNew: false,
    stockLeft: 14,
    badge: 'SIGNATURE',
    badgeType: 'crimson',
    images: [
      '/assets/sygil_hoodie_darkritual.jpg',
      '/assets/ritual_hoodie.jpg'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#000000', img: '/assets/sygil_hoodie_darkritual.jpg' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Heavyweight acid-washed fleece with raised Sumerian cuneiform embossing across chest and tonal runes along sleeve contours.',
    details: [
      'Acid-washed black fleece with 650gsm Italian combed loopback cotton',
      'Raised hieroglyphic cuneiform embossing across chest & hood contour',
      '100% Cash On Delivery • 0 EGP Due Today — Inspect with courier'
    ],
    fit: 'Signature oversized drop-shoulder box cut.',
    care: 'Cold wash inside out, dry flat in shade.'
  },
  {
    id: 'prod-tactical-pants',
    title: 'TACTICAL PANTS',
    subtitle: '12-pocket tactical wide-leg pants with dual suspender straps & D-rings',
    category: 'pants',
    categoryLabel: 'PANTS',
    price: 1800,
    compareAtPrice: 2200,
    isSale: false,
    isFeatured: true,
    isNew: false,
    stockLeft: 12,
    badge: 'CORE',
    badgeType: 'crimson',
    images: [
      '/assets/sygil_pants_cargo.jpg',
      '/assets/shadow_cargo_pants.jpg'
    ],
    colors: [
      { name: 'Washed Charcoal Black', hex: '#08080a', img: '/assets/sygil_pants_cargo.jpg' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: '12-pocket tactical wide-leg silhouette with dual suspender straps, metal D-rings, modular zip compartments, and adjustable toggle ankles.',
    details: [
      'Heavyweight 380gsm washed twill with distress wash',
      '12 functional utility pockets with reinforced gusset seams',
      'Pay cash in EGP directly to courier upon arrival'
    ],
    fit: 'Exaggerated wide-leg drape with high-rise waist.',
    care: 'Machine wash cold, air dry.'
  },
  {
    id: 'prod-sygil-jacket',
    title: 'SYGIL JACKET',
    subtitle: 'Distressed washed denim & matte lambskin with utility buckles and D-ring straps',
    category: 'jackets',
    categoryLabel: 'JACKETS',
    price: 2450,
    compareAtPrice: 3200,
    isSale: false,
    isFeatured: true,
    isNew: false,
    stockLeft: 8,
    badge: 'ATELIER',
    badgeType: 'crimson',
    images: [
      '/assets/sygil_jacket_moto.jpg',
      '/assets/obsidian_jacket.jpg'
    ],
    colors: [
      { name: 'Obsidian Washed', hex: '#010000', img: '/assets/sygil_jacket_moto.jpg' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'A brutalist convergence of Florentine leather craft and cyber-tactical architecture with gunmetal release buckles.',
    details: [
      '14oz washed black denim bonded with full-grain Italian lambskin',
      'Excella two-way gunmetal front zipper and ergonomic moto panels',
      '100% Cash On Delivery • Pay courier upon physical inspection'
    ],
    fit: 'Cropped waist with relaxed chest and articulated sleeves.',
    care: 'Specialist dry clean only.'
  },
  {
    id: 'prod-tactical-bag',
    title: 'TACTICAL CROSSBODY BAG',
    subtitle: 'Brutalist ballistic nylon & matte calfskin crossbody sling bag with alloy buckle',
    category: 'accessories',
    categoryLabel: 'ACCESSORIES',
    price: 850,
    compareAtPrice: 1100,
    isSale: true,
    isFeatured: false,
    isNew: true,
    stockLeft: 22,
    badge: 'NEW',
    badgeType: 'crimson',
    images: [
      '/assets/leather_bag.jpg'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#000000', img: '/assets/leather_bag.jpg' }
    ],
    sizes: ['OS'],
    description: 'Constructed from weather-resistant 1000D ballistic nylon and reinforced calfskin. Features quick-release aircraft-grade aluminum cobra buckle and internal organizer compartments.',
    details: [
      '1000D ballistic nylon with matte full-grain calfskin trim',
      'Aircraft-grade alloy quick-release buckle',
      'Padded adjustable shoulder strap with tactical webbing loops',
      'Pay cash on delivery to courier'
    ],
    fit: 'One size fits all. Fully adjustable strap.',
    care: 'Wipe clean with damp cloth.'
  },
  {
    id: 'prod-occult-star-necklace',
    title: 'OCCULT STAR PENDANT',
    subtitle: 'Solid 925 sterling silver eight-pointed occult star pendant on heavy curb chain',
    category: 'accessories',
    categoryLabel: 'ACCESSORIES',
    price: 650,
    compareAtPrice: 850,
    isSale: true,
    isFeatured: false,
    isNew: true,
    stockLeft: 18,
    badge: 'STERLING SILVER',
    badgeType: 'crimson',
    images: [
      '/assets/occult_star_necklace.jpg'
    ],
    colors: [
      { name: 'Oxidized Silver', hex: '#8c8c9e', img: '/assets/occult_star_necklace.jpg' }
    ],
    sizes: ['50CM', '60CM'],
    description: 'Individually cast in solid 925 sterling silver with hand-applied oxidation. Displays an eight-pointed occult sacred geometry star encircled by elder futhark runes.',
    details: [
      'Solid 925 Sterling Silver with oxidized antique finish',
      'Heavy 3.5mm diamond-cut curb chain with custom SΨGIL clasp',
      'Pendant diameter: 32mm • Total weight: 28 grams',
      'Packaged in velvet jewelry pouch and gift box'
    ],
    fit: 'Available in 50cm (collar) and 60cm (chest) lengths.',
    care: 'Polish gently with included microfiber cloth.'
  },
  {
    id: 'prod-runic-cap',
    title: 'RUNIC EMBROIDERED CAP',
    subtitle: 'Distressed washed black cotton dad cap with 3D white embroidered occult sigil',
    category: 'accessories',
    categoryLabel: 'ACCESSORIES',
    price: 550,
    compareAtPrice: 750,
    isSale: false,
    isFeatured: false,
    isNew: true,
    stockLeft: 25,
    badge: 'NEW',
    badgeType: 'crimson',
    images: [
      '/assets/runic_cap.jpg'
    ],
    colors: [
      { name: 'Vintage Acid Black', hex: '#000000', img: '/assets/runic_cap.jpg' }
    ],
    sizes: ['ADJUSTABLE'],
    description: 'Custom enzyme-washed 100% heavyweight cotton twill with distressed brim grinding. High-density 3D puff embroidered occult star mandala on front and arched SΨGIL logo on back.',
    details: [
      '100% vintage mineral-washed cotton twill with hand-distressed brim',
      'High-density 3D puff white embroidery on crown',
      'Antique brass buckle cinch backstrap',
      'Unstructured 6-panel relaxed profile'
    ],
    fit: 'Adjustable strap fits head sizes 54cm–62cm.',
    care: 'Spot clean only.'
  },
  {
    id: 'prod-ornate-buckle-belt',
    title: 'CARVED ORNATE BUCKLE BELT',
    subtitle: 'Thick full-grain Italian bridle leather with heavy antique silver carved occult buckle',
    category: 'accessories',
    categoryLabel: 'ACCESSORIES',
    price: 900,
    compareAtPrice: 1200,
    isSale: true,
    isFeatured: false,
    isNew: true,
    stockLeft: 14,
    badge: 'HAND-CARVED',
    badgeType: 'crimson',
    images: [
      '/assets/ornate_buckle_belt.jpg'
    ],
    colors: [
      { name: 'Full-Grain Black', hex: '#000000', img: '/assets/ornate_buckle_belt.jpg' }
    ],
    sizes: ['85CM', '95CM', '105CM'],
    description: 'Crafted from 4mm thick vegetable-tanned Italian bridle leather with beveled hand-burnished edges. Centered with an exquisite antique silver carved plate buckle featuring raven and sacred pentacle motifs.',
    details: [
      '4mm thick full-grain Italian vegetable-tanned leather',
      'Heavyweight cast alloy buckle with antique silver oxidation',
      '1.5 inch (38mm) width suitable for denim and cargo loops',
      'Subtle debossed SΨGIL runes along belt tip'
    ],
    fit: 'Order your true waist size. 5 adjustable hole notches.',
    care: 'Treat with leather balm periodically.'
  },
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
  { id: 'all', name: 'All Products', count: 32 },
  { id: 't-shirts', name: 'T-Shirts', count: 8, image: '/assets/fallen_angel_tee.jpg' },
  { id: 'hoodies', name: 'Hoodies', count: 8, image: '/assets/ritual_hoodie.jpg' },
  { id: 'jackets', name: 'Jackets', count: 6, image: '/assets/obsidian_jacket.jpg' },
  { id: 'pants', name: 'Pants', count: 4, image: '/assets/shadow_cargo_pants.jpg' },
  { id: 'accessories', name: 'Accessories', count: 6, image: '/assets/occult_star_necklace.jpg' }
];

export const LOOKBOOK_HOTSPOTS = [
  {
    id: 'hs-1',
    x: 48,
    y: 19,
    title: 'SΨGIL TACTICAL MOTO JACKET',
    shortLabel: 'TACTICAL MOTO JACKET',
    category: 'JACKETS',
    price: 2600,
    productId: 'rad-07',
    image: '/assets/sygil_jacket_moto.jpg',
    desc: 'Pre-order Batch 01 • Matte Italian lambskin with asymmetric Excella zip'
  },
  {
    id: 'hs-2',
    x: 52,
    y: 36,
    title: 'DARK RITUAL 650GSM HOODIE',
    shortLabel: 'DARK RITUAL HOODIE',
    category: 'HOODIES',
    price: 2600,
    productId: 'rad-01',
    image: '/assets/sygil_hoodie_darkritual.jpg',
    desc: 'Double-ply structured hood with loopback French terry'
  },
  {
    id: 'hs-3',
    x: 45,
    y: 70,
    title: 'INDUSTRIAL MULTI-STRAP CARGO PANTS',
    shortLabel: 'MULTI-STRAP CARGOS',
    category: 'PANTS',
    price: 2600,
    productId: 'rad-10',
    image: '/assets/sygil_pants_cargo.jpg',
    desc: 'Heavyweight wide-leg cargo with tactical straps and metal hardware'
  },
  {
    id: 'hs-4',
    x: 56,
    y: 91,
    title: 'BOX-CUT HEAVY FRENCH TERRY CREWNECK',
    shortLabel: 'TERRY CREWNECK',
    category: 'HOODIES',
    price: 2900,
    productId: 'rad-04',
    image: '/assets/knit_sweater.jpg',
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
