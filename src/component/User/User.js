import  {React,useState, useEffect} from "react";
import Avatar from "../Avatar/Avatar";
import {useParams} from "react-router-dom"
import UserActivity from "../UserActivity/UserActivity";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
    root:{
        display:"flex"
    },
});

function User(){

    const {userId} = useParams();
    const classes=useStyles();  
    const[user, setUser]=useState();


    
    const getUser = () => {
        fetch("/users/"+userId,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : localStorage.getItem("tokenKey")
                },
            })
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setUser(result);
                },
                (eror) => {
                    console.log(error);
                }
            )

            useEffect( () => {
                getUser()
            },[])
    

    return(
        <div className={classes.root}>
            
            { user ? <Avatar avatarId={user.avatarId}/> : ""}
            <UserActivity userId={userId}/>
        </div>
    )
    }
}

export default User;