const AuthorRequest = require('../models/AuthorRequest');
const User = require('../models/User');
const authorRequestCtrl = {};

// Juan

// Valeria
authorRequestCtrl.getAllAuthorRequest = async (req, res) => {
    try {
        
        const authorRequest = await AuthorRequest.find().populate({path:'userId', select:['firstName','lastName']}).select('userId');
        
        return res.status(200).json(authorRequest)
    } catch (err) {
        if(!err.message)
            return res.status(400).json({ message: err });
        else
            return res.status(400).json({
                message: "Could not access"
            });
    }
}
authorRequestCtrl.getAuthorRequest = async (req, res) => {
    try{
        const { userId } = req.body;
        if (!userId)
            throw "Incomplete data";
        const authorRequest = await AuthorRequest.findOne({userId});
        return res.status(200).json(authorRequest);
    }catch(err){
        return res.status(400).json({
            message: "Could not access requested information"
        })
    }
};

// Carlos

// Tatiana

module.exports = authorRequestCtrl;