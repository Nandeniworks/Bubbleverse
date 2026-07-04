export interface StoryBeat {
  num: string;
  subtitle: string;
  title: string;
  description: string;
}

export interface Flavor {
  id: string;
  name: string;
  title: string;
  description: string;
  framePath: string;
  totalFrames: number;
  backgroundColor: string;
  accentColor: string;
  titleColor: string;
  subtitleColor: string;
  bodyColor: string;
  startFrame?: number; // 0-based or 1-based start frame index
  beats: StoryBeat[];
}

export const FLAVORS: Flavor[] = [
  {
    id: "brown-sugar",
    name: "Brown Sugar",
    title: "Brown Sugar Boba Tea",
    description: "A meticulous layering of organic velvet cream, caramelized Okinawa Kokuto syrup, and slow-cooked boba pearls. Experience liquid luxury in motion.",
    framePath: "/sequences/Brown-Sugar/frame_{num}.webp",
    totalFrames: 120,
    backgroundColor: "#000000",
    accentColor: "#B56A2D",
    titleColor: "#D8A16B",
    subtitleColor: "#C68C55",
    bodyColor: "#E6C9A7",
    startFrame: 0,
    beats: [
      {
        num: "01",
        subtitle: "The Levitation",
        title: "A study in gravity.",
        description: "The premium hand-blown glass cup gently floats in space, illuminated by soft studio lighting. A moment of quiet elegance before the fusion."
      },
      {
        num: "02",
        subtitle: "The Marbling",
        title: "Slow-drip marbling.",
        description: "Caramelized brown sugar syrup begins to swirl and weave through fresh, cold organic milk, creating a slow-motion dance of rich amber marbling."
      },
      {
        num: "03",
        subtitle: "The Infusion",
        title: "Elements in motion.",
        description: "Glossy, slow-cooked tapioca pearls rise gracefully, surrounded by rotating ice cubes and dramatic splashes of milk, suspended in a frozen dynamic burst."
      },
      {
        num: "04",
        subtitle: "The Hero",
        title: "Pure indulgence.",
        description: "The liquid symphony reaches its peak. A perfect, high-end editorial beverage composition frozen in crystal-clear studio perfection."
      }
    ]
  },
  {
    id: "matcha",
    name: "Matcha",
    title: "Uji Matcha Latte",
    description: "Stone-ground Uji matcha whisked with creamy organic milk and sweet tapioca pearls. An elegant harmony of earthy notes and velvety sweetness.",
    framePath: "/sequences/Matcha/ezgif-frame-{num}.jpg",
    totalFrames: 240,
    backgroundColor: "#061a0d",
    accentColor: "#5B8045",
    titleColor: "#8DAF63",
    subtitleColor: "#769951",
    bodyColor: "#C7D9B5",
    startFrame: 1,
    beats: [
      {
        num: "01",
        subtitle: "The Awakening",
        title: "Ceremonial preparation.",
        description: "A premium bamboo whisk rests beside a hand-carved stone bowl, preparing for the rich green infusion."
      },
      {
        num: "02",
        subtitle: "The Swirl",
        title: "Earthy marble.",
        description: "Thick, stone-ground Uji matcha starts to cascade into organic milk, painting emerald curls in slow motion."
      },
      {
        num: "03",
        subtitle: "The Whisk",
        title: "Frothy texture.",
        description: "Delicate matcha foam meets sweet tapioca, creating a dense, velvety suspension of green tea complexity."
      },
      {
        num: "04",
        subtitle: "The Zen",
        title: "Perfect harmony.",
        description: "The ultimate green tea latte composition, capturing organic texture and deep tradition in a single frame."
      }
    ]
  },
  {
    id: "strawberry",
    name: "Strawberry",
    title: "Strawberry Cream Infusion",
    description: "Fresh organic strawberries cooked into a sweet compote, layered with rich cold cream and soft tapioca pearls. A vibrant, fruity sensation.",
    framePath: "/sequences/Strawberry/ezgif-frame-{num}.jpg",
    totalFrames: 240,
    backgroundColor: "#1a0a0d",
    accentColor: "#C2546E",
    titleColor: "#D67A8A",
    subtitleColor: "#C56475",
    bodyColor: "#F1C8D0",
    startFrame: 1,
    beats: [
      {
        num: "01",
        subtitle: "The Harvest",
        title: "Fresh selections.",
        description: "Ripe, hand-picked organic strawberries washed and simmered into a dense, ruby-red compote."
      },
      {
        num: "02",
        subtitle: "The Crimson Cloud",
        title: "Sweet marbling.",
        description: "Vibrant strawberry syrup slowly swirls through sweet organic cream, forming soft pink waves."
      },
      {
        num: "03",
        subtitle: "The Burst",
        title: "Fruity cascade.",
        description: "Glossy caramel pearls and sliced strawberries rise through cold milk in a spectacular splash."
      },
      {
        num: "04",
        subtitle: "The Nectar",
        title: "Vibrant indulgence.",
        description: "A premium, high-end fruit-and-cream composition that captures summer freshness in a luxury portrait."
      }
    ]
  },
  {
    id: "blueberry",
    name: "Blueberry",
    title: "Wild Blueberry Swirl",
    description: "Intense wild blueberry puree swirled through organic milk and chewy tapioca pearls. A deep, rich berry infusion of sweet and tart layers.",
    framePath: "/sequences/Blueberry/ezgif-frame-{num}.jpg",
    totalFrames: 240,
    backgroundColor: "#05071a",
    accentColor: "#5263A8",
    titleColor: "#6C7ED8",
    subtitleColor: "#5B6DC8",
    bodyColor: "#CAD3F7",
    startFrame: 1,
    beats: [
      {
        num: "01",
        subtitle: "The Infusion",
        title: "Wild berries.",
        description: "Deep, tart wild blueberry compote rests at the base, awaiting the organic milk pour."
      },
      {
        num: "02",
        subtitle: "The Violet Mist",
        title: "Indigo swirl.",
        description: "Rich blueberry puree begins to spread, creating a beautiful lavender-and-blue marbling effect."
      },
      {
        num: "03",
        subtitle: "The Surge",
        title: "Berry collision.",
        description: "Plump wild blueberries and tapioca pearls float alongside clear ice, suspended in a cool milky wave."
      },
      {
        num: "04",
        subtitle: "The Midnight",
        title: "Deep complexity.",
        description: "A midnight-blue editorial masterpiece representing the perfect balance of sweet, tart, and creamy layers."
      }
    ]
  },
  {
    id: "taro",
    name: "Taro",
    title: "Bespoke Taro Velvet",
    description: "Slow-roasted sweet taro root pureed with pasture-raised milk and warm tapioca pearls. A comforting, nutty, and velvety lavender dream.",
    framePath: "/sequences/Taro/ezgif-frame-{num}.jpg",
    totalFrames: 169,
    backgroundColor: "#110b1a",
    accentColor: "#9D80B5",
    titleColor: "#A582D6",
    subtitleColor: "#916AC8",
    bodyColor: "#E5D8F7",
    startFrame: 1,
    beats: [
      {
        num: "01",
        subtitle: "The Roots",
        title: "Nutty heritage.",
        description: "Slow-roasted sweet taro root pureed into a rich, starchy cream, warm and comforting."
      },
      {
        num: "02",
        subtitle: "The Pastel Swirl",
        title: "Lavender marbling.",
        description: "Thick violet taro paste begins to weave through organic milk, creating a soft, cloud-like lavender sky."
      },
      {
        num: "03",
        subtitle: "The Rise",
        title: "Starchy velvet.",
        description: "Soft tapioca pearls rise through thick taro cream, suspended in a warm, nutty organic fusion."
      },
      {
        num: "04",
        subtitle: "The Dream",
        title: "Soothing canvas.",
        description: "A comforting, dreamy lavender masterpiece that blends nutty aroma and velvety texture in visual perfection."
      }
    ]
  }
];
