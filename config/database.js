import { connect } from "mongoose";
require("dotenv").config()

export function connect(){
    connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Sucessfully Connected to Database");
    })
    .catch((error)=>{
        console.log("Error Connecting Database: ", error);
    })
}
