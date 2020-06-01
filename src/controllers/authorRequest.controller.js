const AuthorRequest = require('../models/AuthorRequest');
const authorRequestCtrl = {};
​
// Juan
authorRequestCtrl.addAuthorRequest = async (req, res) => {
    try{
        /*
        if(req.user.role != 0)
            throw "You do not have the required permissions"
        */
        //req.body.userId = req.user.id;
        req.body.userId = "5ec6b0256dee5c298d31cf52";
​
        const Author = await AuthorRequest.findOne({ userId: req.body.userId});
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
// Valeria
​
// Carlos
​
// Tatiana
​
module.exports = authorRequestCtrl;