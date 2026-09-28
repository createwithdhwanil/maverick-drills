import Link from "next/link";

export default function SectionHeading({
  index,
  title,
  href,
  linkLabel = "View all",
}: {
  index: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 className="font-heading text-2xl md:text-3xl">
        <span className="text-red">{index}</span>{" "}
        <span className="text-foreground/30">—</span> {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="font-body text-sm text-foreground/60 hover:text-red"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
