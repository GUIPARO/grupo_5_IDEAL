const modelProducts = require("../model/modelProducts")


const controller = {

    cotizacion: (req, res) => {
        res.render('./products/cotizacion')
    },

<<<<<<< HEAD
    product: (req, res) => {
        const product = modelProducts.product(req.params);
        res.send(product)
    },
    
    productsList: async (req, res) => {
        const datos = await modelProducts.bdProducts();
        console.log(datos)
        res.render('./products/productsList', { bdProducts : datos });
=======
    product: async (req, res) => {
        const Findproduct = await modelProducts.findProductById(req.params);
        const product = await Findproduct
        res.render("./products/product", { product });
    },
    
    productsList: async (req, res) => {
        let datos = await modelProducts.bdProducts();
        let Allproducts = await datos
        res.render('./products/productsList', { bdProducts : Allproducts });
>>>>>>> ccd876aeb9570d03778c7c8aa2174fcb4f73db23
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

<<<<<<< HEAD
    adminEdit: (req, res) => {
        const productEdit = modelProducts.adminEdit(req.params)
        // res.render('./products/adminEdit', { productEdit })
    
=======
    adminEdit: async (req, res) => {
        const productEdit = await modelProducts.adminEdit(req.params)
    
        
        res.render('./products/adminEdit', { productEdit })

>>>>>>> ccd876aeb9570d03778c7c8aa2174fcb4f73db23
    },

    adminModified: async (req, res) => {
        await modelProducts.adminModified(req.params, req.body, req.file);
        res.redirect('/products/admin');
    },

    adminDelete: async (req,res) => {
       await  modelProducts.adminDelete(req.params)
        res.redirect('/products/admin');
    }
}

module.exports = controller;