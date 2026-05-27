export function Logo({ size = 'md' }) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl',
  };

  return (
    <div className={`font-display font-bold tracking-widest ${sizes[size]} flex items-center gap-2`}>
      <span className="text-neon-purple glow-text">GAME</span>
      <span className="text-white">LOBBY</span>
      <span className="text-neon-cyan text-xs align-top mt-1 font-mono tracking-normal opacity-70">v1</span>
    </div>
  );
}
