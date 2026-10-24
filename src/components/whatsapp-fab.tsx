import { WhatsAppIcon } from "@/components/icons";
import { site, waLink } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat ${site.name} di WhatsApp`}
      className="group fixed right-4 bottom-4 z-40 flex items-center gap-3 rounded-full bg-[#25d366] py-3 pr-4 pl-3 text-ink shadow-[0_16px_40px_-12px_rgba(16,30,38,0.45)] transition-transform duration-200 hover:-translate-y-0.5 sm:right-6 sm:bottom-6"
    >
      <span className="pulse-ring relative grid size-7 place-items-center">
        <WhatsAppIcon className="size-7" />
      </span>
      <span className="max-w-0 overflow-hidden text-[13px] font-bold whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-40 group-hover:opacity-100 group-focus-visible:max-w-40 group-focus-visible:opacity-100 sm:max-w-40 sm:opacity-100">
        Chat via WhatsApp
      </span>
    </a>
  );
}
