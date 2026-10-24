import { MapPinIcon } from "@/components/icons";
import { Stars } from "@/components/ui";
import type { Testimonial } from "@/lib/testimonials";

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-[#fffdf8] p-6">
      <Stars value={5} />
      <blockquote className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink/70">
        “{item.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line/80 pt-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-[11px] font-bold text-paper">
          {item.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold">{item.name}</p>
          <p className="mt-0.5 flex items-center gap-1 text-[10.5px] text-ink/45">
            <MapPinIcon className="size-3 shrink-0" />
            {item.route}
          </p>
        </div>
        <span className="ml-auto hidden text-[9px] tracking-wide text-ink/30 uppercase sm:block">
          {item.meta}
        </span>
      </figcaption>
    </figure>
  );
}
