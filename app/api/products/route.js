import Product from "../../../models/mongo/product";
import { connectToDB } from "../../../utilis/database";


export const POST = async (request) => {
    const { name,description , price } = await request.json();
    try {
        await connectToDB();
        const newProduct = new Product({ name:name,quantity:5,details:description,price:price,onStack:true,rating:3});
        await newProduct.save();
        // console.log("SAVED");
        return new Response(JSON.stringify(newProduct), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}

export const GET = async (request) => {
    // const { userId, prompt, tag } = await request.json();
    console.log(213321321)
    try {
        await connectToDB();
        const proudcts = await Product.find({})
        return new Response(JSON.stringify(proudcts), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new sdas", { status: 500 });
    }
}
export const PUT = async (request) => {
    const { name,description , price , id } = await request.json();
    try {
        await connectToDB();
        const product = await Product.findById(id)
        product.name = name;
        product.details = description
        product.price = price;
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
        await Product.findByIdAndDelete(id);
    
        return new Response(JSON.stringify([]), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new sdas", { status: 500 });
    }
}