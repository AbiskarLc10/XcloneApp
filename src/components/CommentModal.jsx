"use client";

import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/atom/modalAtom";
import { useSession } from "next-auth/react";
import Modal from "react-modal";
import { HiX } from "react-icons/hi";
import { getFirestore, onSnapshot, doc, addDoc,collection, serverTimestamp } from "firebase/firestore";
import { app } from "@/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CommentModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter()
  const [comment,setComment] = useState("")
  const [post, setPost] = useState({});
  const [postid, setPostId] = useRecoilState(postIdState);
  const {data:session} = useSession();
  const db = getFirestore(app);
  const fetchPostData = async () => {
    const postRef = doc(db, "posts", postid);
    const unsubscribe = onSnapshot(postRef, (snapshot) => {
      if (snapshot.exists()) {
        setPost(snapshot.data());
      } else {
        console.log("No such document");
      }
    });

    return () => unsubscribe();
  };
  useEffect(() => {
    if (postid !== "") {
      fetchPostData();
    }
  }, [postid]);


  const handleSubmit =async (e) =>{

    e.preventDefault();

    try {
        await addDoc(collection(db,"posts",postid,"comments"),{
            name: session?.user.name,
            username: session.user.username,
            userImg: session.user.image,
            comment: comment,
            timestamp: serverTimestamp()
        })
        setComment('')
        setOpen(false)
        router.push(`/posts/${postid}`)
        window.location.reload();
    } catch (error) {
        console.log(error)
    }
  
  }
  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          ariaHideApp={false}
          className=" max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-sky-400 rounded-xl shadow-md p-3 "
        >
          <div className=" flex flex-col gap-1">
            <div className=" w-8 h-8 rounded-xl hover:bg-gray-200 flex justify-center items-center cursor-pointer ">
              <HiX
                className=" text-2xl text-gray-700 p-1 "
                onClick={() => setOpen(false)}
              />
            </div>
            <hr className=" border-[1px]"/>
            <div className=" flex flex-col gap-1">
                <div className=" flex gap-2 ">
                    <div className="">
                        <img src={post.profileImg} className=" w-12 h-12 rounded-full " alt={`profile image of ${post.username}`} srcset="" />
                    </div>
                    <div className=" flex items-center">
                    <p className=' text-sm'><span className=' font-bold'>{post.username}</span><span className=' text-xs'>{post.email}</span></p>
                    
                    </div>
                </div>
                <div className=" flex h-14 gap-16">
                <span className=" w-[1px] h-14 border-[1.5px] ml-6"></span>
                <p>{post.desc}</p>
                </div>
                <div className=" flex gap-10 ">
                <div className="">
                        <img src={session?.user?.image} className=" w-12 h-12 rounded-full " alt={`profile image of ${post.username}`} srcset="" />
                    </div>
                    <form className=" flex-1 flex flex-col gap-2" onSubmit={handleSubmit}>
                        <textarea value={comment} onChange={(e)=> setComment(e.target.value)} name="comment" id="comment"  placeholder="Enter your comment"  className=' w-full h-10 md:text-md text-[16px] text-sm p-1 focus:outline-none text-gray-700'></textarea>
                        <hr className=' w-full border-[1px]'/>
                        <button type="submit" className={`border-[1.5px] w-fit px-2 py-1 rounded-xl ${comment.length===0?"bg-sky-200":""} cursor-pointer bg-sky-400 text-sm text-white`} disabled={comment.length === 0}>Reply</button>
                    </form>
                </div>
            </div>
            
                
            </div>
        </Modal>
      )}
    </div>
  );
};

export default CommentModal;
