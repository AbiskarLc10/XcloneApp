import { atom } from "recoil";

export const modalState = atom({
    key: 'modalState',
    default:false
});

export const postIdState = atom({
    key: 'postIdState',
    default: "",
})


 // const {postId} = params;
  // let data = {}
  //  const db = getFirestore(app);
  //  const querysnapshot = await getDoc(doc(db,"posts",postId))
  //  data = {...querysnapshot.data(),id:  querysnapshot.id}
  //  console.log(data);