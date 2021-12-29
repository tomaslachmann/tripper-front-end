import {
    GET_ALL_POSTS,
    CREATE_POST,
    SET_MESSAGE,
    GET_FRIEND_REQUEST_FAIL
  } from "./types";
  

  import PostService from "../services/Post/PostService";
  
  export const get = (token) => (dispatch) => {
    return PostService.get(token).then(
      (response) => {
        dispatch({
          type: GET_ALL_POSTS,
          payload: response.request
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: GET_FRIEND_REQUEST_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  
  export const create = ( token, post ) => (dispatch) => {
    return PostService.create( token, post ).then(
      (response) => {
        dispatch({
          type: CREATE_POST,
          payload: response.request
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: GET_FRIEND_REQUEST_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  }
  
  export const selectPosts = (state) => state.posts;