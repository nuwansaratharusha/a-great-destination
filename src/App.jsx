import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const A = "/assets/";

const media = {
  heroVideo: `${A}video/sunrise-over-sigiriya-rock-fortress-in-sri-lanka-a-2026-01-22-13-27-54-utc.mp4`,
  sigiriyaVideo: `${A}video/aerial-rotating-over-lion-s-rock-in-sigiriya-anci-2026-01-22-18-53-57-utc.mp4`,
  ellaTrainVideo: `${A}video/this-is-a-mavic-pro-shot-in-ella-elle-sri-lanka-2026-01-21-02-19-13-utc.mp4`,
  yalaSafariVideo: `${A}video/woman-on-sri-lanka-safari-admire-wild-elephants-2026-06-25-17-03-09-utc.mp4`,
  
  ellaJungle: `${A}image/couple-relaxing-in-bedroom-using-laptop-and-tablet-2026-03-25-10-04-42-utc.jpg`,
  mirissaOcean: `${A}image/the-woman-relaxing-near-beautiful-swimming-pool-2026-03-17-00-43-29-utc.jpg`,
  sigiriyaValley: `${A}image/people-on-summer-terrace-having-breakfast-together-2026-01-05-00-31-49-utc.jpg`,
  
  yalaSunrise: `${A}image/elephants-at-sunrise-in-thailand-2026-03-24-11-20-39-utc.jpg`,
  munnarTea: `${A}image/sunset-tea-plantation-in-munnar-kerala-india-mo-2026-03-24-10-20-37-utc.jpg`,
  mihintaleDagaba: `${A}image/woman-at-ambasthala-dagaba-mihintale-north-centr-2026-03-25-01-37-06-utc.jpg`,
  mirissaSecretBeach: `${A}image/aerial-sunset-photo-of-secret-beach-close-to-miris-2026-03-19-23-41-11-utc.jpg`,
  elephantWoman: `${A}image/elephant-and-woman-in-thailand-2026-03-24-13-13-37-utc.jpg`,
  hotelOceanTerrace: `${A}image/hotel-terrace-by-the-ocean-view-of-the-terrace-on-2026-01-09-14-00-46-utc.jpg`,

  swingForest: `${A}image/woman-swing-dress-hat-sunlight-forest-wooden-bench-2026-04-02-02-45-24-utc.jpg`,
  hikerMountain: `${A}image/man-with-backpack-sitting-on-rock-and-looking-at-l-2026-03-18-20-49-25-utc.jpg`,
  
  teaRitual: `${A}image/tropical-woman-drink-tea-beautiful-lady-drinking-2026-03-24-01-24-30-utc.jpg`,
  sigiriyaFortressClimb: `${A}video/sunrise-over-sigiriya-rock-fortress-in-sri-lanka-a-2026-01-22-13-27-54-utc.mp4`,
};

const rooms = [
  { name: "Ella Canopy Suite", type: "Jungle luxury treehouse", bed: "Super King", size: "64 m²", image: media.ellaJungle },
  { name: "Mirissa Ocean Villa", type: "Lakefront beach terrace", bed: "Super King", size: "82 m²", image: media.mirissaOcean },
  { name: "Sigiriya Valley Lodge", type: "Cultural valley cottage", bed: "King", size: "48 m²", image: media.sigiriyaValley },
];

const events = [
  ["Ella Nine Arch Train Ride", "Private Rail Excursion", media.ellaTrainVideo, "video"],
  ["Yala Wild Safari Adventure", "Wildlife Explorer Path", media.yalaSafariVideo, "video"],
  ["Munnar Highland Tea Tasting", "Aromas & Organic Estates", media.teaRitual, "image"],
  ["Sigiriya Lion's Rock Fortress", "Cultural Sanctuary Climb", media.sigiriyaFortressClimb, "video"],
];

const reviews = [
  ["Natalie", "An unforgettable journey. Sigiriya at sunrise and the train journey through Ella felt completely dreamlike."],
  ["Lindsey", "The butterfly philosophy is real. Every stop was custom tailored to offer deep connection, nature, and comfort."],
  ["Gillian", "Wandering through Munnar's tea plantations and watching wild elephants in Yala was the highlight of our year."],
  ["Avi", "Warm hosts, flawless planning, and breath-taking landscapes. The best curated travel agency in Southeast Asia."],
];

