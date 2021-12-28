import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import request from "./request";
import friend from "./friend";
import trip from "./trip";

export default combineReducers({
  auth,
  message,
  request,
  friend,
  trip
});