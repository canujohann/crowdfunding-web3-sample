import Web3 from "web3";

export const web3 = () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // We are in the browser and metamask is running.
    window.ethereum.request({ method: "eth_requestAccounts" });
    return new Web3(window.ethereum);
  } else {
    // We are on the server *OR* the user is not running metamask
    console.log("we are on the server or the user is not running metamask");
    const provider = new Web3.providers.HttpProvider(
      process.env.NEXT_PUBLIC_NODE_ADDRESS
    );
    return new Web3(provider);
  }
};

// Basic check to see if metamask is installed in the browser
export const checkIfWalletIsConnected = () => {
  return (
    typeof window !== "undefined" && typeof window.ethereum !== "undefined"
  );
};
