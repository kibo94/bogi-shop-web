
import User from "../../../models/mongo/user";
import { connectToDB } from "../../../utilis/database";
export const GET = async () => {
    try {
        await connectToDB()
        const users = await User.find({})
        return new Response(JSON.stringify(users), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 