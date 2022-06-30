import { useEffect, useState } from 'react';

const useMetamask = () => {

  const [hasMetamask, setHasMetamask] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [networkId, setNetworkId] = useState("");

  const connect = async () => {
    if (window.ethereum) {
      setHasMetamask(true);

      const requestAccountsResult =
        (await window.ethereum.request<string[]>({
          method: "eth_accounts",
        })) ?? [];

      if (requestAccountsResult.length > 0) {
        setIsConnected(true);

        const account =
          requestAccountsResult?.length && requestAccountsResult[0]
            ? requestAccountsResult[0]
            : "";

        // Check if any change in accounts
        window.ethereum.on("accountsChanged", (accounts) => {
          // TODO: should be tested
          const currentAccount = accounts instanceof Array ? accounts[0] : "";
          setAddress(currentAccount);
        });

        // Set the address (first address from metamask)
        setAddress(account);

        // Set the network id
        setNetworkId(window.ethereum.networkVersion ?? "");
      } else {
        setIsConnected(false);
      }
    }
  };


  useEffect(() => {
    connect();
  })

  return ({
    hasMetamask,
    isConnected,
    address,
    networkId,
    connect,
  })

}

export default useMetamask;