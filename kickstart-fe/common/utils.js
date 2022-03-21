export const showFriendlyAddress = (address) => {
  return (
    address.substring(0, 2) + "..." + address.substring(address.length - 4)
  );
};
