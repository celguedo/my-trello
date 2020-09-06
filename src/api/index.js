import axios from "axios";
import * as access from "./access";
import * as list from "./list";
import * as card from "./card";

const config = require("../constants");

export { access, list, card };

export const myTrelloRequestInstance = axios.create({
  baseURL: config.SERVER_URL /* ,
  withCredentials: true */
});
