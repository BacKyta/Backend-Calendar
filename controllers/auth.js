const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT} = require('../helpers/jwt');


//? CREATE USER

const createUser = async (req, res = response) =>{

  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email: email }); 


    if (user) {
      return res.status(400).json({
        ok: false,
        msg:'Usuario ya existe con ese correo'
      });
    }

    user = new User( req.body );

    //* Encriptar Password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );


    await user.save();

    //Generar JWT
    const token = await generateJWT( user.id, user.name);

  
    res.status(201).json({
      ok:true,
      uid: user.id,
      name:user.name,
      token: token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg:'Por favor hable con el admin'
    });
  }

  
};

//? LOGIN USER

const loginUser = async (req, res = response) =>{

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email }); 

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg:'El usuario no existe con ese email'
      });
    }

    //Confirmar los passwords

    const validPassword = bcrypt.compareSync( password, user.password ); 
    // return tru or false, compare el password del requerimiento con el password de la BD hasheada

    if ( !validPassword ) {
      return res.status(400).json({
        ok:false,
        msg: 'Password incorrecto'
      });
    }

    //Generar nuestro JWT

    const token = await generateJWT( user.id, user.name);

    res.json({
      ok   : true,
      uid  : user.id,
      name : user.name,
      token: token
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg:'Por favor hable con el admin'
    });
  }
};


//? REVALIDATE USER

const renewToken = async (req, res = response) =>{

  const {uid, name} = req;

  //* Genera un nuevo JWT con los datos de la req , que son los mismo que los de la base de datos
  //* que se verificaron con el token anterior y la palabra secreta, solo que ahora genera un nuevo token
  //* y retornarlo en esta peticion

  const token = await generateJWT( uid, name);

  res.status(201).json({
    ok   : true,
    token: token
  });
  
};



module.exports = {
  createUser, 
  loginUser,
  renewToken
};



//* Si no usamos express hacemos referencia al express que ya se cargo en otro archivo perderemos
//* el intellisens cuando borremos algo de la res, para evitar esto lo requerimos y lo colocamos
//* por dafault en el res

//* Se hara validacion con paquete express validator
//* forma antigua no usar!
//   if (name.length < 5) {
//     return res.status(400).json({
//       ok:false,
//       msg: 'El nombre dene de ser mas de 5 caracteres'
//     });
//   }

//* findOne busca el que coincida con el email, si retorna un objeto significa que tengo alguien con ese correo,
//* si retorna null significa que no hayo a nadie con ese correo.