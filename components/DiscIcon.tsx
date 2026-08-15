type Props = {
  href: string;
};

export default function DiscIcon({ href }: Props) {
  return (
    <div className="corner corner--right">
      <a
        className="disc-link"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open full playlist on YouTube"
      >
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="12" cy="12" r="6.4" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <circle cx="12" cy="12" r="2.1" fill="currentColor" />
        </svg>
      </a>
    </div>
  );
}
