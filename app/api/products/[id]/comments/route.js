import { connectToDB } from "../../../../../utilis/database";
import Comment from "../../../../../models/mongo/comment";

export const GET = async (request, { params }) => {
    console.log(params.id)
    try {
        await connectToDB()
        const comments = await Comment.find({ product: params.id }).populate("product").populate('creator')
        console.log("comments are ", comments)
        return new Response(JSON.stringify(comments), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch favorites created by user", { status: 500 })
    }
} 