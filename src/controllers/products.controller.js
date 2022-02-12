const modelProducts = require("../model/modelProducts")


const controller = {

    cotizacion: (req, res) => {
        res.render('./products/cotizacion')
    },

    product: async (req, res) => {
        const Findproduct = await modelProducts.findProductById(req.params);
        const product = await Findproduct
        res.render("./products/product", { product });
    },
    
    productsList: async (req, res) => {
        let datos = await modelProducts.bdProducts();
        let Allproducts = await datos
        res.render('./products/productsList', { bdProducts : Allproducts });
    },

    productCart: (req, res) => {
        res.render('./products/productCart')
    },

    admin: async(req, res) => {
        let datos = await modelProducts.bdProducts();
        res.render('./products/admin' , {products:datos});
    },

    adminCreate: (req, res) => {
        res.render('./products/adminCreate')
    },

    adminStore: (req, res) => {
        modelProducts.addProduct(req.body, req.file);
        res.redirect('/products/admin');
    },

    adminEdit: async (req, res) => {
        const product = await modelProducts.adminEdit(req.params)
        const productEdit = await product
        
        res.render('./products/adminEdit', { productEdit })

    },

    adminModified: (req, res) => {
        modelProducts.adminModified(req.params, req.body, req.file);
        res.redirect('/products/admin');
    },

    adminDelete:(req,res) => {
        modelProducts.adminDelete(req.params)
        res.redirect('/products/admin');
    }
}

module.exports = controller;