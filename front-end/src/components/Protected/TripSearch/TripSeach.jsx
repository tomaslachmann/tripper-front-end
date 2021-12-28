import "./TripSearch.css";
import { useState } from "react";
import axios from "axios";
import Trips from "../../../entity/trip";
import { useSelector, useDispatch } from "react-redux";
import { searchTrip } from "../../../features/trip";
import { useNavigate } from "react-router-dom";


const TripSearch = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)
    const [tripOptions, setTripOptions] = useState(Trips);
    const [destination, setDestination] = useState("");
    const [whisperer, setWhisperer] = useState(false);
    const [whispererData, setWhispererData] = useState(null);
    const navigate = useNavigate();
    const searchTrips = (e) => {
        e.preventDefault();
        dispatch(searchTrip(token, tripOptions));
        navigate("/trips")
    }

    const Destination = async (e) => {
        setDestination(e.target.value)
        const response = await axios.post("http://localhost:4001/utils/country",{searchText:destination})
        setWhispererData(response.data.countries);
        setWhisperer(true);
    }

    const chooseDestination = (iso2, name) => {
        setTripOptions({...tripOptions, destination: iso2})
        setDestination(name);
        setWhisperer(false);
    }

    const Whisperer = ({children}) => {
        return(
            <div className="whisperer">
                <ul>
                    {children}
                </ul>
            </div>
        )
    }

    const WhispOption = (props) => {
        return(
            <li onClick={() => chooseDestination(props.iso2, props.name)}>{props.name}</li>
        )
    }

    const CreateWhisperer = () => {
        return(
        <Whisperer>
            {whispererData.map((country, i) => {
                return <WhispOption key={i}  name={country.name} iso2={country.iso2} />
            })}
        </Whisperer>
        )
    }

    return(
        <div className="trip-search-wrap shadow rounded-15">
            <form action="" className="form">
            <p>Destinace</p>
            <input type="text" 
            name="destination" 
            placeholder="Karibik" 
            value={destination}
            onInput={e => Destination(e)} />
            {whisperer ? <CreateWhisperer /> : ""}
            <p>Datum odjezdu</p>
            <input type="date" 
            name="startDate" 
            placeholder="datum odjezdu" 
            value={tripOptions.startDate}
            onChange={e => setTripOptions({...tripOptions, startDate: e.target.value})} />
            <p>Datum příjezdu</p>
            <input type="date" 
            name="endDate" 
            placeholder="datum příjezdu" 
            onChange={e => setTripOptions({...tripOptions, endDate: e.target.value})}
            value={tripOptions.endDate} />
            <p>Maximální počet lidí</p>
            <select name="maxAttendees" 
            value={tripOptions.maxAttendees} 
            onChange={e => setTripOptions({...tripOptions, maxAttendees: e.target.value})}>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            <button onClick={e => searchTrips(e)}>Hledat</button>
            </form>
        </div>
    )
}

export default TripSearch