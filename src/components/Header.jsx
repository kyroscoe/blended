const navItems = [
  { label: "Bowls", href: "#bowls" },
  { label: "Menu", href: "#menu" },
  { label: "Contact", href: "#contact" }
];

export default function Header() {
  return (
    <header className="site-header">
      <a className="brand-lockup" href="#top" aria-label="Blended Açaí Bar home">
        <span className="brand-mark" aria-hidden="true">B</span>
      </a>
      <a className="header-order-link" href="#inquiry">
        Let's Talk
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
