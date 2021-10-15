import Client from "./Client";

function Authorization() {
  return {
    login: ({ payload }) => {
      const url = "/api/admin/auth/login";
      console.log(payload);
      return Client.post(url, payload, {});
    },
  };
}

export default Authorization();
