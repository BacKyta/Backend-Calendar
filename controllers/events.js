const { response } = require('express');
const Event = require('../models/Event');
// const User = require('../models/User');



const getEvents = async (req, res = response) =>{

  // console.log(req.uid);
  
  try {
    // const { user } = req.body;
    // console.log({xd: user.name});
    //* Para mostrar todos los eventos por usuario solamente
    
    // let user =  await User.findById(req.uid); 

    const events = await Event.find(/* {user: user} */).populate('user','name');

    //* con populate seteamos el user a la respuesta el id siempre viene.
    //* se debe especificar la referencia que se quiere rellenar, porque puede que se tenga varias referencias
    //* en el mismo documento.
  
    res.json({
      ok:true,
      events
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg:'Hable con el administrador'
    });
  }

};



const createEvent = async (req, res = response) => {
  
  //Verificar que tenga ele evento

  const event = new Event(req.body);

  try {

    event.user = req.uid;
    
    const eventoSaved = await event.save();

    res.json({
      ok:true,
      event: eventoSaved
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg:'Hable con el administrador'
    });
  }


};

const updateEvent = async (req, res = response) => {

  const eventId = req.params.id;
  // console.log(req);
  const uid = req.uid;
  

  try {
    
    const event = await Event.findById( eventId );

    if ( !event ) {
      return res.status(404).json({
        ok:false,
        msg: 'Evento no existe en este id'
      });
    }

    if ( event.user.toString() !== uid ) { //* compara la referencia al usuario del evento con el uid del usuario del token que se envia en el req
      return res.status(401).json({
        ok:false,
        msg: 'No tiene provilegio de editar este evento'
      });
    }
    
    //* evento actualziado

    const newEvent = { 

      ...req.body,
      user: uid
    };

    const eventUpdated = await Event.findByIdAndUpdate( eventId, newEvent, { new: true}); 
    // evento que quiero actualizar, nueva data , cofniguraciones adicioneles(para evitar el default)

    res.json({
      ok: true,
      event: eventUpdated
    });
    
    //* al actualizar por defecto en el postman regresa el viejo evento o documento para que que podamos
    //* hacer un tipo de comparacion


  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:'Hable con el administrador'
    });
  }

};


const deleteEvent = async (req, res = response) => {

  const eventId = req.params.id;
  // console.log(req);
  const uid = req.uid;

  try {
  
    const event = await Event.findById( eventId );

    if ( !event ) {
      return res.status(404).json({
        ok:false,
        msg: 'Evento no existe en este id'
      });
    }

    if ( event.user.toString() !== uid ) { 
      return res.status(401).json({
        ok:false,
        msg: 'No tiene provilegio de eliminar este evento'
      });
    }
    
    //* Eliminar evento

    const eventDeleted = await Event.findByIdAndDelete( eventId, { new: true}); 


    res.json({
      ok: true,
      event: eventDeleted
    });
    

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:'Hable con el administrador'
    });
  }
    
 
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
};