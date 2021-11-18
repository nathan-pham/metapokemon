import pokeballSrc from "@/assets/poke-ball.png"

export const Header = () => (
    <header className="flex items-center select-none rounded-xl mt-6 bg-gradient-to-l from-green-400 to-blue-500">
        <img className="pixelated h-28 w-28" src={ pokeballSrc } />
        <div>
            <h1 className="text-3xl font-bold text-white">Metapokemon</h1>
            <p className="text-white">Team up and protect the Pokeverse!</p>
        </div>
    </header>
)