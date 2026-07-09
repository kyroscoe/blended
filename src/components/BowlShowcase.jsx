import { useState } from "react";
import BowlModal from "./BowlModal.jsx";
import { bowls } from "../data/bowls.js";

export default function BowlShowcase() {
  const [selectedBowl, setSelectedBowl] = useState(null);

  return (
    <section className="section-shell bowls-section" id="bowls" aria-labelledby="bowls-heading">
      <div className="section-heading">
        <h2 id="bowls-heading">The Bowls</h2>
        <p>Tap a bowl to see what's inside.</p>
      </div>
      <div className="serving-bar" aria-label="Clickable bowl display">
        {bowls.map((bowl) => (
          <button
            className="bowl-display"
            type="button"
            key={bowl.id}
            onClick={() => setSelectedBowl(bowl)}
            aria-haspopup="dialog"
            aria-label={`View ingredients for ${bowl.name}`}
          >
            <span className="bowl-image-wrap">
              <img src={bowl.image} alt="" />
            </span>
            <span className="bowl-name">{bowl.name}</span>
          </button>
        ))}
      </div>
      {selectedBowl && (
        <BowlModal bowl={selectedBowl} onClose={() => setSelectedBowl(null)} />
      )}
    </section>
  );
}
