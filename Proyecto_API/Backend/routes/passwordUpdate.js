const express = require('express');
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcrypt');

// Cambiar la contraseña de un administrador permitiendo la contraseña actual en texto sin cifrar
router.put('/administrador/:tdoc_admin/:id_admin', (req, res) => {
  const { tdoc_admin, id_admin } = req.params;
  const { current_pass, new_pass } = req.body;

  if (!current_pass || !new_pass) {
    return res.status(400).json({ error: 'Los campos de contraseña actual y nueva contraseña son obligatorios' });
  }

  // Obtener la contraseña actual almacenada en la base de datos
  connection.query(
    'SELECT pass_admin FROM administrador WHERE tdoc_admin = ? AND id_admin = ?',
    [tdoc_admin, id_admin],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener la contraseña actual' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Administrador no encontrado' });
        return;
      }

      const storedPassword = results[0].pass_admin;

      // Verificar si la contraseña actual proporcionada está encriptada
      if (bcrypt.compareSync(current_pass, storedPassword)) {
        // Generar una sal (salt) para encriptar la nueva contraseña
        const saltRounds = 10;

        // Encriptar la nueva contraseña
        bcrypt.hash(new_pass, saltRounds, (err, hashedPassword) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al encriptar la nueva contraseña' });
            return;
          }

          // Actualizar la contraseña en la base de datos
          connection.query(
            'UPDATE administrador SET pass_admin = ? WHERE tdoc_admin = ? AND id_admin = ?',
            [hashedPassword, tdoc_admin, id_admin],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al cambiar la contraseña del administrador' });
                return;
              }
              res.json({ message: 'Contraseña del administrador cambiada con éxito' });
            }
          );
        });
      } else {
        // La contraseña actual proporcionada no coincide con la almacenada encriptada
        // Verificar si coincide con la contraseña almacenada sin cifrar
        if (current_pass === storedPassword) {
          // Generar una sal (salt) para encriptar la nueva contraseña
          const saltRounds = 10;

          // Encriptar la nueva contraseña
          bcrypt.hash(new_pass, saltRounds, (err, hashedPassword) => {
            if (err) {
              console.error(err);
              res.status(500).json({ error: 'Error al encriptar la nueva contraseña' });
              return;
            }

            // Actualizar la contraseña en la base de datos
            connection.query(
              'UPDATE administrador SET pass_admin = ? WHERE tdoc_admin = ? AND id_admin = ?',
              [hashedPassword, tdoc_admin, id_admin],
              (err, result) => {
                if (err) {
                  console.error(err);
                  res.status(500).json({ error: 'Error al cambiar la contraseña del administrador' });
                  return;
                }
                res.json({ message: 'Contraseña del administrador cambiada con éxito' });
              }
            );
          });
        } else {
          res.status(401).json({ error: 'Contraseña actual incorrecta' });
        }
      }
    }
  );
});

// Cambiar la contraseña de un empleado permitiendo la contraseña actual en texto sin cifrar
router.put('/empleado/:tdoc_empleado/:id_empleado', (req, res) => {
  const { tdoc_empleado, id_empleado } = req.params;
  const { current_pass, new_pass } = req.body;

  if (!current_pass || !new_pass) {
    return res.status(400).json({ error: 'Los campos de contraseña actual y nueva contraseña son obligatorios' });
  }

  // Obtener la contraseña actual almacenada en la base de datos
  connection.query(
    'SELECT pass_empleado FROM empleado WHERE tdoc_empleado = ? AND id_empleado = ?',
    [tdoc_empleado, id_empleado],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener la contraseña actual' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Empleado no encontrado' });
        return;
      }

      const storedPassword = results[0].pass_empleado;

      // Verificar si la contraseña actual proporcionada está encriptada
      if (bcrypt.compareSync(current_pass, storedPassword)) {
        // Generar una sal (salt) para encriptar la nueva contraseña
        const saltRounds = 10;

        // Encriptar la nueva contraseña
        bcrypt.hash(new_pass, saltRounds, (err, hashedPassword) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al encriptar la nueva contraseña' });
            return;
          }

          // Actualizar la contraseña en la base de datos
          connection.query(
            'UPDATE empleado SET pass_empleado = ? WHERE tdoc_empleado = ? AND id_empleado = ?',
            [hashedPassword, tdoc_empleado, id_empleado],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al cambiar la contraseña del empleado' });
                return;
              }
              res.json({ message: 'Contraseña del empleado cambiada con éxito' });
            }
          );
        });
      } else {
        // La contraseña actual proporcionada no coincide con la almacenada encriptada
        // Verificar si coincide con la contraseña almacenada sin cifrar
        if (current_pass === storedPassword) {
          // Generar una sal (salt) para encriptar la nueva contraseña
          const saltRounds = 10;

          // Encriptar la nueva contraseña
          bcrypt.hash(new_pass, saltRounds, (err, hashedPassword) => {
            if (err) {
              console.error(err);
              res.status(500).json({ error: 'Error al encriptar la nueva contraseña' });
              return;
            }

            // Actualizar la contraseña en la base de datos
            connection.query(
              'UPDATE empleado SET pass_empleado = ? WHERE tdoc_empleado = ? AND id_empleado = ?',
              [hashedPassword, tdoc_empleado, id_empleado],
              (err, result) => {
                if (err) {
                  console.error(err);
                  res.status(500).json({ error: 'Error al cambiar la contraseña del empleado' });
                  return;
                }
                res.json({ message: 'Contraseña del empleado cambiada con éxito' });
              }
            );
          });
        } else {
          res.status(401).json({ error: 'Contraseña actual incorrecta' });
        }
      }
    }
  );
});


module.exports = router;