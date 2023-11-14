import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

const uploadImages = async (blobImages) => {
  try {
    const imageUrls = [];

    for (const blobImage of blobImages) {
      const storageRef = ref(storage, `images/${Date.now()}_${Math.random()}`);
      await uploadBytes(storageRef, blobImage);

      // Dohvati URL slike
      const downloadUrl = await getDownloadURL(storageRef);

      // Dodajte URL slike u polje
      imageUrls.push(downloadUrl);
    }

    return imageUrls;
  } catch (error) {
    console.error("Error uploading images to Firebase:", error);
    throw error;
  }
};

export default uploadImages;
