const express = require('express');
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcrypt');

// Consultar un administrador por su tdoc_admin, id_admin y verificar el rol y contraseña
router.post('/administrador', (req, res) => {
  const { tdoc_admin, id_admin, pass_admin, rol } = req.body;

  if (!tdoc_admin || !id_admin || !pass_admin || !rol) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  connection.query(
    'SELECT * FROM administrador WHERE tdoc_admin = ? AND id_admin = ?',
    [tdoc_admin, id_admin],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el administrador' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Administrador no encontrado' });
        return;
      }

      const storedPassword = results[0].pass_admin;
      const storedRol = results[0].rol;

      // Verificar si la contraseña proporcionada coincide con la almacenada (ya sea encriptada o no)
      const isMatchEncrypted = bcrypt.compareSync(pass_admin, storedPassword);
      const isMatchUnencrypted = pass_admin === storedPassword;

      if ((isMatchEncrypted || isMatchUnencrypted) && storedRol === rol) {
        // Contraseña válida y rol correcto, puedes devolver información del administrador o un token de autenticación si lo deseas
        res.json({ message: 'Inicio de sesión exitoso' });
      } else {
        // Comprobar el motivo del fallo (rol incorrecto, contraseña incorrecta u otro)
        let errorMessage = '';
        if (!isMatchEncrypted && !isMatchUnencrypted) {
          errorMessage = 'Contraseña incorrecta';
        }
        if (storedRol !== rol) {
          errorMessage = 'Rol incorrecto';
        }
        res.status(401).json({ error: errorMessage });
      }
    }
  );
});


// Consultar un empleado por su tdoc_empleado, id_empleado y verificar el rol y contraseña
router.post('/empleado', (req, res) => {
  const { tdoc_empleado, id_empleado, pass_empleado, rol } = req.body;

  if (!tdoc_empleado || !id_empleado || !pass_empleado || !rol) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  connection.query(
    'SELECT * FROM empleado WHERE tdoc_empleado = ? AND id_empleado = ?',
    [tdoc_empleado, id_empleado],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el empleado' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Empleado no encontrado' });
        return;
      }

      const storedPassword = results[0].pass_empleado;
      const storedRol = results[0].rol;

      // Verificar si la contraseña proporcionada coincide con la almacenada (ya sea encriptada o no)
      const isMatchEncrypted = bcrypt.compareSync(pass_empleado, storedPassword);
      const isMatchUnencrypted = pass_empleado === storedPassword;

      if ((isMatchEncrypted || isMatchUnencrypted) && storedRol === rol) {
        // Contraseña válida y rol correcto, puedes devolver información del empleado o un token de autenticación si lo deseas
        res.json({ message: 'Inicio de sesión exitoso' });
      } else {
        // Comprobar el motivo del fallo (rol incorrecto, contraseña incorrecta u otro)
        let errorMessage = '';
        if (!isMatchEncrypted && !isMatchUnencrypted) {
          errorMessage = 'Contraseña incorrecta';
        }
        if (storedRol !== rol) {
          errorMessage = 'Rol incorrecto';
        }
        res.status(401).json({ error: errorMessage });
      }
    }
  );
});

module.exports = router;