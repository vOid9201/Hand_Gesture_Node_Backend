const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const passport = require("passport");
app.use(express.json());
const cors = require('cors');
// const { CURSOR_FLAGS } = require('mongodb');
app.use(cors());

const sign_up = require("./controllers/user_signup");
const sign_in = require("./controllers/user_signin");
const upload_pdf = require("./controllers/upload_pdf");
const get_files = require("./controllers/get_files");
// makig the files static so that it is accessible from anywhere
app.use("/files",express.static("files"))


//mongodb connection 
const mongourl = process.env.MONGO_URL


mongoose.connect(mongourl)
    .then(()=>{
        console.log("Successfully Connected to database");
    })
    .catch((e)=> console.log(`Error in connecting to database ${e}`));

// require("./database/pdfDetails");
// const PdfSchema = mongoose.model("PdfDetails");

//multer
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"./files")
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now();
        cb(null,uniqueSuffix+file.originalname);
    },
})
const upload = multer({storage : storage});


//apis 


app.post("/user_signup",sign_up);
app.post("/user_signin",sign_in);
app.post("/upload-files", passport.authenticate("jwt" , {session : false}), upload.single("file"), upload_pdf);
app.get("/get-files",passport.authenticate("jwt",{session:false}),get_files);

app.listen(process.env.PORT,()=>{
    console.log(`Server started on 5000`);
});





// app.post("/upload-files", passport.authenticate("jwt",{session:false}),upload.single("file"),async(req,res)=>{
    // console.log(req.file);
    // const title = req.body.title;
    // const fileName = req.file.filename;

    // try{
    //     await PdfSchema.create({
    //         title:title,
    //         pdf:fileName
    //     });
    //     res.send({status : "ok"});
    // }catch(error){
    //     res.json({status : error});
    // }
// });



// app.get("/get-files",passport.authenticate("jwt", {session:false}),async(req,res)=>{
//     try{
//         PdfSchema.find({}).then((data)=>{
//             res.send({ status : "ok" , data : data})
//         });
//     }catch(error){
        
//     }
// });