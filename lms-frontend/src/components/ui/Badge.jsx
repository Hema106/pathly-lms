export default function Badge({ children, tone = "highlight" }) {
  const tones = {
    highlight: "bg-highlight/20 text-highlight-dark",
    primary: "bg-primary-light text-primary",
    progress: "bg-progress-light text-progress",
    coral: "bg-coral/10 text-coral",
    ink: "bg-ink/5 text-inkSoft",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  );
}
