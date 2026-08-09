import { useEffect } from "react";
import { Link } from "react-router-dom";
import { media, destinations, buildWhatsAppLink } from "../data";

export default function DestinationsPage() {
  useEffect(() => {
    document.title = "Sri Lanka Destinations | A Great Destination";
  }, []);

  return (
    <div className="listing-page">
      <section className="listing-hero" style={{ backgroundImage: `url(${media.mirissaSecretBeach})` }}>
        <div className="listing-hero-shade" />
        <div className="listing-hero-copy">
          <span className="section-label">Where We Take You</span>
          <h1>One Island, Many Worlds</h1>
          <p>Ancient kingdoms, misty tea country, wild leopards and secluded beaches — all within a single, compact journey. Here are the places our routes are built around.</p>
        </div>
      </section>

      <section className="listing-body cream-section section-pad">
        <div className="listing-grid">
          {destinations.map((place) => (
            <article className="listing-card" key={place.slug}>
              <div className="listing-card-media">
                {place.type === "video" ? (
                  <video src={place.mediaSrc} autoPlay loop muted playsInline />
                ) : (
                  <img src={place.mediaSrc} alt={place.name} loading="lazy" decoding="async" />
                )}
                <span className="listing-card-tag">{place.tag}</span>
              </div>
              <div className="listing-card-body">
                <h3>{place.name}</h3>
                <p>{place.copy}</p>
                <a className="listing-card-cta" href={buildWhatsAppLink(`Hello, I'd like to include ${place.name} in my Sri Lanka itinerary.`)} target="_blank" rel="noopener noreferrer">
                  Ask About Visiting ↗
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="listing-footnote">
          See how these places come together in a full itinerary on our <Link to="/tours">Tours page</Link>.
        </p>
      </section>
    </div>
  );
}
