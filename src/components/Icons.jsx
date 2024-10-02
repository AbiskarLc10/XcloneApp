"use client";

import { modalState,postIdState } from "@/atom/modalAtom";
import { app } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
  query,
  orderBy
} from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  HiHeart,
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
} from "react-icons/hi";
import { useRecoilState } from "recoil";

const Icons = ({ id, userId }) => {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [open,setOpen] = useRecoilState(modalState);
  const [comments,setComments] = useState([]);
  const [postid,setPostId] = useRecoilState(postIdState);
  const handleLike = async () => {
    if (session) {
      if (isLiked) {
        console.log("Hello");
        await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
        setIsLiked(false);
      } else {
        await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
          username: session.user.username,
          timestamp: serverTimestamp(),
        });
        setIsLiked(true);
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db]);

  const deletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      if (session?.user.uid === userId) {
        deleteDoc(doc(db, "posts", id))
          .then(() => {
            console.log("Post deleted Successfully");
            window.location.reload();
          })
          .catch(() => {
            console.log("Failed to delete the post");
          });
      } else {
        console.log(
          "Unauthorized access! You are not allowed to delete the post"
        );
      }
    } else {
      console.log("Cancelled");
    }
  };

  useEffect(() => {
    if (likes.length > 0) {
     
      const like =  likes.findIndex((like) => like.id === session?.user?.uid) !== -1
        setIsLiked(like);
    }
  }, [likes]);


  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'posts', id, 'comments'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db]);
  return (
    <div className=" flex p-2 text-gray-500 gap-2">
      <div className="flex items-center justify-center text-xs">
      <HiOutlineChat onClick={()=>{
        if(!session){
          signIn()
        }else{
          setOpen(!open)
          setPostId(id);

        }
        }} className=" w-8 h-8 transition duration-150 hover:text-sky-600 cursor-pointer ease-in hover:bg-gray-200 rounded-full p-1" />
        {comments?.length > 0 && <span>{comments.length}</span>}
      </div>
     
      <div className=" flex items-center justify-center text-xs">
        {!isLiked ? (
          <HiOutlineHeart
            onClick={handleLike}
            className=" w-8 h-8 transition duration-150 hover:text-red-600 cursor-pointer ease-in hover:bg-red-100 rounded-full p-1"
          />
        ) : (
          <HiHeart
            onClick={handleLike}
            className="w-8 h-8 transition duration-150 text-red-600 cursor-pointer ease-in hover:bg-red-100 rounded-full p-1"
          />
        )}
        {likes?.length > 0 && <span>{likes.length}</span>}
      </div>
      {session?.user.uid === userId && (
        <HiOutlineTrash
          onClick={deletePost}
          className=" w-8 h-8 transition duration-150 hover:text-red-600 cursor-pointer ease-in hover:bg-red-100 rounded-full p-1"
        />
      )}
    </div>
  );
};

export default Icons;
