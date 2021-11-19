import { useState, useEffect } from "react"

import { Button } from "@/components/Elements"

import getGameContract from "@/solidity/getGameContract"
import { transformCharacterAttributes } from "@/solidity/constants"
import { ethers } from "ethers"

const characterGradients = [
    "bg-gradient-to-tr from-yellow-100 via-yellow-300 to-yellow-500",
    "bg-gradient-to-tr from-green-200 via-green-400 to-green-500",
    "bg-gradient-to-tr from-red-200 to-red-600",
    "bg-gradient-to-tr from-indigo-100 to-purple-400"
]

export const SelectCharacter = ({ setCharacterNFT }) => {

    const [ loading, setLoading ] = useState(false)
    const [ characters, setCharacters ] = useState([])
    const [ gameContract, setGameContract ] = useState(null)
    const [ characterIndex, setCharacterIndex ] = useState(null)

    const getCharacters = async () => {
        try {
            console.log("Retrieving mintable characters")

            const characters = (await gameContract.getAllDefaultCharacters()).map(transformCharacterAttributes)

            setCharacters(characters)
            console.log("Characters:", characters)

        } catch(e) {
            console.log(e)
        }
    }

    const mintNFT = async (characterID) => {
        if(gameContract) {
            try {
                console.log("Minting character...")
                setLoading(true)
                const txn = await gameContract.mintNFT(characterID)
                await txn.wait()
                console.log("txn:", txn)
            } catch(e) {
                console.log(e)
            }
        }
    }

    const onMint = async (sender, tokenID, characterIndex) => {
        console.log(`NFT minted; sender: ${sender} tokenID: ${tokenID.toNumber()} characterIndex: ${characterIndex.toNumber()}`)

        if(gameContract) {
            const characterNFT = await gameContract.userHasNFT()
            console.log("Character NFT:", characterNFT)
            setCharacterNFT(transformCharacterAttributes(characterNFT))
            setLoading(false)
            window.open(`https://testnets.opensea.io/assets/${gameContract}/${tokenID.toNumber()}`, "_blank")
        }
    }

    useEffect(() => getGameContract(setGameContract), [])

    useEffect(() => {
        if(gameContract) {
            getCharacters()
            gameContract.on("CharacterNFTMinted", onMint)
        }

        return () => {
            if(gameContract) {
                gameContract.off("CharacterNFTMinted", onMint)
            }
        }
    }, [gameContract])

    return (
        <>
            <div className="leading-snug">
                <h1 className="mt-6 text-2xl font-medium">Click on a card to mint your Pokemon. Choose wisely.</h1>
                <p className="text-gray-400">Metapokemon does not cover the costs of minting an NFT.</p>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mt-4">
                {
                    characters.map((character, i) => (
                        <div key={ i } className="p-4 rounded-xl border border-gray-400" onClick={ () => setCharacterIndex(i) }>
                            <div className={"rounded-xl cursor-pointer hover:animate-pulse " + characterGradients[i % characterGradients.length]} >
                                <img src={ character.imageURI } className="w-full pixelated transform -translate-y-1/4" />
                            </div>
                        </div>
                    ))
                }
            </div>

            {
                characterIndex !== null
                    ? (
                        <div className="text-right">
                            <Button className="mt-4" onClick={ () => mintNFT(characterIndex) } disabled={ loading }>Mint { characters[characterIndex].name } NFT</Button>
                        </div>
                    )
                    : <></>
            }
        </>
    )

}