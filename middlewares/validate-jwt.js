const { response } = require('express'); // para autocompletado de la response
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) =>{
 
  //?? Como recibir el jwt
  const token = req.header('x-token');
  //   console.log(token);

  if ( !token ) {
    return res.status(401).json({
      ok : false,
      msg: 'No hay token en la peticion'
    });
  }

  //* si la validacion del token falla

  try {
    
    const { uid, name} = jwt.verify( //* me dvuelve el payload de la BD si la varificacion es correcta
      token,
      process.env.SECRET_JWT_SEED
    );

    // console.log(payload);

    req.uid = uid;
    req.name = name;
   
    
  } catch (error) {
    return res.status(401).json({
      ok:false,
      msg:'Token no valido'
    });
  }


  next();

};

module.exports = {
  validateJWT
};