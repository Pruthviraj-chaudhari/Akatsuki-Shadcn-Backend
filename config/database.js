const mongoose = require("mongoose");

exports.connect = () =>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Sucessfully Connected to Database");
    })
    .catch((error)=>{
        console.log("Error Connecting Database: ", error);
    })
}
