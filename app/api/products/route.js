import Product from "../../../models/mongo/product";
import Comment from "../../../models/mongo/comment";
import Favorite from "../../../models/mongo/favorite";
import { connectToDB } from "../../../utilis/database";


export const POST = async (request) => {
    const { name, description, price, productImageUrl } = await request.json();
    try {
        await connectToDB();
        const newProduct = new Product({ name: name, quantity: 5, details: description, price: price, onStack: true, rating: 3, productImageUrl: productImageUrl });
        console.log(newProduct)
        await newProduct.save();
        return new Response(JSON.stringify(newProduct), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}

export const GET = async () => {
    try {
        await connectToDB();
        const proudcts = await Product.find({})
        return new Response(JSON.stringify(proudcts), { status: 201 })
    } catch (error) {
        return new Response("Something went wrong", { status: 500 });
    }
}
export const PUT = async (request) => {
    const { name, description, price, id, productImageUrl } = await request.json();
    try {
        await connectToDB();
        const product = await Product.findById(id)
        product.name = name;
        product.details = description
        product.price = price;
        product.productImageUrl = productImageUrl;
        product.save();
        return new Response(JSON.stringify(product), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}

export const DELETE = async (request) => {
    const { id } = await request.json();
    try {
        await connectToDB();
        await Comment.deleteMany({ product: id })
        await Favorite.deleteMany({ product: id })
        await Product.findByIdAndDelete(id);

        return new Response(JSON.stringify([]), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new sdas", { status: 500 });
    }
}