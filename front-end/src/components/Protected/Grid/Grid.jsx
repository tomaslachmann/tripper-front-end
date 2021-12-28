import Menu from "../Menu/Menu"
import Requests from "../Requests/Requests";
import Chat from "../Chat/Chat";
import "./Grid.css";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import ChatWindow from "../ChatWindow/ChatWindow";
import { connect } from "react-redux";
import { socket } from "../../../features/socket";

import { useEffect, useState } from "react";




const Grid = ({children}) => {
    const location = useLocation();
    const id = useSelector(state => state.auth.user.id)
    const [chatWindow, setChatWindow] = useState(false);
    const [chatTo, setChatTo] = useState({activeusers:[]});
    const classNames = /trips*/.test(location.pathname) ? "page-grid-center-right" : "page-grid-center";
    const name = useSelector(state => state.auth.user.firstName + " " + state.auth.user.lastName)
    const [connected, setConnected] = useState(false);


    const [onlineFriends, setOnlineFriends] = useState(null);
    socket.auth = { id:id, name:name }
    const [messages, setMessages] = useState({})

    useEffect(() => {
        const eventHandler = (users) => {
                setConnected(true);
                setOnlineFriends(users);
            };

        socket.on('users', eventHandler);
        // unsubscribe from event for preventing memory leaks
        return () => {
           socket.off('users', eventHandler);
        };
     }, [onlineFriends]);

     useEffect(() =>{

        socket.off("message").on("message", (data) => {
            const newData = messages
            if(!newData[data.from]){
                newData[data.from] = [];
            }
            const newMessage = data[data.from][0]
            newData[data.from].push(newMessage)
            setMessages(newData);
            
            const activeUsers = chatTo.activeusers;   
            const newActiveUser = {id:data.from, name:name, active:true}   
            if (activeUsers.filter(e => e.id === data.from).length === 0) {
                activeUsers.push(newActiveUser)
              }
            setChatTo({activeusers:activeUsers});
            
        })
        
        socket.off("get-messages").on("get-messages", async (data) => {
            const newData = messages
            if(!newData[data.from]){
                newData[data.from] = [];
            }
            try{
                const newMessages = await data[data.from]      
                newMessages.forEach(msg => newData[data.from].push(msg))
                setMessages(newData);
            }catch(err){
                console.log(err.stack)
            }
            setChatWindow(true);
        })

     },[])
     

const openChatWindow = ({from, to}) => {
    if(messages[to]){
        setChatWindow(true);
        return;
    }
    socket.emit("open-chat", {from, to})
}


    return(
        <div className="page-grid">
            <div className="page-grid-left">
                <Menu />
            </div>
            <div className={classNames}>
                {children}
            </div>
            {
                !/trips*/.test(location.pathname) ?
                <div className="page-grid-right">
                    <Requests />
                    <div className="chat">
                        <h5>PŘÁTELÉ</h5>
                        <Chat 
                        users={chatTo}
                        setChatWindow={setChatWindow} 
                        setChatTo={setChatTo} 
                        onlineFriends={onlineFriends}
                        openChat={openChatWindow} />
                    </div>
                </div>
                : ""
            }
            <div className="chat-window-wrap" style={{bottom:0,right:"2rem"}}>
                <div className="chat-window-overlay">
                { chatWindow && chatTo.activeusers ? 
                    chatTo.activeusers.map((item, i) => {
                        if(item.active){
                            return <ChatWindow 
                                    name={item.name} 
                                    to={item.id} 
                                    from={id} 
                                    key={item.id}
                                    setChatTo={setChatTo}
                                    position={i}
                                    messages={messages}  
                                    /> 
                        }
                        return false
                    }) : "" }
                </div>
            </div>
        </div>
    )
}

//export default Grid

function mapStateToProps(state) {
    const { request } = state.request;
    const { message } = state.message;
    return {
      request,  
      message
    };
  }
  
  export default connect(mapStateToProps)(Grid);