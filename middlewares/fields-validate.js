const { response } = require('express');
const { validationResult } = require('express-validator');

const validateField = ( req, res = response, next) =>{

  // Manejo de errores
  
  const errors = validationResult( req );
 
  if( !errors.isEmpty() ) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    });
  }

  next();
};

module.exports = {
  validateField
};

//* El next permite pasar al sigueinte check, el nxt es el controlador