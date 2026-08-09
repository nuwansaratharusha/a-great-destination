const A = "/assets/";

// WhatsApp is the live enquiry channel until a dedicated inbox/CRM is wired up —
// swap this block for a real form-backend call (e.g. Formspree/Resend) once that's ready.
export const WHATSAPP_NUMBER = "447424294687";
export function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
export function buildEnquiryMessage({ name, email, date, guests, interest, note }) {
  const lines = [
    `Hello, I'd like to enquire about a Sri Lanka journey.`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Interested in: ${interest}`,
    `Preferred date: ${date}`,
    `Guests: ${guests}`,
  ];
  if (note) lines.push(`Notes: ${note}`);
  return lines.join("\n");
}
export function buildInterestLink(interestName) {
  return buildWhatsAppLink(`Hello, I'd like to enquire about the ${interestName} journey.`);
}

export const media = {
  heroVideo: `${A}background video.mp4`,
  sigiriyaVideo: `${A}video/aerial-rotating-over-lion-s-rock-in-sigiriya-anci-2026-01-22-18-53-57-utc.mp4`,
  ellaTrainVideo: `${A}video/this-is-a-mavic-pro-shot-in-ella-elle-sri-lanka-2026-01-21-02-19-13-utc.mp4`,
  yalaSafariVideo: `${A}video/woman-on-sri-lanka-safari-admire-wild-elephants-2026-06-25-17-03-09-utc.mp4`,

  ellaJungle: `${A}image/couple-relaxing-in-bedroom-using-laptop-and-tablet-2026-03-25-10-04-42-utc.jpg`,
  mirissaOcean: `${A}image/the-woman-relaxing-near-beautiful-swimming-pool-2026-03-17-00-43-29-utc.jpg`,
  sigiriyaValley: `${A}image/people-on-summer-terrace-having-breakfast-together-2026-01-05-00-31-49-utc.jpg`,

  yalaSunrise: `${A}image/wild-elephant-sunrise-sri-lanka.jpg`,
  highlandTea: `${A}image/tea-plantation-landscape-sunrise-2026-03-26-09-42-42-utc.jpg`,
  mihintaleDagaba: `${A}image/woman-at-ambasthala-dagaba-mihintale-north-centr-2026-03-25-01-37-06-utc.jpg`,
  mirissaSecretBeach: `${A}image/aerial-sunset-photo-of-secret-beach-close-to-miris-2026-03-19-23-41-11-utc.jpg`,
  wildElephantWaterhole: `${A}image/wild-elephant-waterhole-sri-lanka.jpg`,
  hotelOceanTerrace: `${A}image/hotel-terrace-by-the-ocean-view-of-the-terrace-on-2026-01-09-14-00-46-utc.jpg`,

  swingForest: `${A}image/woman-swing-dress-hat-sunlight-forest-wooden-bench-2026-04-02-02-45-24-utc.jpg`,
  hikerMountain: `${A}image/man-with-backpack-sitting-on-rock-and-looking-at-l-2026-03-18-20-49-25-utc.jpg`,

  teaRitual: `${A}image/tropical-woman-drink-tea-beautiful-lady-drinking-2026-03-24-01-24-30-utc.jpg`,
  sigiriyaFortressClimb: `${A}video/sunrise-over-sigiriya-rock-fortress-in-sri-lanka-a-2026-01-22-13-27-54-utc.mp4`,
};

export const rooms = [
  { name: "Ella Canopy Suite", type: "Jungle luxury treehouse", bed: "Super King", size: "64 m²", image: media.ellaJungle },
  { name: "Mirissa Ocean Villa", type: "Oceanfront beach terrace", bed: "Super King", size: "82 m²", image: media.mirissaOcean },
  { name: "Sigiriya Valley Lodge", type: "Cultural valley cottage", bed: "King", size: "48 m²", image: media.sigiriyaValley },
];

export const events = [
  ["Ella Nine Arch Train Ride", "Private Rail Excursion", media.ellaTrainVideo, "video"],
  ["Yala Wild Safari Adventure", "Wildlife Explorer Path", media.yalaSafariVideo, "video"],
  ["Ella Highland Tea Tasting", "Aromas & Organic Estates", media.teaRitual, "image"],
  ["Sigiriya Lion's Rock Fortress", "Private Sunrise Climb", media.sigiriyaFortressClimb, "video"],
];

export const reviews = [
  ["Natalie", "An unforgettable journey. Sigiriya at sunrise and the train journey through Ella felt completely dreamlike."],
  ["Lindsey", "Every single stop was tailored exactly to what we wanted — deep, personal, and endlessly comfortable."],
  ["Gillian", "Wandering through Ella's tea plantations and watching wild elephants in Yala was the highlight of our year."],
  ["Avi", "Warm hosts, flawless planning, and breath-taking landscapes. The best private travel designer we've used in Sri Lanka."],
];

export const faqs = [
  ["How do you customize itineraries?", "Every tour starts with a personal consultation. Our travel designers tailor stays, private guides, and transport routes to align with your pace and interest."],
  ["Do you assist with visa applications?", "Yes. We offer complete assistance for Sri Lanka ETA entry visas, along with local customs and immigration fast-track support."],
  ["What is included in the tour packages?", "Packages generally cover handpicked luxury stays, private chauffeur guides, domestic flights/scenic train bookings, select dining, and national park entries."],
  ["What is the best time to travel to Sri Lanka?", "Sri Lanka has two monsoon seasons, meaning there is always a dry coast. We recommend the South/West coast from December to April, and the North/East coast from May to October."],
  ["Can you customize family or group trips?", "Yes. We design custom multi-room villa stays, family-friendly safaris, and private group experiences with custom tempos."],
];

export const experiences = [
  {
    title: "Curated Safaris",
    image: media.yalaSunrise,
    alt: "Elephants in Yala National Park at sunrise",
    copy: "Immerse yourself in wildlife: trace majestic elephants and elusive leopards through Yala's dry-zone forests with expert private naturalists.",
  },
  {
    title: "Misty Highlands",
    image: media.highlandTea,
    alt: "Lush tea plantations of Ella and Nuwara Eliya at sunrise",
    copy: "Wander through rolling emerald tea fields, breathe in the fresh mountain air, and follow historical train pathways carved into the peaks.",
  },
  {
    title: "Ancient Heritage",
    image: media.mihintaleDagaba,
    alt: "Buddhist temple ruins at Mihintale rock fortress",
    copy: "Walk the ancient paths of Sigiriya fortress, Dambulla caves, and rock temples, tracing 2,500 years of Sri Lankan heritage.",
  },
  {
    title: "Secret Coastlines",
    image: media.mirissaSecretBeach,
    alt: "Drone shot of Mirissa secret beach and coconut groves",
    copy: "Unwind on secret, secluded golden shores, snorkel with sea turtles, and listen to the rhythmic swell of the Indian Ocean.",
  },
  {
    title: "Boutique Stays",
    image: media.hotelOceanTerrace,
    alt: "Handpicked premium boutique hotel terrace overlooking the sea",
    copy: "Rest in hand-selected luxury treehouses, colonial tea estates, and design-forward beach villas chosen for their connection to the land.",
  },
];

export const benefits = [
  {
    title: "Handpicked Stays",
    copy: "Boutique hotels, private villas and exceptional resorts, chosen and inspected personally rather than picked from a catalogue.",
  },
  {
    title: "Considered Pace",
    copy: "We build in time to properly see a place — untouched jungle trails, mist-filled valleys and secluded waterfalls — rather than rushing between stops.",
  },
  {
    title: "Seamless, Start to Finish",
    copy: "Your chauffeur, guides and experiences are coordinated for you, so nothing is left for you to manage.",
  },
  {
    title: "Here When You Need Us",
    copy: "A local team on the ground throughout your journey, with support just a message away, not just before you book.",
  },
];

// Shared source of truth for the bookable journeys — the Tours page and the
// enquiry form's dropdown both read from this, so they can't drift apart again.
export const tours = [
  {
    slug: "classic-sri-lanka",
    name: "Classic Sri Lanka",
    nights: 10,
    tag: "Cultural Discovery",
    image: media.mihintaleDagaba,
    copy: "Ancient cities, hill-country tea estates and southern beaches — a first, unhurried introduction to the island's cultural heartlands.",
  },
  {
    slug: "tea-wildlife-southern-coast",
    name: "Tea, Wildlife & Southern Coast",
    nights: 12,
    tag: "Wild & Scenic",
    image: media.highlandTea,
    copy: "Highland tea country, dawn safaris through Yala's dry-zone forests, and private ocean-view stays along the south coast.",
  },
  {
    slug: "wellness-ayurveda-journey",
    name: "Wellness & Ayurveda Journey",
    nights: 14,
    tag: "Island of Wellness",
    image: media.wildElephantWaterhole,
    copy: "A slower, restorative route through the island, woven with authentic Ayurvedic therapies and time to properly arrive.",
  },
  {
    slug: "custom-bespoke-itinerary",
    name: "Custom Bespoke Itinerary",
    nights: null,
    tag: "Made For You",
    image: media.mirissaSecretBeach,
    copy: "Tell us how you want to travel — honeymoon, multi-generational family trip, or a Sri Lanka & Maldives combination — and we'll design it around you.",
  },
];

export const destinations = [
  {
    slug: "sigiriya",
    name: "Sigiriya",
    tag: "Ancient Heritage",
    mediaSrc: media.sigiriyaFortressClimb,
    type: "video",
    copy: "Climb the ancient rock fortress of Sigiriya at sunrise, a 5th-century royal citadel rising 200 metres above the surrounding jungle — one of Sri Lanka's eight UNESCO World Heritage Sites.",
  },
  {
    slug: "ella",
    name: "Ella",
    tag: "Highland Tea Country",
    mediaSrc: media.ellaTrainVideo,
    type: "video",
    copy: "Misty hill-country tea estates, cool mountain air, and the iconic Nine Arch railway bridge — Sri Lanka's colonial-era hill station at its most scenic.",
  },
  {
    slug: "yala",
    name: "Yala National Park",
    tag: "Wildlife Safari",
    mediaSrc: media.yalaSunrise,
    type: "image",
    copy: "The island's most visited national park, and one of the best places on earth to see wild leopards and elephants roaming the dry-zone forest.",
  },
  {
    slug: "mirissa",
    name: "Mirissa",
    tag: "South Coast",
    mediaSrc: media.mirissaSecretBeach,
    type: "image",
    copy: "A relaxed south-coast beach town known for its secluded coves, whale watching, and easy access to Galle's historic fort.",
  },
  {
    slug: "mihintale",
    name: "Mihintale",
    tag: "Cultural Triangle",
    mediaSrc: media.mihintaleDagaba,
    type: "image",
    copy: "Considered the cradle of Buddhism in Sri Lanka, this sacred rock temple in the Cultural Triangle predates Sigiriya and is far less visited.",
  },
];
