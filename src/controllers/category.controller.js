const Category = require('../models/Category')

const categoriesCtrl = {};

// Juan

// Valeria

// Carlos

// Tatiana

// Only the administrator can use this function
categoriesCtrl.addCategory = async (req, res) => {
    try{
        if(req.user.role != 2)
            return res.status(401).json({
                message: "You do not have the required permissions"
             });
        const { name, description } = req.body;
        if(!name | !description)
            throw "Incomplete data";

        const newCategory = new Category(req.body);
        await newCategory.save();
        return res.status(201).json({
            message: "The category has been created successfully"
        });
    }catch(err){
        if(!err.message)
            return res.status(400).json({ message: err });
        else
            return res.status(400).json({
                message: "The category could not be created"
            });
    }
};

// Any user can access this information
categoriesCtrl.getCategories = async (req, res) => {
    try{
        const categories = await Category.find({}, {
            name: 1
        });
        return res.status(201).json( categories );
    }catch(err){
        return res.status(400).json({
            message: "Could not access requested information"
        })
    }
};

// Any user can access this information
categoriesCtrl.getListCategories = async (req, res) => {
    try {
        if(!req.body.listCategories)
            throw "Incomplete data";
        var categories = [];
        var temp;
        for(var i = 0; i < req.body.listCategories.length; i++) {
            temp = await Category.findById(req.body.listCategories[i]);
            var { id, name } = temp;
            categories.push({ id, name });
        }
        return res.status(200).json(categories);
    } catch (err) {
        if(!err.message)
            return res.status(400).json({ message: err });
        else
            return res.status(400).json({
                message: "Some of the categories is not registered"
            });
    }
}

categoriesCtrl.welcomeCategories = async (req, res) => {
    return res.status(200).json("Welcome to Categories");
}

module.exports = categoriesCtrl;