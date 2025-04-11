const express = require('express');
const connection = require('./db');
const path = require('path');
const cors = require('cors'); // Importa el paquete cors

const app = express();

// Habilita CORS para todas las solicitudes - SE DEBE INSTALAR EL CO
app.use(cors()); // Esto permite todas las solicitudes CORS desde

// Encargado de parsear a los json
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Archivos html
// app.use(express.static(path.resolve(__dirname, 'templates')));
//Creamos puerto de conexion 
const PORT =5000; 
app.listen(PORT, ()=>{
    console.log('Servidor Corriendo');
});
// Ruta prueba
app.get('/api/prueba', (req, res) => {
    res.send('Api funcionando de manera correcta');
});
app.get('/api/prueba1', (req, res) => {
    res.status(200).json({
        message: 'LA API RESPONDE CORRECTAMENTE',
        port: PORT,
        status: 'success'
    });
});
// Crear registro
app.post('/api/guardar', (req, res) => {
  const { cedula, nombre, edad, profesion } = req.body;

  const query = 'INSERT INTO persona (cedula, nombre, edad, profesion) VALUES ($1, $2, $3, $4)';
  const values = [cedula, nombre, edad, profesion];

  connection.query(query, values, (error, result) => {
    if (error) {
      res.status(500).json({ message: 'LA API FALLO', error });
    } else {
      res.status(201).json({ cedula, nombre, edad, profesion });
    }
  });
});

// Obtener registros de la base de datos
const axios = require('axios');

app.get('/api/obtener', async (req, res) => {
    const supabaseUrl = 'https://uvimmvohyoejofoukrmo.supabase.co/rest/v1/persona';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2aW1tdm9oeW9lam9mb3Vrcm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTU0MzcsImV4cCI6MjA1OTc5MTQzN30.AurucT01swsZLKHQXSCZ0AyWw0njeqv10YvwxOpNXwY'; // Clave anon

  try {
    const response = await axios.get(supabaseUrl, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      }
    });

    res.status(200).json({
      success: true,
      message: 'Datos obtenidos correctamente',
      data: response.data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al recuperar los datos',
      details: error.message
    });
  }
});

// API para eliminar registro
/*const axios = require('axios');*/

app.delete('/api/eliminar/:cedula', async (req, res) => {
    const { cedula } = req.params;
  
    const supabaseUrl = 'https://uvimmvohyoejofoukrmo.supabase.co/rest/v1/persona';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2aW1tdm9oeW9lam9mb3Vrcm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTU0MzcsImV4cCI6MjA1OTc5MTQzN30.AurucT01swsZLKHQXSCZ0AyWw0njeqv10YvwxOpNXwY';
  
    try {
        const response = await axios.delete(`${supabaseUrl}?cedula=eq.${cedula}`, {
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              Prefer: 'return=representation',
            }
          });          
  
          if (response.data.length === 0) {
            res.status(404).json({
              success: false,
              message: `No existe el registro con cédula ${cedula}`
            });
          } else {
            res.status(200).json({
              success: true,
              message: 'Registro eliminado exitosamente',
              deleted: response.data
            });
          }
          
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar el registro",
        details: error.message
      });
    }
  });


  
//actualizar registros papu
  app.put('/api/actualizar/:cedula', async (req, res) => {
    const { cedula } = req.params;
    const { nombre, edad, profesion } = req.body;
  
    const supabaseUrl = 'https://uvimmvohyoejofoukrmo.supabase.co/rest/v1/persona';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2aW1tdm9oeW9lam9mb3Vrcm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTU0MzcsImV4cCI6MjA1OTc5MTQzN30.AurucT01swsZLKHQXSCZ0AyWw0njeqv10YvwxOpNXwY'; // Reemplaza por tu clave
  
    try {
      const response = await axios.patch(`${supabaseUrl}?cedula=eq.${cedula}`, 
        { nombre, edad, profesion }, 
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: 'return=representation'
          }
        }
      );
  
      if (response.data.length === 0) {
        res.status(404).json({
          success: false,
          message: `No existe ningún registro con la cédula ${cedula}`
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Registro actualizado exitosamente',
          updated: response.data
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el registro',
        details: error.message
      });
    }
  });
  