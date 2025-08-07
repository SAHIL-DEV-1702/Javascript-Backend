import dotenv from 'dotenv';
import connectDB from './db/databaseConnection.js';
import { app } from './app.js'




dotenv.config({
    path: './.env'
})



connectDB()

    .then(() => {
        app.listen(process.env.PORT || 8080, () => {
            console.log(`server is running at port ${process.env.PORT}`)
        })
    })

    .catch((err) => {
        console.log('MONGO DB CONNECTION FAILED !!!', err);
    })
















/*
// THIS IS FIRST APPROACH FOR CONNECT DATABASE BUT IN INDUSTRY THIS IS NOT GOOD OPTION

//  always when connecting any database we need to wrap in promises/try-catch  just beacuse of sometimes databse give an error.

// also it take time to conect thats why we use Async/Await and try catch



; (async () => {        // IFFE
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

    }
    catch (error) {

        console.error("error: ", error);
        throw err
    }
})()    // why we write semicolon just before of IIFE(imidiatly invoke function expression ) bcz cleaning ;

*/

















