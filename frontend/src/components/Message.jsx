function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

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

export function Message({ message, nickname: currentNickname }) {
  // System message
  if (message.type === 'system') {
    return (
      <div className="message-bubble flex justify-center py-1">
        <div className="flex items-center gap-2 text-xs text-gray-600 font-mono">
          <div className="h-px w-8 bg-gray-800" />
          <span className="text-gray-500">{message.text}</span>
          <span className="text-gray-700">{formatTime(message.timestamp)}</span>
          <div className="h-px w-8 bg-gray-800" />
        </div>
      </div>
    );
  }

  const isOwn = message.author === currentNickname || message.isOwn;
  const avatarColor = getAvatarColor(message.author);
  const initial = message.author?.[0]?.toUpperCase() || '?';

  if (isOwn) {
    return (
      <div className="message-bubble flex justify-end gap-2 px-2 py-0.5">
        <div className="flex flex-col items-end max-w-[75%]">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-600 font-mono">{formatTime(message.timestamp)}</span>
            <span className="text-xs font-mono" style={{ color: avatarColor }}>You</span>
          </div>
          <div
            className="px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm font-body text-white leading-relaxed"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              boxShadow: '0 4px 15px rgba(168, 85, 247, 0.25)',
            }}
          >
            {message.text}
          </div>
        </div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-display flex-shrink-0 mt-auto"
          style={{ background: avatarColor + '30', border: `2px solid ${avatarColor}60`, color: avatarColor }}
        >
          {initial}
        </div>
      </div>
    );
  }

  return (
    <div className="message-bubble flex gap-2 px-2 py-0.5">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-display flex-shrink-0 mt-auto"
        style={{ background: avatarColor + '30', border: `2px solid ${avatarColor}60`, color: avatarColor }}
      >
        {initial}
      </div>
      <div className="flex flex-col max-w-[75%]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-medium" style={{ color: avatarColor }}>
            {message.author}
          </span>
          <span className="text-xs text-gray-600 font-mono">{formatTime(message.timestamp)}</span>
        </div>
        <div className="px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm font-body text-gray-200 leading-relaxed bg-dark-700 border border-dark-500">
          {message.text}
        </div>
      </div>
    </div>
  );
}
