import Post from "@/components/Post";
import { app } from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

const page = async ({ params }) => {
  const { postId } = params;
  console.log(postId);
  const fetchPostData = async () => {
    try {
      const db = getFirestore(app);
      const querysnapshot = await getDoc(doc(db, "posts", postId));
      return querysnapshot;
    } catch (error) {
      console.log("Failed to get the post");
    }
  };
  let data = {};
  let response = await fetchPostData();
  data = { ...response.data(), id: response.id };
  // console.log(data);

  return (
    <div className=" h-screen flex flex-col gap-2 ">
      <Link href={"/"}>
        <div className=" flex gap-1  ml-2 px-2 items-center border-[2px] border-transparent hover:border-[2px] rounded-lg hover:bg-gray-200 hover:border-gray-700 cursor-pointer w-fit">
          <HiArrowLeft />
          <span>Back</span>
        </div>
      </Link>
      <hr className=" w-full border-[1.5px]" />
    {
      data &&
     <Post post={data}/>
    }
    </div>
  );
};

export default page;
