import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./smooth-loader.css";

const images = [
  "/assets/room.png",
  "/assets/workshops.png",
  "/assets/nourishing-meals.png",
  "/assets/sauna.png",
  "/assets/daily-yoga.png",
];

function preloadImages(sources) {
  return Promise.all(
    sources.map(
      (src) =>
        new Promise((resolve) => {
          const image = new Image();

          const finish = async () => {
            try {
              await image.decode();
            } catch {
              // Continue if decoding is unsupported.
            }

            resolve();
          };

          image.onload = finish;
          image.onerror = resolve;
          image.src = src;

          if (image.complete) {
            finish();
          }
        })
    )
  );
}

export default function SmoothLoader({ onComplete }) {
  const loaderRef = useRef(null);
  const streamRef = useRef(null);
  const collageRef = useRef(null);
  const counterRef = useRef(null);
  const percentageRef = useRef(null);
  const brandRef = useRef(null);
  const callbackRef = useRef(onComplete);

  useEffect(() => {
    callbackRef.current = onComplete;
  }, [onComplete]);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      document.documentElement.classList.remove("loader-active");
      document.documentElement.classList.add("site-ready");
      callbackRef.current?.();
      return;
    }

    document.documentElement.classList.add("loader-active");

    let context;
    let cancelled = false;

    const startAnimation = async () => {
      // Prevent the animation from starting before the images are ready.
      await Promise.race([
        preloadImages(images),
        new Promise((resolve) => setTimeout(resolve, 1800)),
      ]);

      if (cancelled) return;

      context = gsap.context(() => {
        const progress = { value: 3 };

        const updatePercentage = () => {
          if (!percentageRef.current) return;

          percentageRef.current.textContent = String(
            Math.round(progress.value)
          ).padStart(2, "0");
        };

        gsap.set(streamRef.current, {
          y: () => window.innerHeight * 0.92,
          force3D: true,
        });

        gsap.set(brandRef.current, {
          autoAlpha: 0,
          scale: 0.94,
          force3D: true,
        });

        const timeline = gsap.timeline({
          onComplete: () => {
            document.documentElement.classList.remove("loader-active");
            document.documentElement.classList.remove("site-ready");
            callbackRef.current?.();
          },
        });

        timeline
          // Smooth percentage acceleration.
          .to(
            progress,
            {
              value: 99,
              duration: 1.72,
              ease: "power2.out",
              onUpdate: updatePercentage,
            },
            0
          )

          // One continuous movement instead of separate start/stop animations.
          .to(
            streamRef.current,
            {
              y: () => -window.innerHeight * 1.5,
              duration: 1.8,
              ease: "power1.inOut",
              force3D: true,
            },
            0.04
          )

          // Very subtle image movement.
          .fromTo(
            ".smooth-loader__card img",
            {
              scale: 1.07,
            },
            {
              scale: 1,
              duration: 1.8,
              ease: "none",
              force3D: true,
            },
            0.04
          )

          // Hold 99% until the collage finishes.
          .to(
            progress,
            {
              value: 100,
              duration: 0.12,
              ease: "none",
              onUpdate: updatePercentage,
            },
            1.72
          )

          // Remove collage cleanly.
          .to(
            collageRef.current,
            {
              autoAlpha: 0,
              duration: 0.18,
              ease: "power1.out",
            },
            1.82
          )

          // Move counter using transforms only.
          .to(
            counterRef.current,
            {
              y: () => window.innerHeight / 2 - 30,
              scale: 0.78,
              duration: 0.4,
              ease: "power3.inOut",
              force3D: true,
            },
            1.8
          )

          // Short branded beat.
          .to(
            brandRef.current,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.34,
              ease: "power3.out",
              force3D: true,
            },
            1.88
          )

          // Prepare the page behind the loader.
          .call(
            () => {
              document.documentElement.classList.add("site-ready");
            },
            null,
            2.12
          )

          // Continuous upward reveal.
          .to(
            loaderRef.current,
            {
              yPercent: -100,
              duration: 0.95,
              ease: "expo.inOut",
              force3D: true,
            },
            2.2
          );
      }, loaderRef);
    };

    startAnimation();

    return () => {
      cancelled = true;
      context?.revert();

      document.documentElement.classList.remove("loader-active");
      document.documentElement.classList.remove("site-ready");
    };
  }, []);

  return (
    <div ref={loaderRef} className="smooth-loader" aria-hidden="true">
      <div ref={collageRef} className="smooth-loader__collage">
        <div ref={streamRef} className="smooth-loader__stream">
          {images.map((src, index) => (
            <figure
              key={src}
              className={`smooth-loader__card smooth-loader__card--${
                index + 1
              }`}
            >
              <img src={src} alt="" draggable="false" />
            </figure>
          ))}
        </div>
      </div>

      <div ref={counterRef} className="smooth-loader__counter">
        <span ref={percentageRef}>03</span>
        <small>%</small>
      </div>

      <div ref={brandRef} className="smooth-loader__brand">
        <img src="/assets/logo/A Great Destination logo.png" alt="A Great Destination Logo" />
      </div>
    </div>
  );
}
