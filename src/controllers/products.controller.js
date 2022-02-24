const modelProducts = require("../model/modelProducts")

const controller = {

    cotizacion: (req, res) => {
        res.render('./products/cotizacion',)
    },

    product: (req, res) => {
        const product = modelProducts.product(req.params);
        res.send(product)
    },
    
    productsList: async (req, res) => {
        const datos = await modelProducts.bdProducts();
        console.log(datos)
        res.render('./products/productsList', { bdProducts : datos });
    },

    productCart: (req, res) => {
        res.render('./products/productCart')
    },

    admin: (req, res) => {
        let datos = modelProducts.bdProducts();
        res.render('./products/admin' , {products:datos});
    },

    adminCreate: (req, res) => {
        res.render('./products/adminCreate')
    },

    adminStore: (req, res) => {
        modelProducts.adminStore(req.body, req.file);
        res.redirect('/products/admin');
    },

    adminEdit: (req, res) => {
        const productEdit = modelProducts.adminEdit(req.params)
        // res.render('./products/adminEdit', { productEdit })
    
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