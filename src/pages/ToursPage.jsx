import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { media, tours, buildInterestLink } from "../data";

export default function ToursPage() {
  const [durationFilter, setDurationFilter] = useState("All");

  useEffect(() => {
    document.title = "Sri Lanka Tours & Journeys | A Great Destination";
  }, []);

  const durations = useMemo(() => {
    const nights = [...new Set(tours.filter((t) => t.nights).map((t) => t.nights))].sort((a, b) => a - b);
    return nights;
  }, []);

  const visibleTours = durationFilter === "All" ? tours : tours.filter((t) => String(t.nights) === durationFilter);

  return (
    <div className="listing-page">
      <section className="listing-hero" style={{ backgroundImage: `url(${media.highlandTea})` }}>
        <div className="listing-hero-shade" />
        <div className="listing-hero-copy">
          <span className="section-label">Find Your Journey</span>
          <h1>Sri Lanka, Designed Around You</h1>
          <p>Every route below can be tailored — pace, stops and stays are yours to shape. Not sure where to start? Tell us what draws you to Sri Lanka and we'll build something around it.</p>
        </div>
      </section>

      <section className="listing-body cream-section section-pad">
        <div className="listing-filters">
          <label>
            <span>Duration</span>
            <select value={durationFilter} onChange={(e) => setDurationFilter(e.target.value)}>
              <option value="All">All</option>
              {durations.map((n) => (
                <option key={n} value={n}>{n} Nights</option>
              ))}
            </select>
          </label>
        </div>

        <div className="listing-grid">
          {visibleTours.map((tour) => (
            <article className="listing-card" key={tour.slug}>
              <div className="listing-card-media">
                <img src={tour.image} alt={tour.name} loading="lazy" decoding="async" />
                <span className="listing-card-tag">{tour.tag}</span>
              </div>
              <div className="listing-card-body">
                <h3>{tour.name}{tour.nights ? <span className="listing-card-nights"> — {tour.nights} Nights</span> : null}</h3>
                <p>{tour.copy}</p>
                <a className="listing-card-cta" href={buildInterestLink(tour.name)} target="_blank" rel="noopener noreferrer">
                  Enquire About This Journey ↗
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="listing-footnote">
          Looking for something that isn't listed here? <Link to="/plan-your-journey">Start a custom request</Link> and our team will design it with you.
        </p>
      </section>
    </div>
  );
}
