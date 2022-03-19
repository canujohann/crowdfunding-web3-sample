import Web3 from "web3";
import CampaignFactory from "../../build/contracts/Campaign.json";

const getCampaignInfo = (adress) => {
  if (window.ethereum) {
    const web3Context = new Web3(window.ethereum);
    let factoryContract = new web3Context.eth.Contract(
      CampaignFactory.abi,
      adress
    );
    return [factoryContract, web3Context];
  }
};

export default getCampaignInfo;
