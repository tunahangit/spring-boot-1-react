import React from "react";
import "./Post.scss"

function Post(props){
   const {title,text} = props;

   return(
       <diV className="postContainer">
           {title}
           {text}
       </diV>
   )
}
export default Post;