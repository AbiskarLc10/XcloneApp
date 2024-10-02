"use client";

import { app } from "@/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import moment from "moment";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";


const CommentData = ({ comment, postId }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState([]);
    const { data: session } = useSession();
    const db = getFirestore(app);

    const handleLike = async () =>{

       if(session){
            if(isLiked){
                await deleteDoc(doc(db,"posts",postId,"comments",comment.id,"likes",session.user.uid))
               console.log("post unliked")
               setIsLiked(false)
            }else{
                await setDoc(doc(db,"posts",postId,"comments",comment.id,"likes", session.user.uid),{
                    username: session.user.username,
                    timeStamp: serverTimestamp()
                })
                setIsLiked(true)

                console.log("Post liked successfully")
            }
       }else{
        signIn()
       }
    }
   
  
    useEffect(() => {
        onSnapshot(collection(db, "posts", postId, "comments",comment.id,"likes"), (snapshot) => {
          setLikes(snapshot.docs);
        });
      }, [db]);

      useEffect(()=>{
        const like = likes.some((like)=> like.id === session?.user?.uid)
        setIsLiked(like)
      },[db,likes])
  return (
    <div className=" flex flex-col gap-2  hover:bg-gray-200 p-2">
      <div className="flex gap-2 items-center cursor-pointer">
        <div className=" w-12 h-12 rounded-full border-[1px]">
          <img
            src={comment.userImg}
            className=" w-12 h-12 rounded-full"
            alt=""
            srcSet=""
          />
        </div>
        <div className=" flex-1">
            <div className=" flex items-center justify-between">
            <p className=" flex gap-1 items-center">
          <span className=" text-[14px] font-bold">{comment.name}</span>
          <span className=" text-xs">{moment(comment.timestamp).fromNow()}</span>
        </p>
        <IoEllipsisHorizontalSharp />
            </div>
       
        </div>
        
      </div>
      <div className=" pl-14 flex justify-center flex-col gap-1">
        <p className=" text-[14px] text-gray-500">{comment.comment}</p>
        <div className=" flex  items-center gap-1">
        {
            !isLiked?<HiOutlineHeart onClick={handleLike} className=" w-8 h-8 transition duration-150 hover:text-red-600 cursor-pointer ease-in hover:bg-red-100 rounded-full p-1" />:
            <HiHeart onClick={handleLike} className=" w-8 h-8 transition duration-150 text-red-600 cursor-pointer ease-in hover:bg-red-100 rounded-full p-1"/>
        }
        { likes && likes.length >0 ?<span>{likes.length}</span>:""}
        </div>
     
        
      </div>
      <hr className=" w-full" />
    </div>
  );
};

export default CommentData;
