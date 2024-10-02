import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import Link from "next/link";
import Icons from "./Icons";
import PostComments from "./PostComments";

const Post = ({post}) => {
  return (
    <div>
    <div className='flex p-2 gap-2  hover:bg-gray-100 cursor-pointer' >
    <div className=" flex justify-center items-center w-10 h-10 rounded-full border-[1.5px] border-gray-400">
<img src={post.profileImg} className=" w-[40px] h-[40px] rounded-full" alt="" width={70} />
</div>
<div className="flex-1 flex flex-col gap-1">
  <div className="flex justify-between items-center">
      <p className=' text-sm flex gap-1 items-center'><span className=' font-bold'>{post.username}</span><span className=' text-xs'>{post.email}</span></p>
      <IoEllipsisHorizontalSharp />
  </div>
  <Link href={`/posts/${post.id}`}>
  <p className=" text-sm">{post.desc}</p>
  </Link>
  <div>
  <Link href={`/posts/${post.id}`}>
   <img width={100} height={100} src={post.postImage} className=" w-full h-[250px]  bg-cover rounded-xl"/>
   </Link>
  </div>
  <Icons id={post.id} userId={post.uid}/>

</div>
</div>


<hr className=' w-auto border-[1px]' />
<PostComments id={post.id}/>
</div>
  )
}

export default Post