const faqs = [
  ["How do you customize itineraries?", "Every tour starts with a personal consultation. Our travel designers tailor stays, private guides, and transport routes to align with your pace and interest."],
  ["Do you assist with visa applications?", "Yes. We offer complete assistance for Sri Lanka ETA entry visas, along with local customs and immigration fast-track support."],
  ["What is included in the tour packages?", "Packages generally cover handpicked luxury stays, private chauffeur guides, domestic flights/scenic train bookings, select dining, and national park entries."],
  ["What is the best time to travel to Sri Lanka?", "Sri Lanka has two monsoon seasons, meaning there is always a dry coast. We recommend the South/West coast from December to April, and the North/East coast from May to October."],
  ["Can you customize family or group trips?", "Yes. We design custom multi-room villa stays, family-friendly safaris, and private group experiences with custom tempos."],
];

function useExperience(root, view) {
  useLayoutEffect(() => {
    if (view !== "home") return;
    let lenis;
    let ticker;
    let removePointerListener;
    let removeResizeListener;
    const scope = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduced) {
        lenis = new Lenis({ lerp: 0.15, wheelMultiplier: 0.7, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        ticker = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);
      }

      const fitHeroTitle = () => {
        const title = root.current?.querySelector(".hero-title");
        const spans = title ? [...title.querySelectorAll("span")] : [];
        if (!title || !spans.length) return;
        const maxWidth = title.clientWidth * 0.995;
        const fits = (size) => {
          title.style.fontSize = `${size}px`;
          const rects = spans.map((span) => span.getBoundingClientRect());
          return rects.every((r) => r.width <= maxWidth);
        };
        let lo = 20;
        let hi = 500;
        let best = lo;
        for (let i = 0; i < 24; i++) {
          const mid = (lo + hi) / 2;
          if (fits(mid)) { best = mid; lo = mid; } else { hi = mid; }
        }
        title.style.fontSize = `${best}px`;
      };
      fitHeroTitle();
      window.addEventListener("resize", fitHeroTitle);
      removeResizeListener = () => window.removeEventListener("resize", fitHeroTitle);

      gsap.fromTo(".header", { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, delay: 0.25, ease: "power3.out" });
      gsap.fromTo(".hero-kicker span, .hero-title span", { yPercent: 120 }, { yPercent: 0, duration: 1.25, stagger: 0.07, ease: "power4.out", delay: 0.2 });
      gsap.to(".hero-media", { scale: 1.12, yPercent: 7, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-title", { yPercent: -22, opacity: 0.2, ease: "none", scrollTrigger: { trigger: ".hero", start: "35% top", end: "bottom top", scrub: true } });
      ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, { y: 70, opacity: 0, clipPath: "inset(0 0 100% 0)" }, { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });

      gsap.fromTo(".about-image img", { scale: 1.18, yPercent: -6 }, { scale: 1, yPercent: 6, ease: "none", scrollTrigger: { trigger: ".about-image", start: "top bottom", end: "bottom top", scrub: true } });

      const valueCopies = gsap.utils.toArray(".value-copy");
      const valueTl = gsap.timeline({ scrollTrigger: { trigger: ".values", start: "top top", end: "bottom bottom", scrub: true } });
      valueTl.fromTo(".values-head-bg", { height: "34vh" }, { height: "14vh", duration: 0.16, ease: "none" }, 0)
        .fromTo(".values-title", { scale: 2.45, y: "10vh" }, { scale: 1, y: 0, duration: 0.16, ease: "none" }, 0)
        .to(".values-media img, .values-media video", { scale: 1.08, ease: "none" }, 0);
      valueCopies.forEach((item, index) => {
        valueTl.fromTo(item, { opacity: 0, y: 45, xPercent: -50 }, { opacity: 1, y: 0, xPercent: -50, duration: 0.12 }, index * 0.26)
          .to(item, { opacity: index === valueCopies.length - 1 ? 1 : 0, y: -35, xPercent: -50, duration: 0.12 }, index * 0.26 + 0.17);
      });




      if (window.innerWidth > 767) {
        const track = document.querySelector(".rooms-track");
        gsap.to(track, { x: () => -(track.scrollWidth - window.innerWidth + 48), ease: "none", scrollTrigger: { trigger: ".rooms", start: "top top", end: () => `+=${track.scrollWidth}`, pin: ".rooms-stage", scrub: 1, invalidateOnRefresh: true } });
      }

      // Yoga Reveal Sequence
      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: ".yoga-reveal",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.55,
        },
      });

      reveal
        .fromTo(".header", { y: 0, opacity: 1 }, { y: -80, opacity: 0, duration: 0.07, ease: "none" }, 0.03)
        .fromTo(
          ".yoga-window",
          { "--clip-y": "50%", "--clip-x": "50%", "--clip-radius": "4px", scale: 1.25 },
          { "--clip-y": "45%", "--clip-x": "43%", scale: 1.22, duration: 0.06, ease: "none" },
          0,
        )
        .to(".yoga-window", { "--clip-y": "34%", "--clip-x": "31%", scale: 1.14, duration: 0.2, ease: "none" }, 0.06)
        .to(".yoga-title", { opacity: 0.72, scale: 0.98, duration: 0.12, ease: "none" }, 0.08)
        .to(
          ".yoga-window",
          { "--clip-y": "7%", "--clip-x": "8%", scale: 1.05, duration: 0.4, ease: "none" },
          0.26,
        )
        .to(".yoga-title", { opacity: 0, scale: 0.92, duration: 0.14, ease: "none" }, 0.2)
        .fromTo(".yoga-caption", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.12, ease: "none" }, 0.17)
        .to(
          ".yoga-window",
          { "--clip-y": "0%", "--clip-x": "0%", "--clip-radius": "0px", scale: 1, duration: 0.25, ease: "none" },
          0.66,
        )
        .to(".yoga-caption", { color: "#f5f1df", duration: 0.12, ease: "none" }, 0.66)
        .to(".yoga-image", { yPercent: 4, duration: 0.34, ease: "none" }, 0.66);

      gsap.fromTo(
        ".practice-image img",
        { yPercent: -9, scale: 1.12 },
        {
          yPercent: 9,
          scale: 1.02,
          ease: "none",
          scrollTrigger: { trigger: ".practice", start: "top bottom", end: "bottom top", scrub: true },
        },
      );

      gsap.utils.toArray(".benefit").forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 42 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: index * 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          },
        );
      });


      const words = gsap.utils.toArray(".quote-word");
      gsap.set(words, { opacity: 0.12, filter: "blur(5px)" });
      gsap.to(words, { opacity: 1, filter: "blur(0px)", stagger: 0.03, ease: "none", scrollTrigger: { trigger: ".quote", start: "top top", end: "bottom bottom", scrub: true } });

      const cursor = document.querySelector(".cursor-glow");
      if (cursor && matchMedia("(pointer:fine)").matches) {
        const x = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
        const y = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
        const move = (event) => { x(event.clientX); y(event.clientY); };
        window.addEventListener("pointermove", move);
        removePointerListener = () => window.removeEventListener("pointermove", move);
      }
      ScrollTrigger.refresh();
    }, root);
    return () => {
      removePointerListener?.();
      removeResizeListener?.();
      if (ticker) gsap.ticker.remove(ticker);
      lenis?.destroy();
      scope.revert();
    };
  }, [root, view]);
}

