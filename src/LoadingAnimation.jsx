import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./loading-animation.css";

export default function LoadingAnimation({ onComplete }) {
  const loaderRef = useRef(null);
  const percentageRef = useRef(null);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      onComplete?.();
      return;
    }

    document.body.classList.add("is-loading");

    const progress = { value: 3 };

    const updatePercentage = () => {
      if (percentageRef.current) {
        percentageRef.current.textContent = String(
          Math.round(progress.value)
        ).padStart(2, "0");
      }
    };

    const context = gsap.context(() => {
      gsap.set(".loader-brand", {
        opacity: 0,
        scale: 0.92,
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.inOut",
        },
        onComplete: () => {
          document.body.classList.remove("is-loading");
          onComplete?.();
        },
      });

      timeline
        // Percentage milestones
        .to(
          progress,
          {
            value: 38,
            duration: 0.46,
            ease: "none",
            onUpdate: updatePercentage,
          },
          0
        )
        .to(
          progress,
          {
            value: 86,
            duration: 0.46,
            ease: "none",
            onUpdate: updatePercentage,
          },
          0.46
        )
        .to(
          progress,
          {
            value: 99,
            duration: 0.46,
            ease: "none",
            onUpdate: updatePercentage,
          },
          0.92
        )
        .to(
          progress,
          {
            value: 100,
            duration: 0.15,
            ease: "none",
            onUpdate: updatePercentage,
          },
          1.75
        )

        // Moving image collage
        .fromTo(
          ".loader-image-a",
          { yPercent: -142 },
          { yPercent: 0, duration: 0.48, ease: "power3.out" },
          0.08
        )
        .to(
          ".loader-image-a",
          { yPercent: -132, duration: 0.52 },
          0.58
        )
        .fromTo(
          ".loader-image-b",
          { yPercent: 146 },
          { yPercent: 0, duration: 0.56 },
          0.48
        )
        .fromTo(
          ".loader-image-c",
          { yPercent: 140 },
          { yPercent: 0, duration: 0.54 },
          0.76
        )
        .to(
          ".loader-image-b",
          { yPercent: -122, duration: 0.55 },
          1.04
        )
        .fromTo(
          ".loader-image-d",
          { yPercent: 142 },
          { yPercent: 0, duration: 0.55 },
          1.04
        )
        .to(
          ".loader-image-c",
          { yPercent: -128, duration: 0.54 },
          1.28
        )
        .fromTo(
          ".loader-image-e",
          { yPercent: 150 },
          { yPercent: 0, duration: 0.5 },
          1.26
        )
        .to(
          ".loader-image-d, .loader-image-e",
          { yPercent: -120, duration: 0.42 },
          1.68
        )

        // Brand transition
        .to(
          ".loader-collage",
          { opacity: 0, duration: 0.18, ease: "none" },
          1.88
        )
        .to(
          ".loader-percentage",
          {
            top: "calc(100% - 34px)",
            scale: 0.78,
            duration: 0.34,
          },
          1.86
        )
        .to(
          ".loader-brand",
          {
            opacity: 1,
            scale: 1,
            duration: 0.38,
          },
          1.94
        )

        // Reveal website
        .to(
          loaderRef.current,
          {
            yPercent: -100,
            duration: 0.82,
            ease: "power4.inOut",
          },
          2.34
        );
    }, loaderRef);

    return () => {
      document.body.classList.remove("is-loading");
      context.revert();
    };
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="loading-screen" aria-hidden="true">
      <div className="loader-collage">
        <figure className="loader-image loader-image-a">
          <img src="/assets/room.png" alt="" />
        </figure>

        <figure className="loader-image loader-image-b">
          <img src="/assets/events.png" alt="" />
        </figure>

        <figure className="loader-image loader-image-c">
          <img src="/assets/nourishing-meals.png" alt="" />
        </figure>

        <figure className="loader-image loader-image-d">
          <img src="/assets/room.png" alt="" />
        </figure>

        <figure className="loader-image loader-image-e">
          <img src="/assets/events.png" alt="" />
        </figure>
      </div>

      <div className="loader-percentage">
        <span ref={percentageRef}>03</span>
        <small>%</small>
      </div>

      <div className="loader-brand">
        <img src="/assets/logo/A Great Destination logo.png" alt="" />
        <span>A Great Destination</span>
      </div>
    </div>
  );
}
