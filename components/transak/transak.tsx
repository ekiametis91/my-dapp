import { Box } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { TRANSAK_BASE_URL, TRANSAK_API_KEY, TRANSAK_REDIRECT_URL } from "../../config/constants/transak";

const Transak = () => {
  const { account } = useWeb3React();

  const transakUrl = `${TRANSAK_BASE_URL}/?apiKey=${TRANSAK_API_KEY}&redirectURL=${TRANSAK_REDIRECT_URL}&walletAddress=${account}&disableWalletAddressForm=true&exchangeScreenTitle=My DApp`;

  return (
    account ?
      <Box style={{display: "contents"}}>
        <h4>You can buy Crypto with Transak below</h4>
        <iframe height="625" title="Transak On/Off Ramp Widget"
          src={transakUrl}
          frameBorder="no" allowTransparency={true} allowFullScreen={false}
          style={{ display: "block", width: "100%", maxHeight: "800px", maxWidth: "500px" }}>
        </iframe>
      </Box>
      : null
  );
};

export default Transak;