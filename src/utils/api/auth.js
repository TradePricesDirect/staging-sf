import { getSaleorApi } from "utils/ssr";

const authRoute = (handler) => {
  return async (req, res) => {
    const token = getAuthToken(req.headers.authorization);

    if (token) {
      const { api } = await getSaleorApi();

      req.user = await getUser(token, api.auth.saleorState.apolloClientManager);
    }

    return handler(req, res);
  };
};

const getAuthToken = (token) => (token ? token.substring(4) : null);

const getUser = async (token, apolloClientManager) => {
  const { data } = await apolloClientManager.verifySignInToken({ token });

  return data?.isValid ? data.payload : null;
};

export default authRoute;
