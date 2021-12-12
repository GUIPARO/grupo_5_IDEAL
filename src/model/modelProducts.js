const path = require("path");
const fs = require("fs");

const controller = {

    bdProducts : function () {
        let datos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../database/bdProducts.json"), "utf-8"));
        return datos;
    },

    newId : function () {
        let ultimo = 0;
        this.bdProducts().forEach(product => {
            if (product.id > ultimo) {
                ultimo = product.id;
            }
        });
        return ultimo + 1;
    },

    findProductById : function (idProduct) {
        const id = parseInt(idProduct);
        const product = this.bdProducts().filter(producto => {
            return producto.id == id;
        });
        return product;
    },

    writeInDatabase : function (datos) {
        let jsonProducts = JSON.stringify(datos, null, 4);
        fs.writeFileSync(path.resolve(__dirname, '../database/bdProducts.json'), jsonProducts);
    },

    product : function (parametros) {
        const product = this.findProductById(parametros.id);
        return product;
    },

    adminStore : function (body, image) {
        const price = parseInt(body.price);
        const datos = this.bdProducts();
        let product = {
            id: this.newId(),
            ...body,
            image: image.filename,
            price: price
        };
        datos.push(product);
        this.writeInDatabase(datos);
    },

    adminEdit : function (parametros) {
        const productEdit = this.findProductById(parametros.id);
        return productEdit;
    },

    adminModified : function (parametros, body, image) {
        const edit = Object.entries(body);
        const datos = this.bdProducts();
        let productEdit = this.findProductById(parametros.id);
        const indice = datos.findIndex(product => {
            return product.id == parametros.id;
        });
        let nuevoProducto;
        for ( let i = 0 ; i < edit.length; i++) {
            let actualizador;
            if(edit[i][1] != "") {
                let llave = edit[i][0];
                let valor = isNaN(parseInt(edit[i][1])) ? edit[i][1] : parseInt(edit[i][1]);
                let nuevoDato = {[llave] : valor};
                actualizador = {
                    ...nuevoProducto,
                    ...nuevoDato
                };
                nuevoProducto = actualizador;
            }
        }
        const imageFile = image == undefined ? productEdit[0].image : image.filename;
        if (image != undefined) {
            let rutaImage = path.resolve(__dirname, "../public/img/products_image/" + productEdit[0].image);
            fs.unlinkSync(rutaImage);
        }
        datos[indice] = {
            ...productEdit[0],
            ...nuevoProducto,
            image : imageFile,
        };
        this.writeInDatabase(datos);
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
