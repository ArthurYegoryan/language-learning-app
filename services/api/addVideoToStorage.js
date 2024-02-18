import { storage } from "@/utils/firebaseConfig";
import { ref, uploadBytesResumable } from "firebase/storage";

export const addVideoToStorage = async (userid, video, videoStorageID) => {
    const fileRef = ref(storage, `videos/${userid}/${videoStorageID}.mp4`);
    const uploadTask = uploadBytesResumable(fileRef, video);
    let isUploaded = true;

    uploadTask.on("state_changed", (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes * 100);
        console.log(`Progress: ${progress}`);
    }, (error) => {
        console.error(error);
        isUploaded = false;
    }, () => {
        console.log("Successfully uploaded!!");
    });

    return isUploaded;
};