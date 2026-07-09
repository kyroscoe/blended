const navItems = [
  { label: "Bowls", href: "#bowls" },
  { label: "Menu", href: "#menu" },
  { label: "Order", href: "#order" },
  { label: "Contact", href: "#contact" }
];

export default function Header() {
  return (
    <header className="site-header">
      <a className="brand-lockup" href="#top" aria-label="Blended Açaí Bar home">
        {/* Update logo photo in public/images/logo.jpg. */}
        <img src="/images/logo.jpg" alt="Blended Açaí Bar logo" />
        <span>Blended Açaí Bar</span>
      </a>
      <nav className="site-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
