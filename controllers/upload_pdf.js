const PdfDetails = require("../database/pdfDetails");

module.exports = async(req,res,next)=>{
    console.log(req.file);
    const {_id} = req.user.user;
    const title = req.body.title;
    const fileName = req.file.filename;

    try{
        await PdfDetails.create({
            user_id:_id,
            title:title,
            pdf:fileName
        });
        res.send({status : "ok"});
    }catch(error){
        res.json({status : error});
    }
}