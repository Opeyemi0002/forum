import mongooose from "mongoose";

export const dbConnect = async ()=> {
    try{
        mongooose.set("strictQuery", false);
        await mongooose.connect(process.env.MONGODB_URL);
        console.log('Database connected succesfully');
    }catch(error){
        console.log(error.message);
        process.exit(1);
    }
}