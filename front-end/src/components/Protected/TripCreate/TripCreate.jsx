import "./TripCreate.css"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { create } from "../../../features/trip"
import Trips from "../../../entity/trip"
import axios from "axios";


const TripCreate = () => {
    const [tripOptions, setTripOptions] = useState(Trips);
    const [whisperer, setWhisperer] = useState(false);
    const [whispererData, setWhispererData] = useState(null);
    const [destination, setDestination] = useState("");
    const navigate = useNavigate();
    tripOptions.maxAttendees = 2
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch();
    const saveTrip = (e) => {
        e.preventDefault();
        dispatch(create(token, tripOptions))
        navigate("/trips/my")
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
        <form action="POST" className="form">
            <p>Název tripu</p>
            <input type="text" 
            name="name" 
            placeholder="Drancování tichomoří" 
            value={tripOptions.name}
            onInput={e => setTripOptions({...tripOptions, name: e.target.value})} />
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
            <p>Popis tripu</p>
            <textarea 
            name="description" 
            placeholder="Plenění a drancování karibiku arrr"
            value={tripOptions.description}
            onInput={e => setTripOptions({...tripOptions, description: e.target.value})}>

            </textarea>
            <button onClick={e => saveTrip(e)}>Uložit</button>
        </form>
    )
}

function mapStateToProps(state) {
    const { trips } = state.trip;
    const { message } = state.message;
    return {
      trips,
      message
    };
  }
  
export default connect(mapStateToProps)(TripCreate);

//export default TripCreate