import Category from "../../../models/mongo/category";
import { connectToDB } from "../../../utilis/database";
export const GET = async () => {
    try {
        await connectToDB();
        const categories = await Category.find({})
        return new Response(JSON.stringify(categories), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response("Something went wrong", { status: 500 });
    }
}


