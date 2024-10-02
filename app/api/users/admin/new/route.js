import AdminUser from "../../../../../models/mongo/admin-user";
import User from "../../../../../models/mongo/user";
import { connectToDB } from "../../../../../utilis/database";
export const POST = async (request) => {
    const { email } = await request.json();
    console.log(email)

    try {
        await connectToDB();
        // const adminUser = new AdminUser();
    
        const user = await User.findOne({ email: email })
        console.log(user)
        const adminUser =  new AdminUser({email:user.email,username:user.username,image:user.image});
        await adminUser.save();
        return new Response(JSON.stringify(adminUser), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new comment", { status: 500 });
    }
}