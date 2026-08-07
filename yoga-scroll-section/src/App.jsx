import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/inter/latin-400.css";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    title: "Growth & self-discovery",
    copy: "Yoga is an enriching opportunity for personal growth and self-discovery. Our practices focus on stress reduction, relaxation and self-awareness.",
  },
  {
    title: "All levels welcome",
    copy: "Yoga is a transformative journey for personal growth, emotional healing and discovery. Every class offers a diverse array of options tailored to all levels.",
  },
  {
    title: "Breath & stillness",
    copy: "Breathwork and meditation help you connect deeply with your breath, cultivate awareness and reduce tension and anxiety.",
  },
  {
    title: "Beyond boundaries",
    copy: "Inclusive, holistic yoga lessons explore diverse styles and techniques to support physical, emotional and spiritual wellbeing.",
  },
];

function Header({ scrollEngine }) {
  const go = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    if (scrollEngine.current) {
      scrollEngine.current.scrollTo(target, { duration: 1.25, offset: 0 });
      return;
    }

    target.scrollIntoView();
  };

  return (
    <header className="site-header">
      <button className="brand" onClick={() => go("yoga")} aria-label="Back to Yoga intro">
        <img src="/assets/eagles-logo.png" alt="" />
      </button>
      <nav aria-label="Primary navigation">
        {[
          ["About", "yoga"],
          ["Values", "yoga"],
          ["Stay", "practice"],
          ["• Yoga", "yoga"],
          ["Events", "practice"],
          ["Reviews", "practice"],
          ["Team", "practice"],
          ["FAQ", "practice"],
        ].map(([label, id]) => (
          <button key={label} onClick={() => go(id)}>{label}</button>
        ))}
      </nav>
      <button className="book-button" onClick={() => go("practice")}>Book your stay</button>
    </header>
  );
}

export function App() {
  const root = useRef(null);
  const scrollEngine = useRef(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis;
    let ticker;

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.13, wheelMultiplier: 0.72, smoothWheel: true });
      scrollEngine.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      ticker = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    }

    const context = gsap.context(() => {
      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: ".yoga-reveal",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.55,
        },
      });

      reveal
        .fromTo(".site-header", { y: 0, opacity: 1 }, { y: -80, opacity: 0, duration: 0.07, ease: "none" }, 0.03)
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
    }, root);

    return () => {
      if (ticker) gsap.ticker.remove(ticker);
      lenis?.destroy();
      scrollEngine.current = null;
      context.revert();
    };
  }, []);

  return (
    <main ref={root}>
      <Header scrollEngine={scrollEngine} />

      <section id="yoga" className="yoga-reveal" aria-labelledby="yoga-title">
        <div className="yoga-stage">
          <div className="yoga-window">
            <img className="yoga-image" src="/assets/yoga-cinematic.png" alt="Woman carrying a yoga mat into a lake-view bamboo pavilion" />
          </div>
          <h1 id="yoga-title" className="yoga-title">Yoga</h1>
          <p className="yoga-caption">We emerge as an idyllic sanctuary for yoga enthusiasts<br />in search of profound tranquility and rejuvenation.</p>
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
          <img src="/assets/yoga-practice.png" alt="Yoga practice overlooking the volcanoes of Lake Atitlán" />
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
    </main>
  );
}
