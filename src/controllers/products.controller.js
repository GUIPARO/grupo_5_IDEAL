const path = require('path');
const fs = require("fs");
const bdProducts = require(path.resolve(__dirname, "../model/bdProducts.json"));


const newId = () => {
    let ultimo = 0;
    bdProducts.forEach(product => {
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
        const product = bdProducts.filter(producto => {
            return producto.id == id;
        });
        res.render("./products/product", { product })
    },
    
    products: (req, res) => {
        res.render('./products/productsList', { bdProducts })
    },

    produtCart: (req, res) => {
        res.render('./products/productCart')
    },

    admin: (req, res) => {
        res.render('./products/admin' , {products:bdProducts})

    },

    adminCreate: (req, res) => {
        res.render('./products/adminCreate')
    },

    adminStore: (req, res) => {
        const price = parseInt(req.body.price);
        let product = {
            id: newId(),
            ...req.body,
            image: req.file.filename,
            price: price
        }

        bdProducts.push(product);
        let jsonProducts = JSON.stringify(bdProducts, null, 4);
        fs.writeFileSync(path.resolve(__dirname, '../model/bdProducts.json'), jsonProducts);
        
        res.redirect('/');
    },

    adminEdit: (req, res) => {
        const id = req.params.id;

        const productEdit = bdProducts.filter(product => {
            return product.id == id;
        })

        const indice = bdProducts.findIndex(product => {
            return product == productEdit[0];
        })


        if (indice >= 0) {
            res.render('./products/adminEdit', { productEdit })

        } else {
            res.send('No insista')
        }
    },

    adminModified: function(req, res){
        const id = parseInt(req.params.id)
        const price = parseInt(req.body.price);
        const edit = req.body;
        
       
        const productEdit = bdProducts.filter(product => {
            return product.id == id;
        });
        const indice = bdProducts.findIndex(product => {
            return product == productEdit[0];
        });
        const imageFile = req.file === undefined ? productEdit[0].image : req.file.filename;

        bdProducts[indice] = {
            id: id,
            ...edit,
            price: price,
            image: imageFile
        }

        let jsonProducts = JSON.stringify(bdProducts, null, 4);

        fs.writeFileSync(path.resolve(__dirname, '../model/bdProducts.json'), jsonProducts);

        res.redirect('/');

    },

    adminDelete: function (req,res){
        const id = req.params.id 
        const data = bdProducts.filter(products =>{
            return products.id != id 
              }) 
              let jsonProducts = JSON.stringify(data, null, 4);

              fs.writeFileSync(path.resolve(__dirname, '../model/bdProducts.json'), jsonProducts);
      
              res.redirect('/products/admin');

    }

}

module.exports = controller;