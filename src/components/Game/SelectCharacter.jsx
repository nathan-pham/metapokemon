import { useState, useEffect } from "react"

import MyEpicGame from "@/solidity/MyEpicGame.json"

import { CONTRACT_ADDRESS, transformCharacterAttributes } from "@/solidity/constants"
import { ethers } from "ethers"

const characterGradients = [
    "bg-gradient-to-tr from-yellow-100 via-yellow-300 to-yellow-500",
    "bg-gradient-to-tr from-green-200 via-green-400 to-green-500",
    "bg-gradient-to-tr from-red-200 to-red-600",
    "bg-gradient-to-tr from-indigo-100 to-purple-400"
]

export const SelectCharacter = ({ setCharacterNFT }) => {
    const [ characters, setCharacters ] = useState([])
    const [ gameContract, setGameContract ] = useState(null)

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

    useEffect(() => {
        if(window.ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner()
            const gameContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                MyEpicGame.abi,
                signer
            )

            setGameContract(gameContract)
        } else {
            console.log("Ethereum object not found")
        }
    }, [])

    useEffect(() => {
        if(gameContract) {
            getCharacters()
        }
    }, [gameContract])

    return (
        <>
            <h1 className="mt-6 text-xl font-medium font-gray-700">Mint your Pokemon. Choose wisely.</h1>

            <div className="grid grid-cols-4 gap-4 mt-3">
                {
                    characters.map((character, i) => (
                        <div key={ i } className={"rounded-xl cursor-pointer transform hover:-translate-y-2 hover:shadow-lg transition-all " + characterGradients[i % characterGradients.length]}>
                            <img src={ character.imageURI } className="w-full pixelated transform -translate-y-1/4" />
                        </div>
                    ))
                }
            </div>
        </>
    )
}