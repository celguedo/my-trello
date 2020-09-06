import { myTrelloRequestInstance } from "./";
const config = require("../config");

export const createCard = async (token, card) => {
  return await myTrelloRequestInstance.post(
    `${config.SERVER_URL}/card/create`,
    card,
    { headers: { "x-auth-token": token } }
  );
};

/* export const deleteList = async (token, id) => {
  return await myTrelloRequestInstance.post(
    `${config.SERVER_URL}/list/delete`,
    { id },
    { headers: { "x-auth-token": token } }
  );
};
 */

export const getCard = async (token) => {
  return await myTrelloRequestInstance.get(`${config.SERVER_URL}/card/get`, {
    headers: { "x-auth-token": token },
  });
};
