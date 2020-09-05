import { myTrelloRequestInstance } from "./";
const config = require("../config");

/* export const verifyToken = async (token) => {
  return await myTrelloRequestInstance.post(
    `${config.SERVER_URL}/users/tokenIsValid`,
    null,
    { headers: { "x-auth-token": token } }
  );
}; */



export const getList = async (token) => {
  return await myTrelloRequestInstance.get(
    `${config.SERVER_URL}/list/get`,
    {
      headers: { "x-auth-token": token },
    }
  );
};
