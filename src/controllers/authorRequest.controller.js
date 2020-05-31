const AuthorRequest = require('../models/AuthorRequest');
const authorRequestCtrl = {};

// Juan
authorRequestCtrl.addAuthorRequest = async (req, res) => {
    try{
        if(req.user.role != 0){
            return res.status(401).json({   // It has already author permission
                message: "You do not have the required permissions"
             });
        }

        req.body.userId = req.user.id;

        const Author = await AuthorRequest.findOne({ userId: req.body.userId});

        if(Author){

            return res.status(200).json({
                message: "You have already send an author request"
            });
        }

        const { email2, professionalCard, employmentHistory, academicHistory } = req.body;

        if(!email2 | !professionalCard | !employmentHistory | !academicHistory)
            throw "Incomplete data";

        const newAuthorRequest = new AuthorRequest(req.body);

        await newAuthorRequest.save();

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
// Valeria

// Carlos

// Tatiana

module.exports = authorRequestCtrl;