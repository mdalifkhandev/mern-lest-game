import envConfig from "../config/envConfig";

const uploadImageToImageBB = async (file: File): Promise<string> => {
    const API_KEY = "your_imagebb_api_key"; // Replace with your ImageBB API key
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${envConfig.imageBBKey}`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to upload image to ImageBB");
        }

        const data = await response.json();
        if (data.data && data.data.url) {
            return data.data.url; // Return the uploaded image URL
        } else {
            throw new Error("Image URL not found in response");
        }
    } catch (error) {
        console.error("Error uploading image to ImageBB:", error);
        throw error;
    }
};

export default uploadImageToImageBB;