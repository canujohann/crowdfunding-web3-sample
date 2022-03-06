# Kickstarter application sample

Web3 sample project to intereact between a react application (NextJs) and a smart contract hosted on a ethereum blockchain (solidity). This project is largely inspired form this [awesome tutorial](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/) available on udemy.

## stack

- React (Nextjs)
- Semantic-ui
- Mocha
- Web3 library
- MetaMask
- Truffle
- Ganache

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

**Top**
![top](/docs/top.png)

**Campaign Details**
![campaign details](/docs/campaign-details.png)

**Request Details**
![request details](/docs/request-details.png)

## Ethereum side (Smart Contract)

### Setup

- Install packages with `npm i`

### How to deploy locally (ganache)

- Download and install first Ganache from [here](https://trufflesuite.com/ganache/index.html) and start it
- Run `npm run compile` to compile contracts
- Run `npm run migrate` to move contracts to local ganache

> Truffle has a embedded blockchain but ganache has a nice interface, making transactions/users/contracts validation easier. `truffle-config.js` is already set to target Ganache by default, nothing to do on your side.

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

### How to run tests

Run `npm run test-fe`
