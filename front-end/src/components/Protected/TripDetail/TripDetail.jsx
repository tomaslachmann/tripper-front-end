import "./TripDetail.css";
import {useState, useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { getById } from "../../../features/trip";


const TripDetailLeft = (props) => {
    const users = props.participants;
    let activeUsers = users ? users.filter(user => user.relation === 1) : null
    let requestedUsers = users ? users.filter(user => user.relation === 3) : null
   return(
        <div className="trip-detail-left">
            <h1>Uživatelé</h1>
            {props.isOwner ? 
            <div className="participants-control">
                <h3>Aktivní</h3>
                <ul>
                    {activeUsers ? 
                    activeUsers.map((user, i ) => {
                        return <li key={i}>{user.firstName}</li>
                    })
                    : <li>žádní aktivní uživatelé</li>}
                </ul>
                <h3>Žádosti</h3>
                <ul>
                    {requestedUsers ? 
                    requestedUsers.map((user, i ) => {
                        return <li key={i}>{user.firstName}</li>
                    })
                    : <li>žádné žádosti o trip</li>}
                </ul>
            </div>
            :
            <div className="participants">
                <ul>
                    {activeUsers ? 
                    activeUsers.map((user, i ) => {
                        return <li key={i}>{user.firstName}</li>
                    })
                    : <li>žádní uživatelé</li>}
                </ul>
            </div>
            }
        </div>
   )
        
        
}

const TripDetail = (props) => {
    const Trip = useSelector(state => state.trip.tripById);
    const id = useSelector(state => state.auth.user.id)
    const [trip, setTrip] = useState();
    const [participants, setParticipants] = useState();
    const [isOwner, setIsOwner] = useState(false);
    const [loading, setLoading] = useState(true);
    const [postText, setPostText] = useState("")
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getById(props.id))
    },[props.id])
    useEffect(() => {
        setTrip(Trip.trips)
        setParticipants(Trip.participants)
        if(Trip.trips.ownerId === id) setIsOwner(true)
        setLoading(false)
    }, [Trip])


    return(
        <div className="trip-detail-wrap">
            {!loading? 
                <TripDetailLeft isOwner={isOwner} participants={participants} />
            : false }
            <div className="trip-detail-right">
                <h1>Příspěvky</h1>
                <textarea value={postText} onInput={(e) => setPostText(e.target.value)}></textarea>
                <button>Přidat</button>
            </div>
        </div>
    )
}

export default TripDetail