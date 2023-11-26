const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PdfDetailsSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"user",
        required:true,
    },
    pdf:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    }
});


const pdfDetailsModel = mongoose.model("pdfDetails" , PdfDetailsSchema);
module.exports = pdfDetailsModel;
