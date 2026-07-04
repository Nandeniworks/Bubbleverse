"use client";

import { useState, useRef } from "react";
import { useScroll, useMotionValueEvent, motion, useTransform, MotionValue } from "framer-motion";
import BobaTeaHero from "@/components/BobaTeaHero";
import BubbleCursor from "@/components/BubbleCursor";
import ParticleBackground from "@/components/ParticleBackground";
import CondensationDroplets from "@/components/CondensationDroplets";
import OriginMap from "@/components/OriginMap";
import EndingScreen from "@/components/EndingScreen";
import { FLAVORS, Flavor } from "@/config/flavors";

// Dynamic ingredients data lookup
const INGREDIENTS_DATA: Record<string, { name: string; desc: string }[]> = {
  "brown-sugar": [
    { name: "Velvet Cream", desc: "Pasture-raised fresh organic milk and cold sweet cream." },
    { name: "Kokuto Syrup", desc: "Smoky, caramelized Okinawa sugarcane syrup glaze." },
    { name: "Jasmine Tea", desc: "Fragrant, high-mountain organic jasmine green tea base." },
    { name: "Tapioca Pearls", desc: "Warm, slow-boiled pearls infused with dark Kokuto caramel." },
    { name: "Crystal Spheres", desc: "Slow-frozen filtered ice spheres that cool without diluting." },
  ],
  "matcha": [
    { name: "Pasture Milk", desc: "Cold organic pasture milk that balances the rich green tea." },
    { name: "Uji Matcha", desc: "Ceremonial green tea leaves ground into a velvety bright emulsion." },
    { name: "Honey Glaze", desc: "Wildflower honey simmered with warm tapioca pearls." },
    { name: "Matcha Cubes", desc: "Frozen matcha tea cubes that preserve flavor as they melt." },
    { name: "Organic Cane", desc: "A touch of pure raw sugar syrup to lift the vegetal notes." },
  ],
  "strawberry": [
    { name: "Sweet Cream", desc: "Cloud-like cream layers poured over organic whole milk." },
    { name: "Strawberry Compote", desc: "Fresh organic strawberries simmered slow into a rich fruit nectar." },
    { name: "Floral Jasmine", desc: "Fragrant jasmine green tea for a delicate, aromatic background." },
    { name: "Berry Pearls", desc: "Soft tapioca pearls simmered with sweet strawberry juice." },
    { name: "Crushed Ice", desc: "Pure filtered ice flakes that create a refreshing frost." },
  ],
  "blueberry": [
    { name: "Pasteur Milk", desc: "Rich pasture-raised milk that creates a beautiful purple swirl." },
    { name: "Blueberry Puree", desc: "Intense wild blueberry pulp cooked down with raw cane sugar." },
    { name: "Earl Grey Tea", desc: "Premium bergamot-infused tea that adds citrus-floral complexity." },
    { name: "Amber Pearls", desc: "Soft tapioca pearls simmered with dark brown molasses." },
    { name: "Slow Ice", desc: "Dense, slow-melting ice blocks to lock in the temperature." },
  ],
  "taro": [
    { name: "Taro Cream", desc: "Pasture milk blended with slow-roasted sweet taro root puree." },
    { name: "Toasted Oolong", desc: "Semi-oxidized charcoal tea with nutty roasted notes." },
    { name: "Taro Flour Pearls", desc: "House-crafted pearls made with real purple taro starch." },
    { name: "Coconut Cream", desc: "Rich organic coconut milk for tropical velvety notes." },
    { name: "Ice Spheres", desc: "Spherical filtered ice to cool the thick, dense beverage." },
  ],
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor>(FLAVORS[0]);
  const [showEnding, setShowEnding] = useState(false);

  // Track global scroll progress of the entire page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Dynamically change active flavor based on scroll thresholds
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // There are 5 flavor segments (0..2000vh) + 1 ending segment (2000vh..2100vh).
    // The flavors take up the range 0 to 0.952.
    if (latest < 0.952) {
      const totalFlavors = FLAVORS.length;
      const scaledProgress = latest / 0.952;
      const index = Math.min(totalFlavors - 1, Math.floor(scaledProgress * totalFlavors));
      if (FLAVORS[index] && FLAVORS[index].id !== selectedFlavor.id) {
        setSelectedFlavor(FLAVORS[index]);
      }
    }
    
    // Toggle ending screen visibility
    setShowEnding(latest >= 0.95);
  });

  // Jump to specific flavor section by scrolling the window
  const scrollToSection = (index: number) => {
    window.scrollTo({
      top: index * window.innerHeight * 4,
      behavior: "smooth"
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen text-[#E7D8C9] font-sans transition-colors duration-1000 ease-in-out select-none"
      style={{ 
        backgroundColor: showEnding ? "#000000" : selectedFlavor.backgroundColor,
        height: `${FLAVORS.length * 400 + 100}vh` // 5 * 400vh + 100vh = 2100vh
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .dynamic-accent-text {
          color: ${selectedFlavor.accentColor} !important;
        }
        .dynamic-accent-border {
          border-color: ${selectedFlavor.accentColor} !important;
        }
        .dynamic-accent-bg {
          background-color: ${selectedFlavor.accentColor} !important;
        }
        .dynamic-accent-hover-text:hover {
          color: ${selectedFlavor.accentColor} !important;
        }
        .dynamic-accent-hover:hover {
          background-color: ${selectedFlavor.accentColor} !important;
          border-color: ${selectedFlavor.accentColor} !important;
          color: black !important;
        }
        .hover-shadow-accent:hover {
          box-shadow: 0 10px 20px -3px ${selectedFlavor.accentColor}40 !important;
        }
        .hover-card-accent:hover {
          border-color: ${selectedFlavor.accentColor}66 !important;
        }
      `}} />

      {/* 1. Custom Interactive Cursor Bubbles */}
      <BubbleCursor />

      {/* 2. Dynamic Flavor-Themed Background Particles */}
      {!showEnding && <ParticleBackground selectedFlavorId={selectedFlavor.id} />}

      {/* 3. Condensation Water Droplets Overlay */}
      {!showEnding && <CondensationDroplets />}

      {/* Fixed Minimal Branding Header */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center pointer-events-none">
        <a
          href="#"
          className="font-serif text-lg md:text-xl tracking-[0.25em] text-[#FFF8F1] pointer-events-auto hover:opacity-80 transition-opacity"
        >
          KOKUTO
        </a>
        <div className="text-[10px] tracking-[0.3em] uppercase text-[#FFF8F1]/40 font-light hidden md:block">
          The Art of Boba — Interactive Experience
        </div>
      </header>

      {/* Fixed Full Screen Cinematic Canvas in Background */}
      <BobaTeaHero selectedFlavor={selectedFlavor} scrollYProgress={scrollYProgress} />

      {/* Scrollable Story Epochs Container */}
      <div className="relative z-10 w-full">
        {FLAVORS.map((flavor) => (
          <FlavorSection 
            key={flavor.id} 
            flavor={flavor} 
          />
        ))}
        
        {/* Cinematic Ending Screen */}
        <div className="relative w-full h-[100vh] z-20">
          <EndingScreen isVisible={showEnding} />
        </div>
      </div>

      {/* Floating Glassmorphic Flavor Selector (Temporary / Testing) */}
      {!showEnding && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex gap-2">
          {FLAVORS.map((flavor, index) => (
            <button
              key={flavor.id}
              onClick={() => scrollToSection(index)}
              className={`px-3 py-1.5 text-[10px] tracking-widest uppercase border rounded-full transition-all duration-300 ${
                selectedFlavor.id === flavor.id
                  ? "bg-[#FFF8F1] text-black border-[#FFF8F1]"
                  : "text-[#E7D8C9] border-[#E7D8C9]/10 hover:border-[#E7D8C9]/30"
              }`}
            >
              {flavor.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface FlavorSectionProps {
  flavor: Flavor;
}

function FlavorSection({ flavor }: FlavorSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this specific flavor section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  return (
    <div 
      ref={sectionRef} 
      className="relative w-full overflow-hidden" 
      style={{ height: "400vh" }} // 4 beats * 100vh each
    >
      {flavor.beats.map((_, bIndex) => (
        <BeatCard 
          key={bIndex} 
          beatIndex={bIndex} 
          flavor={flavor}
          sectionScrollYProgress={scrollYProgress} 
        />
      ))}
    </div>
  );
}

interface BeatCardProps {
  beatIndex: number;
  flavor: Flavor;
  sectionScrollYProgress: MotionValue<number>;
}

const HERO_COLORS: Record<string, { title: string; label: string; paragraph: string }> = {
  "brown-sugar": {
    title: "#4A2C1A",
    label: "#5C3A24",
    paragraph: "#6A4730"
  },
  "matcha": {
    title: "#1C3019",
    label: "#2B4427",
    paragraph: "#3A5435"
  },
  "strawberry": {
    title: "#401019",
    label: "#511C25",
    paragraph: "#622832"
  },
  "blueberry": {
    title: "#10193F",
    label: "#202B51",
    paragraph: "#303D62"
  },
  "taro": {
    title: "#2E143E",
    label: "#3F2251",
    paragraph: "#503164"
  }
};

const HERO_PLACEMENTS: Record<string, { top?: string; left?: string }> = {
  "strawberry": { top: "80px" },
  "blueberry": { top: "50px", left: "-60px" },
  "taro": { top: "80px" }
};

function BeatCard({ beatIndex, flavor, sectionScrollYProgress }: BeatCardProps) {
  const start = beatIndex * 0.25;
  const end = (beatIndex + 1) * 0.25;

  // Render first beat introducing flavor at initial opacity 1 for Brown Sugar, 0 for others
  const startOpacity = (flavor.id === "brown-sugar" && beatIndex === 0) ? 1 : 0;

  const opacity = useTransform(
    sectionScrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [startOpacity, 1, 1, 0]
  );
  
  const y = useTransform(
    sectionScrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [50, 0, 0, -50]
  );

  // Floating cards transforms for Beat 4 (index 3) - declared at top-level to satisfy Rules of Hooks
  const opacityCard1 = useTransform(sectionScrollYProgress, [0.75, 0.80, 0.90, 0.95], [0, 1, 1, 0]);
  const yCard1 = useTransform(sectionScrollYProgress, [0.75, 0.80, 0.90, 0.95], [40, 0, 0, -40]);

  const opacityCard2 = useTransform(sectionScrollYProgress, [0.82, 0.87, 0.95, 1.0], [0, 1, 1, 0]);
  const yCard2 = useTransform(sectionScrollYProgress, [0.82, 0.87, 0.95, 1.0], [40, 0, 0, -40]);

  const splitTitle = (title: string) => {
    const words = title.split(" ");
    if (words.length <= 2) {
      return { prefix: words[0] || "", suffix: words.slice(1).join(" ") };
    }
    const prefix = words.slice(0, -2).join(" ");
    const suffix = words.slice(-2).join(" ");
    return { prefix, suffix };
  };

  const accentColor = flavor.accentColor;

  // Beat 1: Title Header Intro (Epic centered layout)
  if (beatIndex === 0) {
    const { prefix, suffix } = splitTitle(flavor.title);
    const heroColors = HERO_COLORS[flavor.id] || {
      title: flavor.titleColor,
      label: flavor.subtitleColor,
      paragraph: flavor.bodyColor
    };
    const heroPlacement = HERO_PLACEMENTS[flavor.id] || {};
    return (
      <div className="h-screen w-full flex items-center justify-center relative">
        <motion.div
          style={{ opacity, y, position: "relative", ...heroPlacement }}
          className="w-full max-w-4xl px-6 flex flex-col items-center text-center justify-center"
        >
          <span 
            style={{ 
              color: heroColors.label,
              textShadow: "0 2px 8px rgba(0,0,0,0.18)"
            }}
            className="font-sans text-[10px] md:text-xs tracking-[0.35em] uppercase font-semibold mb-6 block animate-fade-in animate-pulse"
          >
            THE ART OF BOBA
          </span>
          <h1 
            style={{ 
              color: heroColors.title,
              textShadow: "0 2px 8px rgba(0,0,0,0.18)"
            }}
            className="font-serif text-5xl md:text-8xl font-extralight tracking-wide leading-tight mb-8"
          >
            {prefix} <br className="hidden md:block" />
            <span 
              className="italic font-light"
              style={{
                color: heroColors.title,
                textShadow: "0 2px 8px rgba(0,0,0,0.18)"
              }}
            >
              {suffix}
            </span>
          </h1>
          <p 
            style={{ 
              color: heroColors.paragraph,
              textShadow: "0 2px 8px rgba(0,0,0,0.18)"
            }}
            className="font-sans text-sm md:text-lg max-w-xl mx-auto leading-relaxed font-light mb-12 opacity-95"
          >
            {flavor.description}
          </p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#FFF8F1] to-transparent animate-pulse" />
        </motion.div>
      </div>
    );
  }

  // Beat 2: Interactive Ingredients Experience (Elements float out from behind the centered cup)
  if (beatIndex === 1) {
    const ingredients = INGREDIENTS_DATA[flavor.id] || [];
    
    // Relative position layout around the cup with coordinate translation directions
    const positions = [
      { className: "left-[10%] md:left-[18%] top-[25%]", dx: -55, dy: -35 }, // Top Left
      { className: "right-[10%] md:right-[18%] top-[25%]", dx: 55, dy: -35 }, // Top Right
      { className: "left-1/2 -translate-x-1/2 top-[12%]", dx: 0, dy: -50 }, // Top Center
      { className: "left-[10%] md:left-[18%] bottom-[25%]", dx: -55, dy: 35 }, // Bottom Left
      { className: "right-[10%] md:right-[18%] bottom-[25%]", dx: 55, dy: 35 }, // Bottom Right
    ];

    return (
      <div className="h-screen w-full relative overflow-hidden flex items-center justify-center">
        {/* Background Editorial Heading */}
        <motion.div 
          style={{ opacity }}
          className="absolute text-center select-none pointer-events-none z-10 flex flex-col items-center"
        >
          <span 
            style={{ color: flavor.subtitleColor }}
            className="font-sans text-[10px] tracking-[0.4em] uppercase block mb-2"
          >
            02 / Ingredients
          </span>
          <h2 
            style={{ color: flavor.titleColor }}
            className="font-serif text-3xl md:text-5xl font-extralight tracking-wide leading-tight"
          >
            Crafted from elements.
          </h2>
          <span className="text-[9px] uppercase tracking-widest text-[#E7D8C9]/30 mt-4 block">
            Hover to inspect details
          </span>
        </motion.div>

        {ingredients.map((ing, i) => {
          const pos = positions[i] || { className: "", dx: 0, dy: 0 };
          return (
            <IngredientBubble
              key={i}
              name={ing.name}
              desc={ing.desc}
              className={pos.className}
              opacity={opacity}
              offsetX={pos.dx}
              offsetY={pos.dy}
              progress={sectionScrollYProgress}
              accentColor={accentColor}
              bodyColor={flavor.bodyColor}
            />
          );
        })}
      </div>
    );
  }

  // Beat 3: The Origin Map Experience (Dynamic world map zooming alongside regional copy)
  if (beatIndex === 2) {
    return (
      <div className="h-screen w-full flex items-center justify-center relative px-6 md:px-24">
        <motion.div
          style={{ opacity, y }}
          className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center justify-center"
        >
          <div className="flex justify-center w-full">
            <OriginMap selectedFlavorId={flavor.id} isVisible={true} />
          </div>
          <div className="flex flex-col items-start text-left max-w-lg">
            <div 
              style={{ backgroundColor: accentColor }}
              className="w-8 h-[1px] mb-4"
            />
            <span 
              style={{ color: flavor.subtitleColor }}
              className="font-sans text-xs tracking-[0.3em] uppercase font-semibold block mb-2"
            >
              03 / The Origin
            </span>
            <h2 
              style={{ color: flavor.titleColor }}
              className="font-serif text-3xl md:text-5xl font-light leading-snug mb-4"
            >
              Cultivated with heritage.
            </h2>
            <p 
              style={{ color: flavor.bodyColor }}
              className="font-sans text-sm md:text-base leading-relaxed font-light mb-6 opacity-95"
            >
              Our {flavor.name} ingredients originate from regions rich in agricultural legacy. 
              {flavor.id === "brown-sugar" && " Hand-harvested sugarcane from the volcanic soil of Okinawa is simmered using techniques passed down through generations to create the ultimate smoky, rich glaze."}
              {flavor.id === "matcha" && " Shaded for weeks before harvest, Uji green tea leaves are stone-ground slowly to preserve their deep, vibrant emerald hues and rich ceremonial umami complexity."}
              {flavor.id === "strawberry" && " Ripe, sweet strawberries grown in pristine conditions are simmered carefully at low heat to preserve their intense, fresh aromatic sweetness."}
              {flavor.id === "blueberry" && " Wild organic blueberries harvested from high-elevation estates are selected for their deep, complex tartness that perfectly complements heavy fresh cream."}
              {flavor.id === "taro" && " Hearty, starchy taro root slow-roasted in volcanic embers is pureed into a velvety paste, representing a traditional comfort recipe from East Asia."}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Beat 4: Flavor Profile & Fun Facts (Floating cards that fade in independently while scrolling)
  if (beatIndex === 3) {

    const facts = {
      "brown-sugar": {
        profile: "Body: Full & Rich | Sweetness: Intensely Deep | Aroma: Roasted Sugarcane | Texture: Warm & Chewy",
        fact: "Okinawa Kokuto sugar is cooked in large iron kettles for a distinct molasses aroma, providing a mineral-rich profile highly valued in culinary arts."
      },
      "matcha": {
        profile: "Body: Creamy & Vegetal | Sweetness: Subtle | Aroma: Toasted Grass & Umami | Texture: Silky & Frothy",
        fact: "Traditional granite stone mills grind Uji matcha extremely slowly—only 30g per hour—to prevent friction heat, protecting its signature bright green color."
      },
      "strawberry": {
        profile: "Body: Light & Creamy | Sweetness: Bright & Fruity | Aroma: Fresh Berries & Jasmine | Texture: Soft & Refreshing",
        fact: "Fragrant Jasmine tea serves as the liquid base, containing natural floral compounds that enhance the strawberry's volatile ester compounds."
      },
      "blueberry": {
        profile: "Body: Medium-Full | Sweetness: Tart & Balanced | Aroma: Wild Berries & Bergamot | Texture: Smooth & Layered",
        fact: "The natural citrus oil of Bergamot in Earl Grey tea cuts through the fat of organic milk, elevating the blueberry compote's tart finish."
      },
      "taro": {
        profile: "Body: Starchy & Thick | Sweetness: Warm & Nutty | Aroma: Roasted Taro & Coconut | Texture: Dense & Velvety",
        fact: "Raw taro root is naturally light gray. The beautiful pastel lavender color of premium Taro Boba comes from slow-baking purple yams together with the taro."
      }
    }[flavor.id] || { profile: "", fact: "" };

    return (
      <div className="h-screen w-full flex items-center justify-between px-6 md:px-24 relative">
        {/* Floating Profile Card (Left, fades in earlier) */}
        <motion.div
          style={{ opacity: opacityCard1, y: yCard1 }}
          className="w-full max-w-sm flex flex-col items-start text-left bg-black/60 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl mr-auto"
        >
          <div 
            style={{ backgroundColor: accentColor }}
            className="w-8 h-[1px] mb-4"
          />
          <span 
            style={{ color: flavor.subtitleColor }}
            className="font-sans text-[10px] tracking-[0.3em] uppercase font-semibold block mb-2"
          >
            04 / Profile
          </span>
          <h3 
            style={{ color: flavor.titleColor }}
            className="font-serif text-2xl font-light mb-4"
          >
            Taste Symphony
          </h3>
          <p 
            style={{ color: flavor.bodyColor }}
            className="font-sans text-xs leading-relaxed font-light opacity-95"
          >
            {facts.profile}
          </p>
        </motion.div>

        {/* Floating Did You Know Card (Right, fades in later) */}
        <motion.div
          style={{ opacity: opacityCard2, y: yCard2 }}
          className="w-full max-w-sm flex flex-col items-start text-left bg-black/60 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl ml-auto mt-24 md:mt-0"
        >
          <div 
            style={{ backgroundColor: accentColor }}
            className="w-8 h-[1px] mb-4"
          />
          <span 
            style={{ color: flavor.subtitleColor }}
            className="font-sans text-[10px] tracking-[0.3em] uppercase font-semibold block mb-2"
          >
            05 / Did You Know
          </span>
          <h3 
            style={{ color: flavor.titleColor }}
            className="font-serif text-2xl font-light mb-4"
          >
            Artisanal Fact
          </h3>
          <p 
            style={{ color: flavor.bodyColor }}
            className="font-sans text-xs leading-relaxed font-light opacity-95"
          >
            {facts.fact}
          </p>
        </motion.div>
      </div>
    );
  }

  return null;
}

interface IngredientBubbleProps {
  name: string;
  desc: string;
  className: string;
  opacity: MotionValue<number>;
  offsetX: number;
  offsetY: number;
  progress: MotionValue<number>;
  accentColor: string;
  bodyColor: string;
}

function IngredientBubble({ name, desc, className, opacity, offsetX, offsetY, progress, accentColor, bodyColor }: IngredientBubbleProps) {
  const [hovered, setHovered] = useState(false);
  
  // Drift translation offset as scroll progress advances through the beat
  const tx = useTransform(progress, [0.25, 0.45], [0, offsetX]);
  const ty = useTransform(progress, [0.25, 0.45], [0, offsetY]);

  return (
    <motion.div
      style={{ opacity, x: tx, y: ty }}
      className={`absolute z-20 transition-all duration-300 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div 
        className="relative flex flex-col items-center justify-center bg-black/60 backdrop-blur-md border px-4 py-2.5 rounded-full transition-all duration-500 hover:scale-105 cursor-pointer"
        style={{ 
          borderColor: hovered ? accentColor : "rgba(255, 255, 255, 0.08)",
          boxShadow: hovered ? `0 0 15px ${accentColor}30` : "none"
        }}
      >
        <span className="font-serif italic text-xs md:text-sm text-white font-medium">{name}</span>
        
        {/* Smooth expand-to-expose description bubble overlay on hover */}
        <div 
          className={`overflow-hidden transition-all duration-500 text-[10px] leading-relaxed font-light text-center ${
            hovered ? "max-h-20 mt-2 opacity-100 w-44 md:w-52" : "max-h-0 opacity-0 w-0"
          }`}
          style={{ color: bodyColor }}
        >
          {desc}
        </div>
      </div>
    </motion.div>
  );
}
