
export function HomeGameList(games) {
    return (
        <div className="home-game-list">
            {games.map(game => {
                <HomeGamePreview game={game} />
            })}
        </div>
    )
}