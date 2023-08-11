/* 
    Event Routes
    '/api/events/
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/fields-validate');
const{ validateJWT } = require('../middlewares/validate-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const router = Router();

//Todas tienes que pasar por la validacion de JWT

router.use( validateJWT );
//* todo peticion que se encuetre debejao de este middleware va tener que tener su token


//Obtener eventos
router.get(
  '/',
 
  getEvents
);


//Crear evento

router.post(
  '/',
  [
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de incio es obligatoria').custom( isDate ),
    check('end','Fecha de fin es obligatoria').custom( isDate ),
    validateField
  ], 
  createEvent
);


//Acttualizar evento
router.put(
  '/:id',
  [
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de incio es obligatoria').custom( isDate ),
    check('end','Fecha de fin es obligatoria').custom( isDate ),
    validateField
  ], 
  updateEvent
);


//Eliminar eventos

router.delete(
  '/:id',
  deleteEvent
);

module.exports = router;