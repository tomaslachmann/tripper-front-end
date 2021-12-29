
import "./Home.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../../features/Post";
import StorySmall from "../../../components/Protected/Stories/StorySmall";

const HomePage = () => {
    const [status, setStatus] = useState("");
    const [posts, setPosts] = useState(null);
    const dispatch = useDispatch();
    const PostsSelector = useSelector(state => state.posts);;
    const token = useSelector(state => state.auth.token)

    useEffect(() => {
        dispatch(get(token))
        setPosts(PostsSelector);
        console.log(posts)
    }, [PostsSelector])

    let arr = [];
    for(let i = 0; i < 10; i++){
        let obj = {
            name:"tomas lachmann",
            background:null,
            profilePic:null
        }
        arr.push(obj)
    }

    return(
        <div className="wrap width-100">
            <div className="story-wrap">
                <div className="story-overlay">
                {
                    arr.map((item, i) => {
                        return <StorySmall key={i} />
                    })
                }
                </div>
            </div>
            <div className="post rounded-15 bg-white">
                <div className="profile-pic">
                    <img src="" alt="" />
                </div>
                <textarea name="" id="" value={status} onInput={e => setStatus(e.target.value)} placeholder="Co je nového?">

                </textarea>
                <button className="bg-blue rounded-15 color-white">
                    Zveřejnit
                </button>
            </div>
        </div>
        
    )
}

export default HomePage;