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

export const deleteCard = async (token, id) => {
  return await myTrelloRequestInstance.delete(
    `${config.SERVER_URL}/card/delete/${id}`,
    { headers: { "x-auth-token": token } }
  );
};

export const getCard = async (token, filters) => {
  return await myTrelloRequestInstance.get(`${config.SERVER_URL}/card/get`, {
    params: filters,
    headers: { "x-auth-token": token },
  });
};
