# Solidity contract with truffle:  template 

Web3 sample project to intereact between a react application and a smart contract hosted on ethereum.

## stack

- React (Nextjs)
- Web3 library
- Truffle
- Ganache (only for tests)

Tests are not relying on Truffle, only on ganache.

## How to run locally

### Ethereum side (Smart Contract)

How to deploy on Rindekin network through infura node :

**Build** the contract:

- Run `npm compile`
- Check if files were properly generatered (under `build/contracts` folder)

**Deploy** the contract:

- Create an account on [infura](https://infura.io/dashboard)
- Run `npm deploy`
- Stored the returned ethereum address


### FE side (Nextjs)

- Install package with `npm install`
- Run `npm run dev` to start server on port 3000 


### How to run tests

Run `npm run dev`

### How to run in production

WIP