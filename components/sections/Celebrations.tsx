import { EVENT_SPACES } from "@/lib/content";
import { Plate } from "@/components/media/Plate";
import { ArchMark } from "@/components/media/ArchMark";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";

const occasions = ["Weddings", "Receptions", "Engagements", "Birthdays", "Corporate"];

export function Celebrations() {
  return (
    <section className="celebrations" id="celebrations">
      <div className="celebrations__bg" aria-hidden="true">
        <ArchMark showDetails={false} />
      </div>
      <div className="shell">
        <div className="celebrations__head">
          <div>
            <div className="section-label">
              <span>04</span>
              <span>Celebrations</span>
            </div>
            <h2 className="h2" data-reveal-lines>
              <span className="line-mask">
                <span>Occasions,</span>
              </span>
              <span className="line-mask">
                <span>
                  held <em>beautifully.</em>
                </span>
              </span>
            </h2>
          </div>
          <div className="celebrations__aside" data-reveal>
            <p>
              From grand weddings to focused conferences and intimate family
              evenings, three versatile spaces hold the moment — with the service
              to make it feel effortless.
            </p>
            <ul className="celebrations__occasions">
              {occasions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="spaces" data-stagger>
          {EVENT_SPACES.map((space) => (
            <article className="space" key={space.name} data-stagger-item>
              <div className="space__media">
                <span className="space__index">{space.index}</span>
                <Plate
                  scene={space.scene}
                  image={space.image}
                  imagePosition={space.imagePosition}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                  dark
                />
              </div>
              <div className="space__body">
                <span className="space__type">{space.type}</span>
                <h3 className="space__name">{space.name}</h3>
                <span className="space__capacity">{space.capacity}</span>
                <p className="space__desc">{space.description}</p>
                <ul className="space__details">
                  {space.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <a className="space__link" href="#contact">
                  Enquire
                  <ArrowRight />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="celebrations__foot" data-reveal>
          <p>From the first toast to the last dance.</p>
          <a className="btn btn--light" href="#contact">
            Plan your celebration
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}