function getAvatarColor(nickname) {
  const colors = [
    '#a855f7', '#06b6d4', '#10b981', '#f97316',
    '#ef4444', '#3b82f6', '#ec4899', '#eab308',
  ];
  let hash = 0;
  for (let i = 0; i < nickname.length; i++) {
    hash = nickname.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function OnlineUsers({ users, currentNickname, game }) {
  return (
    <div className="w-56 flex-shrink-0 bg-dark-900 border-l border-dark-600 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-dark-600">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest">Online</h3>
          <span
            className="text-xs font-mono px-2 py-0.5 rounded-full"
            style={{
              background: 'rgba(52, 211, 153, 0.1)',
              color: '#34d399',
              border: '1px solid rgba(52, 211, 153, 0.2)',
            }}
          >
            {users.length}
          </span>
        </div>
      </div>

      {/* Users list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {users.length === 0 ? (
          <p className="text-xs text-gray-600 text-center mt-4 font-mono">Nenhum jogador ainda</p>
        ) : (
          users.map((user) => {
            const color = getAvatarColor(user.nickname);
            const isYou = user.nickname === currentNickname;
            return (
              <div
                key={user.socketId}
                className="flex items-center gap-2.5 px-2 py-2 rounded-lg transition-colors hover:bg-dark-700"
              >
                <div className="relative flex-shrink-0">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-display"
                    style={{ background: color + '30', border: `2px solid ${color}60`, color }}
                  >
                    {user.nickname[0]?.toUpperCase()}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-dark-900" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-mono truncate" style={{ color: isYou ? '#a855f7' : '#d1d5db' }}>
                    {user.nickname}
                    {isYou && <span className="text-gray-600 ml-1">(você)</span>}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Game info */}
      {game && (
        <div className="p-4 border-t border-dark-600">
          <div className="text-center">
            <div className="text-2xl mb-1">{game.emoji}</div>
            <p className="text-xs font-display font-semibold tracking-wider" style={{ color: game.color }}>
              {game.name}
            </p>
            <p className="text-xs text-gray-600 font-mono mt-0.5">Lobby</p>
          </div>
        </div>
      )}
    </div>
  );
}