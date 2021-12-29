import {
    GET_ALL_POSTS,
    CREATE_POST
  } from "../features/types";
  
  const posts = JSON.parse(localStorage.getItem("posts"));

  const initialState = posts
    ? { posts }
    : { posts:null };
  
  export default function postsReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_ALL_POSTS:
        return {
          ...state,
          posts:payload
        };
      case CREATE_POST:
        return {
          ...state,
          ...state.posts.concat(payload)
        };
      default:
        return state;
    }
  }