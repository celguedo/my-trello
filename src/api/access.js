import { myTrelloRequestInstance } from "./";
const config = require("../config");

export const verifyToken = async (token) => {
  return await myTrelloRequestInstance.post(
    `${config.SERVER_URL}/users/tokenIsValid`,
    null,
    { headers: { "x-auth-token": token } }
  );
};

export const getUser = async (token) => {
  return await myTrelloRequestInstance.get(`${config.SERVER_URL}/users`, {
    headers: { "x-auth-token": token },
  });
};

export const login = async (loginUser) => {
  return await myTrelloRequestInstance.post(
    `${config.SERVER_URL}/users/login`,
    loginUser
  );
};

export const register = async (newUser) => {
  return await myTrelloRequestInstance.post(
    `${config.SERVER_URL}/users/register`,
    newUser
  );
};

export const logout = async (token) => {
  return await myTrelloRequestInstance.get(
    `${config.SERVER_URL}/users/logout`,
    {
      headers: { "x-auth-token": token },
    }
  );
};
