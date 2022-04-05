import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import  OutlinedInput  from "@material-ui/core/OutlinedInput";
import  Button  from "@material-ui/core/Button";
import { InputAdornment } from "@material-ui/core";
import  Snackbar  from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


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





function PostForm(props) {
    const { userId, username, refreshPost } = props;
    const classes = useStyles();
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [isSent, setIsSent] = useState(false);

    const savePost = () => {
        fetch("/posts",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : localStorage.getItem("tokenKey")
                },
                body: JSON.stringify({
                    title: title,
                    userId: userId,
                    text: text
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }

    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        setTitle("");
        setText("");
        refreshPost();
    }

    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
    }

    const handleText = (value) => {
        setText(value);
        setIsSent(false);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setIsSent(false);
      };    

    return (
        <div>
            <Snackbar open={isSent} autoHideDuration={1300} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Your post is sent
                </Alert>
            </Snackbar>

            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Link className={classes.link} to={{ pathname: '/users/' + userId }}>
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {username.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={<OutlinedInput
                        id="outlined-adornment-amount"
                        multiline
                        placeholder="Title"
                        inputProps={{ maxLength: 20 }}
                        fullWidth
                        value={title}
                        onChange={(i) => handleTitle(i.target.value)}

                    >
                    </OutlinedInput>}
                />

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            multiline
                            placeholder="Text"
                            inputProps={{ maxLength: 200 }}
                            fullWidth
                            value={text}
                            onChange={(i) => handleText(i.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmit}
                                    >POST</Button>
                                </InputAdornment>
                            }
                        >
                        </OutlinedInput>
                    </Typography>
                </CardContent>
            </Card>
        </div>



    )
}
export default PostForm;