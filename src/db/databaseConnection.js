import mongoose from "mongoose";

import { DB_NAME } from "../Constants.js";


const connectDB = async () => {

    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDb connected !! DB HOST: ${connectionInstance.connection.host}`)

    }

    catch (error) {

        console.log("MONGODB CONNECTIONN ERROR ", error)
        process.exit(1);
    }


}

export default connectDB;


// const connectDB1 = async () => {

//     try {
//         const connectionDATA = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}}`)

//         console.log(`\n mongodb connected sucessfully !! DB HOST ${connectionDATA.connection.host}`)       anothrt method to connect

//     }
//     catch (err) {
//         console.log(`database connection error`)
//     }
// }