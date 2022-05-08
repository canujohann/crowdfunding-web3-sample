import { web3 } from "./web3";
import type { AbiItem } from "web3-utils";

import Campaign from "../../build/contracts/Campaign.json";

const campaign = (address: string) => {
  const web3Instance = web3();
  return new web3Instance.eth.Contract(Campaign.abi as AbiItem[], address);
};

export default campaign;
