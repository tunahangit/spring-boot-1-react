import React, { useState, useEffect } from "react";
import Post from "../Post/Post"
import PostForm from "../Post/PostForm";

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#c5cae9'
    }
}));



function Home() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const classes = useStyles();

    const refreshPost = () => {
        fetch("/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPostList(result);
                },
                (error) => {
                    setIsLoaded(true);  //Burada olumlu ya da olumsu bir sonuç gelmesi önemli.
                    setError(error);
                }
            )
    }

    useEffect(() => {
        refreshPost();
    }, []) // listede değişiklik olduğunda algıla ve listeyi yenile 
    
    if (error) {
        return <div>Error :(</div>
    } else if (!isLoaded) {
        return <div>Loading :)</div>
    } else {
        return (
            <div className={classes.container}>
                {localStorage.getItem("currentUser") == null ? "" : <PostForm userId={localStorage.getItem("currentUser")} username={localStorage.getItem("username")} title={"PostForm Title"} text={"PostForm Test"} refreshPost={refreshPost} ></PostForm>}

                {postList.map(post => (
                    <Post likeList={post.postLikeList} postId={post.id} userId={post.userId} username={post.username} title={post.title} text={post.text}
                         ></Post>
                ))}
            </div>
        )
    }


}

export default Home;