const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../build/contracts/CampaignFactory.json");
const compiledCampaign = require("../build/contracts/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "4000000" });

  await factory.methods.createCampaign("100", "").send({
    from: accounts[0],
    gas: "4000000",
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe("Campaigns", () => {
  it("deploys a factory and a campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it("deploys multiple campaign", async () => {
    // Add a second campaign
    await factory.methods.createCampaign("100", "my-url").send({
      from: accounts[0],
      gas: "4000000",
    });

    const deployedCampaigns = await factory.methods
      .getDeployedCampaigns()
      .call();
    assert.equal(deployedCampaigns.length, 2);
  });

  it("deploys multiple campaign and validate image url", async () => {
    // Add a second campaign
    await factory.methods.createCampaign("100", "my-url").send({
      from: accounts[0],
      gas: "4000000",
    });

    // retrieve deployed campaigns
    const deployedCampaigns = await factory.methods
      .getDeployedCampaigns()
      .call();
    assert.equal(deployedCampaigns.length, 2);

    // Retrieve second campaign
    const secondCampaign = await new web3.eth.Contract(
      compiledCampaign.abi,
      deployedCampaigns[1]
    );

    // And finally get the url
    const urlSecondCampaign = await secondCampaign.methods.image().call();
    assert.equal(urlSecondCampaign, "my-url");
  });

  it("marks caller as the campaign manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it("allows people to contribute money and marks them as approvers", async () => {
    await campaign.methods.contribute().send({
      value: "200",
      from: accounts[1],
    });
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it("doesn't allow manager to contribute to his own campaign", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "200",
        from: accounts[0],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("doesn't allow to contribute twice to the same campaig", async () => {
    await campaign.methods.contribute().send({
      value: "200",
      from: accounts[1],
    });

    try {
      await campaign.methods.contribute().send({
        value: "200",
        from: accounts[2],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("requires a minimum contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "5",
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("allows a manager to make a payment request", async () => {
    await campaign.methods
      .createRequest("Buy batteries", "100", accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });
    const request = await campaign.methods.requests(0).call();
    assert.equal("Buy batteries", request.description);
  });

  it("processes requests", async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: web3.utils.toWei("10", "ether"),
    });

    await campaign.methods
      .createRequest("A", web3.utils.toWei("5", "ether"), accounts[2])
      .send({ from: accounts[0], gas: "1000000" });

    await campaign.methods.approveRequest(0).send({
      from: accounts[1],
      gas: "1000000",
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    let balance = await web3.eth.getBalance(accounts[2]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    assert(balance > 104);
  });

  it("Retrieve campaign details", async () => {
    const summary = await campaign.methods.getSummary().call();
    assert.equal(summary[0], 100);
    assert.equal(summary[1], 0);
    assert.equal(summary[2], 0);
    assert.equal(summary[3], 0);
    assert(summary[4].length > 30);
    assert.equal(summary[5], true);
    assert.equal(summary[6], "");
  });

  it("Retrieve campaign details with url", async () => {
    // Add a second campaign
    await factory.methods.createCampaign("100", "my-url").send({
      from: accounts[0],
      gas: "4000000",
    });

    // Retrieve all deployed campaigns
    const deployedCampaigns = await factory.methods
      .getDeployedCampaigns()
      .call();
    assert.equal(deployedCampaigns.length, 2);

    // Retrieve second campaign
    const secondCampaign = await new web3.eth.Contract(
      compiledCampaign.abi,
      deployedCampaigns[1]
    );

    const summary = await secondCampaign.methods.getSummary().call();
    assert.equal(summary[0], 100);
    assert.equal(summary[1], 0);
    assert.equal(summary[2], 0);
    assert.equal(summary[3], 0);
    assert(summary[4].length > 30);
    assert.equal(summary[5], true);
    assert.equal(summary[6], "my-url");
  });
});
