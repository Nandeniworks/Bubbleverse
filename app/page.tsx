"use client";

import { useState, useRef } from "react";
import { useScroll, useMotionValueEvent, motion, useTransform, MotionValue } from "framer-motion";
import BobaTeaHero from "@/components/BobaTeaHero";
import BubbleCursor from "@/components/BubbleCursor";
import ParticleBackground from "@/components/ParticleBackground";
import CondensationDroplets from "@/components/CondensationDroplets";
import OriginMap from "@/components/OriginMap";
import SanrioCollabSection from "@/components/SanrioCollabSection";
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
  const [inSanrioSection, setInSanrioSection] = useState(false);

  // Track global scroll progress of the entire page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Dynamically change active flavor based on scroll thresholds
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 5 flavor segments (0..2000vh) + 1 Sanrio (1000vh)
    // The flavors take up the range 0 to 0.6666.
    if (latest < 0.6666) {
      const totalFlavors = FLAVORS.length;
      const scaledProgress = latest / 0.6666;
      const index = Math.min(totalFlavors - 1, Math.floor(scaledProgress * totalFlavors));
      if (FLAVORS[index] && FLAVORS[index].id !== selectedFlavor.id) {
        setSelectedFlavor(FLAVORS[index]);
      }
    }
    
    // Toggle whether we are in the Sanrio section to hide early elements
    setInSanrioSection(latest >= 0.6666);
  });

  // Jump to specific flavor section by scrolling the window
  const scrollToSection = (index: number) => {
    window.scrollTo({
      top: index * window.innerHeight * 4,
      behavior: "smooth"
    });
  };

  const bgInput: number[] = [];
  const bgOutput: string[] = [];
  const segment = 0.6666 / FLAVORS.length;
  const transitionHalfWidth = segment * 0.2;
  
  FLAVORS.forEach((f, i) => {
    const start = i * segment;
    if (i === 0) {
      bgInput.push(0);
      bgOutput.push(f.backgroundColor);
    } else {
      bgInput.push(start - transitionHalfWidth);
      bgOutput.push(FLAVORS[i - 1].backgroundColor);
      bgInput.push(start + transitionHalfWidth);
      bgOutput.push(f.backgroundColor);
    }
    if (i === FLAVORS.length - 1) {
      bgInput.push(0.6666);
      bgOutput.push(f.backgroundColor);
    }
  });
  
  bgInput.push(0.68, 1);
  bgOutput.push("#FFFBFB", "#FFFBFB");

  const backgroundColor = useTransform(scrollYProgress, bgInput, bgOutput);

  return (
    <motion.div 
      ref={containerRef}
      className="relative min-h-screen text-[#E7D8C9] font-sans select-none"
      style={{ 
        backgroundColor,
        height: `${FLAVORS.length * 400 + 1000}vh` // 5 * 400vh + 1000vh = 3000vh
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
      {!inSanrioSection && <ParticleBackground selectedFlavorId={selectedFlavor.id} />}

      {/* 3. Condensation Water Droplets Overlay */}
      {!inSanrioSection && <CondensationDroplets />}

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
        
        {/* Sanrio Collaboration Campaign */}
        <SanrioCollabSection />
      </div>

      {/* Subtly Animated Horizontal Flavor Progress Navigation */}
      {!inSanrioSection && (
        <FlavorProgressNav 
          selectedFlavor={selectedFlavor} 
          scrollToSection={scrollToSection} 
          scrollYProgress={scrollYProgress} 
        />
      )}
    </motion.div>
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
    [80, 20, -20, -80]
  );

  // Staggered micro-interactions for Beat 1
  const labelOpacity = useTransform(sectionScrollYProgress, [start, start + 0.02], [0, 1]);
  const titleY = useTransform(sectionScrollYProgress, [start + 0.01, start + 0.04, end - 0.05, end], [80, 0, -20, -100]);
  const titleOpacity = useTransform(sectionScrollYProgress, [start + 0.01, start + 0.04, end - 0.05, end], [0, 1, 1, 0]);
  const descY = useTransform(sectionScrollYProgress, [start + 0.03, start + 0.06, end - 0.05, end], [60, 0, -20, -100]);
  const descOpacity = useTransform(sectionScrollYProgress, [start + 0.03, start + 0.06, end - 0.05, end], [0, 1, 1, 0]);

  // Floating cards transforms for Beat 4 (index 3)
  const opacityCard1 = useTransform(sectionScrollYProgress, [0.75, 0.80, 0.90, 0.95], [0, 1, 1, 0]);
  const yCard1 = useTransform(sectionScrollYProgress, [0.75, 0.80, 0.90, 0.95], [40, 0, 0, -40]);

  const opacityCard2 = useTransform(sectionScrollYProgress, [0.82, 0.87, 0.95, 1.0], [0, 1, 1, 0]);
  const yCard2 = useTransform(sectionScrollYProgress, [0.82, 0.87, 0.95, 1.0], [40, 0, 0, -40]);

  const accentColor = flavor.accentColor;

  // Beat 1: Title Header Intro (Premium Editorial Layouts)
  if (beatIndex === 0) {

    const renderTextShadow = (color: string) => `0 4px 32px ${color}80, 0 2px 8px rgba(0,0,0,0.6)`;

    if (flavor.id === "brown-sugar" || flavor.id === "matcha") {
      const parts = flavor.title.split(" ");
      const word1 = parts[0];
      const word2 = parts.slice(1).join(" ");
      return (
        <div className="h-screen w-full flex items-center justify-center relative pointer-events-none">
          <div className="w-full max-w-4xl px-6 flex flex-col items-center text-center justify-center relative z-20">
            <motion.span 
              style={{ opacity: labelOpacity, textShadow: renderTextShadow(flavor.backgroundColor) }}
              className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase font-semibold mb-6 block text-white/80"
            >
              THE ART OF BOBA
            </motion.span>
            <motion.h1 
              style={{ opacity: titleOpacity, y: titleY, color: flavor.titleColor, textShadow: renderTextShadow(flavor.backgroundColor) }}
              className="font-serif text-7xl md:text-[9rem] font-light tracking-tighter leading-[0.85] mb-8"
            >
              {word1} <br/>
              <span className="italic font-extralight block" style={{ color: flavor.accentColor }}>{word2}</span>
            </motion.h1>
            <motion.p 
              style={{ opacity: descOpacity, y: descY, color: flavor.bodyColor, textShadow: renderTextShadow(flavor.backgroundColor) }}
              className="font-sans text-sm md:text-base max-w-md mx-auto leading-relaxed font-light mt-4"
            >
              {flavor.description}
            </motion.p>
          </div>
        </div>
      );
    }

    if (flavor.id === "strawberry") {
      // Split asymmetrically to avoid the center splash
      return (
        <div className="h-screen w-full relative pointer-events-none px-6 md:px-24">
          <div className="absolute top-[15%] left-[5%] md:left-[10%] z-20">
            <motion.span 
              style={{ opacity: labelOpacity, textShadow: renderTextShadow(flavor.backgroundColor) }}
              className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase font-semibold mb-6 block text-white/80"
            >
              THE ART OF BOBA
            </motion.span>
            <motion.h1 
              style={{ opacity: titleOpacity, y: titleY, color: flavor.titleColor, textShadow: renderTextShadow(flavor.backgroundColor) }}
              className="font-serif text-7xl md:text-[8rem] font-light tracking-tighter leading-[0.85]"
            >
              STRAW<br/>BERRY
            </motion.h1>
          </div>
          <div className="absolute bottom-[20%] right-[5%] md:right-[10%] z-20 text-right max-w-sm">
            <motion.h2
              style={{ opacity: titleOpacity, y: titleY, color: flavor.accentColor, textShadow: renderTextShadow(flavor.backgroundColor) }}
              className="font-serif italic text-5xl md:text-7xl font-extralight mb-6"
            >
              Infusion
            </motion.h2>
            <motion.p 
              style={{ opacity: descOpacity, y: descY, color: flavor.bodyColor, textShadow: renderTextShadow(flavor.backgroundColor) }}
              className="font-sans text-sm md:text-base leading-relaxed font-light ml-auto"
            >
              {flavor.description}
            </motion.p>
          </div>
        </div>
      );
    }

    if (flavor.id === "blueberry") {
      // Top-heavy layout to avoid the dark berry splash at the bottom
      return (
        <div className="h-screen w-full relative pointer-events-none px-6 md:px-24">
          <div className="absolute top-[15%] right-[5%] md:right-[15%] z-20 text-right">
            <motion.span 
              style={{ opacity: labelOpacity, textShadow: renderTextShadow(flavor.backgroundColor) }}
              className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase font-semibold mb-6 block text-white/80"
            >
              THE ART OF BOBA
            </motion.span>
            <motion.h1 
              style={{ opacity: titleOpacity, y: titleY, color: flavor.titleColor, textShadow: renderTextShadow(flavor.backgroundColor) }}
              className="font-serif text-7xl md:text-[8rem] font-light tracking-tighter leading-[0.85]"
            >
              WILD <br/>
              <span className="italic font-extralight" style={{ color: flavor.accentColor }}>BLUEBERRY</span>
            </motion.h1>
            <motion.p 
              style={{ opacity: descOpacity, y: descY, color: flavor.bodyColor, textShadow: renderTextShadow(flavor.backgroundColor) }}
              className="font-sans text-sm md:text-base leading-relaxed font-light mt-8 max-w-md ml-auto"
            >
              {flavor.description}
            </motion.p>
          </div>
        </div>
      );
    }

    if (flavor.id === "taro") {
      // Top-left heavy layout to avoid bottom-right pearls
      return (
        <div className="h-screen w-full relative pointer-events-none px-6 md:px-24">
          <div className="absolute top-[20%] left-[5%] md:left-[10%] z-20">
            <motion.span 
              style={{ opacity: labelOpacity, textShadow: renderTextShadow(flavor.backgroundColor) }}
              className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase font-semibold mb-6 block text-white/80"
            >
              THE ART OF BOBA
            </motion.span>
            <motion.h1 
              style={{ opacity: titleOpacity, y: titleY, color: flavor.titleColor, textShadow: renderTextShadow(flavor.backgroundColor) }}
              className="font-serif text-7xl md:text-[9rem] font-light tracking-tighter leading-[0.85]"
            >
              BESPOKE <br/>
              <span className="italic font-extralight" style={{ color: flavor.accentColor }}>TARO</span>
            </motion.h1>
            <motion.p 
              style={{ opacity: descOpacity, y: descY, color: flavor.bodyColor, textShadow: renderTextShadow(flavor.backgroundColor) }}
              className="font-sans text-sm md:text-base leading-relaxed font-light mt-8 max-w-sm"
            >
              {flavor.description}
            </motion.p>
          </div>
        </div>
      );
    }
  }

  // Beat 2: Interactive Ingredients Experience (Editorial list layout)
  if (beatIndex === 1) {
    const ingredients = INGREDIENTS_DATA[flavor.id] || [];
    
    return (
      <div className="h-screen w-full relative overflow-hidden flex items-center px-6 md:px-24">
        <motion.div 
          style={{ opacity, y }}
          className="w-full max-w-sm flex flex-col items-start z-10"
        >
          <span 
            style={{ color: flavor.subtitleColor }}
            className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-semibold block mb-4"
          >
            02 / Ingredients
          </span>
          <h2 
            style={{ color: flavor.titleColor }}
            className="font-serif text-4xl md:text-5xl font-light tracking-wide leading-tight mb-12"
          >
            Crafted from <br/>
            <span className="italic" style={{ color: flavor.accentColor }}>elements.</span>
          </h2>
          
          <div className="flex flex-col gap-6 w-full">
            {ingredients.map((ing, i) => (
              <IngredientItem
                key={i}
                index={i}
                name={ing.name}
                desc={ing.desc}
                progress={sectionScrollYProgress}
                accentColor={accentColor}
                titleColor={flavor.titleColor}
                bodyColor={flavor.bodyColor}
              />
            ))}
          </div>
        </motion.div>
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
              className="font-sans text-[10px] tracking-[0.4em] uppercase font-semibold block mb-4"
            >
              03 / The Origin
            </span>
            <h2 
              style={{ color: flavor.titleColor }}
              className="font-serif text-3xl md:text-5xl font-light leading-snug mb-6"
            >
              Cultivated with heritage.
            </h2>
            <p 
              style={{ color: flavor.bodyColor }}
              className="font-sans text-sm md:text-base leading-relaxed font-light mb-6 opacity-90"
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
  }  // Beat 4: Flavor Profile (Minimal Editorial Metadata Grid)
  if (beatIndex === 3) {
    const meta = flavor.metadata;

    return (
      <div className="h-screen w-full flex flex-col md:flex-row items-end justify-between px-6 md:px-24 pb-24 md:pb-32 relative pointer-events-none">
        
        {/* Left Data Column */}
        <motion.div
          style={{ opacity: opacityCard1, y: yCard1 }}
          className="w-full max-w-xs flex flex-col gap-12 z-10"
        >
          <div>
            <span style={{ color: flavor.subtitleColor }} className="font-sans text-[10px] tracking-[0.3em] uppercase font-semibold block mb-3">
              ORIGIN
            </span>
            <p style={{ color: flavor.titleColor }} className="font-serif text-2xl font-light italic">
              {meta.origin}
            </p>
          </div>
          <div>
            <span style={{ color: flavor.subtitleColor }} className="font-sans text-[10px] tracking-[0.3em] uppercase font-semibold block mb-3">
              PROFILE
            </span>
            <p style={{ color: flavor.bodyColor }} className="font-sans text-sm tracking-wide font-light">
              {meta.profile}
            </p>
          </div>
        </motion.div>

        {/* Right Data Column */}
        <motion.div
          style={{ opacity: opacityCard2, y: yCard2 }}
          className="w-full max-w-xs flex flex-col gap-12 z-10 text-left md:text-right mt-12 md:mt-0"
        >
          <div>
            <span style={{ color: flavor.subtitleColor }} className="font-sans text-[10px] tracking-[0.3em] uppercase font-semibold block mb-3">
              SWEETNESS
            </span>
            <p style={{ color: flavor.titleColor }} className="font-sans text-sm tracking-[0.2em]">
              {meta.sweetness}
            </p>
          </div>
          <div>
            <span style={{ color: flavor.subtitleColor }} className="font-sans text-[10px] tracking-[0.3em] uppercase font-semibold block mb-3">
              TEXTURE
            </span>
            <p style={{ color: flavor.bodyColor }} className="font-sans text-sm tracking-wide font-light">
              {meta.texture}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}

interface IngredientItemProps {
  index: number;
  name: string;
  desc: string;
  progress: MotionValue<number>;
  accentColor: string;
  titleColor: string;
  bodyColor: string;
}

function IngredientItem({ index, name, desc, progress, accentColor, titleColor, bodyColor }: IngredientItemProps) {
  // Staggered fade in for list items based on their index
  const startFade = 0.25 + (index * 0.02);
  const opacity = useTransform(progress, [startFade, startFade + 0.05], [0, 1]);
  const x = useTransform(progress, [startFade, startFade + 0.05], [-20, 0]);

  return (
    <motion.div
      style={{ opacity, x, borderLeftColor: "rgba(255, 255, 255, 0.1)" }}
      className="flex flex-col group border-l pl-5 py-1 transition-colors duration-500"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderLeftColor = accentColor;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderLeftColor = "rgba(255, 255, 255, 0.1)";
      }}
    >
      <span 
        className="font-serif text-lg md:text-xl transition-colors duration-500"
        style={{ color: titleColor }}
      >
        {name}
      </span>
      <span 
        className="font-sans text-xs md:text-sm leading-relaxed mt-2 opacity-80 max-w-sm"
        style={{ color: bodyColor }}
      >
        {desc}
      </span>
    </motion.div>
  );
}

interface FlavorProgressNavProps {
  selectedFlavor: Flavor;
  scrollToSection: (index: number) => void;
  scrollYProgress: MotionValue<number>;
}

function FlavorProgressNav({ selectedFlavor, scrollToSection, scrollYProgress }: FlavorProgressNavProps) {
  const scaleX = useTransform(scrollYProgress, [0, 0.6666], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.64, 0.66], [1, 0]);

  return (
    <motion.div style={{ opacity }} className="fixed bottom-8 md:bottom-12 left-0 w-full z-40 pointer-events-none flex justify-center px-4">
      <div className="pointer-events-auto max-w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="relative flex items-center min-w-[max-content] px-8 md:px-12 py-4 gap-6 md:gap-10">
          
          {/* Continuous Track Line (Background) */}
          <div className="absolute left-4 right-4 bottom-[8px] h-[1px] bg-white/10" />
          
          {/* Active Progress Fill */}
          <motion.div 
            className="absolute left-4 right-4 bottom-[8px] h-[1px] bg-white/80 origin-left"
            style={{ scaleX }}
          />

          {FLAVORS.map((flavor, index) => {
            const isActive = flavor.id === selectedFlavor.id;
            return (
              <button
                key={flavor.id}
                onClick={() => scrollToSection(index)}
                className="relative flex flex-col items-center group pb-3"
              >
                <span className={`font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase transition-all duration-700 ease-out whitespace-nowrap
                  ${isActive ? 'text-white opacity-100 font-semibold scale-105' : 'text-white opacity-40 group-hover:opacity-70'}`}
                >
                  {flavor.name}
                </span>
                
                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div 
                    layoutId="flavorIndicator"
                    className="absolute bottom-[8px] left-0 right-0 h-[2px] bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 40 }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </motion.div>
  );
}
