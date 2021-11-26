const path = require('path');
const fs = require("fs");

let bdProducts = () => {
    let datos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../model/bdProducts.json"), "utf-8"));
    return datos;
}

const newId = () => {
    let ultimo = 0;
    bdProducts().forEach(product => {
        if (product.id > ultimo) {
            ultimo = product.id;
        }
    });
    return ultimo + 1;
}

const controller = {

    cotizacion: (req, res) => {
        res.render('./products/cotizacion',)
    },

    product: (req, res) => {
        const id = req.params.id;
        const product = bdProducts().filter(producto => {
            return producto.id == id;
        });
        res.render("./products/product", { product });
    },
    
    productsList: (req, res) => {
        const datos = bdProducts();
        res.render('./products/productsList', { bdProducts : datos });
    },

    produtCart: (req, res) => {
        res.render('./products/productCart')
    },

    admin: (req, res) => {
        let datos = bdProducts();
        res.render('./products/admin' , {products:datos});
    },

    adminCreate: (req, res) => {
        res.render('./products/adminCreate')
    },

    adminStore: (req, res) => {
        const price = parseInt(req.body.price);
        const datos = bdProducts();
        let product = {
            id: newId(),
            ...req.body,
            image: req.file.filename,
            price: price
        };

        datos.push(product);
        let jsonProducts = JSON.stringify(datos, null, 4);
        fs.writeFileSync(path.resolve(__dirname, '../model/bdProducts.json'), jsonProducts);
        
        res.redirect('/products/admin');
    },

    adminEdit: (req, res) => {
        const datos = bdProducts();
        const id = req.params.id;

        const productEdit = datos.filter(product => {
            return product.id == id;
        })

        const indice = datos.findIndex(product => {
            return product == productEdit[0];
        })


        if (indice >= 0) {
            res.render('./products/adminEdit', { productEdit })

        } else {
            res.send('No insista')
        }
    },

    adminModified: (req, res) => {
        const id = parseInt(req.params.id)
        const price = parseInt(req.body.price);
        const edit = req.body;
        const datos = bdProducts();
        
        const productEdit = datos.filter(product => {
            return product.id == id;
        });
        const indice = datos.findIndex(product => {
            return product == productEdit[0];
        });
        const imageFile = req.file === undefined ? productEdit[0].image : req.file.filename;

        if (imageFile != undefined) {
            let rutaImage = path.resolve(__dirname, "../../public/img/products_image/" + productEdit[0].image);
            fs.unlinkSync(rutaImage);
        }

       

        datos[indice] = {
            id: id,
            ...edit,
            price: price,
            image: imageFile
        }

        let jsonProducts = JSON.stringify(datos, null, 4);

        fs.writeFileSync(path.resolve(__dirname, '../model/bdProducts.json'), jsonProducts);

        res.redirect('/products/admin');

    },

    adminDelete:(req,res) => {
        const id = req.params.id;  
        const productEdit = bdProducts().filter(product => {
            return product.id == id;
        });
        let rutaImage = path.resolve(__dirname, "../../public/img/products_image/" + productEdit[0].image);
        fs.unlinkSync(rutaImage);

        const data = bdProducts().filter(products =>{
            return products.id != id
        });

        let jsonProducts = JSON.stringify(data, null, 4);
              
        fs.writeFileSync(path.resolve(__dirname, '../model/bdProducts.json'), jsonProducts);

        res.redirect('/products/admin');
    }
}

module.exports = controller;