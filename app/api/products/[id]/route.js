import Product from "../../../../models/mongo/product";
import { connectToDB } from "../../../../utilis/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        const product = await Product.findById(params.id)
        if (!product) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(product), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}