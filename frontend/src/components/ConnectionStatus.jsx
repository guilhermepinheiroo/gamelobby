export function ConnectionStatus({ isConnected, isConnecting }) {
  if (isConnecting) {
    return (
      <div className="flex items-center gap-2 text-xs font-mono text-yellow-400">
        <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
        Conectando...
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
        <span className="status-dot" />
        Online
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs font-mono text-red-400">
      <span className="w-2 h-2 rounded-full bg-red-400" />
      Offline
    </div>
  );
}