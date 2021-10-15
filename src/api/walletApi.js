import Client from "./Client";

function WalletApi() {
  return {
    creatWallet: ({ payload }) => {
      const url = "/api/admin/wallet-addresses";
      console.log(payload);
      // debugger;
      return Client.post(url, payload, {});
    },
    getWallet: ({ payload }) => {
      const url = "/api/admin/wallet-addresses";
      return Client.get(url, payload, {});
    },
  };
}

export default WalletApi();
