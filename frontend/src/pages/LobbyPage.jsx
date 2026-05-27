import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Sidebar } from '../components/Sidebar';
import { Message } from '../components/Message';
import { MessageInput } from '../components/MessageInput';
import { OnlineUsers } from '../components/OnlineUsers';
import { LoadingScreen } from '../components/LoadingScreen';
import { GameSelectModal } from '../components/GameSelectModal';
import { useChat } from '../hooks/useChat';
import { useSocket } from '../contexts/SocketContext';
import { getGameById } from '../services/games';

export function LobbyPage() {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isConnected, isConnecting } = useSocket();

  const nickname = searchParams.get('nick') || 'Player';
  const roomCode = searchParams.get('code');

  const baseGameId = roomId?.split('-')[0];
  const game = getGameById(baseGameId);

  const { messages, onlineUsers, sendMsg, leave, messagesEndRef } = useChat(roomId, nickname);
  const [switchModal, setSwitchModal] = useState(null);

  // Redireciona se não tiver nickname
  useEffect(() => {
    if (!nickname || nickname === 'Player') {
      navigate('/');
    }
  }, [nickname, navigate]);

  // Garante saída da sala ao desmontar (trocar de rota, fechar aba, etc.)
  useEffect(() => {
    return () => {
      leave();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Toast ao conectar
  useEffect(() => {
    if (isConnected) {
      toast.success(`Entrou no lobby de ${game?.name || roomId}!`, {
        icon: game?.emoji || '🎮',
        style: { background: '#130f23', border: '1px solid rgba(168,85,247,0.3)', color: '#c084fc' },
      });
    }
  }, [isConnected]);

  const handleLeave = () => {
    leave();
    navigate('/');
  };

  const handleSelectGame = (newGame) => {
    if (newGame.id === baseGameId) {
      navigate(`/lobby/${newGame.id}?nick=${encodeURIComponent(nickname)}`);
    } else {
      setSwitchModal(newGame);
    }
  };

  const handleSwitchJoin = (newRoomId) => {
    leave();
    navigate(`/lobby/${newRoomId}?nick=${encodeURIComponent(nickname)}`);
  };

  const handleSwitchCreate = (newRoomId, code) => {
    leave();
    toast.success(`Sala ${code} criada!`, {
      icon: '🏠',
      style: { background: '#130f23', border: '1px solid rgba(168,85,247,0.3)', color: '#c084fc' },
    });
    navigate(`/lobby/${newRoomId}?nick=${encodeURIComponent(nickname)}&code=${code}`);
  };

  if (isConnecting) {
    return <LoadingScreen message={`Conectando ao ${game?.name || 'lobby'}...`} />;
  }

  return (
    <div className="h-screen flex bg-dark-950">
      {/* Sidebar esquerda — oculta no mobile */}
      <div className="hidden md:flex">
        <Sidebar
          currentGame={game}
          onSelectGame={handleSelectGame}
          nickname={nickname}
          onLeave={handleLeave}
        />
      </div>

      {/* Área principal do chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header do chat */}
        <div
          className="px-4 md:px-6 py-3 border-b border-dark-600 flex items-center gap-4 flex-shrink-0"
          style={{ background: 'rgba(13, 8, 24, 0.9)' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{game?.emoji || '🎮'}</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-white tracking-wide">
                  #{game?.name?.toLowerCase() || roomId}
                </h2>
                {roomCode && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded"
                        style={{ background: 'rgba(6,182,212,0.1)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.2)' }}>
                    {roomCode}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600 font-mono">{game?.description}</p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="status-dot" />
              <span className="text-emerald-400">{onlineUsers.length} online</span>
            </div>
            {!isConnected && (
              <span className="text-xs font-mono text-red-400 animate-pulse">● Reconectando</span>
            )}
            {/* Botão sair visível apenas no mobile */}
            <button
              onClick={handleLeave}
              className="md:hidden text-xs font-mono text-gray-500 hover:text-red-400 transition-colors px-2 py-1 rounded border border-dark-500 hover:border-red-500/30"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Mensagens */}
        <div className="flex-1 overflow-y-auto py-4 space-y-1 grid-bg" style={{ background: '#07030f' }}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <div className="text-5xl mb-4 opacity-30">{game?.emoji || '🎮'}</div>
              <p className="font-display font-semibold text-gray-600 text-lg tracking-wide">
                Nenhuma mensagem ainda
              </p>
              <p className="text-sm text-gray-700 font-mono mt-2">
                Seja o primeiro a falar em #{game?.name?.toLowerCase() || 'lobby'}!
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <Message key={msg.id} message={msg} nickname={nickname} />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <MessageInput onSend={sendMsg} disabled={!isConnected} game={game} />
      </div>

      {/* Sidebar direita — oculta em telas pequenas */}
      <div className="hidden lg:flex">
        <OnlineUsers users={onlineUsers} currentNickname={nickname} game={game} />
      </div>

      {/* Modal de troca de jogo */}
      {switchModal && (
        <GameSelectModal
          game={switchModal}
          onJoinExisting={handleSwitchJoin}
          onCreateRoom={handleSwitchCreate}
          onCancel={() => setSwitchModal(null)}
        />
      )}
    </div>
  );
}