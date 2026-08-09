import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { media, tours, WHATSAPP_NUMBER, buildWhatsAppLink, buildEnquiryMessage } from "../data";

function tourLabel(tour) {
  return tour.nights ? `${tour.name} — ${tour.nights} Nights` : tour.name;
}

export default function BookingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", date: "", guests: "1", interest: tourLabel(tours[0]), note: "" });
  const [submitted, setSubmitted] = useState(false);
  const bookingRoot = useRef(null);

  useEffect(() => {
    document.title = "Plan Your Journey | A Great Destination";
  }, []);

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
    window.open(buildWhatsAppLink(buildEnquiryMessage(formData)), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="booking-success dark-section section-pad">
        <div className="success-content">
          <span className="success-icon">✓</span>
          <h2>Request Ready.</h2>
          <p>Thank you, <strong>{formData.name}</strong>. We've opened WhatsApp with your request for the <strong>{formData.interest}</strong> on {formData.date} (for {formData.guests} guest{parseInt(formData.guests) > 1 ? "s" : ""}) — just hit send.</p>
          <p className="subtext">If WhatsApp didn't open, message us directly at <strong>+{WHATSAPP_NUMBER}</strong> and our travel specialists will reply within 24 hours.</p>
          <button className="primary-button" onClick={() => navigate("/")}>Return to Home</button>
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
                <img src={media.ellaJungle} alt="Luxury bedroom in Ella jungle treehouse" loading="lazy" decoding="async" />
                <span className="media-caption">Handcrafted luxury treehouse suits in Ella canopy</span>
              </div>

              <div className="booking-media-item">
                <img src={media.yalaSunrise} alt="Wild elephants in Yala National Park" loading="lazy" decoding="async" />
                <span className="media-caption">Private wildlife safaris through Yala National Park</span>
              </div>

              <div className="booking-media-item">
                <img src={media.mirissaSecretBeach} alt="Secluded sandy cove in Mirissa" loading="lazy" decoding="async" />
                <span className="media-caption">Snorkel with green turtles at Mirissa secret shores</span>
              </div>

              <div className="booking-media-item">
                <img src={media.hotelOceanTerrace} alt="Premium resort terrace overlooking ocean" loading="lazy" decoding="async" />
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
                    {tours.map((tour) => (
                      <option key={tour.slug} value={tourLabel(tour)}>{tour.nights ? `${tour.name} (${tour.nights} Nights)` : tour.name}</option>
                    ))}
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
                  <label htmlFor="note">Special Requests or Questions</label>
                  <textarea
                    id="note"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    placeholder="Tell us what brings you to Sri Lanka..."
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
