const express = require('express');
const app = express();
const upload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const hbs = require('hbs');
const { Mongoose } = require('mongoose');

const port = process.env.PORT || 3000;

require("./src/db/conn");
const database = require("./src/registers");
const Register=database.Register;
const Quizdb=database.Quizdb;

let signedin = false;
let email = null;
let prevpath ;
let prevpath1;
let Username="null";

const templatesPath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", templatesPath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
    res.render("index");
})
 
app.get("/register", (req, res) => {
    res.render("signup");
})

app.get("/signin", (req, res) => {
    res.render("signin");
})


// app.get("/signin", (req, res) => {
//     res.render("signin");
// })
// app.get("/video", function (req, res) {
//     // Ensure there is a range given for the video
//     const range = req.headers.range;
//     if (!range) {
//       res.status(400).send("Requires Range header");
//     }
  
//     // get video stats (about 61MB)
//     const videoPath = "/vid/bigbuck.mp4";
//     const videoSize = fs.statSync("/vid/bigbuck.mp4").size;
  
//     // Parse Range
//     // Example: "bytes=32324-"
//     const CHUNK_SIZE = 10 ** 6; // 1MB
//     const start = Number(range.replace(/\D/g, ""));
//     const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  
//     // Create headers
//     const contentLength = end - start + 1;
//     const headers = {
//       "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//       "Accept-Ranges": "bytes",
//       "Content-Length": contentLength,
//       "Content-Type": "video/mp4",
//     };
  
//     // HTTP Status 206 for Partial Content
//     res.writeHead(206, headers);
  
//     // create video read stream for this particular chunk
//     const videoStream = fs.createReadStream(videoPath, { start, end });
  
//     // Stream the video chunk to the client
//     videoStream.pipe(res);
//   });

// **Quiz 
app.post('/quizy',(req,res)=>{
    
    Register.findOneAndUpdate({email :email},{csshtmlquiz :req.body.Score},(error,data)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log("score saved");
            console.log(Name);
        }
    })
        res.status(201).sendFile(path.join(__dirname,'/temphtml/index.html'));
})

//------------Video-----------------------------------------------------------------

app.get("/htmlcss", (req, res) => {
    console.log(signedin);
    if(signedin)
    {   prevpath1 =req.path;
        res.render('video',{
            Name: Username,
            Path: "/vid/HTML Tutorial_2756.mp4",
            topic:"Html & Css"
        });
    }
    else{
        res.status(400).send("Signin First")
    }
})
app.get("/reactjs", (req, res) => {
    if(signedin)
    {   prevpath1 =req.path;
        res.render('video',{
            Name: Username,
            Path: "/vid/Full React Tutorial _3934.mp4",
            topic:"React Js"
        });
    }
    else{
        res.status(400).send("Signin First")
    }
})
app.get("/nodejs", (req, res) => {
    if(signedin)
    {   prevpath1 =req.path;
        res.render('video',{
            Name: Username,
            Path: "/vid/Node JS Tutorial_9436.mp4",
            topic:"Node Js"
        });
    }
    else{
        res.status(400).send("Signin First")
    }
})

// -----------------------------------Quiz-------------------------------------------
app.get("/quizins", (req, res) => {
    prevpath=req.path;
    if(prevpath1==="/htmlcss"){
        res.render('quizins',{
            Name: Username,
            topic :"Html & Css"
        });
    }
    else if(prevpath1==="/nodejs"){
        res.render('quizins',{
            Name: Username,
            topic :"Node Js"
        });
    }
    else if(prevpath1==="/reactjs"){
        res.render('quizins',{
            Name: Username,
            topic :"React Js"
        });
    }
})

app.get("/quiz", (req, res) => {
    console.log(prevpath1);
    if(prevpath1==="/htmlcss"){
        res.render('quiz',{
            Name: Username,
            ques: "0"
        });
    }
    else if(prevpath1==="/reactjs"){
        res.render('quiz',{
            Name: Username,
            ques: "5"
        });
    }
    else if(prevpath1==="/nodejs"){
        res.render('quiz',{
            Name: Username,
            ques: "10"
        });
    }
    else {
        res.send("error");
    }
})
app.get('/quizform', (req, res) => {
    res.render('quizform');
});
app.get('/about', (req, res) => {
    res.render('about');
});

// stud material------------------------------------------------------
app.get('/studymaterial', (req, res) => {
    res.render('studyMaterial',{
        Name: Username,
    });
});

// Assingments---------------------------------------------------------
app.get('/assingment', (req, res) => {
    res.render('assingment');
});

app.post('/assingment', (req, res) => {
    
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('files uploaded.');
    }

    let targetFile = req.files.target_file;

    //(Max Size - 1MB)
    if(targetFile.size > 1048576){
        fs.unlinkSync(targetFile.tempFilePath);
        return res.status(413).send("File is too Large");
    }

    targetFile.mv(path.join(__dirname, 'uploads', targetFile.name), (err) => {
        if (err)
            return res.status(500).send(err);
        res.send('File uploaded!');
    });
  
});
// -----------------------sign up--------------------------------------------------------
app.post("/register", async (req, res) => {
    try {
        const registerStud = new Register({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            birth: req.body.birth,
            branch: req.body.branch,
            address: req.body.address,
            class: req.body.class,
        })

        await registerStud.save();
        res.render('index', {
            Signedin:"true"
        });
        signedin = true;
    }
    catch (error) {
        res.status(400).send(error);
    }
})

app.get("/signout", (req, res) => {
    signedin=false;
    res.status(201).render('index', {
        Signedin:"false"
    });
})

app.get("*", (req, res) => {
    res.send("404 Error !!");
})

// --------------------sign in
app.post("/signin", async (req, res) => {
    try {
        email = req.body.email;
        const password = req.body.password;

        const StudData = await Register.findOne({ email: email });
        Username = StudData.name;
        console.log(StudData.name);
        if (StudData.password === password) {
            res.status(201).render('index', {
                Signedin:"true"
            });
            signedin=true;
        }
        else {
            res.send("password is not matching !");
        }
    } catch (error) {
        res.status(400).send("Invalid email id")
    }
})


app.listen(port, () => {
    console.log(`listening to the ${port}`);
})
