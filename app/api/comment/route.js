import { connectToDB } from "../../../utilis/database";
import Comment from "../../../models/mongo/comment";

export const GET = async (request) => {
    try {
        await connectToDB()
        const comments = await Comment.find({}).populate('creator').populate("product")

        return new Response(JSON.stringify(comments), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 