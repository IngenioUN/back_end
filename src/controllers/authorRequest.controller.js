const AuthorRequest = require('../models/AuthorRequest');
const User = require('../models/User');
const authorRequestCtrl = {};

// Juan
/*
authorRequestCtrl.addAuthorRequest = async (req, res) => {
    try{
        if(req.user.role != 0){
            throw "You do not have the required permissions";
        }
        const Author = await AuthorRequest.findById(req.user._id);
​
        if(Author)
            throw "You have already send an author request";
​
        const { email2, professionalCard, employmentHistory, academicHistory } = req.body;
​
        if(!email2 | !professionalCard | !employmentHistory | !academicHistory)
            throw "Incomplete data";
​
        const newAuthorRequest = new AuthorRequest(req.body);
​
        await newAuthorRequest.save();
​
        return res.status(201).json({
            message: "The author request has been created successfully"
        });
    }catch(err){
        if(!err.message)
            return res.status(400).json({ message: err });
        else
            return res.status(400).json({
                message: "The author request could not be created"
            });
    }
};
*/
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
        console.log(req.params);
        const userId = req.params.userId;
        //const { userId } = req.body;

        if (!userId)
            throw "Incomplete data";
        const authorRequest = await AuthorRequest.findOne({ userId: userId });
        return res.status(200).json(authorRequest)
    }catch(err){
        return res.status(400).json({
            message: "Could not access requested information"
        })
    }
};

// Carlos

// Tatiana

module.exports = authorRequestCtrl;