import React , {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, CardContent, InputAdornment, OutlinedInput } from "@material-ui/core";
import { Link } from "react-router-dom";
import  Button  from "@material-ui/core/Button";
import { postWithAuth } from "../../services/HttpService";

const useStyles = makeStyles((theme) => ({
    comment: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        allignItems: "center",
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    link: {
        textDecoration: "none",
        boxShadow: "none",
        color: "white",
    }
}));

function CommentForm(props) {
    const[text,setText]=useState("");
    const { userId, username , postId ,setCommentRefresh} = props;
    const classes = useStyles();

    const saveComment = () =>{
        postWithAuth("/comments" , {
              postId:postId,
                userId:userId,
                text:text
        })
        .then((res) => res.json())
        .catch((err) => console.log(err))
    }

    const handleChange = (value) => {
        setText(value);
    }

    const handleSubmit = () => {
        saveComment();
        setText("");
        setCommentRefresh();
    }

    return (
        <CardContent className={classes.comment}>
            <OutlinedInput
                id="outlined-adornment-amount"
                multiline
                inputProps={{ maxLength: 200 }}
                fullWidth
                onChange={(i) => handleChange(i.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                        <Link className={classes.link} to={{ pathname: '/users/' + userId }}>
                            <Avatar aria-label="recipe" className={classes.small}>
                                {username.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >Comment</Button>
                    </InputAdornment>
                }
                value={text}
                style={{ color: "black", backgroundColor: 'white' }}
            ></OutlinedInput>
        </CardContent>
    )
}

export default CommentForm;