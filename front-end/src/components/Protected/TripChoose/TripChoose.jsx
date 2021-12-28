import "./TripChoose.css"
import { ImAirplane, ImCross } from "react-icons/im"
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
  } from "react-simple-maps";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createRequest, rejectTrip, searchTrip } from "../../../features/trip";
import { HiX } from "react-icons/hi";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const TripChoose = () => {
    const tripOpts = {
        firstName:"",
        lastName:"",
        Comment:"",
        age:0,
        id:0
    }
    const token = useSelector(state => state.auth.token);
    const Trips = useSelector(state => state.trip.trips);
    const dispatch = useDispatch();
    const [trip, setTrip] = useState(tripOpts)
    const [trips, setTrips] = useState(Trips);
    const SearchValues = useSelector(state =>state.trip.tripFilter);
    const [searchValues, setSearchValues] = useState(SearchValues)
    

    useEffect(() => {
        dispatch(searchTrip(token, searchValues))
    }, [searchValues]);

    useEffect(() =>{
        setTrips(Trips)
        setTrip(trips[0])
    }, [Trips])


    const request = (token, id) => {
        dispatch(createRequest(token, id))
        setTrip(null)
    }

    const reject = (token, id) => {
        dispatch(rejectTrip(token, id))
        setTrip(null)
    }

    const searchValueControl = (key) => {
        const newValues = searchValues;
        newValues[key] = null;
        setSearchValues(newValues);
    }
   
    const SearchValueControlElement = () =>{ 
       return Object.keys(searchValues).map((key, i) => {
            if(searchValues[key]){
                return ( 
                    <div className="search-value-controller" key={i}>
                        {searchValues[key]}
                        <div onClick={() => searchValueControl(key)}>
                            <HiX />
                        </div>
                    </div>
                )
            }
            return false
        })
    }
    console.log(trip)
 
    return(
        <div className="trip-choose-wrap shadow rounded-15">
         {searchValues ? <SearchValueControlElement /> : ""}
            {trip && trip.id > 0 ? <div className="user-wrap">
                <div className="user-image">
                    <img src="circle4.jpg" alt="user photo" />
                </div>
                <h5>{trip.firstName + ", " + trip.age}</h5>
                <p className="user-bio">
                {trip.Comment}
                </p>
                <div className="trip-controls">
                    <div className="rounded-50 bg-green color-white" onClick={() => request(token, trip.id)}>
                        <ImAirplane />
                    </div>
                    <div className="rounded-50 bg-red color-white" onClick={() => reject(token, trip.id)}>
                        <ImCross />
                    </div>
                </div>
            </div> : 
            <div className="trip-null">
                <h3>nejsou zde žádné tripy k výběru</h3>
            </div>
            }
            <div className="map-wrap">
                <ComposableMap
                    projection="geoAlbers"
                    projectionConfig={{
                        scale: 800
                    }}
                    >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                        geographies.map(geo => (
                            <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#DDD"
                            stroke="#FFF"
                            />
                        ))
                        }
                    </Geographies>
                    <Marker coordinates={[-101, 53]} fill="#777">
                        <text textAnchor="middle" fill="#F53">
                        Canada
                        </text>
                    </Marker>
                    <Marker coordinates={[-102, 38]} fill="#777">
                        <text textAnchor="middle" fill="#F53">
                        USA
                        </text>
                    </Marker>
                    <Marker coordinates={[-103, 25]} fill="#777">
                        <text textAnchor="middle" fill="#F53">
                        Mexico
                        </text>
                    </Marker>
                </ComposableMap>
            </div>
        </div>
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
  
  export default connect(mapStateToProps)(TripChoose);

