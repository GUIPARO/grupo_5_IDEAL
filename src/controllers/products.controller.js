const modelProducts = require("../model/modelProducts");
const { validationResult } = require("express-validator"); //Aquí requiero a la función que trae los errores desde la ruta, de llegar a existir

const controller = {
  cotizacion: (req, res) => {
    res.render("./products/cotizacion");
  },

  product: async (req, res) => {
    const Findproduct = await modelProducts.findProductById(req.params);
    const product = await Findproduct;
    res.render("./products/product", { product });
  },

  productsList: async (req, res) => {
    let datos = await modelProducts.bdProducts();
    let Allproducts = await datos;
    res.render("./products/productsList", { bdProducts: Allproducts });
  },

  productCart: (req, res) => {
    res.render("./products/productCart");
  },

  admin: async (req, res) => {
    let datos = await modelProducts.bdProducts();
    res.render("./products/admin", { products: datos });
  },

  adminCreate: async(req, res) => {
    
    let models = await modelProducts.AllRelations()

    res.render("./products/adminCreate",{models});
  },

  //PROCESAMIENTO PARA LA CREACIÓN DE PRODUCTOS
  adminStore: async(req, res) => {
    try{
    const errors = validationResult(req);
    let models = await modelProducts.AllRelations()
    req.body.image =
    req.file == undefined ? " " : req.file.filename;
    
   
    if (errors.isEmpty()) {
      const create = await modelProducts.addProduct(req.body, req.file);
            
      res.redirect("/products/admin");
    } else {
      console.log(req.body)
      return res.render("./products/adminCreate", {
        errors: errors.mapped(),
        products: req.body,
        models
    
      });
    }
  } catch (error){
    console.log(`En el controlador de productos ocurrio un error ${error.message}`);
  }
  },

  adminEdit: async (req, res) => {
    const productEdit = await modelProducts.adminEdit(req.params);

    res.render("./products/adminEdit", { productEdit });
  },

  adminModified: async (req, res) => {
    try{
    let productEdit = await modelProducts.adminEdit(req.params);
    let foundProduct = await modelProducts.findProductById(req.params);
    let id = foundProduct.product_id;

    req.body.image =
      req.file == undefined ? foundProduct.avatar : req.file.filename;

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      await modelProducts.adminModified(req.params, req.body, req.file);
      res.redirect("/products/admin");
    } else {
      console.log(productEdit);
      console.log(errors.mapped());
      console.log(req.body);
      // console.log(req.body.productLine);
      // console.log(req.body.activity);
      // console.log(req.body.subactivity.map(i=>Number(i)))
      // let sub = productEdit[0].subactivity_id_subactivities.map(
      //   (subactivity) => subactivity.subactivity_id
      // );
      // console.log(sub);
      return res.render("./products/adminEdit", {
        errors: errors.mapped(),
        product: req.body,
        id,
        productEdit,
      });
    }
  } catch (error){
    console.log(`En el controlador de productos ocurrio un error ${error.message}`);
  }
  },

  adminDelete: async (req, res) => {
    await modelProducts.adminDelete(req.params);
    res.redirect("/products/admin");
  },
};

module.exports = controller;
