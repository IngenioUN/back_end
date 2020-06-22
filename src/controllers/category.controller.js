const Category = require( '../models/Category' );
const logger = require( '../log/facadeLogger');

const categoriesCtrl = { };

// Juan

// Valeria

// Carlos

// Tatiana

// Only the administrator can use this function
categoriesCtrl.addCategory = async ( req, res ) => {
    try{
        if ( req.user.role != 2 )
            throw "You do not have the required permissions";

        const { name, description } = req.body;
        if ( !name || !description )
            throw "The required data is incomplete";

        const newCategory = new Category( req.body );
        await newCategory.save( );

        logger.info("A category has been successfully created");
        return res.status( 201 ).json({
            message: "The category has been created successfully"
        });
    }catch ( err ) {
        if( !err.message ) {
            logger.warn( err );
            return res.status( 400 ).json({ message: err });
        } else {
            logger.error( "There was a problem creating a category" );
            return res.status( 400 ).json({
                message: "The category could not be created"
            });
        }
    }
};

// Any user can access this information
categoriesCtrl.getCategories = async ( req, res ) => {
    try{
        const categories = await Category.find({}, {
            name: 1
        });
        return res.status( 201 ).json( categories );
    }catch ( err ) {
        return res.status( 400 ).json({
            message: "Could not access requested information"
        })
    }
};

// Any user can access this information
categoriesCtrl.getListCategories = async ( req, res ) => {
    try {
        if( !req.body.listCategories )
            throw "Incomplete data";
        var categories = [ ];
        var temp;
        for( var i = 0; i < req.body.listCategories.length; i++ ) {
            temp = await Category.findById( req.body.listCategories[i] );
            var { id, name } = temp;
            categories.push({ id, name });
        }
        return res.status( 200 ).json( categories );
    } catch ( err ) {
        if( !err.message )
            return res.status( 400 ).json({ message: err });
        else
            return res.status( 400 ).json({
                message: "Some of the categories is not registered"
            });
    }
}

categoriesCtrl.getInfoCategories = async ( req, res, next ) => {
    try {
        if ( req.user.role == 2 )
            throw "You do not have the required permissions";

        var tempList, category, categoryName, categoryId, i, j;
        var listCategories = [];

        for ( i = 0; i < req.body.response.length; i++ ) {
            tempList = req.body.response[ i ].listCategories;
            for( j = 0; j < tempList.length; j++ ) {
                category = await Category.findById( tempList[ j ],{
                    name:1
                });
                listCategories.push(category);
            }
            req.body.response[ i ].listCategories = listCategories;
            listCategories = [];
        }
        return next( );
    } catch ( err ) {
        if( !err.message ){
            logger.warn( err );
            return res.status( 400 ).json({ message: err });
        } else {
            logger.error( "Some of the Categories ID not exist" );
            return res.status( 400 ).json({
                message: "Some of the Categories not exist"
            })
        }
    }
}

module.exports = categoriesCtrl;