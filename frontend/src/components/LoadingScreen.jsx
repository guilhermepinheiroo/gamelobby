import { Logo } from './Logo';

export function LoadingScreen({ message = 'Conectando aos servidores...' }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-dark-950 z-50">
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="relative mb-8">
        <div
          className="w-24 h-24 rounded-full animate-ping absolute inset-0"
          style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)' }}
        />
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center relative"
          style={{
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(168, 85, 247, 0.2))',
            border: '2px solid rgba(168, 85, 247, 0.5)',
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.3)',
          }}
        >
          <span className="text-4xl animate-pulse-slow">🎮</span>
        </div>
      </div>

      <Logo size="lg" />

      <div className="mt-6 flex items-center gap-2">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-neon-purple animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-sm font-mono text-gray-500 ml-1">{message}</p>
      </div>
    </div>
  );
}