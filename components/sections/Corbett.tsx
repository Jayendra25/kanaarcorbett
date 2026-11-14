import { EXPERIENCES } from "@/lib/content";
import { Plate } from "@/components/media/Plate";
import { ArrowRight } from "@/components/ui/Icons";

export function Corbett() {
  return (
    <section className="corbett" id="corbett">
      <div className="shell">
        <div className="corbett__head">
          <div>
            <div className="section-label">
              <span>05</span>
              <span>Corbett</span>
            </div>
            <h2 className="h2" data-reveal-lines>
              <span className="line-mask">
                <span>The wild is</span>
              </span>
              <span className="line-mask">
                <span>
                  your <em>neighbour.</em>
                </span>
              </span>
            </h2>
          </div>
          <p data-reveal>
            Jim Corbett National Park lies close by — a landscape of sal forest,
            river, and morning mist that shapes the rhythm of every day here. Step
            out into it, then return to warm light and a well-set table.
          </p>
        </div>
      </div>

      <div className="story">
        <div className="story__sticky">
          <div className="story__media">
            {EXPERIENCES.map((experience) => (
              <div className="story__scene" key={experience.title}>
                <Plate
                  scene={experience.scene}
                  image={experience.image}
                  imagePosition={experience.imagePosition}
                  sizes="(max-width: 900px) 100vw, 66vw"
                  dark
                />
              </div>
            ))}
            <div className="story__media-foot">
              <span className="story__count">
                <span data-story-count>01</span> / 03
              </span>
              <span className="story__hint">Scroll to explore</span>
            </div>
          </div>

          <div className="story__copy">
            <span className="eyebrow story__eyebrow">Into the wild</span>
            <div className="story__panels">
              {EXPERIENCES.map((experience) => (
                <div className="story__panel" key={experience.title}>
                  <span className="story__panel-index">{experience.index} / 03</span>
                  <h3>{experience.title}</h3>
                  <p>{experience.copy}</p>
                  <span className="story__panel-rule" aria-hidden="true" />
                </div>
              ))}
            </div>
            <div className="story__foot">
              <a className="link-arrow" href="#contact">
                Plan your days around it
                <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="story__mobile">
        {EXPERIENCES.map((experience) => (
          <article className="story__mobile-item" key={experience.title}>
            <div className="story__mobile-media" data-reveal="clip">
              <Plate
                scene={experience.scene}
                image={experience.image}
                imagePosition={experience.imagePosition}
                sizes="(max-width: 640px) 92vw, 100vw"
              />
            </div>
            <div className="story__mobile-copy" data-reveal>
              <span className="story__panel-index">{experience.index}</span>
              <div>
                <h3>{experience.title}</h3>
                <p>{experience.copy}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
