import { db } from "@/utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const addStudyingCourseToFirestore = async (courseInfo) => {
    try {
        const docRef = await addDoc(collection(db, "studyingCourses"), courseInfo);
        return true;
    } catch (err) {
        console.error("Error adding document ", err);
        return  false;
    }
};