import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { media, rooms, events, reviews, faqs, experiences, benefits } from "../data";
import { ActiveSectionContext } from "../ActiveSectionContext";

function useExperience(root, loading) {
  useLayoutEffect(() => {
    if (loading) return;
    let lenis;
    let ticker;
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
        const hero = root.current?.querySelector(".hero");
        const spans = title ? [...title.querySelectorAll("span")] : [];
        if (!title || !spans.length) return;
        const maxWidth = title.clientWidth * 0.995;
        // Cap by available height too, so short/landscape viewports don't let the
        // width-fit search grow the title past the hero's own pinned viewport.
        const maxHeight = hero ? hero.clientHeight * 0.62 : Infinity;
        const fits = (size) => {
          title.style.fontSize = `${size}px`;
          const rects = spans.map((span) => span.getBoundingClientRect());
          const widthOk = rects.every((r) => r.width <= maxWidth);
          const heightOk = title.scrollHeight <= maxHeight;
          return widthOk && heightOk;
        };
        let lo = 20;
        let hi = 500;
        let best = lo;
        for (let i = 0; i < 24; i++) {
          const mid = (lo + hi) / 2;
          if (fits(mid)) { best = mid; lo = mid; } else { hi = mid; }
        }
        // The footer repeats this exact wordmark via a plain CSS
        // clamp(130px, 15.6vw, 275px) on its own last line (see .footer-title
        // span:last-child). On tall/narrow viewports (tablet portrait) the
        // width-fit search above can settle on a noticeably smaller size than
        // that; float up to the footer's own scale whenever there's still
        // room to do so without breaking the width/height fit.
        const footerFloor = Math.min(Math.max(window.innerWidth * 0.156, 130), 275) / 1.02;
        if (footerFloor > best && fits(footerFloor)) best = footerFloor;
        title.style.fontSize = `${best}px`;
      };
      fitHeroTitle();
      window.addEventListener("resize", fitHeroTitle);
      removeResizeListener = () => window.removeEventListener("resize", fitHeroTitle);

      gsap.fromTo(".header", { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, delay: 0.25, ease: "power3.out" });
      gsap.fromTo(".hero-title span", { yPercent: 120 }, { yPercent: 0, duration: 1.25, stagger: 0.07, ease: "power4.out", delay: 0.2 });
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
        // xPercent is intentionally left out here: it never changes across these
        // keyframes, and tweening a "constant" transform axis makes GSAP layer its
        // own -50% on top of the CSS translateX(-50%) that already centers .value-copy,
        // pushing the block off-center. Only opacity/y need to animate.
        valueTl.fromTo(item, { opacity: 0, y: 45 }, { opacity: 1, y: 0, duration: 0.12 }, index * 0.26)
          .to(item, { opacity: index === valueCopies.length - 1 ? 1 : 0, y: -35, duration: 0.12 }, index * 0.26 + 0.17);
      });

      // gsap.matchMedia() (rather than a one-time innerWidth check) keeps the
      // horizontal pin in sync if the viewport crosses 768px via resize,
      // rotation, or a foldable unfolding, instead of leaving a stale
      // desktop-only trigger. Nesting it inside this gsap.context() means
      // scope.revert() below also reverts the matchMedia instance.
      gsap.matchMedia().add("(min-width: 768px)", () => {
        const track = document.querySelector(".rooms-track");
        if (!track) return;
        const roomsTl = gsap.timeline({
          scrollTrigger: { trigger: ".rooms", start: "top top", end: () => `+=${track.scrollWidth}`, pin: ".rooms-stage", scrub: 1, invalidateOnRefresh: true },
        });
        // The heading sits at a fixed screen position while the track slides beneath it;
        // the flex `gap` between room cards is transparent, so once cards start moving,
        // gaps between them can peek through to the (otherwise-covered) heading. Fading
        // it out early avoids that instead of relying on cards to fully occlude it.
        roomsTl
          .to(".rooms-heading", { opacity: 0, duration: 0.12, ease: "none" }, 0)
          .to(track, { x: () => -(track.scrollWidth - window.innerWidth + 48), ease: "none", duration: 1 }, 0);
      });

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
        .to(".yoga-image", { yPercent: 4, duration: 0.34, ease: "none" }, 0.66)
        // The header fades out at the start of this reveal for a full-bleed cinematic
        // moment (line above, position 0.03) but was never faded back in, so it stayed
        // hidden for every section below this one. Restore it before the section ends.
        .to(".header", { y: 0, opacity: 1, duration: 0.1, ease: "none" }, 0.88);

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

      ScrollTrigger.refresh();
    }, root);
    return () => {
      removeResizeListener?.();
      if (ticker) gsap.ticker.remove(ticker);
      lenis?.destroy();
      scope.revert();
    };
  }, [root, loading]);
}

