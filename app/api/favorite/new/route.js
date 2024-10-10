
import { connectToDB } from "../../../../utilis/database";
import Favorite from "../../../../models/mongo/favorite";
export const POST = async (request) => {
    const { name, price, onStack, rating, details, creator, product, productImageUrl } = await request.json();
    const { email, image, id } = creator;
    try {
        await connectToDB();
        const newFavorite = new Favorite({ productImageUrl: productImageUrl, product: product, name: name, price: price, onStack: onStack, rating: rating, details: details, creator: { email, image, name: creator.name, _id: id }, })
        await newFavorite.save();
        const favorites = await Favorite.find({ creator: id })
        return new Response(JSON.stringify(favorites), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new favorite", { status: 500 });
    }
}


export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        const favorites = await Favorite.find({ creator: params.id })
        return new Response(JSON.stringify(favorites), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
}
