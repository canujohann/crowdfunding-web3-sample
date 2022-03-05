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

Install package with `npm i`

#### How to deploy on local ganache network through infura node :

- Install first Ganache from (download here)[https://trufflesuite.com/ganache/index.html] and start it
- Run `npm compile` to compile contracts
- Run `npm migrate` to move contracts to local ganache

done !
#### How to deploy on Rindekin network through infura node :

**Build** the contract:

- Run `npm compile`
- Check if files were properly generatered (under `build/contracts` folder)

**Deploy** the contract:

- Create an account on [infura](https://infura.io/dashboard)

WIP


### FE side (Nextjs)

- Install package with `npm run install-fe`
- Run `npm run dev` to start server on port 3000 


### How to run tests

Run `npm run dev`

### How to run in production

WIP