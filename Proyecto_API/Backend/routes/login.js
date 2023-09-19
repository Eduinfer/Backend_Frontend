const express = require('express');
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
  const { tdoc, id, password } = req.body;

  if (!tdoc || !id || !password) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
  }

  connection.query(
    'SELECT * FROM administrador WHERE tdoc_admin = ? AND id_admin = ?',
    [tdoc, id],
    (err, adminResults) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el administrador' });
        return;
      }

      connection.query(
        'SELECT * FROM empleado WHERE tdoc_empleado = ? AND id_empleado = ?',
        [tdoc, id],
        (err, empleadoResults) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener el empleado' });
            return;
          }

          if (adminResults.length === 0 && empleadoResults.length === 0) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
          }

          const isAdmin = adminResults.length > 0;
          const storedPassword = isAdmin ? adminResults[0].pass_admin : empleadoResults[0].pass_empleado;
          const storedRol = isAdmin ? adminResults[0].rol : empleadoResults[0].rol;

          // Verificar si la contraseña proporcionada coincide con la almacenada (ya sea encriptada o no)
          const isMatchEncrypted = bcrypt.compareSync(password, storedPassword);
          const isMatchUnencrypted = password === storedPassword;

          if ((isMatchEncrypted || isMatchUnencrypted) && storedRol) {
            // Contraseña válida y rol correcto, puedes devolver información del usuario o un token de autenticación si lo deseas
            res.json({ message: 'Inicio de sesión exitoso', rol: storedRol });
          } else {
            // Comprobar el motivo del fallo (rol incorrecto, contraseña incorrecta u otro)
            let errorMessage = '';
            if (!isMatchEncrypted && !isMatchUnencrypted) {
              errorMessage = 'Contraseña incorrecta';
            }
            if (!storedRol) {
              errorMessage = 'Usuario no tiene un rol asignado';
            }
            res.status(401).json({ error: errorMessage });
          }
        }
      );
    }
  );
});

module.exports = router;
