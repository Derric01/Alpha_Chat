import mongoose from "mongoose";
export const  connectdb = async ()=>{
    try{
        const {MONGO_URI} =process.env;
        if(!MONGO_URI) throw new Error("MONGO_URI is not set ");
       const conn =  await mongoose.connect(process.env.MONGO_URI)
       console.log("Mongodb connected:",conn.connection.host)
    
}catch(error){
    console.log("Error connecting to the database:",error);;
    process.exit(1);//1 status code means fail and 0 means success
}
}