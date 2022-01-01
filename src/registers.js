const mongoose=require("mongoose");

const studentData = new mongoose.Schema({
    name :{
        type : String
    },
    phone :{
        type : String,
        unique :true
    },
    dob :{
        type : String
    },
    branch :{
        type : String,
    },
    address:{
        type :String
    },
    class:{
        type :String,
    },
    email :{
        type : String,
        unique :true
    },
    password :{
        type : String
    },

    csshtmlquiz :{
        type : String
    }
});

const QuizData = new mongoose.Schema({
    topic :{
        type : String
    },
    questionNo :{
        type : String
    },
    question :{
        type : String
    },
    a :{
        type : String
    },
    b :{
        type : String
    },
    c :{
        type : String
    },
    d :{
        type : String
    },
    ans :{
        type : String
    }
});


const Register = new mongoose.model("Register",studentData);
const Quizdb = new mongoose.model("Quiz",QuizData);

// module.exports= Register;
// module.exports= Quizdb;

exports.Register = Register;
exports.Quizdb = Quizdb;