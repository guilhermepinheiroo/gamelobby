export function GameCard({ game, onClick }) {
  return (
    <div className="game-card group p-5" onClick={() => onClick(game)}>
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-20"
        style={{
          background: `radial-gradient(circle at top right, ${game.accentColor}, transparent)`,
        }}
      />

      {/* Emoji */}
      <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 inline-block">
        {game.emoji}
      </div>

      {/* Name */}
      <h3 className="font-display font-bold text-lg text-white tracking-wide mb-1">
        {game.name}
      </h3>
      <p className="text-xs text-gray-500 font-body mb-3">{game.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {game.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded font-mono"
            style={{
              background: `${game.accentColor}18`,
              color: game.color,
              border: `1px solid ${game.accentColor}30`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Hover CTA */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${game.color}, transparent)` }}
      />
    </div>
  );
}
