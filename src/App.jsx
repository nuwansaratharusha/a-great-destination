import { useEffect, useLayoutEffect, useState } from "react";
import { BrowserRouter, Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothLoader from "./SmoothLoader";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import ToursPage from "./pages/ToursPage";
import DestinationsPage from "./pages/DestinationsPage";
import { buildWhatsAppLink } from "./data";
import { ActiveSectionContext } from "./ActiveSectionContext";

gsap.registerPlugin(ScrollTrigger);

const A = "/assets/";

const navItems = [
  { label: "About", type: "anchor", id: "about" },
  { label: "Destinations", type: "route", to: "/destinations" },
  { label: "Tours", type: "route", to: "/tours" },
  { label: "Stays", type: "anchor", id: "stay" },
  { label: "Approach", type: "anchor", id: "yoga" },
  { label: "Excursions", type: "anchor", id: "events" },
  { label: "FAQ", type: "anchor", id: "faq" },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Header({ active }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const go = (id) => {
    setOpen(false);
    if (pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBrandClick = () => {
    setOpen(false);
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const renderNavItem = (item, mobileIndex) => {
    const isActive = item.type === "route" ? pathname === item.to : pathname === "/" && active === item.id;
    if (item.type === "route") {
      return (
        <Link key={item.label} to={item.to} className={`nav-item${isActive ? " active" : ""}`} onClick={() => setOpen(false)}>
          {mobileIndex != null && <small>0{mobileIndex + 1}</small>}
          {item.label}
        </Link>
      );
    }
    return (
      <button key={item.label} className={`nav-item${isActive ? " active" : ""}`} onClick={() => go(item.id)}>
        {mobileIndex != null && <small>0{mobileIndex + 1}</small>}
        {item.label}
      </button>
    );
  };

  return <>
    <header className="header">
      <button className="brand" onClick={handleBrandClick} aria-label="Go to home"><img src={`${A}logo/A Great Destination logo.png`} alt="A Great Destination logo" /></button>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => renderNavItem(item, null))}
      </nav>
      <div className="header-actions">
        <Link className="book-button" to="/plan-your-journey" onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}><span>Book A Tour</span><span>Book A Tour</span></Link>
      </div>
      <button className="menu-button" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen(!open)}><i /><i /></button>
    </header>
    <div className={`mobile-menu ${open ? "open" : ""}`} aria-hidden={!open}>
      <div>
        {navItems.map((item, i) => renderNavItem(item, i))}
      </div>
      <div className="mobile-menu-actions">
        <Link className="mobile-book" to="/plan-your-journey" onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); }}>Book Your Journey</Link>
        <a className="mobile-whatsapp" href={buildWhatsAppLink("Hello, I'd like to speak with a Sri Lanka travel designer.")} target="_blank" rel="noopener noreferrer">WhatsApp a Specialist ↗</a>
      </div>
      <p>Sri Lanka · Private, Bespoke Journeys</p>
    </div>
  </>;
}

function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={buildWhatsAppLink("Hello, I'd like to speak with a Sri Lanka travel designer.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 448 512" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L2 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-69.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-70 18.4 18.7-68.2-4.4-7C49.2 322.3 39.4 289 39.4 254c0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.1 81.2 56 130.5 0 101.8-84.9 184.5-186.5 184.5zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.7-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.6-9.7-1.5-2.8-13.4-32.3-18.3-44.2-4.8-11.6-9.7-10-13.3-10.2-3.4-.2-7.3-.2-11.2-.2-3.9 0-10.2 1.5-15.6 7.3-5.4 5.8-20.6 20.2-20.6 49.2 0 29 21.2 57 24.2 60.9 3 3.9 40.6 62 98.4 84.4 48.7 19.2 58.7 15.8 69.3 14.8 10.6-1 34.3-14 39.1-27.5 4.8-13.5 4.8-25 3.3-27.4-1.4-2.4-5.2-3.9-10.9-6.8z" />
      </svg>
    </a>
  );
}

export function App() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("top");

  // The cursor-glow blob is a page-agnostic ambient effect (not tied to any
  // specific home-page section), so it's wired up once here rather than inside
  // HomePage's scroll-animation hook.
  useEffect(() => {
    const cursor = document.querySelector(".cursor-glow");
    if (!cursor || !matchMedia("(pointer:fine)").matches) return;
    const x = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
    const move = (event) => { x(event.clientX); y(event.clientY); };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <BrowserRouter>
      <ActiveSectionContext.Provider value={{ active, setActive }}>
        <ScrollToTop />
        {loading && <SmoothLoader onComplete={() => setLoading(false)} />}
        <div className="site-content">
          <div className="cursor-glow" />
          <Header active={active} />
          <WhatsAppFloat />
          <Routes>
            <Route path="/" element={<HomePage loading={loading} />} />
            <Route path="/plan-your-journey" element={<BookingPage />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
          </Routes>
        </div>
      </ActiveSectionContext.Provider>
    </BrowserRouter>
  );
}
