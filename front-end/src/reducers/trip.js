import {
    CREATE_TRIP,
    GET_ALL_TRIPS,
    TRIP_REQUEST,
    TRIP_SEARCH,
    TRIP_SEARCH_VALUES,
    TRIP_SEARCH_VALUES_REMOVE,
    GET_CREATED_TRIPS,
    GET_PARTICIPATED_TRIPS,
    GET_TRIP_BY_ID,
    ADD_TRIP_POST
  } from "../features/types";
  
  const trips = JSON.parse(localStorage.getItem("trips"));
  const tripFilter = JSON.parse(localStorage.getItem("tripsFilter"))
  const createdTrips = JSON.parse(localStorage.getItem("tripsCreated"))
  const participatedTrips = JSON.parse(localStorage.getItem("tripsParticipated"))
  const tripById = JSON.parse(localStorage.getItem("tripsById"))

  const initialState = trips || tripFilter
    ? { trips, tripFilter,createdTrips, participatedTrips, tripById }
    : { trips:null, tripFilter:null, createdTrips:null, participatedTrips:null, tripById:null };

  export default function tripReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case CREATE_TRIP:
        return {
          ...state,
          trips:[...trips,payload]
        };
      case GET_ALL_TRIPS:
        return {
          ...state,
          trips:payload
        }
      case TRIP_REQUEST:
          return {
            ...state,
            trips:payload
          }
      case TRIP_SEARCH:
          return {
            ...state,
            trips:payload
          }
      case TRIP_SEARCH_VALUES:
          return {
            ...state,
            tripFilter:payload
          }
      case TRIP_SEARCH_VALUES_REMOVE:
          return {
            ...state,
            tripFilter:payload
          }
      case GET_CREATED_TRIPS:
          return {
            ...state,
            createdTrips:payload
          }
      case GET_PARTICIPATED_TRIPS:
          return {
            ...state,
            participatedTrips:payload
          }
      case GET_TRIP_BY_ID:
          return {
            ...state,
            tripById:payload
          }
      case ADD_TRIP_POST:
          return {
            ...state,
              ...state.tripById.posts.concat(payload)
          }
      default:
        return state;
    }
  }