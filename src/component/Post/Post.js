import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";


const useStyles = makeStyles((theme) => ({
    root: {
        width: 800,
        textAlign: "left",
        margin: 20
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(31deg)',
    },
    avatar: {
        backgroundColor: "green",
    },
    link: {
        textDecoration: "none",
        boxShadow: "none",
        color: "#eeff41"
    }
}));

function Post(props) {
    const { userId, postId, userName, title, text , likeList } = props;
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [refresh , setRefresh]=useState(false);
    const [likeCount,setLikeCount]=useState(likeList.length);
    const isInitialMount = useRef(true);
    const [likeId,setLikeId]=useState(null);


    const setCommentRefresh = () => {
        setRefresh(true);
      }


    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComment();
        console.log(commentList);
    }

    const handleLike = () => {
        setIsLiked(!isLiked);
        if(!isLiked){
           saveLike();
           setLikeCount(likeCount+1);
        }
         
        else{
           deleteLike();     
           setLikeCount(likeCount-1);
        }
         
    }

    const refreshComment = () => {
        fetch("/comments?postId="+postId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCommentList(result);
                },
                (error) => {
                    setIsLoaded(true);  //Burada olumlu ya da olumsu bir sonuç gelmesi önemli.
                    setError(error);
                }
            )
            setRefresh(false);
    }

    const saveLike = () => {
        fetch("/likes",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    postId: postId
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }

    const deleteLike = () => {
        fetch("/likes/"+likeId,
            {
                method: "DELETE",
            })
          //  .then((res) => res.json())  backend de delete metodu void burada gelen değeri json yapmaya çalışıyor. 
         //                               ancak gelen bir değer olmadığı için(void) bu kodu kullanmıyoruz.
            .catch((err) => console.log(err))
    }

    const checkLikes = () =>{
       var likeControl= likeList.find((like => like.userId === userId));
       if(likeControl != null){
           setLikeId(likeControl.id);
           setIsLiked(true);
       }
       
    }

    useEffect(() => {

        if (isInitialMount.current)
            isInitialMount.current = false;
        else
            refreshComment();
    }, [refresh])


    useEffect( () => {checkLikes()},[])

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Link className={classes.link} to={{ pathname: '/users/'+userId }}>
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>
                }
                title={title}
            />

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    onClick={handleLike}
                    aria-label="add to favorites">
                    <FavoriteIcon style={isLiked ? { color: "red" } : null} />
                </IconButton>
                {likeCount}
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ChatBubbleOutlineIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>

                <Container fixed className={classes.container}>
                    {error? "error" :
                        isLoaded? commentList.map(comment => (
                            <Comment userId={1} userName={"user"} text={comment.text}></Comment>
                        )) : "loading"}
                        <CommentForm userId={1} userName={"user"} postId ={postId} setCommentRefresh={setCommentRefresh} >
                        </CommentForm>
                </Container>

            </Collapse>
        </Card>

    )
}
export default Post;