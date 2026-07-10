export default function MenuSection() {
  return (
    <section className="section-shell menu-section" id="menu" aria-labelledby="menu-heading">
      <div className="section-heading">
        <h2 id="menu-heading">Menu</h2>
      </div>
      <a className="menu-image-link menu-image-only" href="/images/menu.jpg" target="_blank" rel="noreferrer">
        {/* Update full menu image in public/images/menu.jpg. */}
        <img src="/images/menu.jpg" alt="Blended Açaí Bar full menu" />
        <span>View Full Menu</span>
      </a>
    </section>
  );
}
