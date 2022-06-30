// Returns a user-friendly address
export const showFriendlyAddress = (address) => {
  return (
    address.substring(0, 2) + "..." + address.substring(address.length - 4)
  );
};

// Returns network name based on network id
export const showNetworkName = (networkId) => {
  switch (networkId) {
    case "1":
      return "Mainnet";
    case "3":
      return "Ropsten";
    case "4":
      return "Rinkeby";
    case "42":
      return "Kovan";
    case process.env.NEXT_PUBLIC_NETWORK_ID:
      return "Local (Ganache)";
    default:
      return "Unknown";
  }
};
