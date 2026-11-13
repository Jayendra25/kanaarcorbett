import { OFFERINGS, STATS } from "@/lib/content";
import { IMAGES } from "@/lib/images";
import { Plate } from "@/components/media/Plate";
import { ArrowRight } from "@/components/ui/Icons";

export function About() {
  return (
    <section className="section about" id="hotel">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="section-label">
              <span>01</span>
              <span>The estate</span>
            </div>
            <h2 className="h2 section-head__title" data-reveal-lines>
              <span className="line-mask">
                <span>A quiet address at</span>
              </span>
              <span className="line-mask">
                <span>
                  the edge of <em>the wild.</em>
                </span>
              </span>
            </h2>
          </div>
          <div className="section-head__aside" data-reveal>
            <p>
              Set in Peerumadara, on the threshold of Jim Corbett National Park,
              Hotel Kanaar Corbett is a place of warm light, generous rooms, and
              unhurried hospitality.
            </p>
            <a className="link-arrow" href="#stays">
              Discover the hotel
              <ArrowRight />
            </a>
          </div>
        </div>

        <div className="about__body">
          <div className="about__media">
            <div className="about__media-main" data-reveal="clip">
              <Plate scene="arch" caption="The garden court" image={IMAGES.elegantRoom} imagePosition="50% 44%" />
            </div>
            <div className="about__media-detail" data-reveal="fade" data-reveal-delay="0.3">
              <Plate scene="facade" image={IMAGES.welcome} imagePosition="66% 42%" />
            </div>
            <span className="about__stamp">Peerumadara · Ramnagar</span>
          </div>

          <div className="about__copy">
            <p className="eyebrow eyebrow--gold" data-reveal>
              The Kanaar spirit
            </p>
            <p className="about__pull" data-reveal data-reveal-delay="0.08">
              A place to stay, celebrate, and connect.
            </p>
            <div className="about__text">
              <p data-reveal data-reveal-delay="0.12">
                Welcome to Hotel Kanaar Corbett, a premier destination in
                Peerumadara, Ramnagar. Whether you are looking for a peaceful stay,
                hosting a grand wedding, planning a corporate meeting, or simply
                enjoying good food in good company, our spaces are tailored to the
                occasion.
              </p>
              <p data-reveal data-reveal-delay="0.18">
                Understated interiors, attentive service, and a deep sense of place
                come together here — a hotel shaped by the Kumaon landscape and the
                people who call it home.
              </p>
            </div>

            <ul className="offerings" data-stagger>
              {OFFERINGS.map((item) => (
                <li key={item} data-stagger-item>
                  {item}
                </li>
              ))}
            </ul>

            <div className="about__actions" data-reveal data-reveal-delay="0.2">
              <a className="link-arrow" href="#stays">
                Explore stays
                <ArrowRight />
              </a>
              <span className="about__sign">Stay. Celebrate. Gather.</span>
            </div>
          </div>
        </div>

        <div className="about__stats">
          {STATS.map((stat) => (
            <div className="stat" key={stat.label}>
              <div className="stat__value">
                {stat.value}
                <sup>+</sup>
              </div>
              <div className="stat__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}