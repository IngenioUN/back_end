const AuthorRequest = require('../models/AuthorRequest');
const User = require('../models/User');
const authorRequestCtrl = {};

// Juan
authorRequestCtrl.addAuthorRequest = async (req, res) => {
    try{
        /*if(req.user.role != 0)
            return res.status(401).json({
                message: "You do not have the required permissions"
             });*/
        const { email2, professionalCard, employementHistory, academicHistory, userId } = req.body;
        if(!email2 | !professionalCard | !employementHistory | !academicHistory |!userId)
            throw "Incomplete data";
        const newAuthorRequest = new AuthorRequest(req.body);
        await newAuthorRequest.save();
        return res.status(201).json({
            message: " has been created successfully"
        });
    }catch(err){
        if(!err.message)
            return res.status(400).json({ message: err });
        else
            return res.status(400).json({
                message: "The request could not be created"
            });
    }
};

// Valeria
authorRequestCtrl.getAllAuthorRequest = async (req, res) => {
    try {
        /*AuthorRequest.find({}, function(err, authorRequest) {
            res.status(200).send(authorRequest)
        });*/
        /*
        AuthorRequest.find({}, function(err, authorRequest){
            
            User.populate(authorRequest, {path: "userId"},function(err, libros){
                const userId = authorRequest.body.userId
                
                res.status(200).json(userId);
            });
        });*/
        /*Este solo me muestra el userId
        const authorRequest = await AuthorRequest.find().select('userId');
        return res.status(200).json(authorRequest)*/

        //const authorRequest = await AuthorRequest.find().populate({path:'userId', select:'firstName'});
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
        //using params just in case :D
        /*const id = req.params.id;
        AuthorRequest.findById(id)
        .then(data => {
            if (!data)
              res.status(404).send({ message: "Not found Tutorial with id " + id });
            else res.send(data);
          }
        )*/
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