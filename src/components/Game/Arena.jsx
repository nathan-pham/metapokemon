import { useState, useEffect } from "react"

import { Button } from "@/components/Elements"

import getGameContract from "@/solidity/getGameContract"
import { transformCharacterAttributes } from "@/solidity/constants"
import { ethers } from "ethers"

export const Arena = ({ characterNFT }) => {

    const [ gameContract, setGameContract ] = useState(null)
    const [ boss, setBoss ] = useState(null)
    
    const getBoss = async () => {
        const bossTxn = await gameContract.getBoss()
        console.log("Boss txn:", bossTxn)
        setBoss(transformCharacterAttributes(bossTxn))
    }

    useEffect(() => getGameContract(setGameContract), [])
    useEffect(() => {
        if(gameContract) {
            getBoss()
        }
    },[ gameContract ])

    return (
        <>
            { boss && (
                <div>
                    <img src={ boss.imageURI } />
                </div>
            )}

            <div>
                <img src={ characterNFT.imageURI } />
            </div>
        </>
    )
}