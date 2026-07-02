import Image from "next/image";
import Link from "next/link";
import Icon from "@/app/components/Icon";

type AuthScreenProps = {
  badge: { icon: string; label: string };
  title: React.ReactNode;
  subtitle: string;
  image: { src: string; alt: string };
  quote: { text: string; author: string; role: string };
  altPrompt: string;
  altLabel: string;
  altHref: string;
  children: React.ReactNode;
};

function BrandMark({ className }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <span className="flex size-9 items-center justify-center rounded-full bg-primary/90">
        <Icon name="spa" className="text-[1.2rem] text-on-primary" />
      </span>
      <span className="font-display text-[1.35rem] font-bold tracking-tight text-ink">
        Tres Marias
      </span>
    </Link>
  );
}

export default function AuthScreen({
  badge,
  title,
  subtitle,
  image,
  quote,
  altPrompt,
  altLabel,
  altHref,
  children,
}: AuthScreenProps) {
  return (
    <main className="flex min-h-svh flex-col bg-canvas-deep lg:flex-row">
      {/* Image / brand panel — larger devices only */}
      <section className="relative hidden overflow-hidden lg:flex lg:w-[46%] xl:w-1/2">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,19,17,0.5) 0%, rgba(8,19,17,0.72) 55%, rgba(8,19,17,0.94) 100%), radial-gradient(90% 80% at 20% 18%, rgba(197,160,89,0.32), transparent 60%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
          <BrandMark className="self-start" />

          <figure className="glass-strong max-w-md rounded-[24px] p-7">
            <Icon name="format_quote" className="text-[2rem] text-primary-hover" />
            <blockquote className="mt-1 text-[1.08rem] leading-relaxed text-ink">
              {quote.text}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/20">
                <Icon name="person" className="text-[1.2rem] text-primary-hover" />
              </span>
              <span>
                <span className="block text-[0.9rem] font-semibold text-ink">
                  {quote.author}
                </span>
                <span className="block text-[0.8rem] text-muted">{quote.role}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Form panel */}
      <section className="content-section-bg relative flex flex-1 flex-col">
        <div className="flex items-center justify-between px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="state-layer inline-flex items-center gap-1.5 rounded-full px-1 py-1 text-[0.85rem] font-medium text-muted transition-colors hover:text-ink"
          >
            <Icon name="arrow_back" className="relative z-10 text-[1.1rem]" />
            <span className="relative z-10">Back to home</span>
          </Link>
          <p className="flex items-center gap-1.5 text-[0.85rem] text-muted">
            <span className="hidden sm:inline">{altPrompt}</span>
            <Link
              href={altHref}
              className="font-medium text-primary-hover underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              {altLabel}
            </Link>
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 pb-14 sm:px-10">
          <div className="w-full max-w-sm">
            <BrandMark className="mb-8 lg:hidden" />

            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-wide text-primary-hover">
              <Icon name={badge.icon} className="text-[0.95rem]" />
              {badge.label}
            </span>
            <h1 className="mt-4 font-display text-[2.15rem] font-bold leading-tight text-ink">
              {title}
            </h1>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
              {subtitle}
            </p>

            <div className="mt-8">{children}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
