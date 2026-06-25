import Icon from "./Icon";
import HomeServiceCard from "./HomeServiceCard";
import { homeCategories } from "../data/services";

export default function HomeServicesMenu() {
  return (
    <div className="space-y-24">
      {homeCategories.map((cat) => (
        <div key={cat.id} id={cat.id} className="scroll-mt-28">
          <div
            className="reveal flex flex-col gap-3 border-b border-hairline pb-6 sm:flex-row sm:items-center sm:gap-5"
            data-reveal-delay="40"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/90">
              <Icon name={cat.icon} className="text-[1.4rem] text-on-primary" />
            </span>
            <div>
              <h3 className="font-display text-[1.7rem] font-bold leading-tight text-ink">
                {cat.name}
              </h3>
              <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">
                {cat.blurb}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cat.services.map((s, si) => (
              <HomeServiceCard
                key={s.title}
                service={s}
                icon={cat.icon}
                delay={si * 60}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
