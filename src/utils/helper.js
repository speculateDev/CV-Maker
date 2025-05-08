import axios from "axios";

const CLOUD_NAME = "dubcyjs1m";
const UPLOAD_PRESET = "cv_maker";

export async function uploadToCloudinary(image) {
  if (!image) throw new Error("No image provided");

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );
    return res.data;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error; // Re-throw to handle in the component
  }
}
