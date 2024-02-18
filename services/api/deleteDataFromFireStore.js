import { db } from "@/utils/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteDataFromFireStore = async (table, data) => {
    console.log("Mtanq");
    console.log("Table keys: ", Object.keys(table));

    await deleteDoc(doc(db, "studyingCourses", data.id))
};