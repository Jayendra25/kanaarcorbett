import { Plate } from "@/components/media/Plate";
import { IMAGES } from "@/lib/images";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";

const diningNotes = [
  {
    name: "Multi-cuisine dining",
    note: "All day",
  },
  {
    name: "Fresh gourmet beverages",
    note: "Bar & lounge",
  },
  {
    name: "Event catering & feasts",
    note: "By arrangement",
  },
];

export function Dining() {
  return (
    <section className="section dining" id="dining">
      <div className="shell">
        <div className="dining__grid">
          <div className="dining__media">
            <div className="dining__main" data-reveal="clip">
              <Plate
                scene="dining"
                caption="Private dining & feasts"
                image={IMAGES.magentaBanquet}
                imagePosition="50% 50%"
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
            <div className="dining__sub" data-reveal="fade" data-reveal-delay="0.3">
              <Plate scene="terrace" sizes="(max-width: 900px) 60vw, 24vw" />
            </div>
            <div className="dining__ingredient" data-reveal data-reveal-delay="0.2">
              <span>From the Kumaon kitchen</span>
              <p>Bhatt ki churkani, chainsoo &amp; bal mithai.</p>
            </div>
          </div>

          <div className="dining__copy">
            <div className="section-label">
              <span>03</span>
              <span>Dining</span>
            </div>
            <h2 className="h2" data-reveal-lines>
              <span className="line-mask">
                <span>Kumaoni soul,</span>
              </span>
              <span className="line-mask">
                <span>
                  served with <em>grace.</em>
                </span>
              </span>
            </h2>
            <p className="lead dining__lead" data-reveal>
              Authentic culinary delights, a welcoming room, and menus that move
              easily from breakfast to celebration. Our restaurant serves room
              guests and grand events alike, with fresh, thoughtful cooking at its
              centre.
            </p>

            <ul className="dining__list" data-stagger>
              {diningNotes.map((item, index) => (
                <li key={item.name} data-stagger-item>
                  <span className="num">0{index + 1}</span>
                  <span className="name">{item.name}</span>
                  <span className="note">{item.note}</span>
                </li>
              ))}
            </ul>

            <div className="dining__hours" data-reveal>
              <span>
                <strong>Breakfast</strong> · Lunch · Dinner
              </span>
              <span>Private dining on request</span>
            </div>

            <div className="dining__actions" data-reveal data-reveal-delay="0.1">
              <a className="btn btn--primary" href="#contact">
                Dining enquiry
                <ArrowRight />
              </a>
              <a className="link-arrow" href="#gallery">
                A look inside
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
