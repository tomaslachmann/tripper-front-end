import "./ChatWindow.css"
import { useState, useEffect, useRef } from "react";
import { socket } from "../../../features/socket";
import { HiMinus, HiOutlineX, HiPaperAirplane } from "react-icons/hi";


const ChatWindow = (props) => {
    const [message, setMessage] = useState(null);
    socket.auth = {id:props.from, name:props.name}   
    const [messages, setMessages] = useState(props.messages)
    const [minimalize, setMinimalize] = useState(false)
    const [styles, setStyles] = useState({height:"auto"})
    const messagesEndRef = useRef(null)
    
    
    //

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        setMessages(props.messages);
        scrollToBottom()
    }, [props.messages]);

    useEffect(() =>{
        scrollToBottom()
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const heightHandler = () => {
        if(minimalize) {
            setStyles({height:"auto"})
            setMinimalize(false)
        }
        else {
            setStyles({height:0})
            setMinimalize(true)
        }
    }

    const closeWindow = () => {
        props.setChatTo( state => ({
            ...state,
            activeusers:[
                ...state.activeusers,
                state.activeusers[props.position] = {
                    ...state.activeusers[props.position],
                    active: false
                }
            ]

        }))
    }

    return(
        <div className="rounded-15 bg-white shadow">
            <div className="chat-window-header" onClick={() => heightHandler()}>
                <h3>{props.name}</h3>
                <div className="chat-window-header-controls">
                    { !minimalize ? <span onClick={() => {setMinimalize(true);heightHandler();}}><HiMinus /></span> : ""}
                    <span onClick={closeWindow}><HiOutlineX /></span>
                </div>
            </div>
            <div className="chat-message-wrap" style={styles}>
                <div className="messages-wrap-scroll-div">
                    <ul id="chat-message-wrap-ul">
                    {
                        messages[props.to] ? messages[props.to].map((item, i) => {
                            const classname = item.fromid === props.from ? "to" : "from"
                        return <li key={i} className={classname} id="chat-message">{item.message}</li>
                        }) : ""
                    }
                        <li ref={messagesEndRef} ></li>
                    </ul>
                </div>
            <div className="chat-message-wrap-controls">
                <textarea name="" id="" value={message} onInput={e => setMessage(e.target.value)}></textarea>
                <button 
                onClick={() => {
                    socket.emit("send-message", {message:message, to: props.to})
                    setMessage("");
                }}><HiPaperAirplane /></button>
            </div>
            </div>
        </div>
    )
}

export default ChatWindow