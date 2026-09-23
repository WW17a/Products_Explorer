import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";

export const uploadImage = (fileBuffer, folder) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    console.log("this is error of cloudinary",error)
                    reject(error);
                    return;
                }

                resolve({
                    url: result.secure_url,
                    publicId: result.public_id,
                });
            }
        );

        Readable.from(fileBuffer).pipe(uploadStream);
    });
};