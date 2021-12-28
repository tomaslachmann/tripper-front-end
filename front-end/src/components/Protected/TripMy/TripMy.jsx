import "./TripMy.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createdTrips, participatedTrips } from "../../../features/trip";
import TripDetail from "../TripDetail/TripDetail";


const TripMy = () => {
    const createdTripsSelector = useSelector(state => state.trip.createdTrips);
    const participatedTripsSelector = useSelector(state => state.trip.participatedTrips)
    const token = useSelector(state => state.auth.token);
    const [createdTripsState, setCreatedTripsState] = useState(createdTripsSelector)
    const [participatedTripsState, setParticipatedTripsState] = useState(participatedTripsSelector)
    const [detail, setDetail] = useState(false);
    const [tripDetail, setTripDetail] = useState({id:null})
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(createdTrips(token))
        dispatch(participatedTrips(token))
        setCreatedTripsState(createdTripsSelector)
        setParticipatedTripsState(participatedTripsSelector)
    },[])

    const showDetail = (id) => {
        setDetail(true);
        setTripDetail({id:id})
    }

    return(
        <div className="my-trips-wrap shadow rounded-15 bg-white">
            { !detail ? 
            <div className="my-trips-wrap shadow rounded-15 bg-white">
                <h1>Vámi vytvořené</h1>
                <div className="my-trips-overlay">
                    {
                        createdTripsState ? 
                        createdTripsState.trips?.map((item, i) => {
                            return <div key={i} onClick={() => {showDetail(item.id)}} className="my-trips-card bg-red rounded-15">
                                <h3>{item.name}</h3>
                                <p>{item.startDate}</p>
                                <p>{item.countryname}</p>
                            </div>
                        })
                        : ""
                    }
                </div>
                <h1>Vámi účastněné</h1>
                <div className="my-trips-wrap">
                {
                        participatedTripsState ? 
                        participatedTripsState.trips?.map((item, i) => {
                            return <div key={i} onClick={() => {showDetail(item.id)}} className="my-trips-card bg-red rounded-15">
                                <h3>{item.name}</h3>
                                <p>{item.startDate}</p>
                                <p>{item.countryname}</p>
                            </div>
                        })
                        : <p>Ještě jste se nezúčastnili žádného tripu.</p>
                    }
                </div>
            </div>
            : <TripDetail id={tripDetail.id}/>
            }
        </div>
    )
}

export default TripMy