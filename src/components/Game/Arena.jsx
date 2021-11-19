import { useState, useEffect } from "react"

import CharacterCard from "./CharacterCard"
import { Button } from "@/components/Elements"

import getGameContract from "@/solidity/getGameContract"
import { transformCharacterAttributes } from "@/solidity/constants"
import { ethers } from "ethers"



export const Arena = ({ characterNFT, setCharacterNFT }) => {

    const [ gameContract, setGameContract ] = useState(null)
    const [ boss, setBoss ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    
    const getBoss = async () => {
        const bossTxn = await gameContract.getBoss()
        console.log("Boss txn:", bossTxn)
        setBoss(transformCharacterAttributes(bossTxn))
    }

    const attackBoss = async () => {
        if(gameContract) {
            try {
                setLoading(true)

                const attackTxn = await gameContract.attackBoss()
                await attackTxn
                console.log("Attack txn:", attackTxn)

            } catch(e) {
                console.log(e)
                setLoading(false)
            }
        }

    }

    const onAttackComplete = (newBossHp, newPlayerHp) => {
        const bossHp = newBossHp.toNumber()
        const playerHp = newPlayerHp.toNumber()

        console.log(`Attack complete; Boss Hp: ${bossHp} Player Hp: ${playerHp}`)

        setBoss(state => ({ ...state, hp: bossHp }))
        setCharacterNFT(state => ({ ...state, hp: playerHp }))

        setLoading(false)
    }


    useEffect(() => getGameContract(setGameContract), [])
    useEffect(() => {
        if(gameContract) {
            getBoss()
            gameContract.on("AttackComplete", onAttackComplete)
        }

        return () => {
            if(gameContract) {
                gameContract.off("AttackComplete", onAttackComplete)
            }
        }
    },[ gameContract ])

    return (
        <>
            <div className="mt-6 rounded-xl border border-gray-400 p-4">
                { boss && <CharacterCard character={ boss } /> }
                
                <CharacterCard character={ characterNFT } player={ true } />
            </div>

            <div className="text-center">
                <Button className="mt-6" disabled={ loading } onClick={ attackBoss }>Attack Boss</Button>
            </div>
        </>
    )
}