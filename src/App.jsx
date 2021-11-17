import { useEffect, useState } from "react"

import { Wrapper, Header, Footer } from "@/components/Elements"
import dragoniteSrc from "@/assets/dragonite.gif"

const App = () => {

    const [ account, setAccount ] = useState(null)

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
            } else { console.log("No authorized account found") }
        } catch(e) { console.log(e) }
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

            } catch(e) { console.log(e) }
        } else { alert("Install Metamask!") }
    }


    useEffect(() => {
        hasWallet(setAccount)
    }, [])

    return (
        <>
            <Wrapper>
                <Header />

                <img className="max-w-full rounded-xl mt-4" src={ dragoniteSrc } />

                <div className="text-center">
                    <button onClick={ connectWallet } className="px-3 py-2 rounded-lg mt-4 bg-blue-500 text-white">Connect with Metamask</button>
                </div>

                <Footer />
            </Wrapper>
        </>
    )
}

export default App