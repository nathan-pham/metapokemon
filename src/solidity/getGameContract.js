import MyEpicGame from "./MyEpicGame.json"
import { CONTRACT_ADDRESS } from "./constants"
import { ethers } from "ethers"

const getGameContract = (setGameContract) => {
    if(window.ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const gameContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            MyEpicGame.abi,
            signer
        )

        if(setGameContract) {
            setGameContract(gameContract)
        }

        return gameContract
    } else {
        console.log("Ethereum object not found")
    }
}

export default getGameContract