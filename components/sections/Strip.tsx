import { AMENITIES } from "@/lib/content";

export function Strip() {
  return (
    <div className="strip" aria-label="Hotel amenities">
      <div className="strip__track">
        {[0, 1].map((group) => (
          <div className="strip__group" key={group} aria-hidden={group === 1}>
            {AMENITIES.map((item) => (
              <span className="strip__label" key={`${group}-${item}`}>
                {item}
                <span className="strip__item" aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}