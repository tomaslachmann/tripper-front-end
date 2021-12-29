import "./TripDetail.css";
import {useState, useEffect, useRef} from "react";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { getById, addTripPost } from "../../../features/trip";


const TripDetailLeft = (props) => {
    const users = props.participants;
    let activeUsers = users ? users.filter(user => user.relation === 1) : null
    let requestedUsers = users ? users.filter(user => user.relation === 3) : null
   return(
        <div className="trip-detail-left">
            <h1>Destinace</h1>
            <p>{props.destination}</p>
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
    const [postText, setPostText] = useState("");
    const [posts, setPosts] = useState(null);
    const ref = useRef();
    const dispatch = useDispatch();

    const reset = () => {
        ref.current.value = "";
      };

    useEffect(() => {
        dispatch(getById(props.id))
    },[props.id])
    useEffect(() => {
        setTrip(Trip.trips)
        setParticipants(Trip.participants)
        if(Trip.trips.ownerId === id) setIsOwner(true)
        setLoading(false)
        setPosts(Trip.posts)
        console.log(posts)
    }, [Trip])


    const savePost = (e) => {
        e.preventDefault();
        const curForm = document.getElementById("post-form");
        const form = new FormData(curForm);
        dispatch(addTripPost(form))
      
            reset();
            setPostText("");

    }

    return(
        <div className="trip-detail-wrap">
            {!loading? 
                <TripDetailLeft isOwner={isOwner} participants={participants} destination={trip.countryname} />
            : false }
            <div className="trip-detail-right">
                <h1>Příspěvky</h1>
                <div className="posts-wrap">
                    {posts ? posts.map(item => {
                        return <div className="trip-post">
                            <p>{item.Text}</p>
                            <div className="post-attachments-wrap">
                                {Object.keys(item.attachments).map((key) => {
                                    return <div className="post-attachment" onClick={() => {
                                        axios
                                          .post("http://localhost:4001/trip/download",{tripId:trip.id, name:key},{responseType: 'blob'})
                                          .then(function (response) {
                                                let fileName = key;
                                                const url = window.URL.createObjectURL(new Blob([response.data],
                                                { type: response.headers['content-type'] }));
                                                const link = document.createElement('a');
                                                link.href = url;
                                                link.setAttribute('download',fileName);
                                                document.body.appendChild(link);
                                                link.click();
                                          });
                                    }}>
                                        <img src="" alt="file" />
                                        <span>{key}</span>
                                    </div>
                                })}
                            </div>
                        </div>
                    }) : ""}
                </div>
                <form method="post" enctype="multipart/form-data" action="http://localhost:4001/trip/post" id="post-form">
                    <input type="file" name="file" multiple ref={ref}/>
                    <input type="hidden" value={id} name="userId" />
                    <input type="hidden" value={Trip.trips.id} name="tripId" />
                    <textarea value={postText} onInput={(e) => setPostText(e.target.value)} name="text"></textarea>
                    <button onClick={savePost}>Přidat</button>
                </form>
            </div>
        </div>
    )
}

export default TripDetail