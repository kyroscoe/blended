export default function Hero() {
  return (
    <section className="hero section-shell" id="top">
      <div className="hero-copy">
        <img className="hero-logo" src="/images/logo.jpg" alt="Blended Açaí Bar" />
        <h1>Blended Açaí Bar</h1>
        <p className="hero-subheadline">Springfield's OG açaí - truck + shop.</p>
        <p className="hero-text">Fresh açaí bowls made simple.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#bowls">
            View Bowls
          </a>
          <a className="button button-secondary" href="#order">
            Order Now
          </a>
        </div>
      </div>
    </section>
  );
}
