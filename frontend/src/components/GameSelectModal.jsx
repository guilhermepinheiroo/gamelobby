import { useState } from 'react';

export function GameSelectModal({ game, onJoinExisting, onCreateRoom, onCancel }) {
  const [roomCode, setRoomCode] = useState('');
  const [mode, setMode] = useState(null);
  const [joinCode, setJoinCode] = useState('');

  const generateCode = () => Math.random().toString(36).substr(2, 6).toUpperCase();

  const handleJoin = () => {
    onJoinExisting(game.id);
  };

  const handleJoinWithCode = () => {
    const code = joinCode.trim().toUpperCase();
    if (!code) return;
    onJoinExisting(`${game.id}-${code}`);
  };

  const handleCreate = () => {
    const code = roomCode.trim() || generateCode();
    onCreateRoom(`${game.id}-${code}`, code);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ background: 'rgba(7, 3, 15, 0.9)', backdropFilter: 'blur(8px)' }}>
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden animate-fade-in"
        style={{
          background: 'linear-gradient(135deg, #130f23, #1a1530)',
          border: '1px solid rgba(168, 85, 247, 0.25)',
          boxShadow: '0 0 60px rgba(168, 85, 247, 0.15)',
        }}
      >
        {/* Header */}
        <div className="p-6 border-b border-dark-600"
             style={{ background: `linear-gradient(135deg, ${game.accentColor}10, transparent)` }}>
          <div className="text-4xl mb-3">{game.emoji}</div>
          <h2 className="font-display font-bold text-xl text-white tracking-wide">{game.fullName}</h2>
          <p className="text-sm text-gray-500 font-body mt-1">Como deseja entrar?</p>
        </div>

        {/* Options */}
        <div className="p-6 space-y-3">
          {/* Entrar Rápido */}
          <button
            onClick={handleJoin}
            className="w-full p-4 rounded-xl text-left transition-all duration-200 group"
            style={{
              background: 'rgba(168, 85, 247, 0.08)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(168, 85, 247, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(168, 85, 247, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <p className="font-display font-semibold text-white tracking-wide">Entrar Rápido</p>
                <p className="text-xs text-gray-500 font-mono mt-0.5">Entrar no lobby principal de {game.name} agora</p>
              </div>
            </div>
          </button>

          {/* Criar Sala */}
          <button
            onClick={() => setMode(mode === 'create' ? null : 'create')}
            className="w-full p-4 rounded-xl text-left transition-all duration-200"
            style={{
              background: 'rgba(6, 182, 212, 0.08)',
              border: `1px solid ${mode === 'create' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(6, 182, 212, 0.2)'}`,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏠</span>
              <div>
                <p className="font-display font-semibold text-white tracking-wide">Criar Sala</p>
                <p className="text-xs text-gray-500 font-mono mt-0.5">Crie uma sala privada com código personalizado</p>
              </div>
            </div>
          </button>

          {/* Painel de criação */}
          {mode === 'create' && (
            <div className="pl-4 animate-fade-in">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase().slice(0, 8))}
                  placeholder="Código da sala (ou deixe em branco)"
                  className="input-gamer flex-1 text-sm"
                />
                <button
                  onClick={handleCreate}
                  className="btn-primary px-4 py-2.5 text-xs"
                >
                  Criar
                </button>
              </div>
              <p className="text-xs text-gray-600 font-mono mt-1.5">
                Deixe em branco para gerar um código aleatório
              </p>
            </div>
          )}

          {/* Entrar com código */}
          <button
            onClick={() => setMode(mode === 'join' ? null : 'join')}
            className="w-full p-4 rounded-xl text-left transition-all duration-200"
            style={{
              background: 'rgba(99, 102, 241, 0.06)',
              border: `1px solid ${mode === 'join' ? 'rgba(99, 102, 241, 0.4)' : 'rgba(99, 102, 241, 0.18)'}`,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔐</span>
              <div>
                <p className="font-display font-semibold text-white tracking-wide">Entrar com Código</p>
                <p className="text-xs text-gray-500 font-mono mt-0.5">Entre em uma sala existente usando um código</p>
              </div>
            </div>
          </button>

          {/* Painel de entrar com código */}
          {mode === 'join' && (
            <div className="pl-4 animate-fade-in">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase().slice(0, 8))}
                  placeholder="Código da sala"
                  className="input-gamer flex-1 text-sm"
                />
                <button
                  onClick={handleJoinWithCode}
                  className="btn-primary px-4 py-2.5 text-xs"
                >
                  Entrar
                </button>
              </div>
              <p className="text-xs text-gray-600 font-mono mt-1.5">Insira o código fornecido pelo anfitrião</p>
            </div>
          )}
        </div>

        {/* Cancelar */}
        <div className="px-6 pb-6">
          <button
            onClick={onCancel}
            className="w-full py-2.5 rounded-lg text-sm font-mono text-gray-600 hover:text-gray-400 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}