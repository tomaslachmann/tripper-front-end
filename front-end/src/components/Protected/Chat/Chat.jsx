import "./Chat.css";
import { useSelector } from "react-redux";

const Friend = (props) => {
    return(
        <li>
            <div className="profile-pic">
                <img src={props.image} alt="" />
            </div>
            <span className="bold">{props.name}</span>
        </li>
    )
}

const Chat = (props) => {
    //const friends = useSelector(state => state.friend.friends);
    const id = useSelector(state => state.auth.user.id);
   // const name = useSelector(state => state.auth.user.firstName + " " + state.auth.user.lastName)

    const startChat = (toid, name) => {
        const activeUsers = props.users.activeusers;   
        const newActiveUser = {id:toid, name:name, active:true}   
        if (activeUsers.filter(e => e.id === toid).length === 0) {
            activeUsers.push(newActiveUser)
        }
        else{
            const position = activeUsers.findIndex(user => user.id === toid);
            activeUsers[position].active = true;
        }
        props.openChat({from:id, to:newActiveUser.id})
        props.setChatTo({activeusers:activeUsers});
        
       // props.setChatWindow(true);
    }
    
  
    return(
        <div className="chat-wrap bg-white rounded-15 shadow">
            <ul>
                {props.onlineFriends && props.onlineFriends.length > 0 ? props.onlineFriends.map((item, i) => {
                    if(item.UserID !== id) {
                        
                        return <div onClick={() => {startChat(item.ID, item.name)}} >
                                    <Friend key={item.ID} name={item.name} image={item.image}/>
                                </div>
                    }
                    return false
                }) : ""}
            </ul>
        </div>
    )
}

export default Chat