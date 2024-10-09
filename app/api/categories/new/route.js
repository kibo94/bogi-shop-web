
import { connectToDB } from "@utilis/database";
import Category from "../../../../models/mongo/category";
export const POST = async () => {
    try {
        await connectToDB();
        const category = new Category({ name: "Mobilni" })
        await category.save()
        console.log(category)
        return new Response(JSON.stringify([]), { status: 201 })
    } catch (error) {
        console.log("errrrrrrr", error)
        return new Response("Something went wrong", { status: 500 });
    }
}