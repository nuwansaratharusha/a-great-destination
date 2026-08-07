import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/inter/latin-400.css";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Nourishing meals",
    image: "/assets/nourishing-meals.png",
    alt: "Friends sharing a nourishing breakfast at a lakeside retreat",
    copy: "Three nourishing and delicious homemade meals a day, made with fresh, locally sourced ingredients — prepared with love by our Guatemalan kitchen team.",
  },
  {
    title: "Daily Yoga",
    image: "/assets/daily-yoga.png",
    alt: "Yoga practice overlooking Lake Atitlán",
    copy: "Daily yoga classes overlook the volcanoes of Lake Atitlán, with transformative workshops that invite you to rediscover yourself.",
  },
  {
    title: "Inspiring Workshops",
    image: "/assets/workshops.png",
    alt: "Open-air workshop pavilion above the lake",
    copy: "Immersive experiences designed to inspire, challenge and transform. Led by passionate experts, each session invites you to explore new skills and connect with a vibrant community.",
  },
  {
    title: "Unforgettable Events",
    image: "/assets/events.png",
    alt: "A fire-lit movement event at night",
    copy: "Music, movement and ceremony meet under the open sky. Every gathering is an invitation to be fully present, expressive and connected.",
  },
  {
    title: "Sauna & Cold Plunge",
    image: "/assets/sauna.png",
    alt: "Warm fire gathering at the retreat",
    copy: "A ritual inspired by traditional heat and cold practices: sauna, an invigorating plunge and a quiet place to land between adventures.",
  },
];

function ExperienceRow({ item, index }) {
  return (
    <article className="experience-row" data-row>
      <h2><span>{String(index + 1).padStart(2, "0")}</span>{item.title}</h2>
      <figure>
        <img src={item.image} alt={item.alt} />
      </figure>
      <p>{item.copy}</p>
    </article>
  );
}

export function App() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis;
    let ticker;

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.14, wheelMultiplier: 0.72, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      ticker = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    }

    const context = gsap.context(() => {
      const rows = gsap.utils.toArray("[data-row]");

      gsap.fromTo(
        ".experience-heading-inner",
        { yPercent: 110 },
        { yPercent: 0, duration: 1.15, ease: "power4.out", delay: 0.08 },
      );

      rows.forEach((row) => {
        const image = row.querySelector("img");
        const title = row.querySelector("h2");
        const copy = row.querySelector("p");

        gsap.fromTo(
          [title, copy],
          { opacity: 0.28, y: 24 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 82%",
              end: "top 49%",
              scrub: true,
            },
          },
        );

        gsap.fromTo(
          image,
          { yPercent: -10, scale: 1.13 },
          {
            yPercent: 10,
            scale: 1.02,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      gsap.fromTo(
        ".accent-word",
        { backgroundPosition: "110% 50%" },
        {
          backgroundPosition: "-20% 50%",
          ease: "none",
          scrollTrigger: {
            trigger: ".inclusive-section",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    }, root);

    return () => {
      if (ticker) gsap.ticker.remove(ticker);
      lenis?.destroy();
      context.revert();
    };
  }, []);

  return (
    <main ref={root}>
      <section className="inclusive-section" aria-labelledby="inclusive-title">
        <header className="experience-heading">
          <div className="heading-mask">
            <h1 id="inclusive-title" className="experience-heading-inner">
              Enjoy an <span className="accent-word">all-inclusive</span> experience
            </h1>
          </div>
        </header>

        <div className="experience-list">
          {experiences.map((item, index) => (
            <ExperienceRow item={item} index={index} key={item.title} />
          ))}
        </div>
      </section>

      <section className="next-section" aria-label="Next section preview">
        <div>
          <span>Rooms</span>
          <h2>Snake</h2>
          <p>A room suspended between forest and lake.</p>
        </div>
        <img src="/assets/room.png" alt="A warm retreat room surrounded by tropical foliage" />
      </section>
    </main>
  );
}
