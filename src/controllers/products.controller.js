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
    cotizacion:(req,res) =>{
        res.render('./products/cotizacion',)
    },
    
    product:(req,res) =>{
        const id = req.params.id;
        const product = bdProducts.filter( producto => {
            return producto.id == id;
        });
        console.log(id)
        console.log(req.params)
        res.render("./products/product", { product })
    },
    products:(req,res) =>{
        res.render('./products/productsList', { bdProducts })
    },

    produtCart:(req,res) =>{
        res.render('./products/productCart')
    },

    admin:(req,res) =>{
        res.render('./products/admin')
    
    },
    adminCreate:(req,res) =>{
        res.render('./products/adminCreate')
    },
    adminStore:(req,res) =>{
        let product = {
			id: newId(),
			...req.body,
			image: req.file.filename
		}
		//Guardar el producto en el array de productos (push)
		bdProducts.push(product);

		let jsonProducts = JSON.stringify(bdProducts, null, 4);
		fs.writeFileSync(path.resolve(__dirname, '../model/bdProducts.json'), jsonProducts);
		
		res.redirect('/');
    },

    adminEdit:(req,res) =>{
        res.render('./products/adminEdit')
    }
}

module.exports = controller;