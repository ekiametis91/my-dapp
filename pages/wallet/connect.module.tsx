import { Box, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { WalletModal } from "./wallet.modal";
import { connectorLocalStorageKey, Connectors, walletLocalStorageKey } from "../../utils/web3/web3React"
import useAuth from "../../hooks/useAuth";
import { useWeb3React } from "@web3-react/core";
import useAccount from "../../hooks/useAccount";
import { Balance } from "../../components/balance/balance";

const ConnectButton = ({ className }: { className: string }) => {
    const { login, logout } = useAuth();
    const { account } = useWeb3React()
    const { callAccount } = useAccount()
    const [showModal, setShowModal] = useState<boolean>(false);
    const [address, setAddress] = useState<string>(account)

    const connect = (connector) => {
        if (!window.ethereum && connector.title === "Metamask" && connector.href) {
            window.open(connector.href, "_blank", "noopener noreferrer");
        } else {
            login(connector.connectorId);
            localStorage?.setItem(walletLocalStorageKey, connector.title);
            localStorage?.setItem(connectorLocalStorageKey, connector.connectorId);
            setShowModal(false);
        }
    }

    const disconnect = () => {
        logout();
        setShowModal(false);
    }

    useEffect(() => {
        callAccount()
            .then((result) => {
                setAddress(result.account)
            })
            .catch(() => {
                setAddress(account)
            })
    }, [callAccount, account])


    return (
        <div className={className}>
            {!account ?
                <Button variant="contained" onClick={(): void => setShowModal(true)}>
                    Connect your wallet
                </Button> :
                <Box>
                    <h2>Address: {address}</h2>
                    <Button variant="contained" onClick={(() => disconnect())}>
                        Disconnect your wallet
                    </Button>
                    <Balance />
                </Box>
            }

            <WalletModal
                onClose={() => setShowModal(false)}
                show={showModal}
            >
                {Connectors.map((connector, index) => {
                    const { icon: Icon } = connector;
                    return (
                        <Box key={index} onClick={(() => connect(connector))}>
                            <Icon width="40px" mb="8px"></Icon>
                            <h5 style={{ fontSize: "14px" }}>{connector.title}</h5>
                        </Box>
                    )
                })}
            </WalletModal>

            <div id="modal-root"></div>
        </div>
    );
}

export default ConnectButton;