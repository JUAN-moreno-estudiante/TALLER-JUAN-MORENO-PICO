const { Client } = require('pg');

const client = new Client({
  host: 'aws-0-us-east-1.pooler.supabase.com',
  port: 5432,
  user: 'postgres.uvimmvohyoejofoukrmo',
  password: 'hvSgP9iAXe8SFI7x',
  database: 'postgres',
  ssl: { rejectUnauthorized: false }, 
});

client.connect()
  .then(() => console.log('Conectado a PostgreSQL con pg'))
  .catch(err => console.error('Error al conectar', err));

module.exports = client;
/*const mysql = require('mysql2');
const conection = mysql.createConnection({
    host:'aws-0-us-east-1.pooler.supabase.com',
    port:5432,
    user:'postgres.uvimmvohyoejofoukrmo',
    password:'hvSgP9iAXe8SFI7x',
    database:'postgres'
});

conection.connect((error) => {
    if (error){
        console.log('Error en la conexion',error)
        return
    }else{
        console.log('Conectado a la base de datos');
    }
})*/