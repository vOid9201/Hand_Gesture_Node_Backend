const PdfDetails = require("../database/pdfDetails");

module.exports = async(req,res,next)=>{
    const {_id} = req.user.user;
    try{
        await PdfDetails.find({user_id : _id}).then((data)=>{
            res.send({ status : "ok" , data : data});
        });
    }catch(error){
        res.json({status : error});
    }
}