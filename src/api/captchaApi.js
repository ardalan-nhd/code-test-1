import Client from "./Client";

function Captcha() {
  return {
    getCaptcha: ({ payload }) => {
      const url = "/captcha/api/default";
      return Client.get(url, payload, {});
    },
  };
}

export default Captcha();
