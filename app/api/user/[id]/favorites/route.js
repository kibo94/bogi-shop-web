import { connectToDB } from "../../../../../utilis/database";
import Favorite from "../../../../../models/mongo/favorite";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        const favorites = await Favorite.find({ creator: params.id })
        return new Response(JSON.stringify(favorites), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
}

export const DELETE = async (request) => {
    const { creator, favoriteId } = await request.json();
    console.log(creator, favoriteId)
    try {
        await connectToDB()
        await Favorite.deleteOne({ _id: favoriteId })
        const favorites = await Favorite.find({ creator: creator })
        return new Response(JSON.stringify(favorites), { status: 200 })
    } catch (error) {
        console.log("errr")
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 