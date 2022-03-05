import web3 from "./web3";
import Campaign from "../../build/contracts/Campaign.json";
import {FACTORY_ADDRESS} from "./utils";

const campaign = (address) => {
  return new web3.eth.Contract(Campaign.abi, FACTORY_ADDRESS);
};
export default campaign;
