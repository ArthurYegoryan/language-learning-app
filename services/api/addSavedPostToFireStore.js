import { db } from "@/utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const addCourseToFireStore = async (savedPostInfo) => {
    try {
        const docRef = await addDoc(collection(db, "savedPosts"), savedPostInfo);
        return true;
    } catch (err) {
        console.error("Error adding document ", err);
        return  false;
    }
}