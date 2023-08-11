/* 
    Rutas de Usuarios/ Auth
    host * /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateField } = require('../middlewares/fields-validate');
const { validateJWT } = require('../middlewares/validate-jwt');

//? Nuevo usuario
router.post(
  '/new',
  [//middelwares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min:6 }),
    validateField
  ], 
  createUser
);

//? Loguear Usuario
router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min:6 }),
    validateField
  ],
  loginUser
);


//? Revalidar Token
router.get(
  '/renew',
  [ validateJWT ], //middleware
  renewToken
);


module.exports = router;


//* check es el middelware que se encarga de validar un campo en particular, lo hace uno a la vez
//* El middleware de validate hace que los check que se envian en el body, se validen primero en secuencia
//* luego de esto en el validateFields, esta el resultado de estos check de la req, y se pasa el condicional
//* para que setee el map de todos los error que arrojo el resultado de los check
//* si todo esta bien pasa a createUser.