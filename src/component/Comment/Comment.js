import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, CardContent, InputAdornment, OutlinedInput } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    comment:{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"flex-start",
        allignItems:"center",
    },
    small:{
        width:theme.spacing(4),
        height:theme.spacing(4),
    },
    link:{
        textDecoration:"none",
        boxShadow:"none",
        color:"white",
    }
}));

function Comment(props) {
    const { text ,userId, username } = props;
    const classes = useStyles();

    return (
        <CardContent className={classes.comment}>
            <OutlinedInput  
                disabled
                id="outlined-adornment-amount"
                multiline
                inputProps={{ maxLength: 20 }}  
                fullWidth
                value={text}
                startAdornment={
                    <InputAdornment position="start">
                        <Link className={classes.link} to={{ pathname: '/users/'+userId }}>
                            <Avatar aria-label="recipe" className={classes.small}>
                                {username.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                style={{color:"black" , backgroundColor:'white'}}
            ></OutlinedInput>
        </CardContent>
    )
}

export default Comment;