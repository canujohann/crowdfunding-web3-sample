import web3 from "./web3";
import CampaignFactory from "../../build/contracts/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  process.env.NEXT_PUBLIC_FACTORY_ADDRESS
);

console.log(`factory address: ${process.env.NEXT_PUBLIC_FACTORY_ADDRESS}`);

export default instance;
