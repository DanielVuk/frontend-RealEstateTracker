import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";
import { v4 } from "uuid";

const uploadImages = async (files) => {
  try {
    const imageUrls = [];

    for (const file of files) {
      if (typeof file === "string") {
        imageUrls.push(file);
        continue;
      }
      const storageRef = ref(storage, `images/${file.name + v4()}`);
      await uploadBytes(storageRef, file);

      const downloadUrl = await getDownloadURL(storageRef);

      imageUrls.push(downloadUrl);
    }

    return imageUrls;
  } catch (error) {
    console.error("Error uploading images to Firebase:", error);
    throw error;
  }
};

export default uploadImages;
