
import { useState } from "react";
import { artworks } from "../data/artworks";
import ArtworkCard from "./ArtworkCard";

const categories = [
  { id: "all", label: "ВСЕ РАБОТЫ" },
  { id: "painting", label: "КАРТИНЫ" },
  { id: "graffiti", label: "ГРАФФИТИ" },
  { id: "custom", label: "КАСТОМ" }
];

function Gallery({ onOrder }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredArtworks = artworks.filter((artwork) => {
    return (
      activeCategory === "all" ||
      artwork.category === activeCategory
    );
  });

  return (
    <section className="gallery section" id="gallery">
      <div className="gallery-heading">
        <div>
          <p className="section-label">EXPLORE THE CHAOS</p>
          <h2>SELECTED WORKS<span>®</span></h2>
        </div>

        <p className="gallery-count">
          {filteredArtworks.length} WORKS
        </p>
      </div>

      <div className="gallery-filters">
        {categories.map((category) => (
          <button
            key={category.id}
            className={
              activeCategory === category.id
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="art-grid">
        {filteredArtworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onOrder={onOrder}
          />
        ))}
      </div>
    </section>
  );
}

export default Gallery;
