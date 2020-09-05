import axios from "axios";
import * as access from "./access";
import * as list from "./list";

const config = require("../config");

export { access, list };

export const myTrelloRequestInstance = axios.create({
  baseURL: config.SERVER_URL /* ,
  withCredentials: true */
});
