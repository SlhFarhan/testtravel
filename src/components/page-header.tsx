import { ChevronDownIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { cn } from "@/lib/cn";
import Link from "next/link";

export function Breadcrumbs({
  items,
  className,
}: {
  items: Array<{ label: string; href?: string }>;
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[11px] text-ink/45">
        <li>
          <Link href="/" className="transition-colors hover:text-ink">
            Beranda
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronDownIcon
              aria-hidden
              className="size-3 -rotate-90 text-ink/25"
            />
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-ink/70">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Pembungkus tipis di atas PageHero agar semua halaman memakai
 * header yang sama tanpa menduplikasi markup.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  breadcrumbs,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  className?: string;
}) {
  return (
    <div className={cn(className)}>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        breadcrumbs={breadcrumbs?.map((crumb) => ({
          name: crumb.label,
          href: crumb.href,
        }))}
      >
        {children}
      </PageHero>
    </div>
  );
}
