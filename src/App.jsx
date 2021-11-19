import { useState, useEffect } from "react"

import { Wrapper, Header, Footer, Button } from "@/components/Elements"
import { SelectCharacter, Arena } from "@/components/Game"

import dragoniteSrc from "@/assets/dragonite.gif"

import getGameContract from "@/solidity/getGameContract"
import { transformCharacterAttributes } from "@/solidity/constants"
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

        const gameContract = getGameContract()
        const txn = await gameContract.userHasNFT()

        if (txn.name) {
            console.log("User has character NFT")
            setCharacterNFT(transformCharacterAttributes(txn))
        } else {
            console.log("No character NFT found!")
        }
    }

    useEffect(() => hasWallet(setAccount), [])

    useEffect(() => {
        if(account) {
            fetchNFTMetadata()
        }
    }, [ account ])

    const render = () => {
        if(!account) {
            return (
                <>
                    <img className="max-w-full rounded-xl mt-6" src={ dragoniteSrc } />

                    <div className="text-center">
                        <Button onClick={ connectWallet } className="mt-6">Connect with Metamask</Button>
                    </div>
                </>
            )
        } else if(account && !characterNFT) {
            return <SelectCharacter setCharacterNFT={ setCharacterNFT }/>
        } else {
            return <Arena characterNFT={ characterNFT } setCharacterNFT={ setCharacterNFT } />
        }
    }
    
    return (
        <Wrapper>
            <Header />
            { render() }
            <Footer />
        </Wrapper>
    )
}

export default App