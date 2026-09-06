export interface CarModel {
  id: string;
  name: string;
  tagline: string;
  category: 'Hypercar' | 'Track' | 'E-Performance' | 'Heritage';
  hp: number;
  zeroToSixty: number;
  topSpeed: number;
  range?: string;
  battery?: string;
  weight: number;
  downforce: number;
  price: string;
  image: string;
  accentColor: string;
  description: string;
  features: string[];
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  glowHex: string;
  filterStyle?: string;
}

export const CAR_MODELS: CarModel[] = [
  {
    id: 'mission-x',
    name: 'Porsche Mission X',
    tagline: 'The Reinvention of the Hypercar',
    category: 'Hypercar',
    hp: 1520,
    zeroToSixty: 1.79,
    topSpeed: 235,
    range: '310 miles',
    battery: '900V High-Performance Architecture',
    weight: 1520,
    downforce: 860,
    price: '$2,400,000',
    image: '/images/hero_car_front.png',
    accentColor: '#00F2FE',
    description: 'A beacon of technological innovation. Mission X delivers a 1:1 power-to-weight ratio with 1,520 PS, downforce exceeding the 911 GT3 RS, and record-breaking 900V charging efficiency.',
    features: ['1:1 Power to Weight Ratio', 'Active Aero Wings', 'Carbon Fiber Monocoque', 'e-Motor Mid-Battery Concept']
  },
  {
    id: 'taycan-turbo-gt',
    name: 'Taycan Turbo GT',
    tagline: 'Record-Breaking Electric Beast',
    category: 'E-Performance',
    hp: 1092,
    zeroToSixty: 2.1,
    topSpeed: 180,
    range: '344 miles',
    battery: '105 kWh Performance Plus',
    weight: 2290,
    downforce: 220,
    price: '$230,000',
    image: '/images/car_side_profile.png',
    accentColor: '#E10600',
    description: 'The fastest series-production electric car at the Nürburgring. Equipped with Weissach package, Attack Mode pushing 1,092 HP, and Porsche Active Ride suspension.',
    features: ['Attack Mode (10s 120kW boost)', 'Weissach Lightweight Aero', 'Porsche Active Ride', 'Carbon Ceramic Brakes (PCCB)']
  },
  {
    id: 'gt3-rs',
    name: '911 GT3 RS',
    tagline: 'Pure Motorsport DNA',
    category: 'Track',
    hp: 518,
    zeroToSixty: 3.0,
    topSpeed: 184,
    weight: 1450,
    downforce: 860,
    price: '$241,300',
    image: '/images/car_side_profile.png',
    accentColor: '#38EF7D',
    description: 'Designed purely for track dominance. Featuring active DRS (Drag Reduction System), atmospheric 4.0L naturally aspirated engine, and extreme lightweight carbon construction.',
    features: ['DRS Rear Wing System', '4.0L High-Rev N/A Flat-6', 'Adjustable Suspension Damping', 'Magnesium Wheel Package']
  },
  {
    id: '918-spyder',
    name: '918 Spyder Concept',
    tagline: 'The Icon of E-Hybrid Performance',
    category: 'Heritage',
    hp: 887,
    zeroToSixty: 2.5,
    topSpeed: 214,
    range: '18 miles (EV mode)',
    weight: 1634,
    downforce: 450,
    price: '$1,850,000',
    image: '/images/hero_car_front.png',
    accentColor: '#D4AF37',
    description: 'The halo hypercar that pioneered high-voltage hybrid powertrain engineering. Top-pipe exhaust system with 4.6L V8 and dual electric motors.',
    features: ['Top-Pipe Exhaust Architecture', 'Dual Axle Electric Drive', 'Carbon Monocoque Chassis', 'Acid Green Brake Calipers']
  }
];

export const COLOR_OPTIONS: ColorOption[] = [
  { id: 'silver', name: 'Liquid Metal Silver', hex: '#C0C0C0', glowHex: '#E2E8F0' },
  { id: 'red', name: 'Guards Red', hex: '#E10600', glowHex: '#FF4D4D', filterStyle: 'hue-rotate(-30deg) saturate(1.8)' },
  { id: 'cyan', name: 'Neptune Cyan', hex: '#00F2FE', glowHex: '#38BDF8', filterStyle: 'hue-rotate(180deg) saturate(1.5)' },
  { id: 'gold', name: 'Weissach Gold', hex: '#D4AF37', glowHex: '#FACC15', filterStyle: 'hue-rotate(40deg) sepia(0.8)' },
  { id: 'dark', name: 'Midnight Onyx', hex: '#1E293B', glowHex: '#64748B', filterStyle: 'brightness(0.6) contrast(1.3)' },
];

export const AERO_HOTSPOTS = [
  {
    id: 1,
    title: 'Active DRS Rear Wing',
    subtitle: 'Adaptive Downforce Control',
    description: 'Generates over 860 kg of downforce at 177 mph. Features hydraulic DRS flap that opens automatically under full throttle.',
    x: '75%',
    y: '30%',
  },
  {
    id: 2,
    title: '900V e-Battery Architecture',
    subtitle: 'Ultra-Fast Energy Storage',
    description: 'Positioned behind the seats for optimal center of gravity. Charges from 10% to 80% in under 12 minutes.',
    x: '50%',
    y: '55%',
  },
  {
    id: 3,
    title: 'Carbon Ceramic Brakes (PCCB)',
    subtitle: 'Track-Grade Braking Force',
    description: '10-piston aluminum monobloc calipers clamped onto 420mm ceramic composite ventilated discs.',
    x: '25%',
    y: '65%',
  },
  {
    id: 4,
    title: 'Matrix LED Quad-Headlights',
    subtitle: 'Active High-Beam Assist',
    description: '32,000 individually controlled micro-LED pixels per headlight projecting dynamic track telemetry lighting onto the road.',
    x: '15%',
    y: '42%',
  }
];
