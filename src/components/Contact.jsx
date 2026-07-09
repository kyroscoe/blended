export default function Contact() {
  return (
    <section className="section-shell contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="section-heading">
        <h2 id="contact-heading">Contact</h2>
        <p>Find Blended in Springfield.</p>
      </div>
      <div className="contact-grid">
        {/* Update contact info and social links here when final details are ready. */}
        <a href="mailto:orders@blendedacaibar.com">
          <span>Email</span>
          orders@blendedacaibar.com
        </a>
        <a href="tel:+19377294293">
          <span>Phone</span>
          (937) 729-4293
        </a>
        <a
          href="https://www.bing.com/maps/default.aspx?v=2&pc=FACEBK&mid=8100&where1=30%20N.%20Fountain%20Ave%2C%20Springfield%2C%20OH%2C%20United%20States%2C%2045502&FORM=FBKPL1&mkt=en-US"
          target="_blank"
          rel="noreferrer"
        >
          <span>Location</span>
          30 N. Fountain Ave, Springfield, OH 45502
        </a>
        <div className="social-links">
          <span>Social</span>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100092620654568"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
