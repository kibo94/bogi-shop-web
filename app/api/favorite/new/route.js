
import { connectToDB } from "../../../../utilis/database";
import Favorite from "../../../../models/mongo/favorite";
export const POST = async (request) => {
    const { name,price,onStack, rating,details ,creator } = await request.json();
    const {email,image ,id} = creator;
    try {
        await connectToDB();
        const newFavorite = new Favorite({name:name,price:price,onStack:onStack, rating:rating,details:details ,creator:{email,image,name:creator.name,_id:id} });
        // console.log("new fvorite:",newFavorite)
        await newFavorite.save();
        return new Response(JSON.stringify({}), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to create a new comment", { status: 500 });
    }
}