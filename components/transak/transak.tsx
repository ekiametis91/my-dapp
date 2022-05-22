import { Button } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { TRANSAK_BASE_URL, TRANSAK_API_KEY, TRANSAK_REDIRECT_URL } from "../../config/constants/transak";

const Transak = () => {
  const { account } = useWeb3React();

  const transakUrl = `${TRANSAK_BASE_URL}/?apiKey=${TRANSAK_API_KEY}&redirectURL=${TRANSAK_REDIRECT_URL}&walletAddress=${account}&disableWalletAddressForm=true&exchangeScreenTitle=My DApp`;

  return (
    account ?
    <Button variant="contained" onClick={() => {
      window.open(transakUrl, "_blank", "noopener noreferrer");
    }}>
        Buy Crypto
    </Button> : null
  );
};

export default Transak;