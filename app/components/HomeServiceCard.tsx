import Image from "next/image";
import Icon from "./Icon";
import type { HomeService } from "../data/services";
import { bookingMessage, whatsappUrl } from "../lib/whatsapp";

export default function HomeServiceCard({
  service,
  icon,
  delay,
}: {
  service: HomeService;
  icon: string;
  delay: number;
}) {
  return (
    <article
      className="reveal glass card-lift group flex flex-col overflow-hidden rounded-[20px]"
      data-reveal-delay={`${delay}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden image-fade">
        <Image
          src={`https://images.unsplash.com/${service.image}?auto=format&fit=crop&w=700&q=90`}
          alt={service.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-primary/90 backdrop-blur-sm">
          <Icon name={icon} className="text-[1.15rem] text-on-primary" />
        </span>
        <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-canvas-deep/70 px-2.5 py-1 text-[0.68rem] font-medium text-ink backdrop-blur-sm">
          <Icon name="home_health" className="text-[0.85rem] text-primary-hover" />
          At your location
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h4 className="font-display text-[1.2rem] font-bold leading-snug text-ink">
          {service.title}
        </h4>
        <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-muted">
          {service.text}
        </p>
        <a
          href={whatsappUrl(bookingMessage(service.title))}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-primary transition-colors group-hover:text-primary-deep"
        >
          <Icon name="chat" className="text-[1.05rem]" />
          Book via WhatsApp
        </a>
      </div>
    </article>
  );
}
