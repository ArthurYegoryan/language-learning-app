import { db } from "@/utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const addPostToFireStore = async (postInfo) => {
    try {
        const docRef = await addDoc(collection(db, "posts"), postInfo);
        console.log("Post added with ID: ", docRef);
        return true;
    } catch (err) {
        console.error("Error adding document ", err);
        return  false;
    }
}