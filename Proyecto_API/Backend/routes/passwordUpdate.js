const express = require('express');
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcrypt');

router.put('/:tdoc/:id', (req, res) => {
  const { tdoc, id } = req.params;
  const { current_pass, new_pass } = req.body;

  if (!current_pass || !new_pass) {
    return res.status(400).json({ error: 'Los campos de contraseña actual y nueva contraseña son obligatorios' });
  }

  const isAdminQuery = 'SELECT * FROM administrador WHERE tdoc_admin = ? AND id_admin = ?';
  const isEmployeeQuery = 'SELECT * FROM empleado WHERE tdoc_empleado = ? AND id_empleado = ?';

  connection.query(isAdminQuery, [tdoc, id], (err, adminResults) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener el administrador' });
      return;
    }

    connection.query(isEmployeeQuery, [tdoc, id], (err, employeeResults) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el empleado' });
        return;
      }

      if (adminResults.length === 0 && employeeResults.length === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      const isAdministrator = adminResults.length > 0;
      const storedPassword = isAdministrator ? adminResults[0].pass_admin : employeeResults[0].pass_empleado;

      // Verificar si la contraseña actual proporcionada coincide con la almacenada (ya sea encriptada o no)
      const isMatchEncrypted = bcrypt.compareSync(current_pass, storedPassword);
      const isMatchUnencrypted = current_pass === storedPassword;

      if ((isMatchEncrypted || isMatchUnencrypted)) {
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
          const updateQuery = isAdministrator ? 'UPDATE administrador SET pass_admin = ?' : 'UPDATE empleado SET pass_empleado = ?';
          const params = [hashedPassword, tdoc, id];

          connection.query(updateQuery, params, (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).json({ error: 'Error al cambiar la contraseña del usuario' });
              return;
            }
            res.json({ message: 'Contraseña cambiada con éxito' });
          });
        });
      } else {
        res.status(401).json({ error: 'Contraseña actual incorrecta' });
      }
    });
  });
});

module.exports = router;
