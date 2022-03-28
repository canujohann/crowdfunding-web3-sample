# Coin starter

Web3 sample project to intereact between a react application (NextJs) and a smart contract hosted on a ethereum blockchain (solidity). This project is inspired from this [tutorial](https://shorturl.at/bfhrJ) available on udemy.

## Stack

- React (Nextjs)
- Semantic-ui
- Mocha
- Web3 library
- MetaMask
- Truffle
- Ganache
- Adobe Free random logo generator

## High Level Design

```mermaid
sequenceDiagram

  participant Manager
  participant Contributor1
  participant Contributor2
  participant ProviderX
  participant Smart Contract

  Manager->>Smart Contract: Create a new camapaign
  Contributor1->>Smart Contract: Contribute to the campaign
  Contributor2->>Smart Contract: Contribute to the campaign
  loop Every request
  Manager->>Smart Contract: Create a new request to start produt development
  Contributor1->>Smart Contract: Approve (or refuse) the request 1
  Contributor2->>Smart Contract: Approve (or refuse) the request 1
  Note right of Manager: Only if 50% <br>of approval
  Manager->>Smart Contract: Send tokens to Provider
  Smart Contract-->>ProviderX: Receive tokens
  end
```

## Setup (smart contracts)

> Please use nodeJS 14 or higher

- Install packages with `npm i`

### How to deploy locally (ganache)

- Download and install first Ganache from [here](https://trufflesuite.com/ganache/index.html) and start it
- Run `npm run compile` to compile contracts
- Run `npm run migrate` to move contracts to local ganache

> Truffle has a embedded blockchain but ganache has a nice interface, making transactions/users/contracts validation easier. `truffle-config.js` is already set to target Ganache by default, nothing to do on your side.

> If you do some change to your contract and want to redeploy them as new contract, use `npm migrate-reset`

_Ganache preview:_
![Ganache preview](docs/ganache.png)

### How to run tests

Run `npm run dev`

> Truffle feature are not used for tests (`contract()`), only standart mocha tests.

### How to deploy on Rindekin (infura):

WIP

## FE side (Nextjs)

### Setup

- Install packages with `npm run install-fe`
- Update the `NEXT_PUBLIC_FACTORY_ADDRESS` value in `kickstarter-fe/.env.local` with the Factory contract address (_available in the transactions tab of ganache_)
- Run `npm run start-fe` to start server on port 3000

Default value for .env.local :

```
NEXT_PUBLIC_FACTORY_ADDRESS=0x8151fbb7eee0b4aeC087b59581dc64d2badF699d
NEXT_PUBLIC_NODE_ADDRESS=http://127.0.0.1:7545
NEXT_PUBLIC_NETWORK_ID=5777
```

### How to run tests

Run `npm run test-fe` to run unit tests of components.

Because of the complexity of mocking Metamask, no e2e tests (cypress,etc.).

## Screen captures

### Top page

![top](/docs/top-unsigned.png)
![top](/docs/top.png)

### Campaigns top

![campaigns top](/docs/campaigns-top.png)

### Campaign Details

![campaign details](/docs/campaign-details.png)

### Request

![request top](/docs/request-list.png)
![request creatio](/docs/request-creation.png)

## Ethereum side (Smart Contract)
