
import { connectToDB } from "../../../../utilis/database";
import Comment from "../../../../models/mongo/comment";
export const POST = async (request) => {
    // const { userId, prompt, tag } = await request.json();

    try {
        await connectToDB();
        const newComment = new Comment({ creator: "66b7b0b7871521912eb0901a" , product: "66b7bb45e6d55e5954e420e3",comment:"Ananas je kao dobra, sve preporuke ovde kupiti...",rating:5});

        await newComment.save();
        return new Response(JSON.stringify(newComment), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new comment", { status: 500 });
    }
}