export const CONTRACT_ADDRESS = "0x3338d39582cf1b4d63F56AF201f16dd7E356fCC5"

export const transformCharacterAttributes = (data) => ({
    name: data.name,
    imageURI: data.imageURI,
    hp: data.hp.toNumber(),
    maxHp: data.maxHp.toNumber(),
    attackDamage: data.attackDamage.toNumber()
})