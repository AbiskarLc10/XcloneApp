import { app } from "@/firebase";
import { collection, doc, getDocs, getFirestore, orderBy } from "firebase/firestore";
import CommentData from "./CommentData";



const PostComments =async ({id}) => {

    const fetchAllCommentsToThePost = async () => {
        const data = [];
        try {
            const db = getFirestore();
            const querySnapshot = await getDocs(
                collection(db, 'posts', id, 'comments'),
                orderBy('timestamp', 'desc')
            );
    
            querySnapshot.docs.forEach((comment) => {
                const commentData = {
                    id: comment.id,
                    comment: comment.data().comment,
                    name: comment.data().name,
                    username: comment.data().username,
                    userImg: comment.data().userImg,
                    timestamp: comment.data().timestamp.toDate(), // Convert Firestore timestamp to JavaScript Date object if needed
                };
                data.push(commentData);
            });
    
            return data;
        } catch (error) {
            console.error('Error fetching comments:', error);
            throw error;
        }
    }
    
    const data = await fetchAllCommentsToThePost();
    

  return (
    <div className=" flex flex-col pb-4">
       {
        data.map((comment)=>{
            return  <CommentData key={comment.id} comment={comment} postId={id}/>
        })
       }
    </div>
  )
}

export default PostComments