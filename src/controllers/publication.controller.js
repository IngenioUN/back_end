const Publication = require('../models/Publication');

const publicationsCtrl = {};

// Juan

// Valeria

// Carlos

// Tatiana
publicationsCtrl.addPublication = async (req, res) => {
    try{
        if(req.user.role != 1)
            throw "You do not have the required permissions";

        const { title, abstract, keyWords, text } = req.body;
        if(!title | !abstract | !keyWords | !text)
            throw "Incomplate data";

        const newPublication = new Publication(req.body);
        newPublication.authorId = req.user.id;
        await newPublication.save();
        return res.status(200).json({
            message: "The publication was successfully added"
        })
    }catch(err) {
        if(!err.message)
            return res.status(400).json({ message: err });
        else
            return res.status(400).json({
                message: "Some of the categories do not exist on the platform"
            });
    }
};

// Any user can make this request
publicationsCtrl.getSummaryOfPublications = async (req, res) => {
    try {
        var publications;
        if(req.body.categoryId)
            publications = await Publication.find({
                listCategories: req.body.categoryId
            }, {
                date: 1,
                title: 1,
                abstract: 1,
                listCategories: 1
            });
        else
            publications = await Publication.find({},{
                date: 1,
                title: 1,
                abstract: 1,
                listCategories: 1
            });
        return res.status(200).json(publications);
    } catch (err) {
        return res.status(400).json({
            message: "Category does no exist"
        })
    }
}

module.exports = publicationsCtrl;