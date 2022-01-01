 const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/codingreg",)
// .then(()=>{
//     console.log('connection to reg successful !');
// }).catch((error)=>{
//     console.log(error);
// })

const db ='mongodb+srv://newuser:1234@codingpatshala.5hmmo.mongodb.net/CodingPatshala?retryWrites=true&w=majority';

mongoose.connect(db)
.then(()=>{
    console.log("connection successful !");
})
.catch((err)=>{console.log(err);
})