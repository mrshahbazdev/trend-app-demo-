interface LogoProps {
  className?: string;
}

export default function NewLogo({ className }: LogoProps) {
  return (
    <img
      src="/logo.gif"
      alt="TrendUpLive"
      className={className}
    />
  );
}
