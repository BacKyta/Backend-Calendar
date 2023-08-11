//* Configuration for connect to BD

const mongoose = require('mongoose');

const dbConection = async () =>{

  try {
    
    mongoose.connect(process.env.DB_CNN);
    console.log('db-online');

  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de incializar DB');
  }
};

module.exports = {
  dbConection
};