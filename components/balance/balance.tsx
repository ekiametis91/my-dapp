import { Web3Provider } from "@ethersproject/providers"
import { useWeb3React } from "@web3-react/core"
import { formatEther } from "@ethersproject/units"
import useSWR from "swr"

const fetcher = (library) => (...args) => {
    const [method, ...params] = args
    // console.log(method, params)
    return library[method](...params)
}

export const Balance = () => {
    const { account, library } = useWeb3React<Web3Provider>()

    const { data: balance } = useSWR(['getBalance', account, 'latest'], {
        fetcher: fetcher(library),
    })

    return (
        <div>
            {balance ?
                <div>Balance: {parseFloat(formatEther(balance)).toPrecision(9)}</div> :
                <div>...</div>}
        </div>
    )
}