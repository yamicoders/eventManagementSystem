const mongoose = require('mongoose');
const dotenv =require('dotenv');
dotenv.config({path:'./src/.env'});

const conn=process.env.DATABASE;

function connect(){
  mongoose.connect(conn).then(() => {
          console.log('Database Connected');
        }).catch((error) => console.log(error));
}

module.exports = connect;