const experiences = [
  {
    title: "Curated Safaris",
    image: media.yalaSunrise,
    alt: "Elephants in Yala National Park at sunrise",
    copy: "Immerse yourself in wildlife: trace majestic elephants and elusive leopards through Yala's dry-zone forests with expert private naturalists.",
  },
  {
    title: "Misty Highlands",
    image: media.munnarTea,
    alt: "Lush tea plantations of Munnar and Ella at sunrise",
    copy: "Wander through rolling emerald tea fields, breathe in the fresh mountain air, and follow historical train pathways carved into the peaks.",
  },
  {
    title: "Ancient Heritage",
    image: media.mihintaleDagaba,
    alt: "Buddhist temple ruins at Mihintale rock fortress",
    copy: "Walk the sacred paths of Sigiriya fortress, Dambulla caves, and rock temples, tracing 2,500 years of cultural metamorphosis.",
  },
  {
    title: "Secret Coastlines",
    image: media.mirissaSecretBeach,
    alt: "Drone shot of Mirissa secret beach and coconut groves",
    copy: "Unwind on secret, secluded golden shores, snorkel with sea turtles, and listen to the rhythmic swell of the Indian Ocean.",
  },
  {
    title: "Sanctuary Stays",
    image: media.hotelOceanTerrace,
    alt: "Handpicked premium boutique hotel terrace overlooking the sea",
    copy: "Rest in hand-selected luxury treehouses, colonial tea estates, and design-forward beach villas chosen for their connection to the land.",
  },
];

