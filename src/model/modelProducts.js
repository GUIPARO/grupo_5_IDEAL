const path = require("path");
const fs = require("fs");
const {
  activities,
  materials,
  products,
  lines,
  subactivities,
  techniques,
} = require("../database/models");

// const sequelize = db.sequelize

const controller = {
  bdProducts: async function () {
    try {
      const Allproducts = await products.findAll({
        include: [
          "line",
          "material_id_materials",
          "activity_id_activities",
          "subactivity_id_subactivities",
          "technique_id_techniques",
        ],
      });

    //  Allproducts.forEach(element => {
    //    console.log(element.activity_id_activities[0].activity)
       
    //  });
      return Allproducts;
    } catch (error) {
      console.log(`ocurrio un error ${error.message}`);
    }
  },
  findProductById: async function (parametros) {
    try {
      const product = await products.findByPk(parametros.id, {
        include: [
          "line",
          "material_id_materials",
          "activity_id_activities",
          "subactivity_id_subactivities",
          "technique_id_techniques",
        ],
      });

      return product;
    } catch (error) {
      console.log(`ocurrio un error ${error.message}`);
    }
  },
  productsByLine: async function (line) {
    try {
      const product = await products.findAll({
        where: {
          line_id: line,
        },
      });
      console.log(product);
    } catch (error) {
      console.log(`ocurrio un error ${error.message}`);
    }
  },

  addProduct: async function (body, image) {
    try {
      const {
        fullName,
        productLine,
        material,
        activity,
        subactivity,
        technique,
        ...all
      } = body;

      const newProduct = {
        ...all,
        fullname: fullName,
        line_id: productLine,
        image: image.filename,
      };

      const product = await products.create(newProduct, {
        include: [
          "line",
          "material_id_materials",
          "activity_id_activities",
          "subactivity_id_subactivities",
          "technique_id_techniques",
        ],
      });

      await product.addMaterial_id_materials(material);
      await product.addActivity_id_activities(activity);
      await product.addSubactivity_id_subactivities(subactivity);
      await product.addTechnique_id_techniques(technique);
    } catch (error) {
      console.log(`ocurrio un error ${error.message}`);
    }
  },
  adminEdit: async function (parametros) {
    try {
      const productEdit = this.findProductById(parametros);
      const findLine = lines.findAll();
      const findActivity = activities.findAll();
      const findSubactivity = subactivities.findAll();
      const findTechnique = techniques.findAll();
      const findMaterial = materials.findAll();

      const AllPromise = [
        productEdit,
        findLine,
        findActivity,
        findSubactivity,
        findTechnique,
        findMaterial,
      ];
      const result = await Promise.all(AllPromise);
      console.log(result[0]);
      return result;
    } catch (error) {
      console.log(`ocurrio un error ${error.message}`);
    }
  },
  adminModified: async function (parametros, body, image) {
    try {
      const {
        fullName,
        productLine,
        material,
        activity,
        subactivity,
        technique,
        ...all
      } = body;

      let foundProduct = await this.findProductById(parametros);

      const imageFile =
        image == undefined ? foundProduct.image : image.filename;

      console.log(foundProduct);

      const productEdit = {
        ...all,
        fullname: fullName,
        line_id: productLine,
        image: imageFile,
        material: material
      };

      const product = await products.update(productEdit, {
        where: {
          product_id: parametros.id,
        }},{
          include: [
            "line",
            "material_id_materials",
            "activity_id_activities",
            "subactivity_id_subactivities",
            "technique_id_techniques",
          ]
        })

      // await product.setMaterial_id_materials(material);
      await product.setActivity_id_activities(activity);
      await product.setSubactivity_id_subactivities(subactivity);
      await product.setTechnique_id_techniques(technique);

      if (image != undefined) {
        let rutaImage = path.resolve(
          __dirname,
          "../public/img/products_image/" + foundProduct.image
        );
        fs.unlinkSync(rutaImage);
      }
    } catch (error) {
      console.log(`ocurrio un error ${error.message}`);
    }

    // const edit = Object.entries(body);
    // const datos = this.bdProducts();
    // let productEdit = this.findProductById(parametros.id);
    // const indice = datos.findIndex((product) => {
    //   return product.id == parametros.id;
    // });
    // let nuevoProducto;
    // for (let i = 0; i < edit.length; i++) {
    //   let actualizador;
    //   if (edit[i][1] != "") {
    //     let llave = edit[i][0];
    //     let valor = isNaN(parseInt(edit[i][1]))
    //       ? edit[i][1]
    //       : parseInt(edit[i][1]);
    //     let nuevoDato = { [llave]: valor };
    //     actualizador = {
    //       ...nuevoProducto,
    //       ...nuevoDato,
    //     };
    //     nuevoProducto = actualizador;
    //   }
    // }
    // const imageFile =
    //   image == undefined ? productEdit[0].image : image.filename;
    // if (image != undefined) {
    //   let rutaImage = path.resolve(
    //     __dirname,
    //     "../public/img/products_image/" + productEdit[0].image
    //   );
    //   fs.unlinkSync(rutaImage);
    // }
    // datos[indice] = {
    //   ...productEdit[0],
    //   ...nuevoProducto,
    //   image: imageFile,
    // };
    // this.writeInDatabase(datos);
  },

  adminDelete: async function(parametros) {
    try {
    const foundProduct = await this.findProductById(parametros);

    await products.destroy({
      where:{
        product_id: parametros.id
      }
    })

    let rutaImage = path.resolve(
      __dirname,
      "../public/img/products_image/" + foundProduct.image
    );
    fs.unlinkSync(rutaImage);
  }catch(error){
    console.log(`ocurrio un error ${error.message}`);
  }
}
};

module.exports = controller;
