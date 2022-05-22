import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { hexlify } from '@ethersproject/bytes'
import { toUtf8Bytes } from '@ethersproject/strings'
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers'
import {
  CHAIN_ID,
  UAUTH_CLIENT_ID_UNSTOPPABLE,
  UAUTH_REDIRECT_URI_UNSTOPPABLE,
  UAUTH_POST_LOGOUT_REDIRECT_URI_UNSTOPPABLE,
} from '../../config/constants/network'
import { UAuthConnector } from '@uauth/web3-react'
import UAuth from '@uauth/js'
import { getNodeUrl } from './rpc'
import { ConnectorConfig, ConnectorNames, ConnectorType } from './connectors'
import { BinanceIcon, BloctoIcon, CoinbaseIcon, MetamaskIcon, TrustWalletIcon, UnstoppableIcon, WalletConnectIcon } from '../../components/svg'
import { ChainId } from '../../config/constants/chain'

const POLLING_INTERVAL = 12000
const rpcUrl = getNodeUrl()
const chainId = parseInt(CHAIN_ID, 10)

export const injected = new InjectedConnector({ supportedChainIds: [chainId] })

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  qrcode: true,
})

export const Providers: Record<ConnectorNames, ConnectorType> = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: new BscConnector({ supportedChainIds: [chainId] }),
  [ConnectorNames.Blocto]: async () => {
    const { BloctoConnector } = await import('@blocto/blocto-connector')
    return new BloctoConnector({ chainId, rpc: rpcUrl })
  },
  [ConnectorNames.WalletLink]: async () => {
    const { WalletLinkConnector } = await import('@web3-react/walletlink-connector')
    return new WalletLinkConnector({
      url: rpcUrl,
      appName: 'MyDapp',
      supportedChainIds: [ChainId.MAINNET, ChainId.TESTNET],
    })
  },
  [ConnectorNames.UAuthUnstoppable]: new UAuthConnector({
    uauth: new UAuth({
      clientID: UAUTH_CLIENT_ID_UNSTOPPABLE,
      redirectUri: UAUTH_REDIRECT_URI_UNSTOPPABLE,
      postLogoutRedirectUri: UAUTH_POST_LOGOUT_REDIRECT_URI_UNSTOPPABLE,
      scope: 'openid wallet',
    }),
    connectors: { injected, walletconnect },
  }),
}

export const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc): Web3Provider => {
  const library = new Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}

/**
 * BSC Wallet requires a different sign method
 * @see https://docs.binance.org/smart-chain/wallet/wallet_api.html#binancechainbnbsignaddress-string-message-string-promisepublickey-string-signature-string
 */
export const signMessage = async (
  connector: AbstractConnector,
  provider: any,
  account: string,
  message: string,
): Promise<string> => {
  if (window.BinanceChain && connector instanceof BscConnector) {
    const { signature } = await window.BinanceChain.bnbSign(account, message)
    return signature
  }

  /**
   * Wallet Connect does not sign the message correctly unless you use their method
   * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
   */
  if (provider.provider?.wc) {
    const wcMessage = hexlify(toUtf8Bytes(message))
    const signature = await provider.provider?.wc.signPersonalMessage([wcMessage, account])
    return signature
  }

  return provider.getSigner(account).signMessage(message)
}

export const Connectors: ConnectorConfig[] = [
  {
    title: "Metamask",
    icon: MetamaskIcon,
    connectorId: ConnectorNames.Injected,
    priority: 1,
    href: "https://metamask.app.link/dapp/pancakeswap.finance/",
  },
  {
    title: "Binance Wallet",
    icon: BinanceIcon,
    connectorId: ConnectorNames.BSC,
    priority: 2,
  },
  {
    title: "Coinbase Wallet",
    icon: CoinbaseIcon,
    connectorId: ConnectorNames.WalletLink,
    priority: 3,
  },
  {
    title: "Trust Wallet",
    icon: TrustWalletIcon,
    connectorId: ConnectorNames.Injected,
    priority: 4,
    mobileOnly: true,
  },
  {
    title: "WalletConnect",
    icon: WalletConnectIcon,
    connectorId: ConnectorNames.WalletConnect,
    priority: 5,
  },
  {
    title: "Unstoppable",
    icon: UnstoppableIcon,
    connectorId: ConnectorNames.UAuthUnstoppable,
    priority: 6,
  },
  {
    title: "Blocto",
    icon: BloctoIcon,
    connectorId: ConnectorNames.Blocto,
    priority: 999,
  },
];

export const connectorLocalStorageKey = "connectorIdv2";
export const walletLocalStorageKey = "wallet";