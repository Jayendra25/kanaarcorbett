"use client";

const parkingFacilities = [
  {
    iconUrl: "https://uxwing.com/wp-content/themes/uxwing/download/traffic-road-sign/parking-area-icon.png",
    title: "Indoor Parking",
    description: "Convenient parking within the hotel premises.",
    subtitle: "On-Premise Parking Access",
    features: [
      "Suitable for staying guests",
      "Corporate visitors",
    ],
  },
  {
    iconUrl: "https://uxwing.com/wp-content/themes/uxwing/download/traffic-road-sign/parking-area-icon.png",
    title: "Outdoor Parking",
    description: "Additional outdoor parking space for guests and event visitors.",
    subtitle: "Spacious Visitor Parking",
    features: [
      "Visitors attending banquets",
      "Weddings and celebrations",
    ],
  },
];

export function Parking() {
  return (
    <section className="section parking" id="parking">
      <div className="shell">
        <div className="section-head section-head--center">
          <div className="section-label">
            <span>07</span>
            <span>Property Convenience</span>
          </div>
          <h2 className="h2 section-head__title" data-reveal-lines>
            <span className="line-mask">
              <span>Convenient Parking</span>
            </span>
            <span className="line-mask">
              <span>
                <em>Facilities</em>
              </span>
            </span>
          </h2>
          <div className="section-head__aside" data-reveal>
            <p>
              Enjoy convenient and hassle-free parking facilities at Hotel Kanaar
              Corbett, with dedicated spaces for staying guests and visitors
              attending weddings, celebrations, and conferences.
            </p>
          </div>
        </div>

        <div className="parking__grid" data-stagger>
          {parkingFacilities.map((facility, index) => {
            return (
              <article
                className="parking__card"
                key={facility.title}
                data-stagger-item
              >
                <div className="parking__icon">
                  <img 
                    src={facility.iconUrl} 
                    alt={`${facility.title} icon`}
                    width="32"
                    height="32"
                  />
                </div>
                <h3 className="parking__title">{facility.title}</h3>
                <p className="parking__subtitle">{facility.subtitle}</p>
                <p className="parking__description">{facility.description}</p>
                <ul className="parking__features">
                  {facility.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
