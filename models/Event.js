/* eslint-disable no-unused-vars */
const { model, Schema } = require('mongoose');

//? El schema genera el uid gracias a mongoose

const EventSchema = Schema({
    
  title: {
    type: String,
    required: true,
  },
  notes:{
    type: String
  },
  start:{
    type:Date,
    required: true
  },
  end:{
    type:Date,
    required: true
  },
  user:{
    type: Schema.Types.ObjectId, //*referencia al usuario que creo la nota, referencia al otro Schema
    ref: 'User' ,
    required: true
  }


});

//* Sobreescribir serializacion de toJSON

EventSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});


module.exports = model('Event', EventSchema);

//* extraemos el _v y el _id, y lo demas seria el object de todo el objeto que genera, cambios el _id por id
//* y retornamos el object sin el _v, esto es solo ala hora de llamar el metodo toJSON, no se hace modificacion
//* directamente en la BD

//* Mongoose por defecto cuando se manda llamar usa el serializardor de toJSON cuando se hace la peticion
//* y retorna el schema de respuesta, este por defecto es para todos los modelos y pero se
//* sobreescribir como quiero que funciones


//* Esta es la configuracion o el modelo para creaaer la coleccion en la BD y tengamos un tipo de estructura 
//* de datos para la BD,

//* Con este modelo se hara postetos, actualizacion, eliminaciones, etc