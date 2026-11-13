import { ROOMS } from "@/lib/content";
import { Plate } from "@/components/media/Plate";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";

const included = [
  "Breakfast at the restaurant",
  "High-speed Wi-Fi",
  "Indoor & outdoor parking",
  "Concierge assistance",
];

export function Stays() {
  return (
    <section className="section stays" id="stays">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="section-label">
              <span>02</span>
              <span>Stays</span>
            </div>
            <h2 className="h2 section-head__title" data-reveal-lines>
              <span className="line-mask">
                <span>Rooms made</span>
              </span>
              <span className="line-mask">
                <span>
                  for <em>rest.</em>
                </span>
              </span>
            </h2>
          </div>
          <div className="section-head__aside" data-reveal>
            <p>
              Choose from comfortable, considered rooms designed for business,
              leisure, and family stays — each with the essentials, and a little
              more.
            </p>
            <a className="link-arrow" href="#contact">
              Enquire about a stay
              <ArrowRight />
            </a>
          </div>
        </div>

        <div className="rooms" data-stagger>
          {ROOMS.map((room) => (
            <article className="room" key={room.name} data-stagger-item>
              <div className="room__media">
                <span className="room__index">{room.index}</span>
                {room.featured ? <span className="room__badge">Signature</span> : null}
                <Plate scene={room.scene} />
              </div>
              <div className="room__body">
                <span className="room__kicker">{room.kicker}</span>
                <div className="room__top">
                  <h3 className="room__name">{room.name}</h3>
                  <span className="room__size">{room.size}</span>
                </div>
                <p className="room__desc">{room.description}</p>
                <div className="room__meta">
                  <span>{room.occupancy}</span>
                  <span>{room.bed} bed</span>
                </div>
                <ul className="room__amenities">
                  {room.amenities.map((amenity) => (
                    <li key={amenity}>{amenity}</li>
                  ))}
                </ul>
                <div className="room__foot">
                  <a className="link-arrow" href="#contact">
                    Enquire about this room
                    <ArrowRight />
                  </a>
                  <span className="room__note">Breakfast included</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="stays__note" data-reveal>
          <ul>
            {included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a className="link-arrow" href="#contact">
            Plan your stay
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}