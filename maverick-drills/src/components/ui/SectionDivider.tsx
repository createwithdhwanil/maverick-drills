export default function SectionDivider() {
  return (
    <div className="relative h-px w-full bg-border" aria-hidden="true">
      <div className="absolute inset-y-0 left-0 w-16 -skew-x-12 bg-red md:w-24" />
    </div>
  );
}
