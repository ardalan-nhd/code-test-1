import Client from "./Client";

function Authorization() {
  return {
    login: ({ payload }) => {
      const url = "/api/admin/auth/login";
      return Client.post(url, payload, {});
    },
  };
}

export default Authorization();
