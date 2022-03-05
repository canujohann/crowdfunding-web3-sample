import web3 from './web3';
import CampaignFactory from '../../build/contracts/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x837Fa1D91c122C616d7063F9B3B77a1D60b808B3',
);

export default instance;
