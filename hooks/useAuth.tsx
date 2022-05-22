import { useCallback } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { setupNetwork } from '../utils/wallet/wallet'
import { connectorLocalStorageKey, Connectors, Providers } from '../utils/web3/web3React'
import { clearUserStates } from '../utils/user/user'
import { ConnectorNames } from '../utils/web3/connectors'

const useAuth = () => {
  const { activate, deactivate, setError } = useWeb3React()

  const login = useCallback(
    async (connectorID: ConnectorNames) => {
      const connectorOrGetConnector = Providers[connectorID]
      const connector =
        typeof connectorOrGetConnector !== 'function' ? Providers[connectorID] : await connectorOrGetConnector()

      if (typeof connector !== 'function' && connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            setError(error)
            const provider = await connector.getProvider()
            const hasSetup = await setupNetwork(provider)
            if (hasSetup) {
              activate(connector)
            }
          } else {
            window?.localStorage?.removeItem(connectorLocalStorageKey)
            if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
              throw new Error('Provider Error')
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector
                walletConnector.walletConnectProvider = null
              }
              throw new Error('Authorization Error')
            } else {
              throw error;
            }
          }
        })
      } else {
        window?.localStorage?.removeItem(connectorLocalStorageKey)
        throw new Error('Unable to find connector')
      }
    },
    [activate, setError],
  )

  const logout = useCallback(() => {
    deactivate()
    clearUserStates()
  }, [deactivate])

  return { login, logout }
}

export default useAuth
