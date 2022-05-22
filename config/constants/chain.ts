export const MAINNET = Number(process.env.NEXT_PUBLIC_MAINNET || 56);
export const TESTNET = Number(process.env.NEXT_PUBLIC_TESTNET || 97);

export enum Chain {
    MAINNET = "MAINNET",
    TESTNET = "TESTNET",
}

export const ChainId: Record<Chain, number> = {
    [Chain.MAINNET]: MAINNET,
    [Chain.TESTNET]: TESTNET,
}

export const BASE_BSC_SCAN_URLS = {
    [ChainId.MAINNET]: process.env.NEXT_PUBLIC_MAINNET_URL || 'https://bscscan.com',
    [ChainId.TESTNET]: process.env.NEXT_PUBLIC_TESTNET_URL || 'https://testnet.bscscan.com',
}