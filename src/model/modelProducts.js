const path = require("path");
const fs = require("fs");
const db = require("../database/models")



const controller = {
    bdProducts : async () => {
        try {
            let all = await db.products.findAll({
                include : [
                    {association: "products_has_activities"},
                    {association: "products_has_lines"},
                    {association: "products_has_materials"},
                    {association: "products_has_subactivities"},
                    {association: "products_has_techniques"},
                ]
            });
            return all;
        } catch (error) {
            console.log(`El error es ${error}`)
        }
    },

    findProductById : async (id) => {
        try {
            const product = await db.products.findByPk(id);
            return product
        } catch (error) {
            console.log(`El error es ${error}`)
        }
    },
    product : async function (parametros) {
        try {
            const product = await this.findProductById(parametros.id);
            return product;
        } catch (error) {
            console.log(error)
        }
    },

    adminStore : async (body, image) => {
        try {
            db.products.create({
                fullname : body.fullName,
                price : body.price,
                image : image.filename,
                
            },{
                include : [
                    {association: "products_has_activities"},
                    {association: "products_has_lines"},
                    {association: "products_has_materials"},
                    {association: "products_has_subactivities"},
                    {association: "products_has_techniques"}
                ]
            })
        } catch (error) {
            console.log(`El error es ${error}`)
        }
    },

    adminEdit : function (parametros) {
        const productEdit = this.findProductById(parametros.id);
        return productEdit;
    },

    adminModified : async (parametros, body, image) => {
        try {
            let product = db.products.update({
                fullname : body.fullName,
                price : body.price,
                image : image.filename
            },
            {
                where: {id : parametros.id}
            });
            return product;
        } catch (error) {
            console.log(`El error es ${error}`)
        }
    },

    adminDelete : function (parametros) {  
        const productToDelete = this.findProductById(parametros.id);
        let rutaImage = path.resolve(__dirname, "../public/img/products_image/" + productToDelete[0].image);
        fs.unlinkSync(rutaImage);
        const data = this.bdProducts().filter(products =>{
            return products.id != parametros.id;
        });
        this.writeInDatabase(data);
    }
}


module.exports = controller;
