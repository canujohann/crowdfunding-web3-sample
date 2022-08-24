import Web3 from "web3";
import type { provider as Provider } from "web3-core";
import type { AbiItem } from "web3-utils";

import CampaignFactory from "../../build/contracts/Campaign.json";

const getCampaignInfo = (address: string) => {
  if (window.ethereum) {
    const web3Context = new Web3(window.ethereum as Provider);
    const factoryContract = new web3Context.eth.Contract(
      CampaignFactory.abi as AbiItem[],
      address
    );
    return [factoryContract, web3Context];
  }
};

export default getCampaignInfo;
