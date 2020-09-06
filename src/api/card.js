import { myTrelloRequestInstance } from "./";
const config = require("../constants");

export const createCard = async (token, card) => {
  return await myTrelloRequestInstance.post(
    `${config.SERVER_URL}/card/create`,
    card,
    { headers: { "x-auth-token": token } }
  );
};

export const updateCard = async (token, card) => {
  return await myTrelloRequestInstance.patch(
    `${config.SERVER_URL}/card/update`,
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
