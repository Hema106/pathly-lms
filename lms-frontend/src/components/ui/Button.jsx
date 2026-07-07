export default function Button({ children, variant = "primary", size = "md", className = "", ...props }) {
  const base = "inline-flex items-center justify-center gap-2 font-display font-semibold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base",
  };
  const variants = {
    primary: "bg-ink text-white hover:bg-ink/85",
    outline: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
    ghost: "text-ink hover:bg-ink/5",
    accent: "bg-primary text-white hover:bg-primary-dark",
    danger: "text-coral hover:bg-coral/10",
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
