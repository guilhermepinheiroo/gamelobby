import { useState } from 'react';

export function MessageInput({ onSend, disabled, game }) {
  const [text, setText] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
  };

  return (
    <div className="px-4 py-3 border-t border-dark-600 bg-dark-900">
      <div className="flex gap-2 items-center">
        <div className="flex-1 relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={disabled ? 'Conectando...' : `Mensagem #${game?.name?.toLowerCase() || 'lobby'}...`}
            disabled={disabled}
            maxLength={500}
            className="input-gamer pr-12 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
          />
          {text.length > 400 && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-500">
              {500 - text.length}
            </span>
          )}
        </div>
        <button
          onClick={handleSend}
          disabled={!text.trim() || disabled}
          className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0
                     disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: text.trim() && !disabled
              ? 'linear-gradient(135deg, #7c3aed, #a855f7)'
              : 'rgba(45, 38, 80, 0.5)',
            boxShadow: text.trim() && !disabled ? '0 4px 15px rgba(168, 85, 247, 0.3)' : 'none',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <p className="text-xs text-gray-700 font-mono mt-1.5 ml-1">Pressione Enter para enviar</p>
    </div>
  );
}