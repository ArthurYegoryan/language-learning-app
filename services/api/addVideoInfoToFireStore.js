import { db } from "@/utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const addVideoInfoToFireStore = async (videoInfo) => {
    try {
        const docRefVideo = await addDoc(collection(db, "teachersVideos"), videoInfo);
        console.log("Video add with id: " + docRefVideo);
        return true;
    } catch (err) {
        console.error("Error adding document ", err);
        return  false;
    }
};