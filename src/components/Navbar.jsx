import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "../config/profile";
import { SocialLinks } from "./Shared";
const links = [
  "Home",
  "About",
  "Projects",
  "Skills",
  "Education",
  "GitHub",
  "Contact",
];
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((el) => observer.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);
  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <a href="#home" className="logo" aria-label="Kabijake home">
        {profile.logo}
        <span className="logo-dot">.</span>
      </a>
      <nav
        id="main-navigation"
        aria-label="Main navigation"
        className={open ? "nav-links open" : "nav-links"}
      >
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            aria-current={
              active === link.toLowerCase() ? "location" : undefined
            }
            onClick={() => setOpen(false)}
          >
            {link}
          </a>
        ))}
      </nav>
      <div className="nav-right">
        <div className="social-icons">
          <SocialLinks />
        </div>
        <a href="#about" aria-label="About Kabijake" className="avatar">
          <img src={profile.photo} alt="" />
        </a>
        <button
          className="menu-toggle icon-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
