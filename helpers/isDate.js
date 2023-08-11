//* Custom validator porque express validator no puede validar fechas

const {DateTime} = require('luxon');


const isDate = ( value ) =>{
  //   console.log(value);
  //   console.log(req, location, path);
//   console.log(value);
  if ( !value ) return false;
  //   console.log(DateTime.fromISO(value));

  if ( DateTime.fromISO(value).isValid ) {
    return true;
  }else{
    return false;
  }


};

module.exports = {
  isDate
};
