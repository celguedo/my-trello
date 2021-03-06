import { myTrelloRequestInstance } from "./";
const config = require("../constants");

export const createList = async (token, name) => {
  return await myTrelloRequestInstance.post(
    `${config.SERVER_URL}/list/create`,
    { nameList: name },
    { headers: { "x-auth-token": token } }
  );
};

export const deleteList = async (token, id) => {
  return await myTrelloRequestInstance.delete(
    `${config.SERVER_URL}/list/delete/${id}`,
    { headers: { "x-auth-token": token } }
  );
};

export const getList = async (token) => {
  return await myTrelloRequestInstance.get(`${config.SERVER_URL}/list/get`, {
    headers: { "x-auth-token": token },
  });
};
