import mongoose from "mongoose";

export default async function connectToDb(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("successfully connected to database");
    }catch(error){
        console.log("Error in connecting database : " , error.message);
    }
};
 