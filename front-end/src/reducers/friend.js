import {
  DELETE_FRIEND,
    GET_ALL_FRIENDS,
    GET_FRIEND_FAIL,
    GET_ONLINE_FRIENDS
  } from "../features/types";
  
  const friends = JSON.parse(localStorage.getItem("friend"));

  const initialState = friends
    ? { friends }
    : { friends:null };
  
  export default function friendReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_FRIEND_FAIL:
        return {
          ...state,
          friends:null
        };
      case GET_ALL_FRIENDS:
        return {
          ...state,
          friends: payload,
        };
      case GET_ONLINE_FRIENDS:
        return {
          ...state,
          friends: payload,
        };
      case DELETE_FRIEND:
        return {
          ...state,
          friends: payload
        }
      default:
        return state;
    }
  }