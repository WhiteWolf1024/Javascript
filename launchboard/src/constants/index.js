import { Telegram } from "@material-ui/icons";
import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 1337] });

// export const ERC20_ADDR = "0xeA096Ba8979893CF64B7b67eF84BcD9C0cDe925c";
export const ERC20_ADDR = "0xc5a5C42992dECbae36851359345FE25997F5C42d";
export const USDC_ADDR = "0x75b0622cec14130172eae9cf166b92e5c112faff";
export const DAI_ADDR = "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa";
// export const STAKING_CONTRACT_ADDR = "0x1E8B22F165d253cC0622fEB7F2374f7180CA6C54";
// export const STAKING_CONTRACT_ADDR = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
export const STAKING_CONTRACT_TRACKER_ADDR = "0xE6E340D132b5f46d1e472DebcD681B2aBc16e57E";
export const STAKE_VAULT_ADDR = "0x67d269191c92Caf3cD7723F116c85e6E9bf55933";

export const BLOCK_CONFIRMATION_THRESHOLD = 1;