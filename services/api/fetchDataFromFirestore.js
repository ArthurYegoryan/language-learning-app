import { db } from "@/utils/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

export const fetchDataFromFirestore = async (tableName) => {
    const querySnapshot = await getDocs(collection(db, tableName));

    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data()});
    });

    return data;
};