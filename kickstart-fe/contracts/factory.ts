import Web3 from "web3";
import type { provider as Provider } from "web3-core";
import type { AbiItem } from "web3-utils";

import CampaignFactory from "../../build/contracts/CampaignFactory.json";

const web3 = new Web3(window.ethereum as Provider);
const instance = new web3.eth.Contract(
  CampaignFactory.abi as AbiItem[],
  process.env.NEXT_PUBLIC_FACTORY_ADDRESS
);

console.log(`factory address: ${process.env.NEXT_PUBLIC_FACTORY_ADDRESS}`);

export default instance;
