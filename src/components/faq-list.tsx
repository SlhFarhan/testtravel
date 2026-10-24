import { PlusIcon } from "@/components/icons";
import type { FaqItem } from "@/lib/faq";
import { cn } from "@/lib/cn";

export function FaqList({
  items,
  className,
  defaultOpen = false,
}: {
  items: FaqItem[];
  className?: string;
  defaultOpen?: boolean;
}) {
  return (
    <div className={cn("border-t border-line/80", className)}>
      {items.map((item, index) => (
        <details
          key={item.question}
          open={defaultOpen && index === 0}
          className="group border-b border-line/80"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 text-left">
            <span className="flex gap-3">
              <span className="mt-0.5 hidden text-[11px] font-semibold tabular-nums text-ink/25 sm:block">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] leading-snug font-semibold text-ink transition-colors group-hover:text-clay">
                {item.question}
              </span>
            </span>
            <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-ink/15 text-ink/50 transition-colors group-hover:border-clay/40 group-hover:text-clay">
              <PlusIcon className="faq-icon size-3.5 transition-transform duration-300" />
            </span>
          </summary>
          <div className="pb-5 sm:pl-[2.1rem]">
            <p className="max-w-2xl pr-8 text-sm leading-relaxed text-ink/60">
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
