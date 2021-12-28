import {
    CREATE_TRIP,
    CREATE_TRIP_FAIL,
    TRIP_REQUEST,
    GET_ALL_TRIPS,
    GET_TRIPS_FAIL,
    SET_MESSAGE,
    TRIP_SEARCH,
    TRIP_SEARCH_VALUES,
    TRIP_SEARCH_VALUES_REMOVE,
    GET_CREATED_TRIPS,
    GET_PARTICIPATED_TRIPS,
    GET_TRIP_BY_ID
  } from "./types";
  

  import TripService from "../services/Trip/TripService";
  
  export const create = (token, trip) => (dispatch) => {
    return TripService.create(token, trip).then(
      (response) => {
        dispatch({
          type: CREATE_TRIP,
          payload: response.trips
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
          type: CREATE_TRIP_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  export const getAll = (token) => (dispatch) => {
    return TripService.getAll(token).then(
      (response) => {
        dispatch({
          type: GET_ALL_TRIPS,
          payload: response.trips
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
          type: GET_TRIPS_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  
  export const createRequest = (token, id) => (dispatch) => {
    return TripService.createRequest(token, id).then(
      (response) => {
        console.log(response)
        dispatch({
          type: TRIP_REQUEST,
          payload: response.trips
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
          type: CREATE_TRIP_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  export const rejectTrip = (token, id) => (dispatch) => {
    return TripService.rejectTrip(token, id).then(
      (response) => {
        console.log(response)
        dispatch({
          type: TRIP_REQUEST,
          payload: response.trips
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
          type: CREATE_TRIP_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  export const searchTrip = (token,trip) => (dispatch) => {
    return TripService.searchTrip(token, trip).then(
      (response) => {
        dispatch({
          type: TRIP_SEARCH_VALUES,
          payload: trip
        });

        dispatch({
          type: TRIP_SEARCH,
          payload: response.trips
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
          type: GET_TRIPS_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  export const removeSearchValue = (token,trip) => (dispatch) => {
    return TripService.searchTrip(token, trip).then(
      (response) => {
        dispatch({
          type: TRIP_SEARCH_VALUES_REMOVE,
          payload: trip
        });

        dispatch({
          type: TRIP_SEARCH,
          payload: response.trips
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
          type: GET_TRIPS_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  export const createdTrips = (token) => (dispatch) => {
    return TripService.getCreatedTrips(token).then(
      (response) => {
        dispatch({
          type: GET_CREATED_TRIPS,
          payload: response.trips
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
          type: GET_TRIPS_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };


  export const participatedTrips = (token) => (dispatch) => {
    return TripService.getParticipatedTrips(token).then(
      (response) => {
        dispatch({
          type: GET_PARTICIPATED_TRIPS,
          payload: response.trips
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
          type: GET_TRIPS_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  export const getById = (id) => (dispatch) => {
    return TripService.getById(id).then(
      (response) => {
        dispatch({
          type: GET_TRIP_BY_ID,
          payload: response
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
          type: GET_TRIPS_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };


  export const selectTrips = (state) => state.trips;