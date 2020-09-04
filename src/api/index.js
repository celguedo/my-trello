import axios from "axios";
import * as access from "./access";

const config = require("../config");

export { access };

export const myTrelloRequestInstance = axios.create({
  baseURL: config.SERVER_URL /* ,
  withCredentials: true */
});
