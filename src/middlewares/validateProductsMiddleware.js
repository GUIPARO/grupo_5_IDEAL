const { body } = require("express-validator");
const path = require("path");

module.exports = {
  createProduct:[
  body("fullName")
    .notEmpty()
    .withMessage("El campo nombre no puede estar vacío")
    .bail()
    .isLength({ min: 5 })
    .withMessage("El campo nombre debe tener al menos 5 caracteres"),

  body("price")
    .notEmpty()
    .withMessage("El precio no puede estar vacío")
    .bail()
    .custom((price) => price >= 0)
    .withMessage("El precio debe ser un valor positivo")
    .bail()
    .custom((price) => price > 0)
    .withMessage("El precio no puede ser 0"),

  body("productLine")
    .isIn([1, 2, 3, 4])
    .withMessage("Debes seleccionar una de las lineas disponibles"),

  body("activity")
    .isIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .withMessage("Debes seleccionar una de las actividades disponibles"),

  body("subactivity")
    .isIn([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28
    ])
    .withMessage("Debes seleccionar una de las subactividades disponibles"),

  body("technique")
    .isIn([1, 2, 3, 4, 5, 6, 7])
    .withMessage("Debes seleccionar una de las técnicas disponibles"),

  body("material")
    .isIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .withMessage("Debes seleccionar una de las telas disponibles"),

  body("image").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let fileExtensions = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtensions)) {
        throw new Error(
          `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
            ", "
          )}`
        );
      }
    }
    return true;
  })
  ],
editProduct:[
  body("fullName")
    .notEmpty()
    .withMessage("El campo nombre no puede estar vacío")
    .bail()
    .isLength({ min: 5 })
    .withMessage("El campo nombre debe tener al menos 5 caracteres"),

  body("price")
    .notEmpty()
    .withMessage("El precio no puede estar vacío")
    .bail()
    .custom((price) => price >= 0)
    .withMessage("El precio debe ser un valor positivo")
    .bail()
    .custom((price) => price > 0)
    .withMessage("El precio no puede ser 0"),

  body("productLine")
    .isIn([1, 2, 3, 4])
    .withMessage("Debes seleccionar una de las lineas disponibles"),

  body("activity")
    .isIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .withMessage("Debes seleccionar una de las actividades disponibles"),

  body("subactivity")
    .isIn([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28
    ])
    .withMessage("Debes seleccionar una de las subactividades disponibles"),

  body("technique")
    .isIn([1, 2, 3, 4, 5, 6, 7])
    .withMessage("Debes seleccionar una de las técnicas disponibles"),

  body("material")
    .isIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .withMessage("Debes seleccionar una de las telas disponibles"),

  body("image").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

   if(file) {
      let fileExtensions = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtensions)) {
        throw new Error(
          `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
            ", "
          )}`
        );
      }
    }
    return true;
  })
]
};
