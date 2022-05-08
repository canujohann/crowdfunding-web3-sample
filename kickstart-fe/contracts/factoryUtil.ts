import Web3 from "web3";
import type { AbiItem } from 'web3-utils';
import CampaignFactory from "../../build/contracts/CampaignFactory.json";

const getFactoryInfo = () => {
  if (window.ethereum) {
    const web3Context = new Web3(window.ethereum);
    const factoryContract = new web3Context.eth.Contract(
      CampaignFactory.abi as AbiItem[],
      process.env.NEXT_PUBLIC_FACTORY_ADDRESS
    );
    return [factoryContract, web3Context];
  }
};

export default getFactoryInfo;
