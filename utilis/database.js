import mongoose from "mongoose";
let isConected = false;

export const connectToDB = async () => {

    mongoose.set("strictQuery",true)
    if(isConected) {
        console.log("Mongo db is already conneced")
        return;
    }
    else {
    try {
        await mongoose.connect(process.env.MONODB_URI,{
            dbName:"bogi_shop",
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        isConected = true;
        console.log("Mongo db  conneced")
    } catch (error) {
        console.log(error)
    }
    }
}