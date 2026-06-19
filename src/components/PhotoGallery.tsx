import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import useIntersection from "../hooks/useIntersection";
import { galleryImages } from "../data/gallery";

export default function PhotoGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersection(sectionRef, "-50px");
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(-1);
  }, []);

  const slides = galleryImages.map((img) => ({
    src: img.src,
    alt: img.caption,
  }));

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-warm to-rose-light/10 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="font-heading italic text-gold/60 text-lg">
            Memories
          </span>
          <p className="font-serif italic text-xl md:text-2xl text-espresso/80 mt-6 leading-relaxed">
            Every photo here is a moment I never want to forget.
          </p>
          <p className="font-serif italic text-xl md:text-2xl text-espresso/80 mt-4 leading-relaxed">
            You make ordinary days feel like something worth holding onto.
          </p>
          <p className="font-serif italic text-xl md:text-2xl text-espresso/80 mt-4 leading-relaxed">
            I don't know what I did to deserve someone like you, but I'm
            grateful every single day.
          </p>
          <div className="mt-8 w-16 h-px bg-gold/40 mx-auto" />
        </motion.div>

        <div className="columns-2 sm:columns-3 md:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: Math.min(i * 0.05, 1) }}
              className="break-inside-avoid"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <button
                onClick={() => openLightbox(i)}
                className="group relative w-full cursor-pointer text-left"
                style={{ transform: `rotate(${((i % 5) - 2) * 0.5}deg)` }}
              >
                <div
                  className={`relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 ${
                    hoveredIndex === i
                      ? "shadow-2xl shadow-rose/20 scale-[1.02] -rotate-0"
                      : "shadow-espresso/5"
                  }`}
                  style={{ padding: "6px" }}
                >
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading="lazy"
                    className="w-full rounded-lg object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent transition-opacity duration-300 rounded-lg ${
                      hoveredIndex === i ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div
                    className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-300 ${
                      hoveredIndex === i
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                  ></div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={closeLightbox}
        index={lightboxIndex}
        slides={slides}
        on={{
          view: ({ index }) => setLightboxIndex(index),
        }}
        styles={{
          container: { backgroundColor: "rgba(18, 10, 6, 0.95)" },
        }}
        animation={{
          fade: 300,
        }}
        carousel={{
          finite: true,
          preload: 2,
        }}
        render={{
          buttonPrev: lightboxIndex <= 0 ? () => null : undefined,
          buttonNext:
            lightboxIndex >= galleryImages.length - 1 ? () => null : undefined,
        }}
      />
    </section>
  );
}
