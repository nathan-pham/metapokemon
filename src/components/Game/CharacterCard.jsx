const CharacterCard = ({ character, player }) => (
    <div className={"flex justify-between w-full " + (player ? "mt-4 flex-row-reverse" : "")}>
        <div className="flex flex-col justify-center leading-tight">
            <h2 className="text-2xl font-medium">{ character.name } ({ character.hp }/{ character.maxHp })</h2>
            <p className="text-gray-400">Attack Damage: { character.attackDamage }</p>

            <div className={ "overflow-hidden mt-3 h-2 bg-gray-200 rounded-full w-40 " + (character.hp == 0 ? "bg-red-400" : "bg-gray-200") }>
                <div className="rounded-full h-full transition-all bg-green-400" style={{ width: `${character.hp * 100 / character.maxHp}%` }}></div>
            </div>
        </div>
        
        <div>
            <img src={ character.imageURI } className={ "filter drop-shadow-lg pixelated " + (player ? "transform -translate-y-1/4" : "") } />
        </div>
    </div>
)

export default CharacterCard