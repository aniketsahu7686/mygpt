import {connect, disconnect} from "mongoose";
async function connectToDatabase(){
    try {
        // here i am connecting the nodejs to the mongoDB through the mongoose , as in the up i have imported the mongoose
        await connect(process.env.MONGODB_URL );
    } catch (error) {
        console.log(error);
        throw new Error("Cannot connect To MongoDB");
    }
}

// we will create another function , which will help us to disconnect from the database, as also it will help us in error handling
async function disconnectFromDatabase(){
    try {
       await disconnect(); 
    } catch (error) {
        console.log(error);
        throw new Error("Could not  Disconnect From MongoDB") 
    }
}

export {connectToDatabase,disconnectFromDatabase};








