import { v2 as cloudinary } from 'cloudinary'

const uploadOnCloudinary = async (
    fileBuffer: Buffer,
    mimetype: string,
    folder: string
): Promise<{ public_id: string; url: string } | null> => {  // ← add return type
    try {
        const fileBase64 = fileBuffer.toString('base64')
        const fileUri = `data:${mimetype};base64,${fileBase64}`

        const result = await cloudinary.uploader.upload(fileUri, {
            folder: folder,
            resource_type: 'auto'
        })

        return {
            public_id: result.public_id,
            url: result.secure_url
        }
    }
    catch (error) {
        return null
    }
}

export default uploadOnCloudinary