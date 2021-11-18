import { useEffect, useState } from "react"

import { Wrapper, Header, Footer } from "@/components/Elements"
import { SelectCharacter } from "@/components/Game"

import dragoniteSrc from "@/assets/dragonite.gif"

import MyEpicGame from "@/solidity/MyEpicGame.json"
import { CONTRACT_ADDRESS } from "@/solidity/constants"
import { ethers } from "ethers"


const App = () => {

    const [ account, setAccount ] = useState(null)
    const [ characterNFT, setCharacterNFT ] = useState(null)

    const hasWallet = async () => {
        if(window.ethereum) {
            console.log("Ethereum object: ", ethereum)
        } else {
            console.log("Must install Metamask!")
            return
        }

        try {
            const accounts = await ethereum.request({ method: "eth_accounts" })

            if(accounts.length > 0) {
                const account = accounts[0]

                console.log("Found an authorized account: ", account)
                setAccount(account)
            } else { 
                console.log("No authorized account found") 
            }
        } catch(e) { 
            console.log(e) 
        }
    }

    const connectWallet = async () => {
        if(window.ethereum) {
            try {
                
                const accounts = await ethereum.request({ 
                    method: "eth_requestAccounts" 
                })

                const account = accounts[0]

                console.log("Connected", account)
                setAccount(account)

            } catch(e) { 
                console.log(e) 
            }
        } else { 
            alert("Install Metamask!") 
        }
    }

    const fetchNFTMetadata = async () => {
        console.log("Checking for character NFT on address:", account)

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const gameContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            MyEpicGame.abi,
            signer
        )

        const txn = await gameContract.userHasNFT()
        if (txn.name) {
            console.log("User has character NFT")

            setCharacterNFT({
                name: txn.name,
                imageURI: txn.imageURI,
                hp: txn.hp.toNumber(),
                maxHp: txn.maxHp.toNumber(),
                attackDamage: txn.attackDamage.toNumber()
            })
        } else {
            console.log("No character NFT found!")
        }
    }

    useEffect(() => {
        hasWallet(setAccount)
    }, [])

    useEffect(() => {
        if(account) {
            fetchNFTMetadata()
        }
    }, [ account ])

    if(!account) {
        return (
            <Wrapper>
                <Header />

                <img className="max-w-full rounded-xl mt-4" src={ dragoniteSrc } />

                <div className="text-center">
                    <button onClick={ connectWallet } className="px-3 py-2 rounded-lg mt-4 bg-blue-500 text-white">Connect with Metamask</button>
                </div>

                <Footer />
            </Wrapper>
        )
    } else if(account && !characterNFT) {
        return (
            <Wrapper>
                <Header />
                <SelectCharacter setCharacterNFT={ setCharacterNFT }/>
                <Footer />
            </Wrapper>
        )
    }
}

export default App