import axios from "axios";

const API_URL = "http://localhost:4001/Trip";
 
class TripService {

  create(token, trip) {
      const headers = {
        'x-access-token': token,
      }

    return axios
      .post(API_URL + "/create", trip, { headers: headers })
      .then((response) => {
        let newTrips;
        if (response.data) {
          const trips = JSON.parse(localStorage.getItem("trips"));
          if(trips){
            newTrips = trips.filter(trip => trip.id !== response.data.id);
            localStorage.setItem("trips", JSON.stringify(newTrips));
          }
          else{
            newTrips = response.data
            localStorage.setItem("trips", JSON.stringify(newTrips));
          }
          
        }
        return newTrips;
      });
  }

  getAll(token) {
    const headers = {
      'x-access-token': token,
    }

    return axios
        .get(API_URL, { headers: headers })
        .then((response) => {
        if (response.data) {
            localStorage.setItem("trips", JSON.stringify(response.data));
        }
        return response.data;
        });
    }

    createRequest(token, id) {
        const headers = {
            'x-access-token': token,
        }

        const body = {
            id: id
        }

        return axios
            .post(API_URL + "/request/create", body, { headers: headers })
            .then((response) => {
                let newTrips;
                console.log(response)
            if (response.data) {
                const trips = JSON.parse(localStorage.getItem("trips"));
                if(trips){
                  console.log(trips)
                    newTrips = trips.trips.filter(trip => trip.id !== response.data.trips.id);
                    localStorage.setItem("trips", JSON.stringify(newTrips));
                }
                else{
                    newTrips = response.data
                    localStorage.setItem("trips", JSON.stringify(newTrips));
                }
                
            }
            return newTrips;
            });
        }

    rejectTrip(token, id) {
      const headers = {
          'x-access-token': token,
      }

      const body = {
          id: id
      }

      return axios
          .post(API_URL + "/reject", body, { headers: headers })
          .then((response) => {
              let newTrips;
              console.log(response)
          if (response.data) {
              const trips = JSON.parse(localStorage.getItem("trips"));
              if(trips){
                console.log(trips)
                  newTrips = trips.trips.filter(trip => trip.id !== response.data.trips.id);
                  localStorage.setItem("trips", JSON.stringify(newTrips));
              }
              else{
                  newTrips = response.data
                  localStorage.setItem("trips", JSON.stringify(newTrips));
              }
              
          }
          return newTrips;
          });
      }

  searchTrip(token, trip) {
    const headers = {
      'x-access-token': token,
    }

    return axios
        .post(API_URL + "/search", trip, { headers: headers })
        .then((response) => {
        if (response.data) {
            localStorage.setItem("trips", JSON.stringify(response.data));
        }
        return response.data;
        });
    }

  getCreatedTrips(token) {
    const headers = {
      'x-access-token': token,
    }

    return axios
        .get(API_URL + "/created", { headers: headers })
        .then((response) => {
        if (response.data) {
            localStorage.setItem("tripsCreated", JSON.stringify(response.data));
        }
        return response.data;
        });
    }

  getParticipatedTrips(token) {
    const headers = {
      'x-access-token': token,
    }

    return axios
        .get(API_URL + "/participated", { headers: headers })
        .then((response) => {
        if (response.data) {
            localStorage.setItem("tripsParticipated", JSON.stringify(response.data));
        }
        return response.data;
        });
    }

  getById(id) {

    return axios
        .post(API_URL + "/id", {id:id})
        .then((response) => {
        if (response.data) {
            localStorage.setItem("tripsById", JSON.stringify(response.data));
        }
        return response.data;
        });
    }

}

export default new TripService();