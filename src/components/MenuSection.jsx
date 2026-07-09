const prices = [
  { size: "Kids", price: "$7" },
  { size: "Small", price: "$10" },
  { size: "Large", price: "$13" }
];

const addOns = [
  "Additional fruit: +$2",
  "Additional toppings or drizzle: +$1",
  "Coconut or Dragonfruit Floater: +$1",
  "Coconut or Dragonfruit Base: +$2",
  "Base only: $6 / $9"
];

export default function MenuSection() {
  return (
    <section className="section-shell menu-section" id="menu" aria-labelledby="menu-heading">
      <div className="section-heading">
        <h2 id="menu-heading">Menu</h2>
        <p>All bowls include organic açaí and granola.</p>
      </div>
      <div className="menu-layout">
        <div className="menu-details">
          <div className="price-row" aria-label="Bowl pricing">
            {prices.map((item) => (
              <div className="price-card" key={item.size}>
                <span>{item.size}</span>
                <strong>{item.price}</strong>
              </div>
            ))}
          </div>
          <div className="add-ons">
            <h3>Add-ons</h3>
            <ul>
              {addOns.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <a className="menu-image-link" href="/images/menu.jpg" target="_blank" rel="noreferrer">
          {/* Update full menu image in public/images/menu.jpg. */}
          <img src="/images/menu.jpg" alt="Blended Açaí Bar full menu" />
          <span>View Full Menu</span>
        </a>
      </div>
    </section>
  );
}