function ExperienceRow({ item, index }) {
  return (
    <article className="experience-row" data-row>
      <div className="experience-info">
        <h3><span>{String(index + 1).padStart(2, "0")}</span>{item.title}</h3>
        <p>{item.copy}</p>
      </div>
      <figure>
        <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
      </figure>
    </article>
  );
}

export default function HomePage({ loading }) {
  const root = useRef(null);
  const [faq, setFaq] = useState(0);
  const { setActive } = useContext(ActiveSectionContext);

  useExperience(root, loading);

  useEffect(() => {
    const sections = [...document.querySelectorAll("main section[id]")];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-42% 0px -50%" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [setActive]);

  useEffect(() => {
    document.title = "Luxury Sri Lanka Holidays & Private Tours | A Great Destination";
  }, []);

  const quote = "We came to see Sri Lanka and left with an entirely different understanding of it. A Great Destination did not just guide us through the island's breathtaking landmarks — they showed us how to see them.";

  return (
    <div ref={root}>
      <main>
        <section id="top" className="hero">
          <video className="hero-media" src={media.heroVideo} autoPlay loop muted playsInline />
          <div className="hero-shade" />
          <h1 className="hero-title"><span>A GREAT</span><span>DESTINATION</span></h1>
          <span className="scroll-cue">Scroll to wander <i>↓</i></span>
        </section>

        <section id="about" className="about cream-section section-pad">
          <div className="section-label" data-reveal>01 — Curation</div>
          <h2 className="display-copy" data-reveal>Private journeys designed around <em>discovery</em>, comfort and genuine connection.</h2>
          <div className="about-grid">
            <div className="about-image"><img src={media.wildElephantWaterhole} alt="Wild elephant at a waterhole in Sri Lanka's dry-zone wilderness" loading="lazy" decoding="async" /></div>
            <div className="about-copy" data-reveal>
              <p>We are a bespoke Sri Lanka travel designer, creating private journeys through the island's cultural heartlands, misty tea country and secluded coastlines — shaped entirely around how you want to travel.</p>
              <div className="facts"><span><small>Country</small>Sri Lanka</span><span><small>Average temp</small>27°C</span><span><small>Key trails</small>Sigiriya & Ella</span><span><small>Style</small>Private & unhurried</span></div>
            </div>
          </div>
        </section>

        <section id="values" className="values">
          <div className="values-stage">
            <div className="values-head-bg" />
            <div className="values-media">
              <video src={media.sigiriyaVideo} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="values-overlay" />
            <h2 className="values-title">Core Values</h2>
            <div className="values-copy-wrap">
              {[["100% Private", "No coaches. No shared itineraries. Every journey is exclusively yours, from arrival to departure."], ["Local Expertise", "Created and managed by specialists who live on the island and know it intimately."], ["Designed Around You", "Every route starts with your interests, pace and style — not a fixed template."]].map(([title, text]) => {
                // Scale each headline inversely to its length (relative to the shortest, "100% Private")
                // so every value fits on one line at the same perceived width instead of wrapping.
                const scale = 12 / title.length;
                const fontSize = `clamp(${Math.round(32 * scale)}px, ${(9 * scale).toFixed(2)}vw, ${Math.round(126 * scale)}px)`;
                return <div className="value-copy" key={title}><h3 style={{ fontSize }}>{title}</h3><p>{text}</p></div>;
              })}
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
              <h2 id="inclusive-title" className="experience-heading-inner">
                Experience signature <span className="accent-word">curated</span> pathways
              </h2>
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
                <img src={room.image} alt={`${room.name} accommodation`} loading="lazy" decoding="async" />
                <div className="room-top"><span>0{i + 1}</span><h3>{room.name}</h3></div>
                <div className="room-meta"><span><small>Type</small>{room.type}</span><span><small>Bed</small>{room.bed}</span><span><small>Size</small>{room.size}</span></div>
                <Link to="/plan-your-journey" onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}>Inquire stay ↗</Link>
              </article>)}
            </div>
          </div>
        </section>

        <section id="yoga" className="yoga-reveal" aria-labelledby="yoga-title">
          <div className="yoga-stage">
            <div className="yoga-window">
              <img className="yoga-image" src={media.swingForest} alt="Woman swinging under forest canopy" loading="lazy" decoding="async" />
            </div>
            <h2 id="yoga-title" className="yoga-title">Wander</h2>
            <p className="yoga-caption">We design private routes across Sri Lanka,<br />shaped entirely around how you want to travel.</p>
          </div>
        </section>

        <section id="practice" className="practice" aria-label="Yoga practice benefits">
          <div className="practice-container">
            <div className="benefit-column benefit-column-left">
              {benefits.slice(0, 2).map((item) => (
                <article className="benefit" key={item.title}>
                  <h2>{item.title}</h2>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>

            <figure className="practice-image">
              <img src={media.hikerMountain} alt="Trekker looking at highlands lake" loading="lazy" decoding="async" />
            </figure>

            <div className="benefit-column benefit-column-right">
              {benefits.slice(2).map((item) => (
                <article className="benefit" key={item.title}>
                  <h2>{item.title}</h2>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
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
                    <video src={mediaPath} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <img src={mediaPath} alt={title} loading="lazy" decoding="async" />
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
          <div className="guideline-line"><span>Culture</span><span>Tea Country</span><span>Wildlife</span><span>Coast</span><span>Culture</span><span>Tea Country</span></div>
        </section>

        <section className="quote">
          <div className="quote-sticky">
            <img src={media.highlandTea} alt="Sunset over Sri Lanka's highland tea country" loading="lazy" decoding="async" />
            <div className="quote-shade" />
            <blockquote>“ {quote.split(" ").map((word, i) => <span className="quote-word" key={`${word}-${i}`}>{word} </span>)} ”</blockquote>
            <span className="quote-credit">— the wanderlust chronicle</span>
          </div>
        </section>

        <section id="reviews" className="reviews cream-section section-pad">
          <div className="section-label">04 — Traveler diaries</div>
          <div className="reviews-track">{[...reviews, ...reviews].map(([name, text], i) => <article className="review" key={`${name}-${i}`}><span>★★★★★</span><p>“{text}”</p><small>{name} · private client</small></article>)}</div>
        </section>

        <section id="faq" className="faq cream-section section-pad">
          <div className="faq-container">
            <h2>FAQ</h2>
            <div className="faq-list">
              {faqs.map(([question, answer], i) => <article className={`faq-item ${faq === i ? "open" : ""}`} key={question}><button onClick={() => setFaq(faq === i ? -1 : i)} aria-expanded={faq === i}><span>{faq === i && <i />}{question}</span><b>+</b></button><div className="faq-answer"><p>{answer}</p></div></article>)}
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-top">
            <p>Colombo 07<br />Sri Lanka</p>
            <nav>{[["Welcome", "top"], ["About", "about"], ["Stays", "stay"], ["Approach", "yoga"], ["Excursions", "events"], ["FAQ", "faq"]].map(([item, id]) => <button key={item} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}>{item}</button>)}</nav>
            <p className="footer-social">Instagram<br />Youtube<br />Soundcloud<br />Tripadvisor</p>
          </div>
          <div className="footer-title"><span>A GREAT</span><span>DESTINATION</span></div>
          <div className="footer-bottom"><span>© 2026</span><span>Design and Developed | <a href="https://www.zipsolutions.co" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit" }}>ZIP solutions</a></span></div>
        </footer>
      </main>
    </div>
  );
}
