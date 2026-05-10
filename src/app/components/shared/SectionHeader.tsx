interface SectionHeaderProps {
  number: string;
  title: string;
}

/**
 * Reusable section header with number label and decorative lines.
 */
export function SectionHeader({ number, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c0392b]/30" />
      <span
        className="text-[#c0392b] text-xs uppercase tracking-[0.3em] whitespace-nowrap"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {number}. {title}
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c0392b]/30" />
    </div>
  );
}