const benefits = [
  {
    title: "Wilderness connection",
    copy: "Step off the paved roads. Discover untouched jungle trails, mist-filled valleys, and secluded waterfalls hidden from typical tourist routes.",
  },
  {
    title: "Slow-paced travel",
    copy: "Handcrafted journeys that prioritize presence. We design tempos that don't rush, giving you time to breathe, listen, and transform.",
  },
  {
    title: "Holistic wellness",
    copy: "Access to private wellness practitioners, Ayurvedic spa treatments, herbal steam rooms, and ancient tea ceremonies in serene spaces.",
  },
  {
    title: "Sustainable footsteps",
    copy: "A commitment to support local guides, wild elephant sanctuary projects, plastic-free eco stays, and community heritage initiatives.",
  },
];

function ExperienceRow({ item, index }) {
  return (
    <article className="experience-row" data-row>
      <div className="experience-info">
        <h2><span>{String(index + 1).padStart(2, "0")}</span>{item.title}</h2>
        <p>{item.copy}</p>
      </div>
      <figure>
        <img src={item.image} alt={item.alt} />
      </figure>
    </article>
  );
}

function BookingPage({ setView }) {
  const [formData, setFormData] = useState({ name: "", email: "", date: "", guests: "1", interest: "Guided Sanctuary Tour", note: "" });
  const [submitted, setSubmitted] = useState(false);
  const bookingRoot = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ScrollTrigger animations for gallery items
      gsap.utils.toArray(".booking-media-item").forEach((item) => {
        const mediaEl = item.querySelector("img, video");
        if (mediaEl) {
          gsap.fromTo(mediaEl,
            { scale: 1.15, yPercent: -5 },
            {
              scale: 1,
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        }

        // Slide up reveal
        gsap.fromTo(item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              once: true
            }
          }
        );
      });
    }, bookingRoot);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="booking-success dark-section section-pad">
        <div className="success-content">
          <span className="success-icon">✓</span>
          <h2>Request Submitted.</h2>
          <p>Thank you, <strong>{formData.name}</strong>. We have received your request for the <strong>{formData.interest}</strong> on {formData.date} (for {formData.guests} guest{parseInt(formData.guests) > 1 ? "s" : ""}).</p>
          <p className="subtext">Our sanctuary hosts will review availability and send a confirmation to <strong>{formData.email}</strong> within 24 hours.</p>
          <button className="primary-button" onClick={() => setView("home")}>Return to Sanctuary</button>
        </div>
      </section>
    );
  }

  return (
    <section className="booking-page dark-section section-pad" ref={bookingRoot}>
      <div className="booking-container">
        <div className="booking-grid">
          
          {/* Left Column: Immersive Scrolling Gallery */}
          <div className="booking-gallery">
            <div className="booking-header">
              <span className="section-label">Curated Experiences</span>
              <h1>Begin your journey.</h1>
              <p className="lead-text">
                Immerse yourself in A Great Destination. Send us a request, and our host team will design a personalized experience for your visit.
              </p>
            </div>

            <div className="booking-media-list">
              <div className="booking-media-item video-item">
                <video src={media.sigiriyaVideo} autoPlay loop muted playsInline />
                <span className="media-caption">Lion's Rock Sigiriya fortress sunrise over the valleys</span>
              </div>
              
              <div className="booking-media-item">
                <img src={media.ellaJungle} alt="Luxury bedroom in Ella jungle treehouse" />
                <span className="media-caption">Handcrafted luxury treehouse suits in Ella canopy</span>
              </div>

              <div className="booking-media-item">
                <img src={media.yalaSunrise} alt="Wild elephants in Yala National Park" />
                <span className="media-caption">Conscious wildlife safaris through Yala National Park</span>
              </div>

              <div className="booking-media-item">
                <img src={media.mirissaSecretBeach} alt="Secluded sandy cove in Mirissa" />
                <span className="media-caption">Snorkel with green turtles at Mirissa secret shores</span>
              </div>

              <div className="booking-media-item">
                <img src={media.hotelOceanTerrace} alt="Premium resort terrace overlooking ocean" />
                <span className="media-caption">Relax in handpicked premium villas overlooking the coastline</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Request Form */}
          <div className="booking-form-wrapper">
            <div className="booking-form-sticky">
              <h2>Request a Journey</h2>
              <p className="form-intro">Provide your details to schedule a curated tour package, custom private expedition, or luxury stay booking.</p>
              
              <form onSubmit={handleSubmit} className="premium-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="interest">What are you looking to book?</label>
                  <select
                    id="interest"
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  >
                    <option value="Sri Lanka Heritage & Wildlife Explorer">Sri Lanka Heritage & Wildlife Explorer (7 Days)</option>
                    <option value="Highland Trails & Secret Coastlines">Highland Trails & Secret Coastlines (9 Days)</option>
                    <option value="Holistic Journey of Metamorphosis">Holistic Journey of Metamorphosis (12 Days)</option>
                    <option value="Custom Bespoke Itinerary Inquiry">Custom Bespoke Itinerary Inquiry</option>
                  </select>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="date">Preferred Date</label>
                    <input
                      type="date"
                      id="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="guests">Number of Guests</label>
                    <select
                      id="guests"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>{num} {num === 1 ? "Guest" : "Guests"}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="note">Special Requests, Intentions or Inquiries</label>
                  <textarea
                    id="note"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    placeholder="Tell us what brings you to Sri Lanka and Southeast Asia..."
                    rows={4}
                  />
                </div>

                <button type="submit" className="booking-submit-btn">
                  Submit Reservation Request
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Header({ active, view, setView }) {
  const [open, setOpen] = useState(false);
  const links = [["Curation", "about"], ["Stays", "stay"], ["Wander", "yoga"], ["Excursions", "events"], ["FAQ", "faq"]];
  const go = (id) => {
    setOpen(false);
    if (view !== "home") {
      setView("home");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleBrandClick = () => {
    setView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return <>
    <header className="header">
      <button className="brand" onClick={handleBrandClick} aria-label="Go to top"><img src={`${A}logo/A Great Destination logo.png`} alt="A Great Destination logo" /></button>
      <nav className="desktop-nav" aria-label="Main navigation">
        {view === "home" ? (
          links.map(([label, id]) => <button key={id} className={active === id ? "active" : ""} onClick={() => go(id)}>{label}</button>)
        ) : (
          <button className="back-home-link" onClick={() => setView("home")}>← Back to home</button>
        )}
      </nav>
      <button className="book-button" onClick={() => { setView("booking"); window.scrollTo({ top: 0, behavior: "instant" }); }}><span>Book A Tour</span><span>Book A Tour</span></button>
      <button className="menu-button" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen(!open)}><i /><i /></button>
    </header>
    <div className={`mobile-menu ${open ? "open" : ""}`} aria-hidden={!open}>
      <div>
        {view === "home" ? (
          links.map(([label, id], i) => <button key={id} onClick={() => go(id)}><small>0{i + 1}</small>{label}</button>)
        ) : (
          <button onClick={() => { setOpen(false); setView("home"); }}>← Return to Home</button>
        )}
      </div>
      <p>Sri Lanka · Southeast Asia</p>
    </div>
  </>;
}


export function App() {
  const root = useRef(null);
  const [view, setView] = useState("home");
  const [active, setActive] = useState("top");
  const [faq, setFaq] = useState(0);
  useExperience(root, view);

  useEffect(() => {
    if (view !== "home") return;
    const sections = [...document.querySelectorAll("main section[id]")];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-42% 0px -50%" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [view]);

  const quote = "We set off to explore the world and found ourselves. A Great Destination did not just guide us through Sri Lanka's breathtaking landmarks—they showed us how to connect with the soul of the land.";

  return <div ref={root}>
    <div className="cursor-glow" />
    <Header active={active} view={view} setView={setView} />
    {view === "booking" ? (
      <BookingPage setView={setView} />
    ) : (
      <main>
      <section id="top" className="hero">
        <video className="hero-media" src={media.heroVideo} autoPlay loop muted playsInline />
        <div className="hero-shade" />
        <h1 className="hero-title"><span>A GREAT</span><span>DESTINATION</span></h1>
        <span className="scroll-cue">Scroll to wander <i>↓</i></span>
      </section>

      <section id="about" className="about cream-section section-pad">
        <div className="section-label" data-reveal>01 — Curation</div>
        <h2 className="display-copy" data-reveal>Curated journeys designed for <em>metamorphosis</em>, discovery and conscious connection.</h2>
        <div className="about-grid">
          <div className="about-image"><img src={media.elephantWoman} alt="Elephant and woman interacting in a forest sanctuary" /></div>
          <div className="about-copy" data-reveal>
            <p>We are a boutique tourism agency specializing in slow, custom paths through Sri Lanka's cultural heartlands, misty tea plantations and secluded coastlines. Like the overlapping wings of the butterfly, our journeys connect you directly to the environment.</p>
            <div className="facts"><span><small>Country</small>Sri Lanka</span><span><small>Average temp</small>27°C</span><span><small>Key trails</small>Sigiriya & Ella</span><span><small>Agency tempo</small>Slow & mindful</span></div>
          </div>
        </div>
      </section>

      <section id="values" className="values">
        <div className="values-stage">
          <div className="values-head-bg" />
          <div className="values-media">
            <video src={media.sigiriyaVideo} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="values-overlay" />
          <h2 className="values-title">Core Values</h2>
          <div className="values-copy-wrap">
            {[['Transformative','Build a bridge between cultures, leaving you lighter and transformed after each trail.'],['Ancestral','Connect deeply with ancient fortresses, heritage temples, and local communities.'],['Conscious','Practice slow travel, support sustainable footsteps, and protect local wildlife in their sanctuaries.']].map(([title,text])=><div className="value-copy" key={title}><h3>{title}</h3><p>{text}</p></div>)}
          </div>
        </div>
      </section>

      <section id="stay" className="stay cream-section section-pad">
        <div className="section-label" data-reveal>02 — Handpicked stays</div>
        <h2 className="display-copy" data-reveal>Handcrafted comfort.<br /><em>Rooted in the landscape.</em></h2>
        <p className="section-intro" data-reveal>From private canopy treehouses in the Ella highlands to sun-drenched beach villas in Mirissa, we select hotels that celebrate the local environment.</p>
      </section>

      <section className="inclusive-section" id="inclusive" aria-labelledby="inclusive-title">
        <header className="experience-heading">
          <div className="heading-mask">
            <h1 id="inclusive-title" className="experience-heading-inner">
              Experience signature <span className="accent-word">curated</span> pathways
            </h1>
          </div>
        </header>

        <div className="experience-list">
          {experiences.map((item, index) => (
            <ExperienceRow item={item} index={index} key={item.title} />
          ))}
        </div>
      </section>

      <section className="rooms cream-section">
        <div className="rooms-stage">
          <div className="rooms-heading"><span>Stays</span><h2>Boutique stays &<br />luxury villas.</h2></div>
          <div className="rooms-track">
            {rooms.map((room, i) => <article className="room-card" key={room.name}>
              <img src={room.image} alt={`${room.name} accommodation`} />
              <div className="room-top"><span>0{i+1}</span><h3>{room.name}</h3></div>
              <div className="room-meta"><span><small>Type</small>{room.type}</span><span><small>Bed</small>{room.bed}</span><span><small>Size</small>{room.size}</span></div>
              <button onClick={() => { setView("booking"); window.scrollTo({ top: 0, behavior: "instant" }); }}>Inquire stay ↗</button>
            </article>)}
          </div>
        </div>
      </section>

      <section id="yoga" className="yoga-reveal" aria-labelledby="yoga-title">
        <div className="yoga-stage">
          <div className="yoga-window">
            <img className="yoga-image" src={media.swingForest} alt="Woman swinging under forest canopy" />
          </div>
          <h1 id="yoga-title" className="yoga-title">Wander</h1>
          <p className="yoga-caption">We design custom trails for conscious wanderers<br />in search of profound connections and rejuvenation.</p>
        </div>
      </section>

      <section id="practice" className="practice" aria-label="Yoga practice benefits">
        <div className="benefit-column benefit-column-left">
          {benefits.slice(0, 2).map((item) => (
            <article className="benefit" key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>

        <figure className="practice-image">
          <img src={media.hikerMountain} alt="Trekker looking at highlands lake" />
        </figure>

        <div className="benefit-column benefit-column-right">
          {benefits.slice(2).map((item) => (
            <article className="benefit" key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="events" className="events cream-section section-pad">
        <div className="section-label" data-reveal>03 — Signature excursions</div>
        <h2 className="events-heading" data-reveal>Your journey includes<br /><em>all private excursions & guides</em></h2>
        <div className="event-marquee" aria-label="Signature excursions">
          <div className="event-track">
            {[...events, ...events].map(([title, subtitle, mediaPath, type], i) => (
              <article className="event-card" key={`${title}-${i}`}>
                {type === "video" ? (
                  <video src={mediaPath} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <img src={mediaPath} alt={title} />
                )}
                <div>
                  <h3>{title}</h3>
                  <span>{subtitle}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="guidelines cream-section">
        <div className="guideline-line"><span>Be free</span><span>Be present</span><span>Be clear</span><span>Be embodied</span><span>Be conscious</span><span>Be here</span></div>
      </section>

      <section className="quote">
        <div className="quote-sticky">
          <img src={media.munnarTea} alt="Sunset over Munnar tea plantation" />
          <div className="quote-shade" />
          <blockquote>“ {quote.split(" ").map((word,i)=><span className="quote-word" key={`${word}-${i}`}>{word} </span>)} ”</blockquote>
          <span className="quote-credit">— the wanderlust chronicle</span>
        </div>
      </section>

      <section id="reviews" className="reviews cream-section section-pad">
        <div className="section-label">04 — Traveler diaries</div>
        <div className="reviews-track">{[...reviews,...reviews].map(([name,text],i)=><article className="review" key={`${name}-${i}`}><span>★★★★★</span><p>“{text}”</p><small>{name} · agency client</small></article>)}</div>
      </section>

      <section id="faq" className="faq cream-section section-pad">
        <h2>FAQ</h2><div className="faq-list">{faqs.map(([question,answer],i)=><article className={`faq-item ${faq===i?'open':''}`} key={question}><button onClick={()=>setFaq(faq===i?-1:i)} aria-expanded={faq===i}><span>{faq===i&&<i/>}{question}</span><b>+</b></button><div className="faq-answer"><p>{answer}</p></div></article>)}</div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <p>Colombo 07<br/>Sri Lanka</p>
          <nav>{[['Welcome', 'top'],['Curation', 'about'],['Stays', 'stay'],['Wander', 'yoga'],['Excursions', 'events'],['FAQ', 'faq']].map(([item, id])=><button key={item} onClick={()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'})}>{item}</button>)}</nav>
          <p className="footer-social">Instagram<br/>Youtube<br/>Soundcloud<br/>Tripadvisor</p>
        </div>
        <div className="footer-title"><span>A GREAT</span><span>DESTINATION</span></div>
        <div className="footer-bottom"><span>© 2026</span><span>Design and Developed | <a href="https://www.zipsolutions.co" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>ZIP solutions</a></span></div>
      </footer>
    </main>
    )}
  </div>;
}
